# Smart Leads Dashboard — Backend

Express.js backend API for the Smart Leads Dashboard application.

## Tech Stack

- **Node.js** with **Express.js**
- **TypeScript** (strict mode, no `any`)
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication (7-day expiry)
- **bcrypt** for password hashing (10 salt rounds)
- **Zod** for request validation
- **express-rate-limit** for rate limiting
- **Multer** for CSV file uploads
- **nodemon + ts-node-dev** for development

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
# Edit .env with your MongoDB URI

# Create default admin user
npm run create-admin

# Start development server
npm run dev
```

Server runs on [http://localhost:5000](http://localhost:5000).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/smart-leads |
| JWT_SECRET | JWT signing secret | — |
| JWT_EXPIRES_IN | Token expiry duration | 7d |
| NODE_ENV | Environment | development |

## Project Structure

```
src/
├── config/
│   ├── db.ts                 # MongoDB connection (Atlas + local, Google DNS fallback)
│   └── env.ts                # Validated environment config
├── controllers/
│   ├── auth.controller.ts    # Register, login, getMe
│   ├── lead.controller.ts    # CRUD, filters, pagination, export, stats
│   └── import.controller.ts  # CSV import with row-level validation
├── middleware/
│   ├── auth.middleware.ts    # JWT verification, attach req.user
│   ├── role.middleware.ts    # RBAC enforcement (admin/sales)
│   ├── validate.middleware.ts # Zod schema validation (body/query/params)
│   ├── error.middleware.ts   # Centralized error handler
│   └── rateLimit.middleware.ts # Rate limiting (general + auth)
├── models/
│   ├── User.model.ts         # User schema (bcrypt pre-save hook)
│   └── Lead.model.ts         # Lead schema (indexed fields)
├── routes/
│   ├── auth.routes.ts        # POST register, POST login, GET me
│   └── lead.routes.ts        # Full CRUD + export + import + stats
├── scripts/
│   └── createAdmin.ts        # Seed default admin user
├── types/
│   ├── auth.types.ts         # IUser, IRegisterDTO, ILoginDTO, IAuthResponse
│   ├── lead.types.ts         # ILead, ICreateLeadDTO, ILeadFilters, IPaginatedLeads
│   └── express.d.ts          # Extend Express Request with user
├── utils/
│   ├── jwt.utils.ts          # generateToken, verifyToken
│   ├── csv.utils.ts          # generateCSV with field escaping
│   └── response.utils.ts    # sendSuccess<T>, sendError
├── validators/
│   ├── auth.validator.ts     # registerSchema, loginSchema
│   └── lead.validator.ts     # createLeadSchema, updateLeadSchema, etc.
├── app.ts                    # Express app setup (cors, json, routes, error handler)
└── server.ts                 # Entry point (connect DB, listen)
```

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth | Rate Limit |
|--------|----------|-------------|------|------------|
| POST | /api/auth/register | Register (sales only) | No | 10/15min |
| POST | /api/auth/login | Login | No | 10/15min |
| GET | /api/auth/me | Get current user | Yes | 100/15min |

### Leads
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | /api/leads | List (paginated + filtered) | Yes | All |
| POST | /api/leads | Create lead | Yes | Admin |
| GET | /api/leads/stats | Analytics (with date range) | Yes | All |
| GET | /api/leads/export | Export CSV | Yes | Admin |
| POST | /api/leads/import | Import CSV | Yes | Admin |
| GET | /api/leads/:id | Get by ID | Yes | All |
| PUT | /api/leads/:id | Update (all fields) | Yes | Admin |
| PATCH | /api/leads/:id/status | Update status only | Yes | All |
| DELETE | /api/leads/:id | Delete | Yes | Admin |

## Response Format

All responses follow a standardized format:

```json
// Success
{ "success": true, "data": {}, "message": "Optional message" }

// Error
{ "success": false, "error": "Error description", "statusCode": 400 }
```

## Rate Limiting

| Scope | Limit | Window |
|-------|-------|--------|
| General API (`/api/*`) | 100 requests | 15 minutes |
| Auth (`/api/auth/*`) | 10 requests | 15 minutes |

## Database Indexes

The Lead model has indexes on:
- `status` — for filter queries
- `source` — for filter queries
- `email` — for search performance

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-restart on changes) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled production build |
| `npm run create-admin` | Seed default admin user |

## Default Admin Account

After running `npm run create-admin`:

| Field | Value |
|-------|-------|
| Email | admin@smartleads.com |
| Password | admin123 |
| Role | admin |

## Deployment

Containerize with the included Dockerfile (multi-stage build):

```bash
docker build -t smart-leads-server .
docker run -p 5000:5000 --env-file .env smart-leads-server
```

## MongoDB Notes

- Supports both Atlas (`mongodb+srv://`) and local (`mongodb://`) connections
- Uses Google DNS (`8.8.8.8`) for SRV resolution on restricted networks
- Connection mode (Atlas/Local) is logged on startup
- Helpful error hints for common connection issues
