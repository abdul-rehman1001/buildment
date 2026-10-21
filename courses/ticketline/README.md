# Ticketline — course source

**Status:** Week 1 v2 draft
**Course slug:** `ticketline`
**Source format:** Markdown + MDX components, compatible with the platform importer
**Time:** 4 weeks · 8 modules · 44 chapters · 210 hours core

## Week 1 map

| Module | Chapters | Outcome |
|---|---|---|
| 01 — Foundation | 1.1–1.4 | The product contract, trust boundaries, architecture, data model, and a running skeleton |
| 02 — Auth and roles | 2.1–2.4 | Sessions, signup/login/logout, role and ownership checks, onboarding, and auth tests |
| 03 — Events and ticket types | 3.1–3.4 | Event lifecycle and time zones, pricing and capacity, public page and search, Week 1 gate |

**12 chapters.** Week 1 demo: **an organizer publishes an event and a buyer finds it.**

Week 1 diagrams live in `frontend/public/course-assets/ticketline/` and are consumed through `diagram` fences or live Mermaid/Trace components.

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
title: "1.1 — The product, the promise, and the four invariants"
module: 1
lesson: 1
stepType: Read
phase: "Week 1"
summary: "..."
estimatedMinutes: 55
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
pnpm --filter api prisma migrate dev
pnpm --filter api dev
pnpm --filter web dev
```

The API runs on `http://localhost:4000`; the web app on `http://localhost:3000`.

## Course quality rules

- Concept/build chapters: ≥ 1,200 prose words, at least one diagram, ≤ 6 top-level components, ≤ 3 assessment interactions.
- Checkpoint/gate chapters: ≥ 700 prose words.
- One `LearningObjectives` per module, one `ChapterRecap` per module gate, one `OpenQuestion` only at a gate/defense.
- Run `node agent-ip/scripts/audit-course.mjs courses/ticketline` before review.

## Import

```bash
pnpm content:import:ticketline
```

The importer reads `course.yaml`, validates the source, and writes transformed output to `agent-ip/work/ticketline/transformed/`.
