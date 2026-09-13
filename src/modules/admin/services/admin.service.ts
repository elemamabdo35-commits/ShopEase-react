import { apiClient } from "@services/api/axios";
import { storage } from "@shared/lib/storage";
import { STORAGE_KEYS } from "@shared/constants/storage-keys";
import type { Product } from "@modules/products/types";
import type { AdminOverridesState, ProductFormValues } from "../types";

const EMPTY_OVERRIDES: AdminOverridesState = {
  created: [],
  edited: {},
  deletedIds: [],
};

function getOverrides(): AdminOverridesState {
  return storage.get<AdminOverridesState>(STORAGE_KEYS.ADMIN_OVERRIDES, EMPTY_OVERRIDES);
}

function saveOverrides(overrides: AdminOverridesState): void {
  storage.set(STORAGE_KEYS.ADMIN_OVERRIDES, overrides);
}

function buildProductPayload(values: ProductFormValues): Omit<Product, "id"> {
  return {
    title: values.title,
    description: values.description,
    category: values.category,
    price: values.price,
    discountPercentage: values.discountPercentage,
    rating: 0,
    stock: values.stock,
    brand: values.brand,
    sku: `LOCAL-${Date.now()}`,
    images: [values.thumbnail],
    thumbnail: values.thumbnail,
  };
}

export const adminService = {
  applyOverrides(
    products: Product[],
    filters: { category?: string | null; search?: string; page?: number } = {},
  ): Product[] {
    const overrides = getOverrides();

    const withEdits = products
      .filter((p) => !overrides.deletedIds.includes(p.id))
      .map((p) => (overrides.edited[p.id] ? { ...p, ...overrides.edited[p.id] } : p));

    const isFirstPage = !filters.page || filters.page === 1;

    const matchingCreated = isFirstPage
      ? overrides.created.filter((p) => {
          const matchesCategory = filters.category ? p.category === filters.category : true;
          const matchesSearch = filters.search
            ? p.title.toLowerCase().includes(filters.search.toLowerCase())
            : true;
          return matchesCategory && matchesSearch;
        })
      : [];

    return [...matchingCreated, ...withEdits];
  },

  getOverrides,

  async createProduct(values: ProductFormValues): Promise<Product> {
    const payload = buildProductPayload(values);
    const { data } = await apiClient.post<Product>("/products/add", payload);

    const localProduct: Product = { ...data, id: -Date.now() };

    const overrides = getOverrides();
    overrides.created = [localProduct, ...overrides.created];
    saveOverrides(overrides);

    return localProduct;
  },

  async updateProduct(id: number, values: ProductFormValues): Promise<Product> {
    const payload = buildProductPayload(values);

    if (id < 0) {
      const overrides = getOverrides();
      overrides.created = overrides.created.map((p) =>
        p.id === id ? { ...p, ...payload, id } : p,
      );
      saveOverrides(overrides);
      return overrides.created.find((p) => p.id === id) as Product;
    }

    const { data } = await apiClient.put<Product>(`/products/${id}`, payload);

    const overrides = getOverrides();
    overrides.edited[id] = { ...overrides.edited[id], ...payload };
    saveOverrides(overrides);

    return { ...data, ...payload, id };
  },

  async deleteProduct(id: number): Promise<void> {
    if (id < 0) {
      const overrides = getOverrides();
      overrides.created = overrides.created.filter((p) => p.id !== id);
      saveOverrides(overrides);
      return;
    }

    await apiClient.delete(`/products/${id}`);

    const overrides = getOverrides();
    if (!overrides.deletedIds.includes(id)) {
      overrides.deletedIds.push(id);
    }
    delete overrides.edited[id];
    saveOverrides(overrides);
  },
};
