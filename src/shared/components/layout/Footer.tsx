import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-secondary/30">
      <div className="container grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="text-xl font-bold">
            <span className="text-primary">Shop</span>Ease
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            A modern shopping experience, built for speed and simplicity.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Shop</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-foreground">Orders</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Account</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link to="/login" className="hover:text-foreground">Login</Link></li>
            <li><Link to="/profile" className="hover:text-foreground">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">Company</h3>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li><Link to="https://www.linkedin.com/in/abdalrhman-elemam-91b849387" target="blanck" className="hover:text-foreground">About</Link></li>
            <li><Link to="https://www.linkedin.com/in/abdalrhman-elemam-91b849387" target="blanck" className="hover:text-foreground">Contact</Link></li>
           
            <li>Terms & Privacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}
