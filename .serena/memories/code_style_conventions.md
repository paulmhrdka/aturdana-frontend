# Code Style & Conventions

## TypeScript
- Strict mode enabled (`"strict": true` in tsconfig)
- Use Zod schemas to define types, then `z.infer<>` for TypeScript types
- Co-locate schemas and types in `src/types/`
- No explicit return types needed unless non-obvious

## File Naming
- kebab-case for all files: `auth.service.ts`, `app-providers.tsx`
- Page files are always `page.tsx`, layouts are `layout.tsx`

## Component Conventions
- `'use client'` directive required for client components
- Named exports preferred (not default exports for components in `src/components/`)
- Page components use default exports (Next.js requirement)

## API / Services Pattern
- Services are custom hooks built on React Query mutations (`useMutation`)
- Located in `src/services/`
- Each service hook handles its own success toast + navigation

## State Management
- Zustand for client-side global state (auth, etc.)
- TanStack React Query for server state (API data fetching/mutations)
- Zustand `persist` middleware used for auth persistence

## Imports
- Use `@/` alias for all internal imports (e.g., `@/lib/api`, `@/store/auth.store`)
- Group: external libs → internal @/ imports

## Forms
- Always use React Hook Form + Zod resolver
- Zod schemas defined in `src/types/`
- Use shadcn `<Form>`, `<FormField>`, `<FormItem>`, `<FormMessage>` components

## Styling
- TailwindCSS utility classes only (no CSS modules or inline styles)
- Use `cn()` from `@/lib/utils` for conditional class merging
