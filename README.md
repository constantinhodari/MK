# Global Scholars Hub

Global Scholars Hub is a planned SaaS platform for discovering international scholarships, jobs, internships, study programs, learning resources, writing support, and digital product services.

## Phase 1 status

This phase establishes the architecture, design system, route contract, data model plan, API plan, and frontend/backend folder boundaries. The existing root Vite UI remains as a visual reference from the earlier prototype; new product features are intentionally deferred to later phases.

Read the phase documentation in [`docs/`](docs/README.md) before implementing a feature.

## Planned stack

- Frontend: React, Vite, Tailwind CSS, React Router, Framer Motion, GSAP, Axios, React Hook Form, React Icons, Swiper
- Backend: Node.js, Express.js, Mongoose, MongoDB
- Security: JWT, bcrypt, Helmet, rate limiting, validation, upload restrictions, MongoDB sanitization
- Development: npm, ESLint, strict TypeScript for new frontend modules

## Current reference app

The current runnable Vite prototype is kept at the repository root so the visual direction remains available while the production `client/` and `server/` boundaries are built phase by phase.

```bash
npm install
npm run dev
npm run build
```
