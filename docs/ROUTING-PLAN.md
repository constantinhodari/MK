# Routing plan

Routes are grouped by layout and lazy-loaded at route boundaries.

## Public routes

| Route | Purpose | Indexing |
| --- | --- | --- |
| `/` | Product introduction and discovery entry point | index |
| `/scholarships` | Searchable scholarship directory | index |
| `/scholarships/:slug` | Scholarship details | index |
| `/jobs` | Searchable jobs directory | index |
| `/jobs/:slug` | Job details | index |
| `/internships` | Internship directory | index |
| `/internships/:slug` | Internship details | index |
| `/study-programs` | Study program directory | index |
| `/study-programs/:slug` | Program details | index |
| `/services/writing` | Writing service overview | index |
| `/services/studio` | Digital agency overview | index |
| `/courses` | Course catalog | index |
| `/blog` | Blog index | index |
| `/blog/:slug` | Blog article | index |
| `/contact` | Contact and quote entry point | index |

## Identity routes

`/login`, `/register`, `/forgot-password`, `/reset-password/:token`, `/verify-email` use `AuthLayout` and redirect authenticated users to their dashboard.

## Private routes

`/app`, `/app/saved`, `/app/applications`, `/app/notifications`, `/app/profile`, `/app/orders`, `/app/courses/:courseId`, `/employer`, and `/employer/postings` require a valid JWT and role-aware guards.

## Admin routes

`/admin`, `/admin/users`, `/admin/opportunities`, `/admin/content`, `/admin/courses`, `/admin/orders`, `/admin/messages`, `/admin/subscribers`, and `/admin/analytics` require `administrator` role plus server-side permission checks.

## Error routes

`/403`, `/404`, `/500`, and a root-level error boundary provide recovery actions and never expose stack traces.
