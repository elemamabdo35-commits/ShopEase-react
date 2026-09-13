import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@shared/components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import LoadingSpinner from "@shared/components/common/LoadingSpinner";
import NotFoundPage from "@shared/components/common/NotFoundPage";

// Route-level code splitting: each page loads on demand.
const HomePage = lazy(() => import("@modules/products/pages/HomePage"));
const ProductsPage = lazy(() => import("@modules/products/pages/ProductsPage"));
const CategoryRedirectPage = lazy(() => import("@modules/products/pages/CategoryRedirectPage"));
const ProductDetailsPage = lazy(() => import("@modules/products/pages/ProductDetailsPage"));
const LoginPage = lazy(() => import("@modules/auth/pages/LoginPage"));
const CartPage = lazy(() => import("@modules/cart/pages/CartPage"));
const CheckoutPage = lazy(() => import("@modules/checkout/pages/CheckoutPage"));
const OrdersPage = lazy(() => import("@modules/orders/pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("@modules/orders/pages/OrderDetailsPage"));
const ProfilePage = lazy(() => import("@modules/users/pages/ProfilePage"));
const AdminProductsPage = lazy(() => import("@modules/admin/pages/AdminProductsPage"));
const AdminProductFormPage = lazy(() => import("@modules/admin/pages/AdminProductFormPage"));

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner className="min-h-[60vh]" label="Loading…" />}>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/category/:category" element={<CategoryRedirectPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Protected routes (any logged-in user) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* Admin-only routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/new" element={<AdminProductFormPage />} />
            <Route path="/admin/products/:id/edit" element={<AdminProductFormPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}