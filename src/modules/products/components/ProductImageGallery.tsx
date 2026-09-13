import { useState } from "react";
import { cn } from "@shared/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const safeImages = images.length > 0 ? images : ["/placeholder-product.svg"];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-square overflow-hidden rounded-lg border bg-secondary/40">
        <img
          src={safeImages[active]}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {safeImages.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={cn(
                "h-16 w-16 shrink-0 overflow-hidden rounded-md border-2",
                active === i ? "border-primary" : "border-transparent",
              )}
            >
              <img src={img} alt={`${title} ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
