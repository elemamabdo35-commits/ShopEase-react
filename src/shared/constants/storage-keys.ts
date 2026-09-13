/**
 * Central registry of every LocalStorage key used across the app.
 * Never hardcode a raw string key anywhere else — import from here.
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: "ecommerce_auth_token",
  AUTH_USER: "ecommerce_auth_user",
  CART: "ecommerce_cart",
  WISHLIST: "ecommerce_wishlist",
  ORDERS: "ecommerce_orders",
  ADMIN_OVERRIDES: "ecommerce_admin_product_overrides",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
