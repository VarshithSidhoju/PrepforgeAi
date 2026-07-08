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

# PrepForge AI

PrepForge AI is an AI-powered interview preparation platform designed for software engineers preparing for top-tier companies like Google, Amazon, Microsoft, Meta, and others.

## Features

- DSA Progress Tracker
- Job Application Tracker
- AI Resume Analyzer
- AI Roadmap Generator
- AI Mock Interviews
- Company Interview Knowledge Base
- Personalized Dashboard

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- PostgreSQL
- Redis
- PgVector

### AI
- Gemini API
- RAG

### DevOps
- Docker
- GitHub Actions
- Prometheus
- Grafana

## Project Status

🚧 Currently under development.

## Infrastructure (local dev)

- 1x PostgreSQL container (all tables: Users, Applications, DSA Problems, Resume, Roadmaps, Interviews, Notifications)
- 1x Redis container (cache + BullMQ queue + optional sessions)
- 1x Backend container (Express: REST APIs + Socket.io in the same server)
- 1x Frontend container (Next.js)

No Kubernetes, no Nginx, no Kafka/RabbitMQ at this stage — kept intentionally simple.

## Status

Structure only — no implementation yet. Built in phases; see `docs/` for planning notes as they're added.
