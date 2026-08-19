# Phase 1 — Architecture and premium UI foundation

## Objective

Define a scalable application boundary for Global Scholars Hub before feature work begins. The expected outcome is a documented product architecture, a consistent design language, a stable route/API contract, and frontend/backend directories that later phases can extend without a structural rewrite.

## Product boundary

The platform has four bounded areas:

1. **Discovery** — scholarships, jobs, internships, and study programs.
2. **Services** — writing orders and digital agency quote requests.
3. **Learning** — courses, lessons, quizzes, assignments, certificates, and progress.
4. **Operations** — identity, notifications, dashboards, moderation, analytics, and admin workflows.

The public website is optimized for discovery and trust. Authenticated surfaces are task-oriented. Admin surfaces are data-dense and permission-gated.

## Architecture principles

- Feature-first frontend organization; shared UI stays framework-agnostic.
- API service boundaries instead of direct fetch calls inside views.
- Explicit ownership and role checks on every private resource.
- Server-side validation is authoritative; client validation is for fast feedback.
- Read-heavy discovery queries use indexed filters, pagination, and cache headers.
- New frontend modules use strict TypeScript, typed props, and typed API responses.
- Suspense boundaries and route-level lazy loading prevent layout shifts and reduce first-load JavaScript.
- Motion communicates hierarchy and state; `prefers-reduced-motion` is always respected.
- Public content is SEO-friendly and private content is excluded from indexing.
- No business feature should depend on a concrete database implementation in the UI.

## Repository structure

```text
global-scholars-hub/
├─ client/                         # Production frontend application
│  ├─ public/                      # Static files, robots.txt, favicon, OG assets
│  └─ src/
│     ├─ app/                      # App shell, providers, router, error boundaries
│     ├─ assets/                   # Imported optimized assets
│     ├─ components/               # Reusable UI primitives only
│     ├─ config/                   # Environment and feature flags
│     ├─ features/                 # Domain modules
│     │  ├─ auth/
│     │  ├─ opportunities/
│     │  ├─ services/
│     │  ├─ learning/
│     │  ├─ blog/
│     │  ├─ dashboard/
│     │  └─ admin/
│     ├─ hooks/                    # Cross-feature hooks
│     ├─ layouts/                  # Public, auth, dashboard, admin shells
│     ├─ lib/                      # Axios client, query cache, analytics helpers
│     ├─ routes/                   # Route modules and lazy boundaries
│     ├─ styles/                   # Tokens, Tailwind entry, global CSS
│     ├─ types/                    # Shared frontend types
│     └─ main.tsx                  # Application entry
├─ server/                         # Production API
│  └─ src/
│     ├─ config/                   # Environment, database, logger
│     ├─ controllers/              # HTTP orchestration only
│     ├─ middleware/               # Auth, permissions, errors, rate limits
│     ├─ models/                   # Mongoose schemas and indexes
│     ├─ routes/                   # Versioned route registration
│     ├─ services/                 # Business logic and external integrations
│     ├─ validators/               # Zod/Joi request schemas
│     ├─ utils/                    # Safe shared helpers
│     └─ app.js                    # Express composition root
├─ docs/                           # Product and engineering contracts
└─ README.md
```

## Reusable component plan

### Shared primitives

`Button`, `IconButton`, `Input`, `Select`, `Textarea`, `Badge`, `Card`, `Modal`, `Drawer`, `Tabs`, `Pagination`, `Skeleton`, `EmptyState`, `Toast`, `Avatar`, `Breadcrumbs`, `DataTable`, and `ErrorBoundary`.

### Layouts

- `PublicLayout`: SEO navigation, footer, and announcement region.
- `AuthLayout`: centered, low-distraction identity flows.
- `DashboardLayout`: sidebar, top bar, notifications, responsive drawer.
- `AdminLayout`: permission-aware navigation, dense tables, audit context.

### Feature components

Features own their cards, filters, forms, API hooks, and types. A scholarship card must not know how a job card stores data; both may compose the shared `OpportunityCard` primitive through typed variants.

## Non-functional targets

- Lighthouse targets: 90+ performance, accessibility, best practices, and SEO on public pages.
- Core Web Vitals: LCP under 2.5s, INP under 200ms, CLS under 0.1 on representative mobile hardware.
- Public discovery pages render useful content without authentication.
- Every private mutation emits an audit-friendly server log entry.
- API errors use one stable response shape and never leak stack traces in production.

## Phase 1 intentionally excludes

No business pages, auth flows, API controllers, database models, uploads, dashboards, AI integrations, or production data are implemented in this phase.
