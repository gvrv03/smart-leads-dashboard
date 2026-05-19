# Smart Leads Dashboard — Frontend

Next.js 16 frontend for the Smart Leads Dashboard application.

## Tech Stack

- **Next.js 16** (App Router, React Server Components)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** with CSS variables for theming
- **shadcn/ui** component library (Radix primitives)
- **Zustand** for state management
- **React Hook Form + Zod** for form validation
- **Axios** with interceptors for API communication
- **Framer Motion** for animations (scroll-triggered + page transitions)
- **Recharts** for analytics charts (Bar, Pie, Line)
- **next-themes** for dark/light mode
- **date-fns** for date formatting
- **Lucide React** for icons
- **Sonner** for toast notifications

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_BASE_URL | Backend API URL | http://localhost:5000/api |

## Project Structure

```
src/
├── api/                    # Axios instance & typed API functions
│   ├── axios.ts           # Configured client with interceptors
│   ├── auth.api.ts        # Auth endpoints
│   └── leads.api.ts       # Leads endpoints (CRUD, stats, import/export)
├── app/                    # Next.js App Router
│   ├── (protected)/       # Auth-guarded layout
│   │   ├── dashboard/     # Analytics page with charts
│   │   └── leads/         # Leads list + [id] detail
│   ├── login/             # Login page with quick-login shortcuts
│   ├── register/          # Registration page
│   ├── layout.tsx         # Root layout (providers, toaster)
│   ├── page.tsx           # Landing page
│   └── globals.css        # Tailwind + custom scrollbar + theme vars
├── components/
│   ├── dashboard/         # WelcomeCard, StatsGrid, Charts, DateFilter
│   ├── landing/           # Hero, Features, Scalability, TechStack, CTA, Footer
│   ├── leads/             # Table, Filters, Pagination, Forms, Import/Export
│   ├── layout/            # Navbar, ThemeToggle, ProtectedRoute, LogoutDialog
│   ├── providers/         # ThemeProvider, AuthProvider
│   └── ui/                # shadcn/ui + motion + scroll-animate + date-picker
├── constants/             # STATUS_OPTIONS, SOURCE_OPTIONS, etc.
├── hooks/                 # useAuth, useLeads, useDebounce
├── store/                 # Zustand stores (auth, leads)
├── types/                 # TypeScript interfaces (lead, auth, api)
└── utils/                 # formatDate, getErrorMessage, rateLimit
```

## Key Features

- **Component-based architecture** — barrel exports, small focused components
- **Scroll-triggered animations** — elements animate as they enter viewport
- **Mobile-first responsive** — bottom-sheet dialogs, adaptive layouts
- **Theme-aware charts** — re-render on dark/light toggle
- **Debounced search** — 400ms delay with custom hook
- **Error boundary** — user-friendly error messages extracted from API responses
- **Rate limit awareness** — client-side tracking utility
- **Custom scrollbar** — thin, rounded, semi-transparent

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Deployment

The app can be deployed to Vercel, or containerized with the included Dockerfile:

```bash
docker build -t smart-leads-client .
docker run -p 3000:80 smart-leads-client
```
