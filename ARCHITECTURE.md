# Global D2C Ecommerce Platform – Architecture Overview

---

## 1. Monorepo Structure

```
/apps
  /client      # Next.js (App Router) – Customer-facing store
  /admin       # Next.js (App Router) – Admin dashboard
  /api         # NestJS – Modular backend API

/packages
  /database    # Drizzle ORM models, migrations, DB utils
  /ui          # Shared React UI components (design system)
  /utils       # Shared TypeScript utilities
  /config      # Shared config (env, constants, types)
```

---

## 2. Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, Next Image, SEO, i18n, multi-currency
- **Admin:** Next.js (App Router), Tailwind CSS, role-based access
- **Backend:** NestJS (modular, REST), Drizzle ORM, PostgreSQL (Supabase), Redis (BullMQ, cache), Meilisearch, Winston, Sentry, PostHog, Google Analytics
- **Storage:** Supabase Storage Bucket (images, media, invoices)
- **Payments:** Razorpay (IN), Stripe/PayPal (global)
- **Deployment:** Vercel (frontend), Render (backend)
- **CDN/Security:** Cloudflare (CDN, DDoS, WAF, caching)
- **CI/CD:** GitHub Actions (lint, test, build, deploy)
- **Email:** Resend/SendGrid

---

## 3. Backend Modular Architecture (NestJS)

- **Modules:** Auth, Users, Products, Categories, Orders, Payments, Inventory, Coupons, Reviews, Cart, Wishlist, Search, Analytics, Notifications, Admin
- **Each Module:** Controller, Service, Repository, DTOs, Validation, API routes
- **Features:** REST API, DI, global exception filters, validation pipes, guards, interceptors, microservice-ready

---

## 4. Key Features

### Client

- Product listing/detail
- Cart & checkout
- Authentication
- User profile & order history
- Wishlist
- Search & reviews
- SEO, multi-currency, multi-language

### Admin

- Product/category CRUD
- Order/user/inventory/coupon management
- Analytics dashboard
- Review moderation

### Payments

- Razorpay (IN), Stripe/PayPal (global)
- Webhooks, refunds

### Storage

- Supabase buckets for images/media/invoices
- Helper service for uploads/URLs

### Background Jobs

- BullMQ (Redis): emails, invoices, analytics, reminders

### Search

- Meilisearch: instant, typo-tolerant, filters

### Analytics

- PostHog, Google Analytics: sessions, funnel, abandonment

### Logging/Monitoring

- Winston, Sentry, Grafana metrics

### Caching

- Redis: catalog, homepage, search, API

### Security

- JWT, rate limiting, CORS, secure headers, validation

### Scalability

- Multi-currency, multi-warehouse, multi-language, global shipping, microservice-ready

---

## 5. Deployment & Security

- **Frontend:** Vercel (global CDN, SSR, SEO)
- **Backend:** Render (auto-scaling, managed Postgres, Redis)
- **CDN/Security:** Cloudflare (WAF, DDoS, caching)
- **CI/CD:** GitHub Actions (lint, test, build, deploy)
- **Monitoring:** Sentry, Grafana, PostHog

---

## 6. Best Practices

- Clean code, modular design, separation of concerns
- DTOs and validation everywhere
- Dependency injection and testability
- API versioning and documentation (OpenAPI/Swagger)
- Environment-based config management
- Secure by default (headers, CORS, rate limiting)
- Scalable, microservice-ready backend

---

> **This architecture is designed for global scale, high performance, and rapid feature development.**

---
