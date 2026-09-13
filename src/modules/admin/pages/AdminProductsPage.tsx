import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useAdminProducts } from "../hooks/useAdminProducts";
import { useAdminProductMutations } from "../hooks/useAdminProductMutations";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import PageHeader from "@shared/components/common/PageHeader";
import LoadingSpinner from "@shared/components/common/LoadingSpinner";
import ErrorState from "@shared/components/common/ErrorState";
import EmptyState from "@shared/components/common/EmptyState";
import Pagination from "@shared/components/common/Pagination";
import type { ApiError } from "@shared/types/api";

export default function AdminProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const { data, isLoading, isError, refetch } = useAdminProducts(page);
  const { deleteProduct } = useAdminProductMutations();
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number, title: string) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;

    setPendingDeleteId(id);
    deleteProduct.mutate(id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: (error) => toast.error((error as ApiError).message ?? "Couldn't delete product"),
      onSettled: () => setPendingDeleteId(null),
    });
  };

  return (
    <div className="container py-8">
      <Helmet><title>Manage Products — ShopEase Admin</title></Helmet>

      <div className="mb-6 flex items-center justify-between">
        <PageHeader title="Manage Products" description="Add, edit, or remove products from the catalog." />
        <Button asChild>
          <Link to="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Loading products…" />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : !data || data.products.length === 0 ? (
        <EmptyState title="No products found" description="Add your first product to get started." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-10 w-10 rounded-md object-cover"
                        />
                        <span className="line-clamp-1 max-w-[240px] font-medium">
                          {product.title}
                        </span>
                        {product.id < 0 && (
                          <Badge variant="secondary" className="shrink-0">Local</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">
                      {product.category}
                    </td>
                    <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={product.stock > 0 ? "" : "text-destructive"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/products/${product.id}/edit`}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id, product.title)}
                          isLoading={pendingDeleteId === product.id}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={(p) => setSearchParams({ page: String(p) })}
          />
        </>
      )}
    </div>
  );
}