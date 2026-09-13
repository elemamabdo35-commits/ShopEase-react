export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku: string;
  weight?: number;
  dimensions?: ProductDimensions;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: ProductReview[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  images: string[];
  thumbnail: string;
  tags?: string[];
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  category?: string | null;
  search?: string;
}

export interface ProductListResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
