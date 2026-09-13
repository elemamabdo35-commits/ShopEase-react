import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import { useAppDispatch } from "@app/store/hooks";
import { addToCart } from "@modules/cart/cart.slice";
import type { Product } from "../types";
import Price from "./Price";
import Rating from "./Rating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        title: product.title,
        price: product.price,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
        stock: product.stock,
      }),
    );
    toast.success("Product added to cart");
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-2 top-2" variant="destructive">
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
        {product.stock <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70">
            <span className="text-sm font-semibold text-destructive">Out of stock</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="text-xs capitalize text-muted-foreground">{product.category}</span>
        <h3 className="line-clamp-2 text-sm font-medium">{product.title}</h3>
        <Rating value={product.rating} size={12} />
        <Price price={product.price} discountPercentage={product.discountPercentage} />

        <Button
          size="sm"
          className="mt-2 w-full"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}
