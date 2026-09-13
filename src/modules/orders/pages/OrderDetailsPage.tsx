import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useOrder } from "../hooks/useOrder";
import { Badge } from "@shared/components/ui/badge";
import { Button } from "@shared/components/ui/button";
import EmptyState from "@shared/components/common/EmptyState";
import LoadingSpinner from "@shared/components/common/LoadingSpinner";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading } = useOrder(id);

  if (isLoading) return <LoadingSpinner label="Loading order…" />;

  if (!order) {
    return (
      <div className="container py-8">
        <EmptyState title="Order not found" description="We couldn't find this order." />
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8">
     <Helmet><title>{`Order ${order.id} — ShopEase`}</title></Helmet>

      <Link to="/orders" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="mb-6 flex flex-col items-center gap-2 rounded-lg border bg-primary/5 p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <h1 className="text-xl font-semibold">Order Confirmed</h1>
        <p className="text-sm text-muted-foreground">Thank you — your order has been placed.</p>
      </div>

      <div className="rounded-lg border p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-sm font-medium">{order.id}</span>
          <Badge className="capitalize">{order.status}</Badge>
        </div>

        <div className="flex flex-col gap-3 border-b pb-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center gap-3">
              <img src={item.thumbnail} alt={item.title} className="h-14 w-14 rounded-md object-cover" />
              <div className="flex-1">
                <p className="line-clamp-1 text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 py-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{order.shippingCost === 0 ? "Free" : `$${order.shippingCost.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t pt-4 text-sm">
          <h3 className="mb-2 font-medium">Shipping to</h3>
          <p className="text-muted-foreground">
            {order.shipping.firstName} {order.shipping.lastName}
            <br />
            {order.shipping.address}, {order.shipping.city}, {order.shipping.postalCode}
            <br />
            {order.shipping.email} · {order.shipping.phone}
          </p>
        </div>
      </div>

      <Button asChild variant="outline" className="mt-6 w-full">
        <Link to="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
