# AturDana Frontend

Personal finance tracker built with Next.js 15 App Router.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5** (strict)
- **TailwindCSS v4** for styling
- **shadcn/ui** for UI components (Radix UI primitives)
- **Zustand v5** for client state (auth)
- **TanStack React Query v5** for server state
- **Axios** for HTTP, **React Hook Form + Zod v4** for forms
- **Sonner** for toasts, **Lucide React** for icons

## Commands

```bash
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # ESLint (next lint)
npx tsc --noEmit     # Type check
npx shadcn add <c>   # Add a shadcn component
```

## Project Structure

```
src/
  app/
    (auth)/          # login, register pages
    (protected)/     # dashboard and other authed pages
  components/ui/     # shadcn/ui components
  lib/               # api.ts (axios), query-client.ts, utils.ts
  providers/         # AppProviders (QueryClient + Toaster)
  services/          # React Query mutation hooks (e.g. useLogin)
  store/             # Zustand stores (auth.store.ts)
  types/             # Zod schemas + inferred TS types
  middleware.ts      # Route protection (reads aturdana-token cookie)
```

## Conventions

- `@/*` path alias maps to `src/*`
- Use `'use client'` directive on client components
- Named exports for components (default exports only for Next.js pages)
- Zod schemas define types — use `z.infer<>` for TS types, keep in `src/types/`
- Services = React Query mutation hooks in `src/services/`
- Use `cn()` from `@/lib/utils` for conditional Tailwind class merging
- kebab-case file names throughout

## Auth Flow

1. Login/register calls API → receives JWT token + user
2. `useAuthStore` saves to Zustand + localStorage (`aturdana-auth`) + sets `aturdana-token` cookie
3. `src/middleware.ts` reads cookie to protect `/dashboard` and redirect authed users from `/login`
4. Axios interceptor attaches `Bearer <token>` to requests; 401s clear auth and redirect to `/login`

## After Every Task

1. `npm run lint` — no ESLint errors
2. `npx tsc --noEmit` — no TypeScript errors
3. `npm run build` — for significant changes
