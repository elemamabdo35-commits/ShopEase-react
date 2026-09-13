import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Package, ChevronRight } from "lucide-react";
import { useOrders } from "../hooks/useOrders";
import { Button } from "@shared/components/ui/button";
import { Badge } from "@shared/components/ui/badge";
import EmptyState from "@shared/components/common/EmptyState";
import PageHeader from "@shared/components/common/PageHeader";
import LoadingSpinner from "@shared/components/common/LoadingSpinner";

const statusVariant = {
  processing: "secondary",
  shipped: "default",
  delivered: "default",
} as const;

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrders();

  return (
    <div className="container py-8">
      <Helmet><title>Your Orders — ShopEase</title></Helmet>
      <PageHeader title="My Orders" />

      {isLoading ? (
        <LoadingSpinner label="Loading your orders…" />
      ) : !orders || orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No orders found"
          description="You haven't placed any orders yet."
          action={
            <Button asChild className="mt-2">
              <Link to="/products">Start Shopping</Link>
            </Button>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">{order.id}</span>
                  <Badge variant={statusVariant[order.status]} className="capitalize">
                    {order.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  · {order.items.length} product(s)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">${order.total.toFixed(2)}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
