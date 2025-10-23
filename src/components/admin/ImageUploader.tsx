import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2, AlertCircle, WifiOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const UPLOAD_TIMEOUT = 60000; // 60 seconds

interface ImageFile {
  file: File;
  preview: string;
  title: string;
  category: string;
  description: string;
  tags: string;
}

interface ImageUploaderProps {
  onUploadComplete: () => void;
}

const categories = ["Blouses", "Dresses", "Embroidery", "Gowns", "Wedding"];

const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [error, setError] = useState<string | null>(null);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      console.log('Network: Back online');
      toast({
        title: "Back online!",
        description: "You can now upload images.",
      });
      setIsOffline(false);
    };
    
    const handleOffline = () => {
      console.log('Network: Offline detected');
      toast({
        title: "You are offline",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
      setIsOffline(true);
      // Stop any ongoing uploads
      if (uploading) {
        setUploading(false);
        setError("Upload interrupted: Network disconnected");
      }
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [uploading]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    console.log('Files dropped:', acceptedFiles.length, 'accepted,', rejectedFiles.length, 'rejected');
    
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(rejection => {
        const file = rejection.file;
        if (file.size > MAX_FILE_SIZE) {
          return `${file.name}: File too large (max 5MB)`;
        }
        return `${file.name}: Invalid file type`;
      });
      
      toast({
        title: "Some files were rejected",
        description: errors.join(", "),
        variant: "destructive",
      });
    }

    // Add accepted files
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      category: "Blouses",
      description: "",
      tags: ""
    }));
    
    setImages(prev => [...prev, ...newImages]);
    setError(null); // Clear any previous errors
    console.log('Total images now:', images.length + newImages.length);
  }, [images.length]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    maxSize: MAX_FILE_SIZE,
    multiple: true,
    disabled: uploading || isOffline
  });

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      console.log('Image removed, remaining:', newImages.length);
      return newImages;
    });
  };

  const updateImage = (index: number, field: keyof ImageFile, value: string) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = { ...newImages[index], [field]: value };
      return newImages;
    });
  };

  const clearAll = () => {
    console.log('Clearing all images');
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setError(null);
    setUploadProgress(0);
  };

  const uploadWithTimeout = async (uploadFn: () => Promise<any>, timeoutMs: number) => {
    return Promise.race([
      uploadFn(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timeout - operation took too long')), timeoutMs)
      )
    ]);
  };

  const handleUpload = async () => {
    // Validation checks
    if (images.length === 0) {
      toast({
        title: "No images selected",
        description: "Please add images before uploading.",
        variant: "destructive",
      });
      return;
    }

    // Check if offline
    if (isOffline || !navigator.onLine) {
      const errorMsg = "No internet connection. Please check your network and try again.";
      setError(errorMsg);
      toast({
        title: "Cannot upload",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    // Check if all images have required fields
    const invalidImages = images.filter(img => !img.title.trim() || !img.category);
    if (invalidImages.length > 0) {
      toast({
        title: "Missing information",
        description: "Please add title and category for all images.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    console.log('=== Starting Upload Process ===');
    console.log('Total images to upload:', images.length);
    console.log('Network status:', navigator.onLine ? 'Online' : 'Offline');

    try {
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("Not authenticated. Please log in again.");
      }
      console.log('User authenticated:', user.id);

      const total = images.length;
      let completed = 0;
      const failedImages: string[] = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        console.log(`\n--- Uploading image ${i + 1}/${total}: ${image.title} ---`);

        try {
          // Check network before each upload
          if (!navigator.onLine) {
            throw new Error('Network disconnected during upload');
          }

          // Upload with timeout
          await uploadWithTimeout(async () => {
            // Upload to storage
            const fileExt = image.file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            console.log('Uploading to storage:', filePath);
            const { error: uploadError, data: uploadData } = await supabase.storage
              .from('gallery')
              .upload(filePath, image.file, {
                cacheControl: '3600',
                upsert: false
              });

            if (uploadError) {
              console.error('Storage upload error:', uploadError);
              throw uploadError;
            }
            console.log('Storage upload successful');

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
              .from('gallery')
              .getPublicUrl(filePath);
            console.log('Public URL obtained:', publicUrl);

            // Insert metadata to database
            const tags = image.tags.split(',').map(t => t.trim()).filter(Boolean);
            
            const { error: dbError } = await supabase
              .from('gallery_images')
              .insert({
                image_url: publicUrl,
                title: image.title,
                category: image.category,
                description: image.description || null,
                tags,
                uploaded_by: user.id
              });

            if (dbError) {
              console.error('Database insert error:', dbError);
              throw dbError;
            }
            console.log('Database insert successful');
          }, UPLOAD_TIMEOUT);

          // Success for this image
          completed++;
          const progress = Math.round((completed / total) * 100);
          setUploadProgress(progress);
          console.log(`Image ${i + 1} uploaded successfully. Progress: ${progress}%`);

        } catch (imageError: any) {
          console.error(`Failed to upload image ${i + 1}:`, imageError);
          failedImages.push(image.title);
          // Continue with other images instead of stopping
        }
      }

      console.log('=== Upload Process Complete ===');
      console.log('Successful uploads:', completed);
      console.log('Failed uploads:', failedImages.length);

      // Show results
      if (failedImages.length === 0) {
        toast({
          title: "Success!",
          description: `All ${images.length} image(s) uploaded successfully.`,
        });

        // Clean up and reset
        images.forEach(img => URL.revokeObjectURL(img.preview));
        setImages([]);
        onUploadComplete();
      } else if (completed > 0) {
        toast({
          title: "Partial success",
          description: `${completed} of ${total} images uploaded. ${failedImages.length} failed: ${failedImages.join(', ')}`,
          variant: "destructive",
        });
        setError(`Failed to upload: ${failedImages.join(', ')}`);
        // Don't clear images - allow retry
      } else {
        throw new Error('All uploads failed');
      }

    } catch (error: any) {
      console.error('=== Upload Process Failed ===');
      console.error('Error:', error);
      
      let errorMessage = 'Upload failed. Please try again.';
      
      if (error.message?.includes('timeout')) {
        errorMessage = 'Upload took too long. Try uploading fewer images or check your connection.';
      } else if (error.message?.includes('network') || error.message?.includes('disconnected')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.message?.includes('authenticated')) {
        errorMessage = 'Session expired. Please log in again.';
      } else if (error.message?.includes('storage')) {
        errorMessage = 'Storage error. Please contact administrator.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast({
        title: "Upload failed",
        description: errorMessage,
        variant: "destructive",
      });
      
    } finally {
      // CRITICAL: Always reset loading state
      console.log('Resetting upload state');
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Offline Warning Banner */}
      {isOffline && (
        <Card className="bg-destructive/10 border-destructive p-4">
          <div className="flex items-center gap-3">
            <WifiOff className="h-5 w-5 text-destructive flex-shrink-0" />
            <div>
              <p className="font-medium text-destructive">You are offline</p>
              <p className="text-sm text-muted-foreground">
                Please check your internet connection to upload images.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Error Display Banner */}
      {error && !isOffline && (
        <Card className="bg-destructive/10 border-destructive p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-destructive">Upload Error</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setError(null)}
              className="flex-shrink-0"
            >
              Dismiss
            </Button>
          </div>
        </Card>
      )}

      {/* Upload Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
        } ${uploading || isOffline ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} disabled={uploading || isOffline} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        {isDragActive ? (
          <p className="font-semibold">Drop the images here...</p>
        ) : (
          <div>
            <p className="font-semibold mb-2">Drag & drop images here</p>
            <p className="text-sm text-muted-foreground">or click to select files</p>
            <p className="text-xs text-muted-foreground mt-2">
              Supports: JPG, PNG, WebP (Max 5MB per file)
            </p>
          </div>
        )}
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              {images.length} image(s) ready to upload
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAll}
              disabled={uploading}
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid gap-4">
            {images.map((image, index) => (
              <Card key={index} className="p-4">
                <div className="grid md:grid-cols-[200px_1fr] gap-4">
                  <div className="relative">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => removeImage(index)}
                      disabled={uploading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label>Title *</Label>
                      <Input
                        value={image.title}
                        onChange={(e) => updateImage(index, 'title', e.target.value)}
                        placeholder="Image title"
                        disabled={uploading}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Category *</Label>
                      <Select
                        value={image.category}
                        onValueChange={(value) => updateImage(index, 'category', value)}
                        disabled={uploading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={image.description}
                        onChange={(e) => updateImage(index, 'description', e.target.value)}
                        placeholder="Optional description"
                        rows={2}
                        disabled={uploading}
                      />
                    </div>
                    
                    <div>
                      <Label>Tags (comma separated)</Label>
                      <Input
                        value={image.tags}
                        onChange={(e) => updateImage(index, 'tags', e.target.value)}
                        placeholder="e.g., designer, embroidered, custom"
                        disabled={uploading}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Upload Progress */}
          {uploading && uploadProgress > 0 && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleUpload}
              disabled={uploading || isOffline || images.length === 0}
              size="lg"
              className="flex-1"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload {images.length} Image(s)
                </>
              )}
            </Button>
            
            {/* Retry Button - Shows when there's an error */}
            {error && !uploading && !isOffline && (
              <Button
                onClick={handleUpload}
                variant="outline"
                size="lg"
              >
                Retry Upload
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
