interface PriceProps {
  price: number;
  discountPercentage?: number;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { main: "text-sm", old: "text-xs" },
  md: { main: "text-lg", old: "text-sm" },
  lg: { main: "text-2xl", old: "text-base" },
};

export default function Price({ price, discountPercentage = 0, size = "md" }: PriceProps) {
  const hasDiscount = discountPercentage > 0;
  const finalPrice = hasDiscount ? price - (price * discountPercentage) / 100 : price;
  const classes = sizeMap[size];

  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-bold ${classes.main}`}>${finalPrice.toFixed(2)}</span>
      {hasDiscount && (
        <>
          <span className={`text-muted-foreground line-through ${classes.old}`}>
            ${price.toFixed(2)}
          </span>
          <span className="rounded bg-destructive/10 px-1.5 py-0.5 text-xs font-semibold text-destructive">
            -{Math.round(discountPercentage)}%
          </span>
        </>
      )}
    </div>
  );
}
