// import { Link, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import toast from "react-hot-toast";
// import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@app/store/hooks";
// import {
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../cart.slice";
// import { Button } from "@shared/components/ui/button";
// import EmptyState from "@shared/components/common/EmptyState";
// import PageHeader from "@shared/components/common/PageHeader";

// function getItemFinalPrice(price: number, discountPercentage: number) {
//   return discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;
// }

// export default function CartPage() {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const items = useAppSelector((state) => state.cart.items);

//   const subtotal = items.reduce(
//     (sum, item) => sum + getItemFinalPrice(item.price, item.discountPercentage) * item.quantity,
//     0,
//   );
//   const shipping = subtotal > 0 && subtotal < 50 ? 4.99 : 0;
//   const total = subtotal + shipping;

//   const handleRemove = (productId: number, title: string) => {
//     dispatch(removeFromCart(productId));
//     toast.success(`${title} removed from cart`);
//   };

//   if (items.length === 0) {
//     return (
//       <div className="container py-16">
//         <Helmet><title>{`Your Cart (${items.length}) — ShopEase`}</title></Helmet>
//         <EmptyState
//           icon={ShoppingBag}
//           title="Your cart is empty"
//           description="Looks like you haven't added anything yet. Start exploring our products."
//           action={
//             <Button asChild className="mt-2">
//               <Link to="/products">Browse Products</Link>
//             </Button>
//           }
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="container py-8">
//       <Helmet><title>Your Cart ({items.length}) — ShopEase</title></Helmet>
//       <PageHeader title="Shopping Cart" description={`${items.length} item(s) in your cart`} />

//       <div className="grid gap-8 lg:grid-cols-3">
//         <div className="flex flex-col gap-4 lg:col-span-2">
//           {items.map((item) => (
//             <div
//               key={item.productId}
//               className="flex gap-4 rounded-lg border p-4"
//             >
//               <Link
//                 to={`/products/${item.productId}`}
//                 className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary/40"
//               >
//                 <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
//               </Link>

//               <div className="flex flex-1 flex-col justify-between">
//                 <div className="flex justify-between gap-2">
//                   <Link
//                     to={`/products/${item.productId}`}
//                     className="line-clamp-2 text-sm font-medium hover:text-primary"
//                   >
//                     {item.title}
//                   </Link>
//                   <button
//                     onClick={() => handleRemove(item.productId, item.title)}
//                     className="shrink-0 text-muted-foreground hover:text-destructive"
//                     aria-label="Remove item"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center rounded-md border">
//                     <button
//                       className="flex h-8 w-8 items-center justify-center disabled:opacity-40"
//                       onClick={() => dispatch(decreaseQuantity(item.productId))}
//                       disabled={item.quantity <= 1}
//                       aria-label="Decrease quantity"
//                     >
//                       <Minus className="h-3.5 w-3.5" />
//                     </button>
//                     <span className="w-8 text-center text-sm">{item.quantity}</span>
//                     <button
//                       className="flex h-8 w-8 items-center justify-center disabled:opacity-40"
//                       onClick={() => dispatch(increaseQuantity(item.productId))}
//                       disabled={item.quantity >= item.stock}
//                       aria-label="Increase quantity"
//                     >
//                       <Plus className="h-3.5 w-3.5" />
//                     </button>
//                   </div>

//                   <span className="font-semibold">
//                     ${(getItemFinalPrice(item.price, item.discountPercentage) * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order summary */}
//         <div className="h-fit rounded-lg border p-5">
//           <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
//           <div className="flex flex-col gap-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Subtotal</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-muted-foreground">Shipping</span>
//               <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
//             </div>
//             <div className="my-2 border-t" />
//             <div className="flex justify-between text-base font-semibold">
//               <span>Total</span>
//               <span>${total.toFixed(2)}</span>
//             </div>
//           </div>

//           <Button className="mt-5 w-full" size="lg" onClick={() => navigate("/checkout")}>
//             Checkout <ArrowRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../cart.slice";
import { Button } from "@shared/components/ui/button";
import EmptyState from "@shared/components/common/EmptyState";
import PageHeader from "@shared/components/common/PageHeader";

function getItemFinalPrice(price: number, discountPercentage: number) {
  return discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + getItemFinalPrice(item.price, item.discountPercentage) * item.quantity,
    0,
  );
  const shipping = subtotal > 0 && subtotal < 50 ? 4.99 : 0;
  const total = subtotal + shipping;

  const handleRemove = (productId: number, title: string) => {
    dispatch(removeFromCart(productId));
    toast.success(`${title} removed from cart`);
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <Helmet><title>Your Cart — ShopEase</title></Helmet>
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start exploring our products."
          action={
            <Button asChild className="mt-2">
              <Link to="/products">Browse Products</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Helmet><title>{`Your Cart (${items.length}) — ShopEase`}</title></Helmet>
      <PageHeader title="Shopping Cart" description={`${items.length} item(s) in your cart`} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 rounded-lg border p-4"
            >
              <Link
                to={`/products/${item.productId}`}
                className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary/40"
              >
                <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-2">
                  <Link
                    to={`/products/${item.productId}`}
                    className="line-clamp-2 text-sm font-medium hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  <button
                    onClick={() => handleRemove(item.productId, item.title)}
                    className="shrink-0 text-muted-foreground hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-md border">
                    <button
                      className="flex h-8 w-8 items-center justify-center disabled:opacity-40"
                      onClick={() => dispatch(decreaseQuantity(item.productId))}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      className="flex h-8 w-8 items-center justify-center disabled:opacity-40"
                      onClick={() => dispatch(increaseQuantity(item.productId))}
                      disabled={item.quantity >= item.stock}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <span className="font-semibold">
                    ${(getItemFinalPrice(item.price, item.discountPercentage) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-lg border p-5">
          <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="my-2 border-t" />
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button className="mt-5 w-full" size="lg" onClick={() => navigate("/checkout")}>
            Checkout <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}