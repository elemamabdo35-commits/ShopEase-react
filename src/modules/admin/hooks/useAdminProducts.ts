import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@modules/products/services/products.api";
import { adminService } from "../services/admin.service";


export function useAdminProducts(page: number) {
  return useQuery({
    queryKey: ["admin-products", page],
    queryFn: async () => {
      const result = await productsApi.getProducts({ page, limit: 20 });
      return {
        ...result,
          products: adminService.applyOverrides(result.products, { page }),
      };
    },
  });
}