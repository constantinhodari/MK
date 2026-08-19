# MongoDB database plan

## Collections

`users`, `refreshTokens`, `passwordResets`, `scholarships`, `jobs`, `internships`, `programs`, `applications`, `bookmarks`, `writingOrders`, `websiteOrders`, `courses`, `lessons`, `quizzes`, `courseProgress`, `certificates`, `blogs`, `comments`, `testimonials`, `notifications`, `subscribers`, `messages`, `auditLogs`, and `settings`.

## Core ownership rules

- `users` owns identity and role; never embed sensitive auth secrets in public projections.
- `applications`, `bookmarks`, `orders`, `notifications`, and `courseProgress` always carry `userId` and are scoped server-side.
- Opportunities use a shared normalized shape for title, slug, description, country, tags, status, deadline, media, and audit metadata, with type-specific fields.
- All mutable documents have `createdAt`, `updatedAt`, `createdBy`, and `updatedBy` where applicable.
- Soft archive content with `status`; reserve hard deletion for controlled admin maintenance.

## Required indexes

- Unique: `users.email`, all public `slug` fields.
- Discovery: `{ status: 1, deadline: 1 }`, `{ country: 1, category: 1 }`, and text/search indexes appropriate to the chosen MongoDB search strategy.
- User workspaces: `{ userId: 1, createdAt: -1 }` on applications, bookmarks, orders, notifications, and progress.
- Content moderation: `{ status: 1, publishedAt: -1 }` on blogs and courses.

## Data and security rules

Validate all input before model calls, project only safe public fields, sanitize filter objects, cap pagination, limit upload metadata, and never return password hashes, reset tokens, refresh tokens, or private audit details.
