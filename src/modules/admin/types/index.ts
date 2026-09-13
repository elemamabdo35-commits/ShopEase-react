import type { Product } from "@modules/products/types";

export interface ProductFormValues {
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  thumbnail: string;
}

export interface AdminOverridesState {
  created: Product[];
  edited: Record<number, Partial<Product>>;
  deletedIds: number[];
}