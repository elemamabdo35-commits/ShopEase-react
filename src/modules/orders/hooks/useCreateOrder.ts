// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { ordersService } from "../services/orders.service";

// export function useCreateOrder() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ordersService.create.bind(ordersService),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//     },
//   });
// }
// import { useMutation } from "@tanstack/react-query";
// import { ordersService } from "../services/orders.service";
// import type { Order, OrderItem, ShippingInfo } from "../types";


// type CreateOrderParams = {
//   items: OrderItem[];
//   shipping: ShippingInfo;
//   subtotal: number;
//   shippingCost: number;
// };

// export const useCreateOrder = () => {
//   return useMutation<Order, Error, CreateOrderParams>({
//     mutationFn: (params) => ordersService.create(params),
//   });
// };


import { useMutation } from "@tanstack/react-query";
import { ordersService } from "../services/orders.service";
import type { Order, OrderItem, ShippingInfo } from "../types";

type CreateOrderParams = {
  items: OrderItem[];
  shipping: ShippingInfo;
  subtotal: number;
  shippingCost: number;
};

export const useCreateOrder = () => {
  return useMutation<Order, Error, CreateOrderParams>({
    mutationFn: (params) => ordersService.create(params),
  });
};