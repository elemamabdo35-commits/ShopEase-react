export interface OrderItem {
  productId: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export type OrderStatus = "processing" | "shipped" | "delivered";

export interface Order {
  id: string;
  items: OrderItem[];
  shipping: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
