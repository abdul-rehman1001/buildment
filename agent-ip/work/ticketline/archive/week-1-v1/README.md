# Ticketline — course source

**Status:** Week 1 draft
**Course slug:** `ticketline`
**Source format:** Markdown + MDX components, compatible with the platform importer
**Time:** 4 weeks · 8 modules · 50 chapters · 210 hours core

## Week 1 map

| Module | Chapters | Outcome |
|---|---|---|
| 01 — Orientation and foundation | 1.1–1.6 | A deployed skeleton, an ERD, and a clear product scope |
| 02 — Auth, roles, and organizer onboarding | 2.1–2.6 | Secure sessions, role enforcement, and an organizer account |
| 03 — Events and ticket types | 3.1–3.6 | A published event with ticket types, capacity, images, and search |

Week 1 demo: **an organizer publishes an event and a buyer finds it.**

## Stack

- **Web:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS
- **API:** Express 5, TypeScript, Zod, Prisma 7
- **Data:** PostgreSQL 16, Redis 7, MinIO (S3-compatible)
- **Payments:** Stripe test mode (Week 2)
- **Email:** Resend, with a console fallback
- **Tests:** Vitest + supertest, Playwright in later weeks

## Repository layout used by the course

```
ticketline/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── docker-compose.yml
├── pnpm-workspace.yaml
├── package.json
└── .env.example
```

## Source format

Each chapter has YAML frontmatter:

```yaml
---
id: ticketline-01-01
title: "1.1 — What you're building"
module: 1
lesson: 1
stepType: Read
phase: "Week 1"
summary: "..."
estimatedMinutes: 45
prerequisites: []
resources: []
media: []
---
```

`stepType` is one of `Read`, `Learn`, `Build`, `Check`, `Gate`, `Wrap`.

## Local setup

The learner's app is a separate repository, not this course source folder.

```bash
docker compose up -d
pnpm install
pnpm --filter api db:migrate
pnpm --filter api dev
pnpm --filter web dev
```

The API runs on `http://localhost:4000`; the web app on `http://localhost:3000`.

## Import note

The current platform importer is hardcoded to the FreshMarket course. Ticketline is authored here first; wiring a generic importer or importing through the in-app editor is the next platform task. Do not edit `content/transformed/` by hand.
