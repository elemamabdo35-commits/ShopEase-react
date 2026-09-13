import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, Package, ChevronDown, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@app/store/hooks";
import { logout } from "@modules/auth/auth.slice";
import { cn } from "@shared/lib/utils";
import SearchBar from "./SearchBar";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const { user, isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-1.5 text-xl font-bold">
          <span className="text-primary">Shop</span>Ease
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground",
                )
              }
            >
              Orders
            </NavLink>
          )}
          {isAdmin && (
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-foreground",
                )
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        {/* Search - desktop */}
        <div className="ml-auto hidden flex-1 justify-end md:flex">
          <SearchBar />
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-1 md:ml-4">
          <Link
            to="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-md px-2 py-2 hover:bg-muted"
              >
                <img
                  src={user?.image}
                  alt={user?.username}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-popover p-1 shadow-md">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-muted"
                  >
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-muted"
                  >
                    <Package className="h-4 w-4" /> Orders
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin/products"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-muted"
                    >
                      <ShieldCheck className="h-4 w-4" /> Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted md:flex"
            >
              <User className="h-4 w-4" /> Login
            </Link>
          )}

          <button
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background px-4 pb-4 md:hidden">
          <div className="py-3">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  Orders
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/products"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="rounded-md px-3 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}