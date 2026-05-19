# Smart Leads Dashboard

A full-stack **Lead Management Dashboard** built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) — fully TypeScript. Features JWT authentication, CRUD operations, advanced filtering, pagination, role-based access control, CSV import/export, dark/light theme, real-time analytics, and rate limiting.

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Zustand** for state management
- **React Hook Form + Zod** for form validation
- **Axios** for HTTP requests
- **Framer Motion** for animations
- **Recharts** for charts & analytics
- **next-themes** for dark/light mode
- **Lucide React** for icons

### Backend
- **Node.js** with **Express.js**
- **TypeScript** throughout (strict mode)
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Zod** for request validation
- **express-rate-limit** for rate limiting
- **Multer** for file uploads (CSV import)

### DevOps
- **Docker** & **Docker Compose**
- Multi-stage Docker builds

## Features

### Core (Mandatory)
- ✅ JWT-based authentication (register, login, protected routes)
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Role-Based Access Control (Admin / Sales)
- ✅ Full CRUD operations on leads
- ✅ Advanced filtering (status + source + search + sort — all work together)
- ✅ Debounced search (400ms delay)
- ✅ Server-side pagination with skip/limit and metadata
- ✅ CSV export with current filters applied
- ✅ Docker Compose setup (MongoDB + Server + Client)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading skeletons, empty states, error handling UI
- ✅ Form validation (frontend + backend)
- ✅ Standardized API response format
- ✅ Centralized error handling middleware
- ✅ RESTful API with proper HTTP status codes
- ✅ Request validation with Zod schemas

### Bonus
- ✅ Dark/Light theme toggle (system preference detection)

### Extra (Beyond Requirements)
- ✅ CSV import with validation and error reporting
- ✅ Real-time analytics dashboard with charts (Bar, Pie, Line)
- ✅ Date range filtering for analytics
- ✅ Rate limiting (100 req/15min general, 10 req/15min auth)
- ✅ Sales users can update lead statuses
- ✅ Framer Motion scroll animations on landing page
- ✅ Custom scrollbar styling
- ✅ Mobile bottom-sheet dialogs
- ✅ Admin seed script
- ✅ Landing page with feature showcase
- ✅ Quick login shortcuts for demo
- ✅ Google DNS fallback for Atlas on restricted networks

## Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)
- Docker & Docker Compose (optional)

## Local Setup (Without Docker)

### 1. Clone the repository

```bash
git clone <repository-url>
cd smart-leads-dashboard
```

### 2. Backend Setup

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run create-admin   # Creates default admin user
npm run dev            # Starts server on port 5000
```

### 3. Frontend Setup

```bash
cd client
cp .env.example .env.local
# Edit .env.local if needed
npm install
npm run dev            # Starts client on port 3000
```

The frontend runs on `http://localhost:3000` and the backend on `http://localhost:5000`.

## Docker Setup

```bash
# From the project root
docker-compose up --build
```

Services:
- **MongoDB**: `localhost:27017`
- **Backend API**: `localhost:5000`
- **Frontend**: `localhost:3000`

## Environment Variables

### Server (`server/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string (Atlas or local) | mongodb://localhost:27017/smart-leads |
| JWT_SECRET | JWT signing secret | — |
| JWT_EXPIRES_IN | Token expiry | 7d |
| NODE_ENV | Environment | development |

### Client (`client/.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| NEXT_PUBLIC_API_BASE_URL | Backend API URL | http://localhost:5000/api |

## MongoDB Setup

You can use **either** MongoDB Atlas (cloud) or MongoDB Compass (local).

### Option 1: MongoDB Atlas (Cloud)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster.
2. Create a database user (Database Access → Add New Database User).
3. Whitelist your IP (Network Access → Add IP Address → `0.0.0.0/0` for dev).
4. Get your connection string: Cluster → Connect → Drivers → Copy the `mongodb+srv://...` URI.
5. Update `server/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/smart-leads?retryWrites=true&w=majority
```

> **Note:** The server uses Google DNS (`8.8.8.8`) to resolve Atlas hostnames, which works on restricted networks (college/corporate WiFi).

### Option 2: MongoDB Compass (Local)

1. Install MongoDB Community Server
2. Start MongoDB locally (runs on port 27017 by default)
3. The `smart-leads` database is created automatically when the server starts
4. Keep the default in `server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/smart-leads
```

## Default Accounts

Run `npm run create-admin` in the server folder to create the admin account:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartleads.com | admin123 |

Sales accounts are created via the `/register` page.

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user (sales only) | No |
| POST | /api/auth/login | Login | No |
| GET | /api/auth/me | Get current user | Yes |

### Leads
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | /api/leads | List leads (paginated + filtered) | Yes | All |
| POST | /api/leads | Create lead | Yes | Admin |
| GET | /api/leads/stats | Get analytics stats | Yes | All |
| GET | /api/leads/export | Export CSV | Yes | Admin |
| POST | /api/leads/import | Import CSV | Yes | Admin |
| GET | /api/leads/:id | Get lead by ID | Yes | All |
| PUT | /api/leads/:id | Update lead (all fields) | Yes | Admin |
| PATCH | /api/leads/:id/status | Update lead status only | Yes | All |
| DELETE | /api/leads/:id | Delete lead | Yes | Admin |

## Folder Structure

```
smart-leads-dashboard/
├── client/                        # Next.js frontend
│   ├── src/
│   │   ├── api/                  # Axios instance & API functions
│   │   ├── app/                  # Next.js App Router pages
│   │   │   ├── (protected)/     # Auth-guarded routes
│   │   │   │   ├── dashboard/   # Analytics dashboard
│   │   │   │   └── leads/       # Leads list + detail
│   │   │   ├── login/           # Login page
│   │   │   └── register/        # Register page
│   │   ├── components/
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── landing/         # Landing page sections
│   │   │   ├── leads/           # Lead management components
│   │   │   ├── layout/          # Navbar, ThemeToggle, etc.
│   │   │   ├── providers/       # Theme & Auth providers
│   │   │   └── ui/              # shadcn/ui + custom components
│   │   ├── constants/           # App constants
│   │   ├── hooks/               # Custom hooks (useLeads, useAuth, useDebounce)
│   │   ├── store/               # Zustand stores
│   │   ├── types/               # TypeScript interfaces
│   │   └── utils/               # Helper functions
│   └── ...
├── server/                        # Express backend
│   ├── src/
│   │   ├── config/              # DB & env config
│   │   ├── controllers/         # Route handlers
│   │   ├── middleware/          # Auth, RBAC, validation, error, rate limit
│   │   ├── models/              # Mongoose models
│   │   ├── routes/              # Express routes
│   │   ├── scripts/             # Admin seed script
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # JWT, CSV, response helpers
│   │   └── validators/          # Zod schemas
│   └── ...
├── docker-compose.yml
├── API.md                         # Full API documentation
├── CLAUDE.md                      # AI development guide
└── README.md                      # This file
```

## Scripts

### Server
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with nodemon |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled JS |
| `npm run create-admin` | Seed default admin user |

### Client
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |

## Author

**Gaurav Narnaware**

## License

ISC
