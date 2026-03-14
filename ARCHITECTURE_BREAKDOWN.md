# Detailed Architecture Breakdown

---

## 1. Client (Next.js Storefront)

### Overview

A modern, SEO-optimized, global ecommerce storefront built with Next.js (App Router) and Tailwind CSS. Supports SSR, SSG, and dynamic rendering for performance and SEO.

### Key Features

- Product listing & detail pages
- Cart, checkout, and payment flows
- Authentication (JWT, OAuth, social login)
- User profile, order history, wishlist
- Product reviews, ratings, Q&A
- Search (Meilisearch integration)
- Multi-currency, multi-language, global shipping
- SEO: SSR, sitemap, schema, canonical URLs
- Responsive, accessible UI (shared /packages/ui)
- Image optimization (Next.js Image, Supabase Storage)
- Analytics (PostHog, Google Analytics)

### Folder Structure

```
/apps/client
  /app           # Next.js App Router pages
  /components    # UI components (import from /packages/ui)
  /hooks         # Custom React hooks
  /lib           # API clients, helpers
  /styles        # Tailwind CSS
  /public        # Static assets
  /middleware    # Auth, i18n, etc.
  /config        # App config
```

---

## 2. Admin Dashboard (Next.js)

### Overview

A secure, role-based admin panel for managing products, categories, orders, users, inventory, coupons, reviews, and analytics.

### Key Features

- Product/category CRUD
- Order, user, inventory, coupon management
- Review moderation
- Analytics dashboard (charts, KPIs)
- Role-based access control (RBAC)
- Secure authentication (JWT, 2FA)
- Responsive, accessible UI (shared /packages/ui)
- Bulk import/export (CSV, Excel)
- Media management (Supabase Storage)

### Folder Structure

```
/apps/admin
  /app           # Next.js App Router pages
  /components    # Admin UI components
  /hooks         # Custom hooks
  /lib           # API clients, helpers
  /styles        # Tailwind CSS
  /middleware    # Auth, RBAC
  /config        # Admin config
```

---

## 3. Backend API (NestJS)

### Overview

A modular, scalable REST API built with NestJS, using Drizzle ORM and PostgreSQL (Supabase). Designed for microservice-readiness, security, and global scale.

### Key Features

- Modular architecture: each domain is a module
- RESTful API design, OpenAPI docs
- Drizzle ORM for type-safe DB access
- Supabase Storage integration
- Redis (BullMQ) for jobs, caching
- Meilisearch for search
- Payment integrations: Razorpay, Stripe, PayPal
- Email: Resend/SendGrid
- Global exception filters, validation pipes, guards, interceptors
- JWT authentication, rate limiting, CORS, secure headers
- Logging (Winston), monitoring (Sentry, Grafana)
- Analytics events (PostHog, Google Analytics)

### Example Module Structure

```
/apps/api/src/modules/products
  /controller.ts
  /service.ts
  /repository.ts
  /dto/
  /entities/
  /validators/
  /routes.ts
```

### Main Modules

- Auth
- Users
- Products
- Categories
- Orders
- Payments
- Inventory
- Coupons
- Reviews
- Cart
- Wishlist
- Search
- Analytics
- Notifications
- Admin

---

> For full details, see the main ARCHITECTURE.md. This breakdown provides a clear, scalable structure for each major app in the monorepo.
