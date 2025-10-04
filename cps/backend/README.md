# CPS Academy Backend

Node.js/Express API with MongoDB for course management and role-based access control.

## Demo Credentials

| Role                 | Email                  | Password    |
| -------------------- | ---------------------- | ----------- |
| Normal User          | welcome@cpsacademy.com | password123 |
| Student              | student@cpsacademy.com | password123 |
| Social Media Manager | smm@cpsacademy.com     | password123 |
| Developer            | dev@cpsacademy.com     | password123 |

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Make sure MongoDB is running locally or update MONGODB_URI in .env
# Then seed the database with demo data
npm run seed

# Start development server
npm run dev
```

The API runs on http://localhost:4000

## Database Setup

This project uses **MongoDB** with Mongoose ODM.

**Local MongoDB:**

```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Or run manually
mongod --config /usr/local/etc/mongod.conf
```

**Cloud MongoDB (MongoDB Atlas):**

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Get your connection string
3. Update `MONGODB_URI` in `.env`

## API Endpoints

### Authentication

- `POST /api/auth/register` — Create a new account (defaults to the `normal` role)
- `POST /api/auth/login` — Login with email/password, returns JWT token

**Example:**

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@cpsacademy.com","password":"password123"}'
```

### Courses (Protected)

- `GET /api/courses` — List courses accessible to the authenticated user's role
- `GET /api/courses/:courseId` — Get detailed course info with modules/classes (supports Mongo `_id` or course `slug`)
- `POST /api/courses` — **Developer only**. Create a new course with modules, topics, and class recordings.
- `PATCH /api/courses/:courseId` — **Developer only**. Update course metadata, modules, or classes (slug recalculates if the title changes).
- `DELETE /api/courses/:courseId` — **Developer only**. Permanently remove a course.

**Example:**

```bash
curl http://localhost:4000/api/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

```bash
# Developer-only example
curl -X POST http://localhost:4000/api/courses \
  -H "Authorization: Bearer DEV_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Design Systems Mastery",
    "description": "Build scalable component libraries and governance workflows.",
    "audience": ["developer"],
    "modules": [
      {
        "title": "Design Tokens Kickoff",
        "topics": ["Token Types", "Automation"],
        "classes": [
          {
            "title": "Tokens in Practice",
            "duration": 45,
            "recordingUrl": "https://www.youtube.com/watch?v=fZ2JKUy1jwg"
          }
        ]
      }
    ]
  }'
```

## Project Structure

```
backend/
├── src/
│   ├── config.js              # Environment config
│   ├── server.js              # Express app setup
│   ├── controllers/           # Route handlers
│   ├── database/
│   │   ├── connect.db.js     # MongoDB connection
│   │   └── seed.js           # Database seeder
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification & role checks
│   ├── models/               # Mongoose schemas
│   │   ├── user.model.js     # User schema with auth
│   │   └── course.model.js   # Course/Module/Class schemas
│   ├── routes/               # API route definitions
│   └── services/             # Business logic
└── package.json
```

## Mongoose Models

### User Model

- Email (unique, validated)
- Name
- Role (enum: normal, student, social-manager, developer)
- Password (hashed with bcrypt)
- Timestamps

### Course Model

- Title & Description
- Slug (generated from title, used in URLs)
- Audience (array of roles)
- Modules (embedded subdocuments)
  - Title, Topics (array)
  - Classes (embedded subdocuments)
    - Title, Duration, Recording URL

## Role-Based Access

Courses are filtered by user role and only developers can curate the catalog:

- **Normal User**: UX Fundamentals, Brand Storytelling
- **Student**: UX Fundamentals, Modern Web Platform
- **Social Media Manager**: UX Fundamentals, Brand Storytelling
- **Developer**: UX Fundamentals, Modern Web Platform (plus full create/update/delete access)

## Environment Variables

```env
PORT=4000
JWT_SECRET=your-secret-key
TOKEN_EXPIRY=2h
MONGODB_URI=mongodb://localhost:27017/cps-academy
```

## Scripts

- `npm run dev` — Start development server with nodemon
- `npm start` — Start production server
- `npm run seed` — Seed database with demo users & courses
