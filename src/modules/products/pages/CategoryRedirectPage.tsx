import { Navigate, useParams, useSearchParams } from "react-router-dom";

/**
 * /category/:category is kept as a friendly, shareable URL but canonically
 * redirects into /products?category=... so all filtering/pagination logic
 * lives in one place (ProductsPage).
 */
export default function CategoryRedirectPage() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const target = `/products?category=${encodeURIComponent(category ?? "")}${page ? `&page=${page}` : ""}`;
  return <Navigate to={target} replace />;
}
