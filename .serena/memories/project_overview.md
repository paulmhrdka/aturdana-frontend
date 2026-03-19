# AturDana Frontend - Project Overview

## Purpose
Personal finance tracker web application. "AturDana" means "manage money" in Indonesian.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Recharts
- **State Management**: Zustand v5 (with persist middleware)
- **Server State**: TanStack React Query v5
- **HTTP Client**: Axios
- **Forms**: React Hook Form + Zod v4
- **Notifications**: Sonner (toasts)
- **Icons**: Lucide React

## Project Structure
```
src/
  app/
    (protected)/             # Protected pages (dashboard, etc.)
    (auth)/                  # Auth pages (login, register)
    api/                     # Next.js API routes
    layout.tsx               # Root layout with AppProviders
    page.tsx                 # Root page (redirects)
    globals.css
  components/
    ui/                      # shadcn/ui components
    dashboard/               # Dashboard-specific view components
    layout/                  # Layout components (AppSidebar, etc.)
  hooks/                     # Custom hooks — all stateful logic lives here
  lib/
    api.ts                   # Axios instance with auth interceptors
    query-client.ts          # TanStack Query client config
    utils.ts                 # cn(), formatRupiah(), and other utilities
    date-range.ts            # Date range helpers
  providers/
    app-providers.tsx        # QueryClientProvider + Toaster
  services/
    auth.service.ts          # Auth hooks (useLogin, useLogout, useRegister)
    transaction.service.ts   # Transaction query/mutation hooks
    category.service.ts      # Category query/mutation hooks
  store/
    auth.store.ts            # Zustand auth store
  types/
    auth.types.ts            # Auth Zod schemas + inferred TS types
    transaction.types.ts     # Transaction Zod schemas + inferred TS types
    category.types.ts        # Category Zod schemas + inferred TS types
  middleware.ts              # Next.js route protection middleware
```

## Auth Flow
- JWT token stored in Zustand store + persisted to localStorage (`aturdana-auth`)
- Token also written as cookie (`aturdana-token`) for SSR middleware access
- `src/middleware.ts` guards `/dashboard`, `/transactions`, `/settings` and redirects authenticated users away from `/login`/`/register`
- 401 responses from API auto-clear auth and redirect to `/login`

## Path Alias
`@/*` maps to `src/*`
