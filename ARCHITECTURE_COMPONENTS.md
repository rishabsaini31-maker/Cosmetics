# Component-Level & Directory Architecture

---

## 1. Client (Next.js Storefront)

### Directory Structure (with src)

```
/apps/client
  /public
  /src
    /app            # Next.js App Router (routes, layouts)
    /components     # Atomic UI components (Button, Card, etc.)
    /features       # Feature folders (cart, product, auth, etc.)
      /cart
        CartProvider.tsx
        CartIcon.tsx
        CartDrawer.tsx
        useCart.ts
      /product
        ProductList.tsx
        ProductCard.tsx
        ProductDetail.tsx
        ProductReview.tsx
      /auth
        AuthProvider.tsx
        LoginForm.tsx
        RegisterForm.tsx
        useAuth.ts
      ...
    /hooks          # Shared React hooks
    /lib            # API clients, utils, helpers
    /state          # Zustand/Jotai stores or context
    /styles         # Tailwind CSS, global styles
    /middleware     # Auth, i18n, etc.
    /config         # App config, env
    /types          # TypeScript types/interfaces
```

### Component/State Example

- **CartProvider.tsx**: React context for cart state, uses Zustand/Jotai/Context API
- **ProductList.tsx**: Fetches products from API, paginated, SSR/ISR ready
- **AuthProvider.tsx**: Handles user session, JWT, SSR hydration
- **useCart.ts**: Custom hook for cart logic

---

## 2. Admin Dashboard (Next.js)

### Directory Structure (with src)

```
/apps/admin
  /public
  /src
    /app            # Next.js App Router (routes, layouts)
    /components     # Admin UI components (Table, Modal, etc.)
    /features       # Feature folders (products, orders, users, etc.)
      /products
        ProductTable.tsx
        ProductForm.tsx
        ProductEditModal.tsx
      /orders
        OrderTable.tsx
        OrderDetail.tsx
      /users
        UserTable.tsx
        UserEditModal.tsx
      ...
    /hooks          # Shared hooks
    /lib            # API clients, helpers
    /state          # Zustand/Jotai/context for admin state
    /styles         # Tailwind CSS, admin styles
    /middleware     # Auth, RBAC
    /config         # Admin config
    /types          # TypeScript types/interfaces
```

### Component/State Example

- **ProductTable.tsx**: Paginated, filterable product list
- **ProductForm.tsx**: Form with validation for CRUD
- **OrderTable.tsx**: Order management, status updates
- **useAdminAuth.ts**: Custom hook for admin auth/session

---

## 3. Backend API (NestJS)

### Directory Structure

```
/apps/api
  /src
    /main.ts           # App entrypoint
    /app.module.ts     # Root module
    /config            # Env, config, constants
    /common            # Filters, pipes, guards, interceptors
    /modules
      /auth
        auth.controller.ts
        auth.service.ts
        auth.repository.ts
        dto/
        entities/
        validators/
      /products
        products.controller.ts
        products.service.ts
        products.repository.ts
        dto/
        entities/
        validators/
      ...
    /jobs              # BullMQ job processors
    /storage           # Supabase storage helpers
    /search            # Meilisearch integration
    /payments          # Razorpay/Stripe/PayPal integration
    /analytics         # PostHog, GA events
    /logger            # Winston logger setup
    /migrations        # Drizzle migrations
    /types             # Shared types/interfaces
```

### Module Example

- **products.controller.ts**: REST endpoints for products
- **products.service.ts**: Business logic
- **products.repository.ts**: DB access via Drizzle ORM
- **dto/**: Data transfer objects, validation
- **entities/**: DB entities/models
- **validators/**: Custom validation logic

---

> This structure enables scalable, maintainable, and testable code for each part of the stack, following modern best practices for Next.js and NestJS monorepos.
