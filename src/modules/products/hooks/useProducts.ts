import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../services/products.api";
import { adminService } from "@modules/admin/services/admin.service";
import type { ProductsQueryParams } from "../types";

export function useProducts(params: ProductsQueryParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const result = await productsApi.getProducts(params);
      return {
        ...result,
        products: adminService.applyOverrides(result.products, {
          category: params.category,
          search: params.search,
          page: params.page,
        }),
      };
    },
    placeholderData: (previousData) => previousData, // keep old page visible while fetching next
  });
}
