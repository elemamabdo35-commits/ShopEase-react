import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../services/products.api";

export function useRelatedProducts(category: string | undefined, excludeId: number | undefined) {
  return useQuery({
    queryKey: ["related-products", category, excludeId],
    queryFn: () => productsApi.getRelatedProducts(category as string, excludeId as number),
    enabled: Boolean(category) && excludeId !== undefined,
  });
}
