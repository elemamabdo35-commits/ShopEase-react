import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import { useRelatedProducts } from "../hooks/useRelatedProducts";
import { useAppDispatch } from "@app/store/hooks";
import { addToCart } from "@modules/cart/cart.slice";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import { Skeleton } from "@shared/components/ui/skeleton";
import ErrorState from "@shared/components/common/ErrorState";
import Price from "../components/Price";
import Rating from "../components/Rating";
import ProductGrid from "../components/ProductGrid";
import ProductImageGallery from "../components/ProductImageGallery";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, refetch } = useProduct(id);
  const { data: related } = useRelatedProducts(product?.category, product?.id);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="container grid gap-8 py-8 md:grid-cols-2">
        <Skeleton className="aspect-square w-full" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container py-8">
        <ErrorState onRetry={() => refetch()} description="We couldn't load this product." />
      </div>
    );
  }

  const handleAddToCart = () => {
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
        quantity,
      }),
    );
    toast.success("Product added to cart");
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>{`${product.title} — ShopEase`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductImageGallery images={product.images} title={product.title} />

        <div className="flex flex-col gap-4">
          <div>
            <Badge variant="secondary" className="mb-2 capitalize">
              {product.category}
            </Badge>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            {product.brand && (
              <p className="mt-1 text-sm text-muted-foreground">Brand: {product.brand}</p>
            )}
          </div>

          <Rating value={product.rating} size={16} />
          <Price price={product.price} discountPercentage={product.discountPercentage} size="lg" />

          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="flex items-center gap-2 text-sm">
            <span
              className={product.stock > 0 ? "text-green-600" : "text-destructive"}
            >
              {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center rounded-md border">
              <button
                className="flex h-9 w-9 items-center justify-center disabled:opacity-40"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                className="flex h-9 w-9 items-center justify-center disabled:opacity-40"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Button size="lg" onClick={handleAddToCart} disabled={product.stock <= 0}>
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>

          <div className="mt-2 flex flex-col gap-2 rounded-lg border p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              {product.shippingInformation ?? "Ships in 3-5 business days"}
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              {product.warrantyInformation ?? "1 year warranty"}
            </div>
          </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="mt-14">
          <h2 className="mb-4 text-xl font-semibold">Related Products</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
