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
    api/             # Next.js API routes
  components/
    ui/              # shadcn/ui components
    dashboard/       # Dashboard-specific components (view only)
    layout/          # Layout components (AppSidebar, etc.)
  hooks/             # Custom hooks — all logic lives here
  lib/               # api.ts (axios), query-client.ts, utils.ts, date-range.ts
  providers/         # AppProviders (QueryClient + Toaster)
  services/          # React Query hooks (queries + mutations per domain)
  store/             # Zustand stores (auth.store.ts)
  types/             # Zod schemas + inferred TS types
  middleware.ts      # Route protection (reads aturdana-token cookie)
```

## Conventions

- `@/*` path alias maps to `src/*`
- Use `'use client'` directive on client components
- Named exports for components (default exports only for Next.js pages)
- Zod schemas define types — use `z.infer<>` for TS types, keep in `src/types/`
- Services = React Query hooks (queries + mutations) in `src/services/`, one file per domain
- Use `cn()` from `@/lib/utils` for conditional Tailwind class merging
- kebab-case file names throughout

## View / Logic Separation

**Always separate UI rendering from business logic:**

- **Pages and components** (`src/app/`, `src/components/`) are view-only — they render JSX, bind props, and call handlers. No inline `useState`/`useEffect`/API calls.
- **Custom hooks** (`src/hooks/`) own all stateful logic — form setup, query calls, derived state, event handlers. Named `use-<feature>.ts`.
- A page imports one hook that returns everything it needs: `const { form, onSubmit, isPending } = useLoginForm()`

Example pattern:
```ts
// hooks/use-login.ts  ← logic
export function useLoginForm() {
  const form = useForm(...)
  const login = useLogin()
  function onSubmit(data) { login.mutate(data) }
  return { form, onSubmit, isPending: login.isPending }
}

// app/(auth)/login/page.tsx  ← view
const { form, onSubmit, isPending } = useLoginForm()
```

## Auth Flow

1. Login/register calls API → receives JWT token + user
2. `useAuthStore` saves to Zustand + localStorage (`aturdana-auth`) + sets `aturdana-token` cookie
3. `src/middleware.ts` reads cookie to protect `/dashboard`, `/transactions`, `/settings` and redirect authed users from `/login`
4. Axios interceptor attaches `Bearer <token>` to requests; 401s clear auth and redirect to `/login`

## After Every Task

1. `npm run lint` — no ESLint errors
2. `npx tsc --noEmit` — no TypeScript errors
3. `npm run build` — for significant changes
