# CPS Academy Frontend

Modern React interface for the CPS Academy API. It ships with role-based authentication, course browsing for learners, and a developer-only catalog management view.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

The application expects the backend to run locally on port `4000`. To point at another origin set `VITE_API_URL` in an `.env` file (for example `VITE_API_URL=https://cps-api.example.com`).

## Available scripts

- `npm run dev` – start Vite in development mode with hot reloading
- `npm run build` – create a production build
- `npm run preview` – preview the production build locally
- `npm run lint` – run ESLint against the source files

## Feature tour

- **Authentication** – register or log in, with JWT stored in local storage and auto-attached to API requests
- **Role-aware catalog** – only courses matching your role appear, each with modules, topics, and class recordings
- **Developer workspace** – create, update, and delete courses with a guided form that mirrors the backend schema
- **Polished UI** – responsive layout, animated loaders, inline alerts, and toast notifications for state feedback

To explore different experiences quickly, log in with the seeded credentials listed in the backend README (normal, student, social-manager, developer).
