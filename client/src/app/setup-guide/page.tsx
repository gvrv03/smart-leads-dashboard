'use client';

import { DocsLayout, DocsSection, DocsCodeBlock, DocsTable, DocsBadge } from '@/components/docs';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const sections = [
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'clone-repo', label: '1. Clone Repository', level: 2 },
  { id: 'backend-setup', label: '2. Backend Setup', level: 2 },
  { id: 'frontend-setup', label: '3. Frontend Setup', level: 2 },
  { id: 'mongodb', label: 'MongoDB Setup' },
  { id: 'atlas', label: 'MongoDB Atlas (Cloud)', level: 2 },
  { id: 'local-mongo', label: 'MongoDB Local', level: 2 },
  { id: 'docker', label: 'Docker Setup' },
  { id: 'seed-data', label: 'Seed Data' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
];

export default function SetupGuidePage() {
  return (
    <DocsLayout
      title="Setup Guide"
      description="Step-by-step instructions to get the Smart Leads Dashboard running locally."
      sections={sections}
    >
      {/* Quick Start */}
      <DocsSection id="quick-start" title="Quick Start">
        <p className="text-sm text-muted-foreground">
          Get the project running in 3 steps. You need Node.js &gt;= 18 and MongoDB (local or Atlas).
        </p>
      </DocsSection>

      {/* Clone */}
      <DocsSection id="clone-repo" title="1. Clone Repository">
        <DocsCodeBlock
          title="Terminal"
          code={`git clone <repository-url>\ncd smart-leads-dashboard`}
        />
      </DocsSection>

      {/* Backend */}
      <DocsSection id="backend-setup" title="2. Backend Setup">
        <DocsCodeBlock
          title="Terminal"
          code={`cd server\ncp .env.example .env\n# Edit .env with your MongoDB URI and JWT secret\nnpm install\nnpm run create-admin   # Creates default admin user\nnpm run dev            # Starts on port 5000`}
        />
        <p className="text-sm text-muted-foreground mt-3">
          The server will log the MongoDB connection status on startup.
        </p>
      </DocsSection>

      {/* Frontend */}
      <DocsSection id="frontend-setup" title="3. Frontend Setup">
        <DocsCodeBlock
          title="Terminal"
          code={`cd client\ncp .env.example .env.local\n# Edit .env.local if needed\nnpm install\nnpm run dev            # Starts on port 3000`}
        />
        <p className="text-sm text-muted-foreground mt-3">
          Open <code className="bg-muted px-1.5 py-0.5 rounded text-xs">http://localhost:3000</code> in your browser.
        </p>
      </DocsSection>

      {/* MongoDB */}
      <DocsSection id="mongodb" title="MongoDB Setup">
        <p className="text-sm text-muted-foreground">
          Choose either MongoDB Atlas (cloud) or a local MongoDB installation.
        </p>
      </DocsSection>

      {/* Atlas */}
      <DocsSection id="atlas" title="MongoDB Atlas (Cloud)">
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>Go to <strong>cloud.mongodb.com</strong> and create a free cluster</li>
          <li>Create a database user (Database Access → Add New Database User)</li>
          <li>Whitelist your IP (Network Access → Add IP → <code className="bg-muted px-1 py-0.5 rounded text-xs">0.0.0.0/0</code> for dev)</li>
          <li>Get connection string: Cluster → Connect → Drivers → Copy URI</li>
          <li>Update <code className="bg-muted px-1 py-0.5 rounded text-xs">server/.env</code>:</li>
        </ol>
        <DocsCodeBlock
          title="server/.env"
          code={`MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/smart-leads?retryWrites=true&w=majority`}
        />
        <Card className="border-blue-500/20 bg-blue-500/5 mt-3">
          <CardContent className="p-3 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground">
              <strong>Network Note:</strong> The server uses Google DNS (8.8.8.8) to resolve Atlas hostnames. This works on restricted networks (college/corporate WiFi) where the default DNS blocks MongoDB SRV lookups.
            </p>
          </CardContent>
        </Card>
      </DocsSection>

      {/* Local */}
      <DocsSection id="local-mongo" title="MongoDB Local">
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>Install MongoDB Community Server</li>
          <li>Start MongoDB (runs on port 27017 by default)</li>
          <li>The <code className="bg-muted px-1 py-0.5 rounded text-xs">smart-leads</code> database is created automatically</li>
          <li>Optionally install MongoDB Compass for a GUI</li>
        </ol>
        <DocsCodeBlock
          title="server/.env (default)"
          code={`MONGODB_URI=mongodb://localhost:27017/smart-leads`}
        />
      </DocsSection>

      {/* Docker */}
      <DocsSection id="docker" title="Docker Setup">
        <p className="text-sm text-muted-foreground mb-3">
          Run the entire stack with Docker Compose (MongoDB + Server + Client):
        </p>
        <DocsCodeBlock
          title="Terminal"
          code={`docker-compose up --build`}
        />
        <DocsTable
          headers={['Service', 'Port', 'Description']}
          rows={[
            ['MongoDB', '27017', 'Database'],
            ['Server', '5000', 'Express API'],
            ['Client', '3000', 'Next.js (via Nginx)'],
          ]}
        />
        <p className="text-xs text-muted-foreground mt-2">
          If using Atlas instead of local MongoDB, comment out the <code className="bg-muted px-1 py-0.5 rounded text-xs">mongo</code> service in docker-compose.yml.
        </p>
      </DocsSection>

      {/* Seed Data */}
      <DocsSection id="seed-data" title="Seed Data">
        <p className="text-sm text-muted-foreground mb-3">
          Create the default admin account:
        </p>
        <DocsCodeBlock
          title="Terminal (in server/)"
          code={`npm run create-admin`}
        />
        <DocsTable
          headers={['Role', 'Email', 'Password']}
          rows={[
            ['Admin', 'admin@smartleads.com', 'admin123'],
          ]}
        />
        <p className="text-sm text-muted-foreground mt-3">
          You can also import sample leads using the CSV Import feature (Admin → Leads → Import CSV).
        </p>
      </DocsSection>

      {/* Troubleshooting */}
      <DocsSection id="troubleshooting" title="Troubleshooting" showSeparator={false}>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-1">MongoDB connection refused</h4>
              <p className="text-xs text-muted-foreground">
                Make sure MongoDB is running locally, or check your Atlas URI. The server logs helpful hints on connection failure.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-1">Atlas SRV lookup fails (querySrv ECONNREFUSED)</h4>
              <p className="text-xs text-muted-foreground">
                Your network blocks MongoDB DNS. The server already uses Google DNS (8.8.8.8) as a fallback. If it still fails, try a mobile hotspot or VPN.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-1">Port 5000 already in use</h4>
              <p className="text-xs text-muted-foreground">
                Another process is using port 5000. Kill it with <code className="bg-muted px-1 py-0.5 rounded text-xs">netstat -ano | findstr :5000</code> then <code className="bg-muted px-1 py-0.5 rounded text-xs">taskkill /PID &lt;pid&gt; /F</code>.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-1">Rate limit error (429)</h4>
              <p className="text-xs text-muted-foreground">
                Auth endpoints allow 10 requests per 15 minutes. Wait or restart the server to reset.
              </p>
            </CardContent>
          </Card>
        </div>
      </DocsSection>
    </DocsLayout>
  );
}
