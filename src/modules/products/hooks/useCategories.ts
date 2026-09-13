import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../services/products.api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => productsApi.getCategories(),
    staleTime: 1000 * 60 * 30, // categories barely change — cache 30 min
  });
}
