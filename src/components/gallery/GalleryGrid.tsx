import { useState } from "react";

interface GalleryImage {
  id: string;
  src?: string;
  image_url: string;
  title: string;
  category: string;
  description?: string | null;
  tags?: string[];
  uploaded_at?: string;
  alt: string;
  featured?: boolean;
}

interface GalleryGridProps {
  images: GalleryImage[];
  selectedCategory: string;
}

const GalleryGrid = ({ images, selectedCategory }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Filter images based on selected category
  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  if (filteredImages.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No images found in this category.</p>
      </div>
    );
  }

  return (
    <>
      {/* Pinterest-Style Masonry Grid using CSS Columns */}
      <div className="masonry-grid">
        <style>{`
          .masonry-grid {
            column-count: 1;
            column-gap: 1rem;
          }
          
          @media (min-width: 640px) {
            .masonry-grid {
              column-count: 2;
            }
          }
          
          @media (min-width: 1024px) {
            .masonry-grid {
              column-count: 3;
            }
          }
          
          @media (min-width: 1280px) {
            .masonry-grid {
              column-count: 4;
            }
          }
          
          .masonry-item {
            break-inside: avoid;
            margin-bottom: 1rem;
            display: inline-block;
            width: 100%;
          }
        `}</style>

        {filteredImages.map((image) => (
          <div 
            key={image.id} 
            className="masonry-item group cursor-pointer"
            onClick={() => setSelectedImage(image)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedImage(image);
              }
            }}
            aria-label={`View ${image.title}`}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 bg-card">
              <img
                src={image.src || image.image_url}
                alt={image.alt}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x600/e91e63/ffffff/png?text=Image+Not+Found";
                  console.error("Failed to load:", image.src || image.image_url);
                }}
              />
              
              {/* Featured Badge */}
              {image.featured && (
                <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
                  Featured
                </div>
              )}
              
              {/* Hover Overlay with Title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-semibold line-clamp-2">{image.title}</p>
                  <p className="text-gray-200 text-xs mt-1 capitalize">{image.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white text-5xl font-light hover:text-gray-300 transition-colors z-50 w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Close lightbox"
          >
            ×
          </button>

          {/* Navigation Arrows */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-4xl font-light hover:text-gray-300 transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
              setSelectedImage(filteredImages[prevIndex]);
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-4xl font-light hover:text-gray-300 transition-colors z-50 w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
              const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
              setSelectedImage(filteredImages[nextIndex]);
            }}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Image Container */}
          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            <img 
              src={selectedImage.src || selectedImage.image_url} 
              alt={selectedImage.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="mt-6 text-center">
              <p className="text-white text-xl font-bold mb-2">{selectedImage.title}</p>
              <span className="inline-block bg-primary/80 text-white px-4 py-1 rounded-full text-sm capitalize">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
