import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services/admin.service";
import type { ProductFormValues } from "../types";


export function useAdminProductMutations() {
  const queryClient = useQueryClient();

  const invalidateProductQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    queryClient.invalidateQueries({ queryKey: ["product"] });
  };

  const createProduct = useMutation({
    mutationFn: (values: ProductFormValues) => adminService.createProduct(values),
    onSuccess: invalidateProductQueries,
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, values }: { id: number; values: ProductFormValues }) =>
      adminService.updateProduct(id, values),
    onSuccess: invalidateProductQueries,
  });

  const deleteProduct = useMutation({
    mutationFn: (id: number) => adminService.deleteProduct(id),
    onSuccess: invalidateProductQueries,
  });

  return { createProduct, updateProduct, deleteProduct };
}