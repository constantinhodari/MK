# Development guide

## Environment files

Create `server/.env` from `server/.env.example` when backend work begins. Never commit secrets. Local MongoDB should use a database-specific URI such as `mongodb://127.0.0.1:27017/global_scholars_hub`.

## Quality gates per phase

1. `npm run lint`
2. Unit tests for validators, services, and permission rules
3. API integration tests against an isolated local database
4. `npm run build`
5. Responsive checks at the documented breakpoints
6. Keyboard and reduced-motion checks
7. Dependency and secret scan before merge

## Commit boundaries

Prefer small commits by domain: `architecture`, `design-system`, `auth`, `opportunities`, `services`, `learning`, `admin`, and `hardening`. Do not mix a schema migration with unrelated visual changes.
