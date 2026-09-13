import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import CategorySidebar from "../components/CategorySidebar";
import Pagination from "@shared/components/common/Pagination";
import EmptyState from "@shared/components/common/EmptyState";
import ErrorState from "@shared/components/common/ErrorState";
import PageHeader from "@shared/components/common/PageHeader";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? "1");
  const category = searchParams.get("category");
  const search = searchParams.get("q") ?? undefined;

  const { data, isLoading, isError, refetch, isFetching } = useProducts({
    page,
    category,
    search,
  });

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) next.delete(key);
      else next.set(key, value);
    });
    setSearchParams(next);
  };

  const handleSelectCategory = (cat: string | null) => {
    updateParams({ category: cat, page: null, q: null });
  };

  const handlePageChange = (nextPage: number) => {
    updateParams({ page: String(nextPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>{`${search ? `Search: ${search}` : "Products"} — ShopEase`}</title>
        <meta name="description" content="Browse our full catalog of products." />
      </Helmet>

      <PageHeader
        title={search ? `Results for "${search}"` : category ? category : "All Products"}
        description={data ? `${data.total} products found` : undefined}
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        <CategorySidebar selected={category} onSelect={handleSelectCategory} />

        <div className="flex-1">
          {isError ? (
            <ErrorState onRetry={() => refetch()} />
          ) : !isLoading && data?.products.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try a different category or search term."
            />
          ) : (
            <>
              <ProductGrid products={data?.products ?? []} isLoading={isLoading} />
              {data && (
                <Pagination
                  page={data.page}
                  totalPages={data.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
              {isFetching && !isLoading && (
                <p className="mt-2 text-center text-xs text-muted-foreground">Updating…</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
