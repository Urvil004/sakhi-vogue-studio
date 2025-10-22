import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Loader2, Search } from "lucide-react";

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  category: string;
  description: string | null;
  tags: string[];
  uploaded_at: string;
}

interface ImageManagerProps {
  refreshTrigger: number;
}

const categories = ["All", "Blouses", "Dresses", "Embroidery", "Gowns", "Wedding"];

const ImageManager = ({ refreshTrigger }: ImageManagerProps) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);
  const [deleteImage, setDeleteImage] = useState<GalleryImage | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchImages();
  }, [refreshTrigger]);

  useEffect(() => {
    filterImages();
  }, [images, selectedCategory, searchQuery]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterImages = () => {
    let filtered = images;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(img =>
        img.title.toLowerCase().includes(query) ||
        img.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredImages(filtered);
  };

  const handleUpdate = async () => {
    if (!editImage) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('gallery_images')
        .update({
          title: editImage.title,
          category: editImage.category,
          description: editImage.description,
          tags: editImage.tags
        })
        .eq('id', editImage.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image updated successfully"
      });

      setEditImage(null);
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteImage) return;

    try {
      // Extract filename from URL
      const url = new URL(deleteImage.image_url);
      const pathname = url.pathname;
      const filename = pathname.split('/').pop();

      // Delete from storage
      if (filename) {
        await supabase.storage
          .from('gallery')
          .remove([filename]);
      }

      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', deleteImage.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully"
      });

      setDeleteImage(null);
      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map(image => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-1">{image.title}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {image.category}
                  </Badge>
                </div>
                {image.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {image.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setEditImage(image)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteImage(image)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editImage} onOpenChange={() => setEditImage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          {editImage && (
            <div className="space-y-4">
              <img
                src={editImage.image_url}
                alt={editImage.title}
                className="w-full h-48 object-cover rounded"
              />
              <div>
                <Label>Title</Label>
                <Input
                  value={editImage.title}
                  onChange={(e) =>
                    setEditImage({ ...editImage, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={editImage.category}
                  onValueChange={(value) =>
                    setEditImage({ ...editImage, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "All").map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editImage.description || ""}
                  onChange={(e) =>
                    setEditImage({ ...editImage, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div>
                <Label>Tags (comma separated)</Label>
                <Input
                  value={editImage.tags.join(", ")}
                  onChange={(e) =>
                    setEditImage({
                      ...editImage,
                      tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditImage(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteImage} onOpenChange={() => setDeleteImage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteImage?.title}" from the gallery.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ImageManager;