# API Documentation

**Base URL:** `http://localhost:5000/api`

**Rate Limits:**
- General: 100 requests per 15 minutes
- Auth: 10 requests per 15 minutes

**Response Format:**
```json
// Success
{ "success": true, "data": {}, "message": "Optional" }

// Error
{ "success": false, "error": "Description", "statusCode": 400 }
```

---

## Authentication

### POST /auth/register

Register a new user (always creates a Sales role).

**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | string | Yes | Min 2 characters |
| email | string | Yes | Valid email format |
| password | string | Yes | Min 6 characters |

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "664a...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales"
    }
  },
  "message": "User registered successfully."
}
```

**Error Responses:**
- `400` — Validation error (name too short, invalid email, etc.)
- `409` — User with this email already exists
- `429` — Too many authentication attempts

---

### POST /auth/login

Login with credentials.

**Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "664a...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  },
  "message": "Login successful."
}
```

**Error Responses:**
- `400` — Validation error
- `401` — Invalid email or password
- `429` — Too many authentication attempts

---

### GET /auth/me

Get current authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "664a...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

**Error Responses:**
- `401` — Access denied / Invalid token

---

## Leads

All lead endpoints require `Authorization: Bearer <token>` header.

### GET /leads

List leads with pagination and filters. All filters work in combination.

**Query Parameters:**

| Param | Type | Description | Default |
|-------|------|-------------|---------|
| status | string | New, Contacted, Qualified, Lost | — |
| source | string | Website, Instagram, Referral | — |
| search | string | Search name or email (case-insensitive) | — |
| sort | string | "latest" or "oldest" | latest |
| page | number | Page number | 1 |
| limit | number | Items per page (max 100) | 10 |

**Example:** `GET /leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1&limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "leads": [
      {
        "_id": "664b...",
        "name": "Rahul Kumar",
        "email": "rahul@example.com",
        "status": "Qualified",
        "source": "Instagram",
        "createdAt": "2024-05-20T10:30:00.000Z",
        "updatedAt": "2024-05-20T10:30:00.000Z"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

### POST /leads

Create a new lead. **Admin only.**

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Instagram"
}
```

| Field | Type | Required | Valid Values |
|-------|------|----------|-------------|
| name | string | Yes | Min 2 characters |
| email | string | Yes | Valid email |
| status | string | Yes | New, Contacted, Qualified, Lost |
| source | string | Yes | Website, Instagram, Referral |

**Success Response (201):**
```json
{
  "success": true,
  "data": { "_id": "...", "name": "Jane Smith", ... },
  "message": "Lead created successfully."
}
```

**Error Responses:**
- `400` — Validation error
- `401` — Not authenticated
- `403` — Insufficient permissions (not admin)

---

### GET /leads/:id

Get a single lead by ID. **All roles.**

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "664b...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Instagram",
    "createdAt": "2024-05-20T10:30:00.000Z",
    "updatedAt": "2024-05-20T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `404` — Lead not found

---

### PUT /leads/:id

Update a lead (all fields). **Admin only.**

**Request Body (all fields optional):**
```json
{
  "name": "Jane Updated",
  "status": "Contacted"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { ... updated lead ... },
  "message": "Lead updated successfully."
}
```

---

### PATCH /leads/:id/status

Update lead status only. **All roles** (Sales can update status).

**Request Body:**
```json
{
  "status": "Contacted"
}
```

| Field | Type | Required | Valid Values |
|-------|------|----------|-------------|
| status | string | Yes | New, Contacted, Qualified, Lost |

**Success Response (200):**
```json
{
  "success": true,
  "data": { ... updated lead ... },
  "message": "Lead status updated successfully."
}
```

---

### DELETE /leads/:id

Delete a lead. **Admin only.**

**Success Response (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Lead deleted successfully."
}
```

---

### GET /leads/stats

Get lead analytics with optional date range filtering. **All roles.**

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| from | string | Start date (YYYY-MM-DD) |
| to | string | End date (YYYY-MM-DD) |

**Example:** `GET /leads/stats?from=2024-01-01&to=2024-12-31`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 132,
    "byStatus": { "New": 45, "Contacted": 38, "Qualified": 30, "Lost": 19 },
    "bySource": { "Website": 60, "Instagram": 42, "Referral": 30 },
    "daily": [
      { "date": "2024-05-18", "count": 5 },
      { "date": "2024-05-19", "count": 8 }
    ]
  }
}
```

---

### GET /leads/export

Export leads as CSV file. **Admin only.**

Accepts the same filter query parameters as `GET /leads` (except page/limit).

**Response Headers:**
- `Content-Type: text/csv`
- `Content-Disposition: attachment; filename=leads-export.csv`

**CSV Format:**
```
Name,Email,Status,Source,Created At,Updated At
John Doe,john@example.com,New,Website,2024-05-20T10:30:00.000Z,2024-05-20T10:30:00.000Z
```

---

### POST /leads/import

Import leads from CSV file. **Admin only.**

**Headers:** `Content-Type: multipart/form-data`

**Form Data:**
- `file` — CSV file (max 5MB, must have columns: Name, Email, Status, Source)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "imported": 122,
    "failed": 10,
    "errors": [
      "Row 6: Invalid source \"Facebook\". Must be one of: Website, Instagram, Referral",
      "Row 8: Invalid status \"Unqualified\". Must be one of: New, Contacted, Qualified, Lost"
    ],
    "total": 132
  },
  "message": "Successfully imported 122 leads."
}
```

**Error Responses:**
- `400` — No file uploaded / Invalid CSV format / No valid rows
- `403` — Insufficient permissions

---

## Error Codes Reference

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Not Found |
| 409 | Conflict (duplicate) |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |
