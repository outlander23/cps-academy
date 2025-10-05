# CPS Academy

CPS Academy is a full-stack platform for course management and role-based access to course details. It features a Node.js/Express backend, a modern React frontend, and MongoDB for data storage. The system supports users with different roles (Normal User, Student, Social Media Manager, Developer), each with tailored access to courses and features.

---

## 🚀 Live Demo

- **App:** [https://cps-ace.vercel.app/](https://cps-ace.vercel.app/)
- **Video Walkthrough:** [YouTube Demo](https://www.youtube.com/watch?v=Qtq2x5QuUjM)
- **GitHub Repository:** [outlander23/cps-academy](https://github.com/outlander23/cps-academy)

---

## Table of Contents

- [Features](#features)
- [Demo Accounts](#demo-accounts)
- [Courses & Data Model](#courses--data-model)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Overview](#api-overview)
- [Role-Based Access](#role-based-access)
- [License](#license)

---

## Features

**Frontend (React + Vite)**
- Authentication: Register and log in; JWT stored in local storage and attached to API requests
- Role-aware catalog: Courses filtered by user role, showing modules, topics, and class recordings
- Developer workspace: Create, update, and delete courses with guided forms
- Polished UI: Responsive, animated loaders, inline alerts, and toast notifications

**Backend (Node.js/Express)**
- REST API for course and user management
- JWT-based authentication and role checks
- Role-based filtering: Only developers can curate the catalog
- Mongoose models for users and courses, including modules and classes
- Demo data seeding of real accounts and course catalog

---

## Demo Accounts

Use these original seeded accounts to explore different roles:

| Role                 | Email                  | Password    |
|----------------------|------------------------|-------------|
| Normal User          | welcome@cpsacademy.com | password123 |
| Student              | student@cpsacademy.com | password123 |
| Social Media Manager | smm@cpsacademy.com     | password123 |
| Developer            | dev@cpsacademy.com     | password123 |

---

## Courses & Data Model

Courses are curated and assigned to specific roles. The core curriculum includes:

**UX Fundamentals**
- For: All roles
- Description: Design delightful experiences with user-centered strategies
- Modules: e.g. "Design Thinking", "Accessibility Essentials"
- Classes: e.g. "Intro to UX", "Practical Usability"

**Modern Web Platform**
- For: Students, Developers
- Description: Ship production-grade apps with React, Node.js, and cloud tooling
- Modules: "Advanced React Patterns", "Node.js Production Essentials"
- Classes: "Performance Profiling", "Node Deployment on Railway"

**Brand Storytelling for Social Media**
- For: Social Media Managers, Normal Users
- Description: Craft shareable narratives that grow communities across platforms
- Modules: "Narrative Frameworks", "Analytics & Iteration"
- Classes: "Magnetic Social Hooks", "Measuring Story Impact"

Each course consists of:
- Title, Description, Slug, Audience
- Modules (with topics)
- Classes (with title, duration, recording URL)

---

## Project Structure

```
cps-academy/
├── cps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── database/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── config.js
│   │   │   ├── server.js
│   │   │   └── app.js
│   │   └── README.md
│   ├── frontend/
│   │   ├── src/
│   │   ├── README.md
│   │   └── tailwind.config.js
└── README.md
```

---

## Setup Instructions

### Backend

1. **Install dependencies**
   ```bash
   cd cps/backend
   npm install
   ```

2. **Setup environment variables**
   - Copy `.env.example` to `.env` and configure as needed.

3. **Configure MongoDB**
   - Local: Install and start MongoDB (e.g. `brew install mongodb-community`)
   - Cloud: Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), update `MONGODB_URI` in `.env`

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```
   API runs at [http://localhost:4000](http://localhost:4000)

### Frontend

1. **Install dependencies**
   ```bash
   cd cps/frontend
   npm install
   ```

2. **Configure API URL (optional)**
   - Create `.env` and set `VITE_API_URL` if backend is running elsewhere.

3. **Start frontend**
   ```bash
   npm run dev
   ```
   Frontend expects backend at `http://localhost:4000`.

---

## Environment Variables

Example backend `.env`:
```
PORT=4000
JWT_SECRET=your-secret-key
TOKEN_EXPIRY=2h
MONGODB_URI=mongodb://localhost:27017/cps-academy
```

---

## Scripts

**Backend**
- `npm run dev` — Start development server with nodemon
- `npm start` — Start production server
- `npm run seed` — Seed database with demo users & courses

**Frontend**
- `npm run dev` — Start Vite in development mode
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## API Overview

- **Base URL:** `/v1/api`
- **Auth Routes:** `/auth` (login, register)
- **Course Routes:** `/courses` (list, detail, CRUD for developer role)
- Role-based filtering is enforced; JWT required for protected endpoints.

See [backend README](cps/backend/README.md) for detailed endpoints and models.

---

## Role-Based Access

| Role                 | Courses Accessible                        | Catalog Management |
|----------------------|-------------------------------------------|-------------------|
| Normal User          | UX Fundamentals, Brand Storytelling       | No                |
| Student              | UX Fundamentals, Modern Web Platform      | No                |
| Social Media Manager | UX Fundamentals, Brand Storytelling       | No                |
| Developer            | UX Fundamentals, Modern Web Platform      | Yes (CRUD)        |

---

## License

This project is currently unlicensed. See repository for details.

---

**Links:**  
- [Live Demo](https://cps-ace.vercel.app/)  
- [Video Demonstration](https://www.youtube.com/watch?v=Qtq2x5QuUjM)  
- [Backend README](cps/backend/README.md)  
- [Frontend README](cps/frontend/README.md)  
- [GitHub Repository](https://github.com/outlander23/cps-academy)
