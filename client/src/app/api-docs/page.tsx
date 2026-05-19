'use client';

import { DocsLayout, DocsSection, DocsCodeBlock, DocsTable, DocsBadge } from '@/components/docs';

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'authentication', label: 'Authentication' },
  { id: 'register', label: 'POST /auth/register', level: 2 },
  { id: 'login', label: 'POST /auth/login', level: 2 },
  { id: 'me', label: 'GET /auth/me', level: 2 },
  { id: 'leads', label: 'Leads' },
  { id: 'get-leads', label: 'GET /leads', level: 2 },
  { id: 'create-lead', label: 'POST /leads', level: 2 },
  { id: 'get-lead', label: 'GET /leads/:id', level: 2 },
  { id: 'update-lead', label: 'PUT /leads/:id', level: 2 },
  { id: 'update-status', label: 'PATCH /leads/:id/status', level: 2 },
  { id: 'delete-lead', label: 'DELETE /leads/:id', level: 2 },
  { id: 'stats', label: 'GET /leads/stats', level: 2 },
  { id: 'export', label: 'GET /leads/export', level: 2 },
  { id: 'import', label: 'POST /leads/import', level: 2 },
  { id: 'error-codes', label: 'Error Codes' },
];

export default function ApiDocsPage() {
  return (
    <DocsLayout
      title="API Documentation"
      description="Complete REST API reference for the Smart Leads Dashboard backend."
      sections={sections}
    >
      {/* Overview */}
      <DocsSection id="overview" title="Overview">
        <p className="text-sm text-muted-foreground">
          Base URL: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">http://localhost:5000/api</code>
        </p>
        <div className="flex flex-wrap gap-2">
          <DocsBadge variant="warning">General: 100 req / 15 min</DocsBadge>
          <DocsBadge variant="destructive">Auth: 10 req / 15 min</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">All responses follow a standardized format:</p>
        <DocsCodeBlock
          title="Response Format"
          code={`// Success\n{ "success": true, "data": {}, "message": "Optional" }\n\n// Error\n{ "success": false, "error": "Description", "statusCode": 400 }`}
        />
      </DocsSection>

      {/* Authentication */}
      <DocsSection id="authentication" title="Authentication">
        <p className="text-sm text-muted-foreground">
          JWT-based authentication. Tokens expire after 7 days. Include the token in the <code className="bg-muted px-1.5 py-0.5 rounded text-xs">Authorization: Bearer &lt;token&gt;</code> header for protected routes.
        </p>
      </DocsSection>

      {/* Register */}
      <DocsSection id="register" title="POST /auth/register">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge variant="success">POST</DocsBadge>
          <code className="text-sm font-mono">/auth/register</code>
        </div>
        <p className="text-sm text-muted-foreground">Register a new user. Always creates a Sales role.</p>
        <DocsTable
          headers={['Field', 'Type', 'Required', 'Rules']}
          rows={[
            ['name', 'string', 'Yes', 'Min 2 characters'],
            ['email', 'string', 'Yes', 'Valid email format'],
            ['password', 'string', 'Yes', 'Min 6 characters'],
          ]}
        />
        <DocsCodeBlock
          title="Request Body"
          code={`{\n  "name": "John Doe",\n  "email": "john@example.com",\n  "password": "password123"\n}`}
        />
        <DocsCodeBlock
          title="Success Response (201)"
          code={`{\n  "success": true,\n  "data": {\n    "token": "eyJhbGciOiJIUzI1NiIs...",\n    "user": { "_id": "664a...", "name": "John Doe", "email": "john@example.com", "role": "sales" }\n  },\n  "message": "User registered successfully."\n}`}
        />
        <div className="flex flex-wrap gap-2">
          <DocsBadge variant="destructive">400 — Validation error</DocsBadge>
          <DocsBadge variant="destructive">409 — Email already exists</DocsBadge>
          <DocsBadge variant="destructive">429 — Rate limited</DocsBadge>
        </div>
      </DocsSection>

      {/* Login */}
      <DocsSection id="login" title="POST /auth/login">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge variant="success">POST</DocsBadge>
          <code className="text-sm font-mono">/auth/login</code>
        </div>
        <p className="text-sm text-muted-foreground">Login with email and password.</p>
        <DocsCodeBlock
          title="Request Body"
          code={`{\n  "email": "john@example.com",\n  "password": "password123"\n}`}
        />
        <DocsCodeBlock
          title="Success Response (200)"
          code={`{\n  "success": true,\n  "data": {\n    "token": "eyJhbGciOiJIUzI1NiIs...",\n    "user": { "_id": "664a...", "name": "John Doe", "role": "admin" }\n  },\n  "message": "Login successful."\n}`}
        />
        <div className="flex flex-wrap gap-2">
          <DocsBadge variant="destructive">401 — Invalid credentials</DocsBadge>
          <DocsBadge variant="destructive">429 — Rate limited</DocsBadge>
        </div>
      </DocsSection>

      {/* Me */}
      <DocsSection id="me" title="GET /auth/me">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge>GET</DocsBadge>
          <code className="text-sm font-mono">/auth/me</code>
          <DocsBadge variant="warning">Auth Required</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Get the currently authenticated user.</p>
        <DocsCodeBlock
          title="Success Response (200)"
          code={`{\n  "success": true,\n  "data": { "_id": "664a...", "name": "John Doe", "email": "john@example.com", "role": "admin" }\n}`}
        />
      </DocsSection>

      {/* Leads Section */}
      <DocsSection id="leads" title="Leads">
        <p className="text-sm text-muted-foreground">
          All lead endpoints require authentication. Admin-only endpoints are marked.
        </p>
      </DocsSection>

      {/* GET /leads */}
      <DocsSection id="get-leads" title="GET /leads">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge>GET</DocsBadge>
          <code className="text-sm font-mono">/leads</code>
          <DocsBadge variant="warning">Auth Required</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">List leads with pagination and filters. All filters work in combination.</p>
        <DocsTable
          headers={['Param', 'Type', 'Description', 'Default']}
          rows={[
            ['status', 'string', 'New, Contacted, Qualified, Lost', '—'],
            ['source', 'string', 'Website, Instagram, Referral', '—'],
            ['search', 'string', 'Search name or email', '—'],
            ['sort', 'string', '"latest" or "oldest"', 'latest'],
            ['page', 'number', 'Page number', '1'],
            ['limit', 'number', 'Items per page (max 100)', '10'],
          ]}
        />
        <DocsCodeBlock
          title="Example"
          code={`GET /leads?status=Qualified&source=Instagram&search=Rahul&page=1&limit=10`}
        />
        <DocsCodeBlock
          title="Success Response (200)"
          code={`{\n  "success": true,\n  "data": {\n    "leads": [{ "_id": "...", "name": "Rahul", "status": "Qualified", ... }],\n    "total": 25,\n    "page": 1,\n    "limit": 10,\n    "totalPages": 3\n  }\n}`}
        />
      </DocsSection>

      {/* POST /leads */}
      <DocsSection id="create-lead" title="POST /leads">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge variant="success">POST</DocsBadge>
          <code className="text-sm font-mono">/leads</code>
          <DocsBadge variant="destructive">Admin Only</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Create a new lead.</p>
        <DocsTable
          headers={['Field', 'Type', 'Required', 'Valid Values']}
          rows={[
            ['name', 'string', 'Yes', 'Min 2 characters'],
            ['email', 'string', 'Yes', 'Valid email'],
            ['status', 'string', 'Yes', 'New, Contacted, Qualified, Lost'],
            ['source', 'string', 'Yes', 'Website, Instagram, Referral'],
          ]}
        />
        <DocsCodeBlock
          title="Request Body"
          code={`{\n  "name": "Jane Smith",\n  "email": "jane@example.com",\n  "status": "New",\n  "source": "Instagram"\n}`}
        />
      </DocsSection>

      {/* GET /leads/:id */}
      <DocsSection id="get-lead" title="GET /leads/:id">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge>GET</DocsBadge>
          <code className="text-sm font-mono">/leads/:id</code>
          <DocsBadge variant="warning">Auth Required</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Get a single lead by ID. Available to all roles.</p>
      </DocsSection>

      {/* PUT /leads/:id */}
      <DocsSection id="update-lead" title="PUT /leads/:id">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge variant="warning">PUT</DocsBadge>
          <code className="text-sm font-mono">/leads/:id</code>
          <DocsBadge variant="destructive">Admin Only</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Update a lead. All fields are optional.</p>
        <DocsCodeBlock title="Request Body" code={`{ "name": "Updated Name", "status": "Contacted" }`} />
      </DocsSection>

      {/* PATCH /leads/:id/status */}
      <DocsSection id="update-status" title="PATCH /leads/:id/status">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge variant="warning">PATCH</DocsBadge>
          <code className="text-sm font-mono">/leads/:id/status</code>
          <DocsBadge variant="success">All Roles</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Update lead status only. Sales users can use this endpoint.</p>
        <DocsCodeBlock title="Request Body" code={`{ "status": "Contacted" }`} />
      </DocsSection>

      {/* DELETE /leads/:id */}
      <DocsSection id="delete-lead" title="DELETE /leads/:id">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge variant="destructive">DELETE</DocsBadge>
          <code className="text-sm font-mono">/leads/:id</code>
          <DocsBadge variant="destructive">Admin Only</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Permanently delete a lead.</p>
      </DocsSection>

      {/* GET /leads/stats */}
      <DocsSection id="stats" title="GET /leads/stats">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge>GET</DocsBadge>
          <code className="text-sm font-mono">/leads/stats</code>
          <DocsBadge variant="warning">Auth Required</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Get analytics with optional date range filtering.</p>
        <DocsTable
          headers={['Param', 'Type', 'Description']}
          rows={[
            ['from', 'string', 'Start date (YYYY-MM-DD)'],
            ['to', 'string', 'End date (YYYY-MM-DD)'],
          ]}
        />
        <DocsCodeBlock
          title="Success Response (200)"
          code={`{\n  "success": true,\n  "data": {\n    "total": 132,\n    "byStatus": { "New": 45, "Contacted": 38, "Qualified": 30, "Lost": 19 },\n    "bySource": { "Website": 60, "Instagram": 42, "Referral": 30 },\n    "daily": [{ "date": "2024-05-18", "count": 5 }]\n  }\n}`}
        />
      </DocsSection>

      {/* GET /leads/export */}
      <DocsSection id="export" title="GET /leads/export">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge>GET</DocsBadge>
          <code className="text-sm font-mono">/leads/export</code>
          <DocsBadge variant="destructive">Admin Only</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Export leads as CSV. Accepts same filter params as GET /leads (except page/limit). Returns a file download.</p>
      </DocsSection>

      {/* POST /leads/import */}
      <DocsSection id="import" title="POST /leads/import">
        <div className="flex items-center gap-2 mb-2">
          <DocsBadge variant="success">POST</DocsBadge>
          <code className="text-sm font-mono">/leads/import</code>
          <DocsBadge variant="destructive">Admin Only</DocsBadge>
        </div>
        <p className="text-sm text-muted-foreground">Import leads from CSV file. Max 5MB. Required columns: Name, Email, Status, Source.</p>
        <DocsCodeBlock
          title="Success Response (201)"
          code={`{\n  "success": true,\n  "data": { "imported": 122, "failed": 10, "errors": ["Row 6: Invalid source..."], "total": 132 },\n  "message": "Successfully imported 122 leads."\n}`}
        />
      </DocsSection>

      {/* Error Codes */}
      <DocsSection id="error-codes" title="Error Codes" showSeparator={false}>
        <DocsTable
          headers={['Code', 'Meaning']}
          rows={[
            ['200', 'Success'],
            ['201', 'Created'],
            ['400', 'Bad Request (validation)'],
            ['401', 'Unauthorized (no/invalid token)'],
            ['403', 'Forbidden (insufficient role)'],
            ['404', 'Not Found'],
            ['409', 'Conflict (duplicate)'],
            ['429', 'Too Many Requests (rate limited)'],
            ['500', 'Internal Server Error'],
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
