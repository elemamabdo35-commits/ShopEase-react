import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@app/store/hooks";


export default function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          This area is reserved for store administrators. Your account doesn't have
          permission to view it.
        </p>
      </div>
    );
  }

  return <Outlet />;
}