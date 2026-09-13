import { apiClient } from "@services/api/axios";
import type { Product, ProductCategory, ProductListResult, ProductsQueryParams } from "../types";

const DEFAULT_LIMIT = 20;

interface DummyProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

function toListResult(data: DummyProductsResponse, page: number, limit: number): ProductListResult {
  return {
    products: data.products,
    total: data.total,
    page,
    totalPages: Math.max(1, Math.ceil(data.total / limit)),
  };
}

export const productsApi = {
  /**
   * Fetches a page of products, optionally scoped to a category and/or a
   * search term. DummyJSON exposes separate endpoints for plain listing,
   * category filtering, and search, so we route to the right one here —
   * callers don't need to know about that split.
   */
  async getProducts(params: ProductsQueryParams = {}): Promise<ProductListResult> {
    const { page = 1, limit = DEFAULT_LIMIT, category, search } = params;
    const skip = (page - 1) * limit;

    let url = "/products";
    if (search) {
      url = "/products/search";
    } else if (category) {
      url = `/products/category/${encodeURIComponent(category)}`;
    }

    const { data } = await apiClient.get<DummyProductsResponse>(url, {
      params: {
        limit,
        skip,
        ...(search ? { q: search } : {}),
      },
    });

    return toListResult(data, page, limit);
  },

  async getProductById(id: number | string): Promise<Product> {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  },

  async getCategories(): Promise<ProductCategory[]> {
    const { data } = await apiClient.get<ProductCategory[]>("/products/categories");
    return data;
  },

  async getRelatedProducts(category: string, excludeId: number): Promise<Product[]> {
    const { data } = await apiClient.get<DummyProductsResponse>(
      `/products/category/${encodeURIComponent(category)}`,
      { params: { limit: 8 } },
    );
    return data.products.filter((p) => p.id !== excludeId).slice(0, 4);
  },
};
