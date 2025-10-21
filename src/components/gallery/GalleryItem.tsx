import { GalleryImage } from "@/data/galleryImages";

interface GalleryItemProps {
  image: GalleryImage;
  onClick: () => void;
}

const GalleryItem = ({ image, onClick }: GalleryItemProps) => {
  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-card cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View ${image.title}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        width={600}
        height={image.height || 800}
      />
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
          <span className="inline-block bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
            {image.category}
          </span>
        </div>
      </div>

      {/* Featured badge */}
      {image.featured && (
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          Featured
        </div>
      )}
    </div>
  );
};

export default GalleryItem;
