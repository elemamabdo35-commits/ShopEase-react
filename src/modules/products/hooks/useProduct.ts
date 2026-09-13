import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../services/products.api";
import { adminService } from "@modules/admin/services/admin.service";

export function useProduct(id: number | string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const numericId = Number(id);


      if (!Number.isNaN(numericId) && numericId < 0) {
        const overrides = adminService.getOverrides();
        const local = overrides.created.find((p) => p.id === numericId);
        if (!local) throw { message: "Product not found", status: 404 };
        return local;
      }

      const product = await productsApi.getProductById(id as number | string);
      const overrides = adminService.getOverrides();
      if (overrides.deletedIds.includes(product.id)) {
        throw { message: "Product not found", status: 404 };
      }
      const edits = overrides.edited[product.id];
      return edits ? { ...product, ...edits } : product;
    },
    enabled: id !== undefined,
  });
}

