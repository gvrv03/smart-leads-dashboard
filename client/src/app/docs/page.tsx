'use client';

import { DocsLayout, DocsSection, DocsTable, DocsCodeBlock, DocsBadge } from '@/components/docs';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'features', label: 'Features' },
  { id: 'prerequisites', label: 'Prerequisites' },
  { id: 'folder-structure', label: 'Folder Structure' },
  { id: 'env-variables', label: 'Environment Variables' },
  { id: 'default-accounts', label: 'Default Accounts' },
  { id: 'scripts', label: 'Scripts' },
  { id: 'api-endpoints', label: 'API Endpoints' },
];

export default function DocsPage() {
  return (
    <DocsLayout
      title="Documentation"
      description="Architecture overview, features, and project documentation for Smart Leads Dashboard."
      sections={sections}
    >
      {/* Overview */}
      <DocsSection id="overview" title="Overview">
        <p className="text-sm text-muted-foreground leading-relaxed">
          A full-stack <strong>Lead Management Dashboard</strong> built with the MERN stack (MongoDB, Express.js, React/Next.js, Node.js) — fully TypeScript. Features JWT authentication, CRUD operations, advanced filtering, pagination, role-based access control, CSV import/export, dark/light theme, real-time analytics, and rate limiting.
        </p>
      </DocsSection>

      {/* Tech Stack */}
      <DocsSection id="tech-stack" title="Tech Stack">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-2">Frontend</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Next.js 16 (App Router)</li>
                <li>React 19 + TypeScript</li>
                <li>Tailwind CSS v4</li>
                <li>shadcn/ui</li>
                <li>Zustand</li>
                <li>React Hook Form + Zod</li>
                <li>Framer Motion</li>
                <li>Recharts</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-2">Backend</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Node.js + Express.js</li>
                <li>TypeScript (strict)</li>
                <li>MongoDB + Mongoose</li>
                <li>JWT Authentication</li>
                <li>bcrypt Hashing</li>
                <li>Zod Validation</li>
                <li>express-rate-limit</li>
                <li>Multer (CSV upload)</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-2">DevOps</h4>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li>Docker & Docker Compose</li>
                <li>Multi-stage builds</li>
                <li>Nginx (client prod)</li>
                <li>MongoDB Atlas support</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DocsSection>

      {/* Features */}
      <DocsSection id="features" title="Features">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <DocsBadge>Core (Mandatory)</DocsBadge>
            </h4>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {[
                'JWT authentication (register, login, protected routes)',
                'Password hashing with bcrypt',
                'Role-Based Access Control (Admin / Sales)',
                'Full CRUD operations on leads',
                'Advanced filtering (status + source + search + sort)',
                'Debounced search (400ms)',
                'Server-side pagination with metadata',
                'CSV export with filters',
                'Docker Compose setup',
                'Responsive design',
                'Loading, empty, error states',
                'Form validation (frontend + backend)',
                'Standardized API response format',
                'Centralized error handling',
                'RESTful API with proper status codes',
                'Request validation with Zod',
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <DocsBadge variant="success">Bonus</DocsBadge>
            </h4>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-xs text-muted-foreground">Dark/Light theme toggle (system preference detection)</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
              <DocsBadge variant="warning">Extra (Beyond Requirements)</DocsBadge>
            </h4>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {[
                'CSV import with validation',
                'Analytics dashboard with charts',
                'Date range filtering',
                'Rate limiting',
                'Sales status updates',
                'Scroll animations',
                'Custom scrollbar',
                'Mobile bottom-sheet dialogs',
                'Admin seed script',
                'Landing page',
                'Quick login shortcuts',
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DocsSection>

      {/* Prerequisites */}
      <DocsSection id="prerequisites" title="Prerequisites">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Node.js &gt;= 18</li>
          <li>• MongoDB (local or Atlas)</li>
          <li>• Docker & Docker Compose (optional)</li>
        </ul>
      </DocsSection>

      {/* Folder Structure */}
      <DocsSection id="folder-structure" title="Folder Structure">
        <DocsCodeBlock
          title="Project Structure"
          code={`smart-leads-dashboard/
├── client/                     # Next.js frontend
│   ├── src/
│   │   ├── api/               # Axios instance & API functions
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # UI, leads, dashboard, landing, layout
│   │   ├── constants/         # App constants
│   │   ├── hooks/             # Custom hooks
│   │   ├── store/             # Zustand stores
│   │   ├── types/             # TypeScript interfaces
│   │   └── utils/             # Helper functions
├── server/                     # Express backend
│   ├── src/
│   │   ├── config/            # DB & env config
│   │   ├── controllers/       # Route handlers
│   │   ├── middleware/        # Auth, RBAC, validation, error, rate limit
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # Express routes
│   │   ├── scripts/           # Admin seed script
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # JWT, CSV, response helpers
│   │   └── validators/        # Zod schemas
├── docker-compose.yml
├── API.md
└── README.md`}
        />
      </DocsSection>

      {/* Environment Variables */}
      <DocsSection id="env-variables" title="Environment Variables">
        <h4 className="font-semibold text-sm mb-2">Server (server/.env)</h4>
        <DocsTable
          headers={['Variable', 'Description', 'Default']}
          rows={[
            ['PORT', 'Server port', '5000'],
            ['MONGODB_URI', 'MongoDB connection string', 'mongodb://localhost:27017/smart-leads'],
            ['JWT_SECRET', 'JWT signing secret', '—'],
            ['JWT_EXPIRES_IN', 'Token expiry', '7d'],
            ['NODE_ENV', 'Environment', 'development'],
          ]}
        />
        <h4 className="font-semibold text-sm mb-2 mt-4">Client (client/.env.local)</h4>
        <DocsTable
          headers={['Variable', 'Description', 'Default']}
          rows={[
            ['NEXT_PUBLIC_API_BASE_URL', 'Backend API URL', 'http://localhost:5000/api'],
          ]}
        />
      </DocsSection>

      {/* Default Accounts */}
      <DocsSection id="default-accounts" title="Default Accounts">
        <p className="text-sm text-muted-foreground mb-3">
          Run <code className="bg-muted px-1.5 py-0.5 rounded text-xs">npm run create-admin</code> in the server folder:
        </p>
        <DocsTable
          headers={['Role', 'Email', 'Password']}
          rows={[
            ['Admin', 'admin@smartleads.com', 'admin123'],
          ]}
        />
        <p className="text-xs text-muted-foreground mt-2">Sales accounts are created via the /register page.</p>
      </DocsSection>

      {/* Scripts */}
      <DocsSection id="scripts" title="Scripts">
        <h4 className="font-semibold text-sm mb-2">Server</h4>
        <DocsTable
          headers={['Command', 'Description']}
          rows={[
            ['npm run dev', 'Start dev server with nodemon'],
            ['npm run build', 'Compile TypeScript'],
            ['npm run start', 'Run compiled JS'],
            ['npm run create-admin', 'Seed default admin user'],
          ]}
        />
        <h4 className="font-semibold text-sm mb-2 mt-4">Client</h4>
        <DocsTable
          headers={['Command', 'Description']}
          rows={[
            ['npm run dev', 'Start Next.js dev server'],
            ['npm run build', 'Production build'],
            ['npm run start', 'Start production server'],
          ]}
        />
      </DocsSection>

      {/* API Endpoints */}
      <DocsSection id="api-endpoints" title="API Endpoints" showSeparator={false}>
        <DocsTable
          headers={['Method', 'Endpoint', 'Description', 'Role']}
          rows={[
            ['POST', '/api/auth/register', 'Register (sales)', 'Public'],
            ['POST', '/api/auth/login', 'Login', 'Public'],
            ['GET', '/api/auth/me', 'Current user', 'All'],
            ['GET', '/api/leads', 'List leads (paginated)', 'All'],
            ['POST', '/api/leads', 'Create lead', 'Admin'],
            ['GET', '/api/leads/stats', 'Analytics', 'All'],
            ['GET', '/api/leads/export', 'Export CSV', 'Admin'],
            ['POST', '/api/leads/import', 'Import CSV', 'Admin'],
            ['GET', '/api/leads/:id', 'Get lead', 'All'],
            ['PUT', '/api/leads/:id', 'Update lead', 'Admin'],
            ['PATCH', '/api/leads/:id/status', 'Update status', 'All'],
            ['DELETE', '/api/leads/:id', 'Delete lead', 'Admin'],
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
