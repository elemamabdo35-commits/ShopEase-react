import { useQuery } from "@tanstack/react-query";
import { ordersService } from "../services/orders.service";

export function useOrder(id: string | undefined) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => ordersService.getById(id as string),
    enabled: Boolean(id),
  });
}
