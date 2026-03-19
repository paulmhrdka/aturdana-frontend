<h1 align="center">AturDana Frontend</h1>

<p align="center">Personal finance tracker web app</p>

---

## Features

- Track income and expenses
- Financial dashboard with charts and summaries
- Date-range filtering for transaction data
- Secure JWT-based authentication
- Category management

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5** (strict)
- **TailwindCSS v4** for styling
- **shadcn/ui** (Radix UI primitives) for UI components
- **Zustand v5** for client state (auth)
- **TanStack React Query v5** for server state
- **Axios** for HTTP, **React Hook Form + Zod v4** for forms

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```sh
git clone https://github.com/paulmhrdka/aturdana-frontend.git
cd aturdana-frontend
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Running the App

```sh
npm run dev      # Dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Project Structure

```
src/
  app/
    (auth)/          # login, register pages
    (protected)/     # dashboard and other authenticated pages
    api/             # Next.js API routes
  components/
    ui/              # shadcn/ui components
    dashboard/       # Dashboard-specific view components
    layout/          # Layout components (AppSidebar, etc.)
  hooks/             # Custom hooks — all logic lives here
  lib/               # Axios instance, React Query client, utilities
  providers/         # AppProviders (QueryClient + Toaster)
  services/          # React Query hooks per domain
  store/             # Zustand stores
  types/             # Zod schemas + inferred TypeScript types
  middleware.ts      # Route protection
```

## Auth Flow

1. Login/register → API returns JWT token + user
2. Token saved to Zustand + `localStorage` + `aturdana-token` cookie
3. `middleware.ts` reads cookie to protect routes and redirect authenticated users away from auth pages
4. Axios interceptor attaches `Bearer <token>`; 401 clears auth and redirects to `/login`

## Contact

- **Email:** [mahardikapaul@gmail.com](mailto:mahardikapaul@gmail.com)
- **GitHub Issues:** [Issues Page](https://github.com/paulmhrdka/aturdana-frontend/issues)
