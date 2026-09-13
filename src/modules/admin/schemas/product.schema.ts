import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  discountPercentage: z.coerce
    .number()
    .min(0, "Discount can't be negative")
    .max(100, "Discount can't exceed 100%"),
  stock: z.coerce.number().int().min(0, "Stock can't be negative"),
  brand: z.string().min(1, "Brand is required"),
  thumbnail: z.string().url("Enter a valid image URL"),
});

export type ProductFormSchema = z.infer<typeof productSchema>;