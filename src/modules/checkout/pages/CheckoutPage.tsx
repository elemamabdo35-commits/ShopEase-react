import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { checkoutSchema, type CheckoutFormValues } from "../schemas/checkout.schema";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { clearCart } from "@modules/cart/cart.slice";
import { useCreateOrder } from "@modules/orders/hooks/useCreateOrder";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import PageHeader from "@shared/components/common/PageHeader";

function getItemFinalPrice(price: number, discountPercentage: number) {
  return discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.auth.user);
  const { mutate: createOrder, isPending } = useCreateOrder();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    },
  });

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const subtotal = items.reduce(
    (sum, item) => sum + getItemFinalPrice(item.price, item.discountPercentage) * item.quantity,
    0,
  );
  const shippingCost = subtotal > 0 && subtotal < 50 ? 4.99 : 0;
  const total = subtotal + shippingCost;

  const onSubmit = (values: CheckoutFormValues) => {
    createOrder(
      {
        items: items.map((item) => ({
          productId: item.productId,
          title: item.title,
          thumbnail: item.thumbnail,
          price: getItemFinalPrice(item.price, item.discountPercentage),
          quantity: item.quantity,
        })),
        shipping: values,
        subtotal,
        shippingCost,
      },
      {
        onSuccess: (order) => {
          dispatch(clearCart());
          toast.success("Order placed successfully!");
          navigate(`/orders/${order.id}`);
        },
        onError: () => {
          toast.error("Couldn't place your order. Please try again.");
        },
      },
    );
  };

  const fields: { name: keyof CheckoutFormValues; label: string; type?: string }[] = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "address", label: "Address" },
    { name: "city", label: "City" },
    { name: "postalCode", label: "Postal Code" },
  ];

  return (
    <div className="container py-8">
      <Helmet><title>Checkout — ShopEase</title></Helmet>
      <PageHeader title="Checkout" description="Enter your shipping details to complete your order." />

      <div className="grid gap-8 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 rounded-lg border p-5 lg:col-span-2"
          noValidate
        >
          <h2 className="text-lg font-semibold">Shipping Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={`flex flex-col gap-1.5 ${
                  field.name === "address" ? "sm:col-span-2" : ""
                }`}
              >
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input id={field.name} type={field.type ?? "text"} {...register(field.name)} />
                {errors[field.name] && (
                  <p className="text-xs text-destructive">{errors[field.name]?.message}</p>
                )}
              </div>
            ))}
          </div>

          <Button type="submit" size="lg" className="mt-2" isLoading={isPending}>
            Place Order
          </Button>
        </form>

        <div className="h-fit rounded-lg border p-5">
          <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center gap-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="line-clamp-1 text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-medium">
                  ${(getItemFinalPrice(item.price, item.discountPercentage) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="my-4 border-t" />
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
