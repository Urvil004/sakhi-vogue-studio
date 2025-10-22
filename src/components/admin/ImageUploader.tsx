import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, X, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
      category: "Blouses",
      description: "",
      tags: ""
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    multiple: true
  });

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
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

  const handleUpload = async () => {
    if (images.length === 0) return;

    setUploading(true);
    setUploadProgress(0);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const total = images.length;
      let completed = 0;

      for (const image of images) {
        // Upload to storage
        const fileExt = image.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, image.file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

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

        if (dbError) throw dbError;

        completed++;
        setUploadProgress(Math.round((completed / total) * 100));
      }

      toast({
        title: "Success!",
        description: `${images.length} image(s) uploaded successfully.`
      });

      // Clean up
      images.forEach(img => URL.revokeObjectURL(img.preview));
      setImages([]);
      onUploadComplete();
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        {isDragActive ? (
          <p>Drop the images here...</p>
        ) : (
          <div>
            <p className="font-semibold mb-2">Drag & drop images here</p>
            <p className="text-sm text-muted-foreground">or click to select files</p>
            <p className="text-xs text-muted-foreground mt-2">Supports: JPG, PNG, WebP</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">{images.length} image(s) ready to upload</h3>
          
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
                      />
                    </div>
                    
                    <div>
                      <Label>Category *</Label>
                      <Select
                        value={image.category}
                        onValueChange={(value) => updateImage(index, 'category', value)}
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
                      />
                    </div>
                    
                    <div>
                      <Label>Tags (comma separated)</Label>
                      <Input
                        value={image.tags}
                        onChange={(e) => updateImage(index, 'tags', e.target.value)}
                        placeholder="e.g., designer, embroidered, custom"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={uploading}
            size="lg"
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload ${images.length} Image(s)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;