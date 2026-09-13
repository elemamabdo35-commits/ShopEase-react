// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
// import { useCategories } from "@modules/products/hooks/useCategories";
// import { useProducts } from "@modules/products/hooks/useProducts";
// import { Button } from "@shared/components/ui/button";
// import { Skeleton } from "@shared/components/ui/skeleton";
// import ProductGrid from "@modules/products/components/ProductGrid";

// // DummyJSON doesn't provide a dedicated category image, so we derive one
// // from a representative product's thumbnail instead of using unrelated stock art.
// function useCategoryImages(slugs: string[] | undefined) {
//   return slugs?.map((slug) => ({
//     slug,
//     image: `https://cdn.dummyjson.com/products/images/${slug}/1/thumbnail.png`,
//   }));
// }

// export default function HomePage() {
//   const { data: categories, isLoading: categoriesLoading } = useCategories();
//   const { data: featured, isLoading: featuredLoading } = useProducts({ page: 1, limit: 8 });
//   const categoryImages = useCategoryImages(categories?.map((c) => c.slug));

//   return (
//     <div>
//       <Helmet>
//         <title>ShopEase — Shop smarter, live better</title>
//         <meta
//           name="description"
//           content="Discover great deals across electronics, fashion, beauty and more at ShopEase."
//         />
//       </Helmet>

//       {/* Hero */}
//       <section className="bg-gradient-to-br from-primary/15 via-background to-secondary/30">
//         <div className="container flex flex-col items-center gap-6 py-16 text-center md:py-24">
//           <span className="rounded-full bg-primary/15 px-4 py-1 text-xs font-semibold text-primary">
//             New season, new deals
//           </span>
//           <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">
//             Shop smarter, <span className="text-primary">live better</span>
//           </h1>
//           <p className="max-w-xl text-muted-foreground">
//             Thousands of products across electronics, fashion, beauty and home — with fast
//             shipping and easy returns.
//           </p>
//           <Button size="lg" asChild>
//             <Link to="/products">
//               Start Shopping <ArrowRight className="h-4 w-4" />
//             </Link>
//           </Button>
//         </div>
//       </section>

//       {/* Trust badges */}
//       <section className="border-y bg-muted/30">
//         <div className="container grid grid-cols-1 gap-6 py-6 sm:grid-cols-3">
//           <div className="flex items-center gap-3">
//             <Truck className="h-6 w-6 text-primary" />
//             <div>
//               <p className="text-sm font-medium">Fast Delivery</p>
//               <p className="text-xs text-muted-foreground">3-5 business days</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <ShieldCheck className="h-6 w-6 text-primary" />
//             <div>
//               <p className="text-sm font-medium">Secure Checkout</p>
//               <p className="text-xs text-muted-foreground">Your data is protected</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <RotateCcw className="h-6 w-6 text-primary" />
//             <div>
//               <p className="text-sm font-medium">Easy Returns</p>
//               <p className="text-xs text-muted-foreground">Hassle-free policy</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="container py-14">
//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-2xl font-bold">Shop by Category</h2>
//           <Link to="/products" className="text-sm font-medium text-primary hover:underline">
//             View all
//           </Link>
//         </div>

//         {categoriesLoading ? (
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//             {Array.from({ length: 12 }).map((_, i) => (
//               <Skeleton key={i} className="aspect-square w-full" />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
//             {categoryImages?.slice(0, 12).map((cat) => (
//               <Link
//                 key={cat.slug}
//                 to={`/products?category=${encodeURIComponent(cat.slug)}`}
//                 className="group relative aspect-square overflow-hidden rounded-lg border bg-secondary/40"
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.slug}
//                   loading="lazy"
//                   className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).style.display = "none";
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
//                 <span className="absolute bottom-2 left-2 right-2 truncate text-sm font-semibold capitalize text-white">
//                   {cat.slug.replace(/-/g, " ")}
//                 </span>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Featured products */}
//       <section className="container pb-16">
//         <div className="mb-6 flex items-center justify-between">
//           <h2 className="text-2xl font-bold">Featured Products</h2>
//           <Link to="/products" className="text-sm font-medium text-primary hover:underline">
//             View all
//           </Link>
//         </div>
//         <ProductGrid products={featured?.products ?? []} isLoading={featuredLoading} />
//       </section>
//     </div>
//   );
// }




import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useCategories } from "@modules/products/hooks/useCategories";
import { useProducts } from "@modules/products/hooks/useProducts";
import { Button } from "@shared/components/ui/button";
import { Skeleton } from "@shared/components/ui/skeleton";
import ProductGrid from "@modules/products/components/ProductGrid";
import { CATEGORY_IMAGES, FALLBACK_CATEGORY_IMAGE } from "@shared/constants/category-images";

export default function HomePage() {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: featured, isLoading: featuredLoading } = useProducts({ page: 1, limit: 8 });

  return (
    <div>
      <Helmet>
        <title>ShopEase — Shop smarter, live better</title>
        <meta
          name="description"
          content="Discover great deals across electronics, fashion, beauty and more at ShopEase."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/15 via-background to-secondary/30">
        <div className="container flex flex-col items-center gap-6 py-16 text-center md:py-24">
          <span className="rounded-full bg-primary/15 px-4 py-1 text-xs font-semibold text-primary">
            New season, new deals
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">
            Shop smarter, <span className="text-primary">live better</span>
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Thousands of products across electronics, fashion, beauty and home — with fast
            shipping and easy returns.
          </p>
          <Button size="lg" asChild>
            <Link to="/products">
              Start Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y bg-muted/30">
        <div className="container grid grid-cols-1 gap-6 py-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Truck className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Fast Delivery</p>
              <p className="text-xs text-muted-foreground">3-5 business days</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Secure Checkout</p>
              <p className="text-xs text-muted-foreground">Your data is protected</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">Hassle-free policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories?.slice(0, 12).map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="group relative aspect-square overflow-hidden rounded-lg border bg-secondary/40"
              >
                <img
                  src={CATEGORY_IMAGES[cat.slug] ?? FALLBACK_CATEGORY_IMAGE}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 truncate text-sm font-semibold capitalize text-white">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured products */}
      <section className="container pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <ProductGrid products={featured?.products ?? []} isLoading={featuredLoading} />
      </section>
    </div>
  );
}