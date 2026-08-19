# API plan

Base URL: `/api/v1`. JSON responses use `{ data, meta, error }`; errors use `{ code, message, fieldErrors, requestId }`.

## Public discovery

```text
GET    /opportunities
GET    /opportunities/:slug
GET    /scholarships
GET    /jobs
GET    /internships
GET    /programs
GET    /search/suggestions?q=
```

All list endpoints support allowlisted `q`, filters, `page`, `limit`, and `sort`. The server caps `limit` and rejects unknown filter operators.

## Authentication

```text
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/me
PATCH  /users/me
PATCH  /users/me/password
POST   /users/me/avatar
```

JWT access tokens are short-lived. Refresh tokens are rotated and stored securely. Passwords use bcrypt with a cost factor selected from environment configuration.

## User actions

```text
GET    /me/bookmarks
PUT    /me/bookmarks/:opportunityId
DELETE /me/bookmarks/:opportunityId
POST   /opportunities/:id/applications
GET    /me/applications
GET    /me/notifications
PATCH  /me/notifications/:id/read
```

## Admin and services

```text
POST/PATCH/DELETE /admin/opportunities/:id
GET               /admin/analytics
POST              /writing-orders
GET               /writing-orders/:id
POST              /website-orders
POST              /contact-messages
POST              /newsletter/subscribe
```

## Middleware order

`requestId → helmet → CORS allowlist → JSON/body limits → rate limit → request logger → auth (when protected) → permission guard → validator → controller → error handler`.

Controllers orchestrate HTTP concerns; services contain business rules; validators reject malformed input; the final error handler maps known errors and hides internals in production.
