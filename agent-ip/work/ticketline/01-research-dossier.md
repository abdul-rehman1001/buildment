---
artifact: research-dossier
course: ticketline
version: 1
status: draft
owner: research
sources_checked: 2026-10-20
---

# Research dossier — Ticketline

## Learner and context

The learner is a developer who can build a basic CRUD app but has not yet shipped a system with concurrency, payments, background jobs, or operational concerns. They need a project where the hard parts are visible and testable, not hidden behind a framework.

The course is four weeks at roughly 10 hours per day. The research supports a tight core: one event lifecycle, one ticket-purchase loop, one check-in loop, and the production concerns that make those loops trustworthy. Breadth is deliberately cut.

## Domain model

### Actors

- **Organizer** — creates and publishes events, defines ticket types and capacity, sees sales and check-ins, handles refunds.
- **Buyer / attendee** — browses events, selects tickets, holds inventory, pays, receives tickets, presents a QR code at the gate.
- **Gate staff** — scans tickets, handles duplicate and invalid scans, works offline when the network drops.
- **Admin** — platform-level view of users and events; can intervene but is not the main product surface.

### Core entities

| Entity | Purpose | Key invariant |
|---|---|---|
| `Event` | A published experience with a venue, time zone, sale window, and lifecycle | Only a published event is publicly purchasable |
| `TicketType` | A priced tier with capacity and per-order limits | Capacity is never negative |
| `Hold` | A time-bounded claim on inventory | At most one active hold per inventory unit |
| `Order` | A confirmed purchase with price snapshots | A paid order is idempotent per payment event |
| `Ticket` | A single admission credential | One ticket admits one attendee once |
| `Scan` | A check-in attempt | A duplicate scan is recorded, not silently ignored |
| `User` / `Session` | Identity and authentication | Sessions expire; roles are enforced server-side |

### Lifecycle notes

- **Event:** draft → published → cancelled/completed.
- **Hold:** active → converted or expired/released.
- **Order:** pending → paid → refunded/cancelled.
- **Ticket:** issued → valid → checked in / void.
- **Scan:** accepted → duplicate / invalid / wrong event / revoked.

## Hard constraints

1. **Inventory consistency under concurrency.** Two buyers can attempt to buy the last ticket at the same moment. The database, not the UI, must decide.
2. **Hold expiry and payment overlap.** A hold may expire while payment is in flight. The system must either extend the hold, re-acquire the inventory, or refund and notify.
3. **Payment idempotency.** Webhooks and retries can repeat. A duplicate payment event must not create a second order or a second set of tickets.
4. **Check-in correctness.** A ticket must admit one person once. Duplicate scans, wrong-event scans, and revoked tickets need distinct, observable outcomes.
5. **Offline operation.** Venue connectivity fails. The scanner must keep working from a synced ticket set and reconcile scans later without duplicates.
6. **Time zones and sale windows.** Events live in a local time zone; the system stores instants in UTC and displays the event zone.
7. **Abuse and load.** High-demand on-sales attract bots and bursts. Rate limits and a simple queue are part of the core; advanced fraud detection is not.
8. **Privacy and trust.** QR codes must not expose PII; scan endpoints must not leak buyer data; webhooks must be authenticated.

## Market scan

Current ticketing platforms compete on mobile ticketing, interactive venue mapping and reserved seating, secure payments, real-time inventory, access control, and offline validation. The market literature also emphasises mobile-first purchase, last-minute buying, fraud, and regulatory pressure around pricing transparency.

**Implication for the course:** the core should include mobile-friendly purchase, real-time availability, holds, payments, QR access control, and offline check-in. Reserved seating, dynamic pricing, BNPL, resale, and identity-linked ticketing are out of scope for the core and belong to variants or v2.

Sources: Softjourn, "Must-Have Event Ticketing Platform Features in 2026"; Let's Build Solutions, "Designing an Event Ticketing System" (2026).

## Existing courses and gaps

Most public ticketing tutorials stop at a CRUD event list and a fake checkout. They rarely cover:

- holds with expiry and the race between hold expiry and payment confirmation;
- database-level concurrency control and a test that proves no overselling;
- webhook signature verification and idempotency;
- QR issuance with signed, opaque tokens;
- duplicate-scan prevention and offline check-in reconciliation;
- operational concerns: rate limits, logs, runbooks, deployment.

**Course gap:** a guided build that makes those failure modes the centre of the course, with runnable tests and a real deployed demo.

## Technical landscape

| Concern | Proposed choice | Why | Verify at authoring |
|---|---|---|---|
| Web | Next.js 16 App Router + TypeScript | Modern UI, server components, easy deploy | Current version and App Router APIs |
| API | Express 5 + TypeScript | Clear route/middleware boundaries; easy to test | Express 5 behaviour and typings |
| Database | PostgreSQL 16 + Prisma 7 | Relational invariants, transactions, row locks, migrations | Prisma 7 adapter and migration workflow |
| Queue | Redis + BullMQ | Delayed hold-expiry jobs and retries | BullMQ delayed jobs and idempotency |
| Payments | Stripe test mode | Realistic checkout, webhooks, test cards | Stripe API version, Checkout vs PaymentIntent |
| Storage | S3-compatible (R2/S3) | Event images without bloating the database | Presigned upload flow |
| Email | Resend, with console fallback | Ticket delivery without blocking local dev | Current API and sandbox behaviour |
| QR | Server-generated signed token + QR renderer | Opaque, verifiable, no PII | Library and signing approach |
| Tests | Vitest + supertest + Playwright | Unit, API, and browser coverage | Current versions |
| Deploy | Web on Vercel; API + worker on Render/Fly; managed Postgres/Redis | Teaches real deployment boundaries | Free-tier limits and cold starts |

The exact versions are not learner-facing until the technical validator runs them. The course must not claim a version or API behaviour that has not been executed.

## Production failure modes

### 1. Overselling the last ticket

Two requests read "1 available" and both write. The fix is a conditional update or a row lock inside a transaction, not a UI disable. The test is a concurrent race against a real database.

Source: Let's Build Solutions (2026); PostgreSQL 16 explicit locking documentation.

### 2. Deadlock on multi-ticket holds

Two transactions lock the same inventory rows in different orders. The fix is deterministic lock ordering, short transactions, and a retry on deadlock. The course should include a failure test.

Source: PostgreSQL 16 documentation, §13.3.4 Deadlocks.

### 3. Hold expires while payment is in flight

The hold releases, another buyer takes the seat, and the first payment succeeds. The system must extend the hold at payment start or re-acquire the inventory before confirming; otherwise refund and notify.

Source: Let's Build Solutions (2026), "Payment Timeout Coordination."

### 4. Duplicate payment webhook

A webhook is delivered twice or retried. A naive handler creates two orders or two tickets. The fix is a unique payment-event ID and an idempotent confirmation transaction.

Source: Stripe idempotent requests documentation; Let's Build Solutions (2026), "idempotent order confirmation."

### 5. Duplicate or forged QR scan

The same ticket is presented twice, or a guessed code is accepted. The fix is a signed, opaque token, a unique ticket record, an atomic check-in, and a distinct duplicate response.

Source: Softjourn (2026), access control and double-scan prevention; QR Code Ticket, offline check-in.

### 6. Offline scan divergence

Two scanners check in the same ticket offline, or a scanner syncs a stale ticket list. The fix is a local scan queue, idempotent sync, conflict detection, and an explicit "duplicate/conflict" result rather than silent success.

Source: QR Code Ticket, "Offline check-in."

### 7. Stale availability display

The public page shows "available" after the last hold. The fix is a short-TTL read model and clear "checking availability" states; the write path remains authoritative.

Source: Let's Build Solutions (2026), consistency vs availability trade-offs.

### 8. Abuse at the hold and checkout endpoints

A script creates holds repeatedly. The fix is per-user/per-IP rate limits, idempotency keys, and a simple virtual queue or backpressure signal. Advanced bot detection is out of scope.

Source: Let's Build Solutions (2026), bot mitigation; market scan.

### 9. Event time zone bugs

The event shows the wrong start time after a DST change. The fix is storing UTC instants, storing the event's IANA time zone, and testing a DST boundary.

Source: domain reasoning; verify with the chosen date library during authoring.

### 10. Refund without inventory release

A refund is issued but the ticket remains sold or the inventory is not returned according to policy. The fix is an explicit refund state machine and an idempotent inventory-release step.

Source: domain reasoning; verify against Stripe refund behaviour during authoring.

## What not to teach

- Real payment capture, PCI compliance, merchant onboarding, payouts, or tax.
- Full bot detection, device fingerprinting, proof-of-work, or CAPTCHA infrastructure.
- Dynamic pricing, secondary-market resale, transfers, or BNPL.
- Native iOS/Android apps.
- A full offline-first CRDT sync engine.
- Reserved seat maps in the core course; keep them for the Sports and Cinema variants.
- Multi-currency, tax, invoicing, or accounting.
- Machine-learning recommendations or fraud scoring.
- Microservices, Kafka, or Kubernetes. The course teaches one API, one worker, one database, and one queue.

## Source table

| Claim | Source | Type | Date checked | Confidence |
|---|---|---|---|---|
| Ticketing platforms need holds, real-time inventory, access control, offline validation, and double-scan prevention | Softjourn, "Must-Have Event Ticketing Platform Features in 2026" | Industry analysis | 2026-10-20 | Medium-high |
| Holds need TTL expiry; payment confirmation must be idempotent; conditional updates and `FOR UPDATE SKIP LOCKED` are common patterns | Let's Build Solutions, "Designing an Event Ticketing System" (2026) | Practitioner system-design article | 2026-10-20 | Medium |
| `FOR UPDATE` locks rows until transaction end; deadlocks are resolved by aborting a transaction; consistent lock order reduces deadlocks | PostgreSQL 16 documentation, §13.3 | Primary documentation | 2026-10-20 | High |
| Idempotency keys make retries safe; use random keys; API v1 retains keys at least 24 hours | Stripe API reference, "Idempotent requests" | Primary documentation | 2026-10-20 | High |
| Offline check-in syncs a guest list to scanners, scans locally, and reconciles later; stale data is a known risk | QR Code Ticket, "Offline check-in" | Vendor documentation | 2026-10-20 | Medium |
| Mobile-first purchase, last-minute buying, fraud, and pricing transparency are current market pressures | Softjourn (2026) | Industry analysis | 2026-10-20 | Medium |

## Open questions for instructors

1. Split web/API or a single Next.js full-stack app?
2. Stripe Checkout or Payment Intents/Elements?
3. Session cookies or JWT?
4. General admission in core, with seat maps only in variants?
5. Cached offline fallback or full offline-first sync?
6. Refunds and admin: core or stretch?
7. Which deployment target should the course standardise on?
8. How much bot mitigation belongs in the core?
9. Should the course use a monorepo or two independent repositories?
10. Which QR scanning library is acceptable in the browser?

These questions are resolved at G2B. The roadmap marks recommendations; the instructors decide.
