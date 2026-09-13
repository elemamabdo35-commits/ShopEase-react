import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { productSchema, type ProductFormSchema } from "../schemas/product.schema";
import { useAdminProductMutations } from "../hooks/useAdminProductMutations";
import { useProduct } from "@modules/products/hooks/useProduct";
import { useCategories } from "@modules/products/hooks/useCategories";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import LoadingSpinner from "@shared/components/common/LoadingSpinner";
import type { ApiError } from "@shared/types/api";

export default function AdminProductFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const { data: existingProduct, isLoading: isLoadingProduct } = useProduct(
    isEditMode ? id : undefined,
  );
  const { data: categories } = useCategories();
  const { createProduct, updateProduct } = useAdminProductMutations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      discountPercentage: 0,
      stock: 0,
      brand: "",
      thumbnail: "",
    },
  });

  // Populate the form once the existing product loads (edit mode only).
  useEffect(() => {
    if (existingProduct) {
      reset({
        title: existingProduct.title,
        description: existingProduct.description,
        category: existingProduct.category,
        price: existingProduct.price,
        discountPercentage: existingProduct.discountPercentage,
        stock: existingProduct.stock,
        brand: existingProduct.brand ?? "",
        thumbnail: existingProduct.thumbnail,
      });
    }
  }, [existingProduct, reset]);

  const isPending = createProduct.isPending || updateProduct.isPending;

  const onSubmit = (values: ProductFormSchema) => {
    if (isEditMode && existingProduct) {
      updateProduct.mutate(
        { id: existingProduct.id, values },
        {
          onSuccess: () => {
            toast.success("Product updated");
            navigate("/admin/products");
          },
          onError: (error) =>
            toast.error((error as ApiError).message ?? "Couldn't update product"),
        },
      );
    } else {
      createProduct.mutate(values, {
        onSuccess: () => {
          toast.success("Product created");
          navigate("/admin/products");
        },
        onError: (error) =>
          toast.error((error as ApiError).message ?? "Couldn't create product"),
      });
    }
  };

  if (isEditMode && isLoadingProduct) {
    return <LoadingSpinner label="Loading product…" />;
  }

  return (
    <div className="container max-w-2xl py-8">
      <Helmet>
        <title>{isEditMode ? "Edit Product" : "Add Product"} — ShopEase Admin</title>
      </Helmet>

      <Link
        to="/admin/products"
        className="bg-primary p-2 rounded-lg mb-4 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        Back to Manage Products
      </Link>

      <h1 className="mb-6 text-2xl font-bold">
        {isEditMode ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            rows={4}
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("description")}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...register("category")}
            >
              <option value="">Select a category…</option>
              {categories?.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" {...register("brand")} />
            {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" type="number" step="0.01" {...register("price")} />
            {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="discountPercentage">Discount (%)</Label>
            <Input
              id="discountPercentage"
              type="number"
              step="0.1"
              {...register("discountPercentage")}
            />
            {errors.discountPercentage && (
              <p className="text-xs text-destructive">{errors.discountPercentage.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" type="number" {...register("stock")} />
            {errors.stock && <p className="text-xs text-destructive">{errors.stock.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="thumbnail">Image URL</Label>
          <Input id="thumbnail" placeholder="https://…" {...register("thumbnail")} />
          {errors.thumbnail && (
            <p className="text-xs text-destructive">{errors.thumbnail.message}</p>
          )}
        </div>

        <Button type="submit" size="lg" className="mt-2" isLoading={isPending}>
          {isEditMode ? "Save Changes" : "Create Product"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}