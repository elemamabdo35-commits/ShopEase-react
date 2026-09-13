import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
}

export default function Rating({ value, size = 14, showValue = true }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < Math.round(value)
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-muted-foreground">{value.toFixed(1)}</span>}
    </div>
  );
}
