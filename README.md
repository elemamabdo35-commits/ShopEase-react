# ShopEase — Production-style Ecommerce App

React + TypeScript + Vite ecommerce application built with a module-based
architecture, DummyJSON as the data source, Redux Toolkit for client state,
and TanStack Query for server state.

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui-style components ·
React Router v6 · Redux Toolkit · TanStack Query · Axios · React Hook Form +
Zod · react-hot-toast · react-helmet-async

## Getting Started

This project's dependencies were **not** installed in the sandbox that
generated it (no network access there) — install them on your own machine:

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

Demo login (DummyJSON test user):

- username: `emilys`
- password: `emilyspass`

## Environment Variables

`.env` is already set up:

```
VITE_API_URL=https://dummyjson.com
```

## Folder Structure

```
src/
├── app/            # store, router, providers — app-wide wiring
├── modules/        # one folder per feature: auth, products, cart,
│                   # checkout, orders, users — each owns its own
│                   # components, hooks, services, pages, types
├── shared/         # cross-module UI primitives, hooks, utils, constants
└── services/api/   # single Axios instance + interceptors
```

## What's implemented

- Home page: hero, category grid (image fallback via product thumbnails),
  featured products
- Products page: category sidebar, debounced search, real pagination
  (20/page), loading/error/empty states, shareable URL (`?category=&page=&q=`)
- Product details: gallery, quantity selector, related products
- Auth: login (RHF + Zod), token + user persisted to localStorage, protected
  routes, 401 auto-logout via Axios interceptor
- Cart: add/remove/increase/decrease, persisted to localStorage, badge in
  navbar
- Checkout: shipping form (RHF + Zod), order summary
- Orders: created via a local persistence abstraction (`orders.service.ts`)
  since DummyJSON has no real order-creation endpoint tied to a user —
  swap that one file for real API calls later without touching any UI
- Error boundary, 404 page, responsive navbar with mobile menu

## Known limitation

DummyJSON doesn't provide a full ecommerce backend (no real cart-to-order
flow, no per-user order history). Orders are persisted to localStorage
through a single service file (`src/modules/orders/services/orders.service.ts`)
designed to be swapped for a real backend without touching any component.

## Next steps if you continue building

- Wishlist module (same pattern as cart)
- Product reviews UI (DummyJSON returns `reviews` per product — already typed)
- Unit tests (Vitest + React Testing Library)
- shadcn Dialog/Sheet for a slide-out mini-cart
