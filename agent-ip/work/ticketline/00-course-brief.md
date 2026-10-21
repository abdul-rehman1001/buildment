---
artifact: course-brief
course: ticketline
working_title: "Ticketline — Build a Production-Grade Event Ticketing Platform"
version: 1
status: draft
owner: Course engineering
target_publish: TBD
---

# Course brief — Ticketline

## One sentence

Learners build and deploy a production-grade event ticketing platform where organizers publish events, buyers purchase tickets safely under concurrency, and gate staff check attendees in online or offline.

## Learner

- **Who:** a developer with JavaScript or TypeScript fundamentals, one prior CRUD app, Git and command-line comfort, and basic SQL.
- **Time:** four weeks at roughly 10 hours per day — 210 hours on the core path, up to 280 with stretch work.
- **Motivation:** wants a portfolio project that demonstrates production engineering, not another tutorial clone.
- **What they do with it:** deploy it, demo it in interviews, and defend the architecture in a viva.

## Outcomes

By the end, the learner can:

1. Model events, ticket types, holds, orders, tickets, and scans with explicit invariants.
2. Implement concurrency-safe inventory so the last ticket cannot be sold twice.
3. Integrate Stripe test-mode payments with webhook signature verification, idempotency, and reconciliation.
4. Issue QR tickets and implement gate check-in with duplicate prevention and an offline fallback.
5. Harden the system with authentication, role-based authorization, validation, rate limits, tests, CI, deployment, and observability.
6. Defend the architecture, trade-offs, and failure modes without notes.

## Demo

In five minutes, the learner shows:

1. An organizer creates and publishes an event with two ticket types and a capacity.
2. Two buyers race for the last ticket; one gets a hold, the other gets a clear conflict.
3. The winner pays with a Stripe test card; a webhook confirms the order and issues a QR ticket.
4. A gate staff member scans the ticket; a second scan is rejected as a duplicate.
5. The scanner goes offline, checks in another ticket, reconnects, and syncs without duplication.
6. The organizer dashboard shows sales, capacity, and check-in counts.

## Product scope

### Must have

- Organizer, buyer, gate staff, and admin roles.
- Event lifecycle: draft, published, cancelled, completed.
- Ticket types, prices, sale windows, capacity, and per-order limits.
- Inventory holds with expiry and release.
- Stripe test-mode checkout and webhook confirmation.
- Orders with price snapshots and ticket issuance.
- QR tickets with signed, opaque codes.
- Gate check-in with duplicate prevention.
- Offline check-in fallback with sync and conflict handling.
- Organizer dashboard for sales and check-ins.
- Minimal admin view.
- Auth, RBAC, validation, rate limits, tests, CI, deploy, logs, and a runbook.

### Should have

- Refunds and cancellations.
- Search and filters for public events.
- Email delivery of tickets, with a console fallback.
- Basic analytics: sales over time, check-in rate.
- A seeded demo dataset with realistic edge cases.

### Out of scope

- Real payment capture or payouts to organizers.
- Native mobile apps.
- Live streaming or video.
- Full offline-first sync engine.
- Seat maps in the general course; reserved seating belongs to the Sports and Cinema variants.
- Dynamic pricing, secondary resale, transfers, and BNPL.
- Multi-currency and tax handling.
- Advanced bot detection beyond rate limits and a simple queue.

## Production bar

The capstone must include:

- session-based authentication and role-based authorization;
- PostgreSQL schema with migrations and indexes;
- validated input and a consistent error envelope;
- a background worker for hold expiry and email;
- object storage for event images;
- Stripe test-mode payments and a verified webhook;
- rate limits on holds, checkout, and scan;
- unit, integration, and end-to-end tests;
- CI and a deployed web and API;
- structured logs and error reporting;
- a README, runbook, and rollback notes;
- seed data with realistic edge cases.

## Variants

1. **Festival** — multi-day passes, access zones, wristband re-entry. Hardest constraint: zone entitlements and re-entry.
2. **Conference** — sessions, add-ons, badge printing. Hardest constraint: session-level capacity and add-on selection.
3. **Sports** — seat map, season passes, resale rules. Hardest constraint: seat-level inventory and season packages.
4. **Workshops** — recurring sessions, waitlists, attendance. Hardest constraint: recurring capacity and waitlist promotion.
5. **Cinema** — showtimes, seat selection, screens. Hardest constraint: showtime scheduling and seat holds.
6. **Museum** — timed-entry slots, memberships, group bookings. Hardest constraint: slot capacity and member windows.

## Constraints

- Stack is proposed, not final: Next.js + TypeScript, Express + TypeScript, PostgreSQL + Prisma, Redis + BullMQ, Stripe test mode, S3-compatible storage, Resend or a console email fallback.
- Payments are test mode only. No real money moves.
- No secrets in the repository.
- The learner's app is a separate repository, not inside the course source.
- The course must be finishable in the time budget without requiring a paid service.

## Non-goals

- Replacing Ticketmaster or building a production-scale ticketing business.
- Teaching PCI compliance or real payment operations.
- Teaching advanced fraud detection, ML pricing, or resale markets.
- Teaching native mobile development.
- Teaching every queueing or distributed-systems pattern. We teach the ones the product needs.

## Success signals

- The learner deploys a working URL and completes the five-minute demo.
- The race test proves no overselling.
- A duplicate webhook does not duplicate tickets.
- A duplicate scan does not admit the same ticket twice.
- Offline scans sync without duplicates.
- The learner can explain the hold model, the concurrency mechanism, and the webhook idempotency contract.
- Two different variants produce recognisably different portfolio projects.

## Open decisions for instructors

1. Split web/API or a single Next.js full-stack app?
2. Stripe Checkout or Payment Intents/Elements?
3. Session cookies or JWT?
4. General admission in the core course, with seat maps only in variants?
5. Cached offline fallback or a full offline-first sync engine?
6. Are refunds and admin core or stretch?
7. Which deployment target should the course standardise on?
8. How much bot mitigation belongs in the core course?

These are resolved at G2B. No blueprint or chapter is written before that.
