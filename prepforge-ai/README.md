# PrepForge AI

A full-stack AI-powered interview & career prep platform.

## Project Structure

```
prepforge-ai/
├── frontend/                 # Next.js / React app
│
├── backend/
│   ├── src/
│   │   ├── modules/          # Feature-based modules (modular monolith)
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── dashboard/
│   │   │   ├── dsa/
│   │   │   ├── jobs/
│   │   │   ├── resume/
│   │   │   ├── ai/
│   │   │   ├── interview/
│   │   │   └── notification/
│   │   ├── config/           # DB connection, env config, third-party clients
│   │   ├── middleware/       # Auth guards, error handling, request validation
│   │   ├── routes/           # Top-level route aggregation (mounts module routes)
│   │   ├── utils/            # Shared helper functions
│   │   └── server.ts         # Express app entry point
│
├── docker/                   # Dockerfiles & docker-compose config
├── docs/                     # Architecture notes, DB design, API planning
└── README.md
```

## Architecture (high level)

```
Browser
   │
   ▼
Next.js Frontend
   │
   ▼
Express Backend
   ├── Auth Module
   ├── Dashboard Module
   ├── DSA Module
   ├── Job Module
   ├── Resume Module
   ├── AI Module
   ├── Interview Module
   └── Notification Module
         │
         ├── PostgreSQL
         ├── Redis
         └── Gemini API
```

## Infrastructure (local dev)

- 1x PostgreSQL container (all tables: Users, Applications, DSA Problems, Resume, Roadmaps, Interviews, Notifications)
- 1x Redis container (cache + BullMQ queue + optional sessions)
- 1x Backend container (Express: REST APIs + Socket.io in the same server)
- 1x Frontend container (Next.js)

No Kubernetes, no Nginx, no Kafka/RabbitMQ at this stage — kept intentionally simple.

## Status

Structure only — no implementation yet. Built in phases; see `docs/` for planning notes as they're added.
