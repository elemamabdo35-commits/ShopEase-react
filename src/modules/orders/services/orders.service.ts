import { storage } from "@shared/lib/storage";
import { STORAGE_KEYS } from "@shared/constants/storage-keys";
import type { Order, OrderItem, ShippingInfo } from "../types";


function generateOrderId(): string {
  return `ORD-${Date.now().toString(36).toUpperCase()}`;
}

export const ordersService = {
  getAll(): Order[] {
    return storage
      .get<Order[]>(STORAGE_KEYS.ORDERS, [])
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getById(id: string): Order | undefined {
    return this.getAll().find((order) => order.id === id);
  },

  async  create(params: {
    items: OrderItem[];
    shipping: ShippingInfo;
    subtotal: number;
    shippingCost: number;
  }): Promise<Order> {
    const order: Order = {
      id: generateOrderId(),
      items: params.items,
      shipping: params.shipping,
      subtotal: params.subtotal,
      shippingCost: params.shippingCost,
      total: params.subtotal + params.shippingCost,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    const existing = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
    storage.set(STORAGE_KEYS.ORDERS, [...existing, order]);

    return order;
  },
};
