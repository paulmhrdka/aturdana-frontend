# AturDana Frontend - Project Overview

## Purpose
Personal finance tracker web application. "AturDana" means "manage money" in Indonesian.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
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
    (protected)/dashboard/   # Protected pages
    (auth)/login/register/   # Auth pages
    layout.tsx               # Root layout with AppProviders
    page.tsx                 # Root page (redirects)
    globals.css
  components/ui/             # shadcn/ui components
  lib/
    api.ts                   # Axios instance with auth interceptors
    query-client.ts          # TanStack Query client config
    utils.ts                 # cn() and other utilities
  providers/
    app-providers.tsx        # QueryClientProvider + Toaster
  services/
    auth.service.ts          # Auth hooks (useLogin, useLogout, useRegister)
  store/
    auth.store.ts            # Zustand auth store
  types/
    auth.types.ts            # Zod schemas + inferred TS types
  middleware.ts              # Next.js route protection middleware
```

## Auth Flow
- JWT token stored in Zustand store + persisted to localStorage (`aturdana-auth`)
- Token also written as cookie (`aturdana-token`) for SSR middleware access
- `src/middleware.ts` guards `/dashboard` and redirects authenticated users away from `/login`/`/register`
- 401 responses from API auto-clear auth and redirect to `/login`

## Path Alias
`@/*` maps to `src/*`
