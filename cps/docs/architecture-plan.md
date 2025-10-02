# CPS Academy Platform – Architecture & Delivery Plan

## Project Goals

- Deliver a responsive course management platform with landing page, authentication, and role-driven course access by **6 Oct 2025**.
- Tech stack: **Next.js 14 (App Router) + Tailwind CSS** for frontend, **Strapi v4** + SQLite (dev) / PostgreSQL (prod) for backend.
- Deployments: Frontend on **Vercel**, backend on **Railway** with persistent Postgres.
- Provide high-quality UX, accessible design, and reliable auth backed by Strapi JWT.

## Personas & Roles

| Role                    | Access Summary                                                                    |
| ----------------------- | --------------------------------------------------------------------------------- |
| Guest (Unauthenticated) | Landing page, public marketing sections, CTA to log in/register.                  |
| Normal User             | Basic course catalog preview (limited details), cannot access class recordings.   |
| Student                 | Full course details, module contents, and class video playback.                   |
| Social Media Manager    | Marketing assets dashboard (hero copy, highlights), can publish testimonials.     |
| Developer               | Administrative insights, ability to manage course metadata and upload recordings. |

## Feature Breakdown

1. **Responsive Landing Page**
   - Hero, features, testimonials, CTA, FAQ.
   - Uses Tailwind + component-driven UI design.
   - Lighthouse target: Performance ≥ 90, Accessibility ≥ 95.
2. **Authentication & Authorization**
   - Strapi local auth (`/api/auth/local`) leveraged via Next.js server actions.
   - Tokens stored in HttpOnly cookies with rolling refresh (Strapi JWT + refresh token stored in secure cookie).
   - Middleware guard for protected routes.
3. **Course & Module Views**
   - Course listing, detail page, module breakdown, lesson player.
   - Students see video embeds; other roles see alternative actions or restricted states.
4. **Custom Feature (Planned)**
   - "Learning Journal" letting students bookmark lessons and add notes synced to Strapi.
5. **Observability & Feedback**
   - Toast notifications, logging to browser console in dev, future scope to integrate analytics.

## Backend (Strapi) Design

- **Content Types**
  - `Course`: `title`, `slug`, `description`, `level`, `coverImage`, `heroVideo`, `modules` (relation), `featured` flag.
  - `Module`: `title`, `summary`, `position`, `lessons` (relation), `course` (relation).
  - `Lesson`: `title`, `duration`, `videoUrl`, `topics` (component list), `resources` (media/files), `module` (relation).
  - `LearningJournalEntry`: `owner` (User relation), `lesson`, `note`, `createdAt`.
- **Roles & Permissions**
  - Extend Strapi Users & Permissions plugin with custom roles (Normal User, Student, Social Media Manager, Developer).
  - Use bootstrap script (`src/index.js` lifecycle) to seed roles, permissions, and sample content.
  - Restrict course queries via policies ensuring only allowed fields per role.
- **API Endpoints**
  - REST JSON with population controls.
  - Custom controller for `learning-journal` with role enforcement.
  - Token refresh endpoint leveraging Strapi extension.

## Frontend (Next.js) Architecture

- **Directory Structure**
  - `app/` with routes: `(marketing)/`, `(authenticated)/dashboard`, `courses/[slug]`, `login`, `register`.
  - `app/layout.tsx` sets theme, fonts, metadata.
  - `lib/` for API client, auth utilities, types (generated via OpenAPI or manual).
  - `components/ui/` for reusable Tailwind components using shadcn-style patterns.
- **State & Data Fetching**
  - Server Components for initial data fetch where possible.
  - `useAuth` client hook to expose user role & profile.
  - SWR or React Query for client revalidation of protected resources.
- **Styling & UX**
  - Tailwind with custom config (color palette, typography, breakpoints).
  - Accessibility: semantic HTML, keyboard nav, aria labels.
- **Testing**
  - Jest + React Testing Library for component tests.
  - Playwright for E2E (stretch goal).

## Security & Compliance

- HTTPS enforced in production; local dev via `.env` variables.
- HttpOnly cookies, CSRF token (double-submit pattern) for login forms.
- Input validation on both Strapi controllers and Next.js forms.

## Deployment Plan

1. **Backend (Railway)**
   - Provision Postgres database.
   - Configure environment variables (JWT secret, admin credentials).
   - Use `railway up` or GitHub Actions pipeline for automated deploys.
2. **Frontend (Vercel)**
   - Connect GitHub repo, set `NEXT_PUBLIC_API_URL` for Strapi endpoint.
   - Configure Edge Middleware for auth checks.
3. **CI/CD**
   - GitHub Actions pipeline for lint/test on PRs.

## Milestones

1. **Day 1-2**: Scaffold projects, define content types, basic landing page.
2. **Day 3-4**: Implement auth flows, dashboard, course rendering.
3. **Day 5**: Polish UI, integrate custom feature, write tests.
4. **Day 6**: Deploy, record demo video, finalize documentation.

## Risks & Mitigations

- **Role Permission Complexity**: Validate with integration tests hitting Strapi policies.
- **Deployment Time**: Prepare environment variables early; script seeds for idempotent deploy.
- **Video Hosting**: Use external providers (YouTube/Vimeo links) to avoid large assets; mock for local dev.

## Success Metrics

- Functional: Auth + role-based content works end-to-end.
- UX: Responsive across three breakpoints with no layout shifts.
- Code Quality: ESLint clean, Prettier applied, high cohesion components.
- Delivery: Documented workflow, ready for submission form.
