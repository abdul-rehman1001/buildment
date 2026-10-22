---
artifact: curriculum-roadmap
course: ticketline
version: 1
status: draft
owner: curriculum-architect
instructors_reviewed: []
---

# Curriculum roadmap — Ticketline

> **Reviewer note:** this is the G2A roadmap, not the blueprint and not the course. It is deliberately short at the top and detailed in the appendix. Instructors are asked to confirm the shape: outcomes, sequence, hours, capstone, variants, and out-of-scope. They are not being asked to review prose, quiz wording, or block density yet.

## In one paragraph

Learners build **Ticketline**, a production-grade event ticketing platform. An organizer publishes an event with ticket types and capacity; buyers hold inventory, pay with Stripe test mode, and receive QR tickets; gate staff scan tickets online or offline; the organizer sees sales and check-ins. The course is a guided build: learners write the implementation, prove the invariants with tests, deploy the system, and defend the architecture.

## Learner and entry prerequisites

- **Learner:** a developer with JavaScript or TypeScript fundamentals, one prior CRUD app, Git and command-line comfort, and basic SQL.
- **Entry diagnostic:** a short check on HTTP, async/await, SQL joins, and Git. Missing skills map to a repair path, not a silent prerequisite.
- **Time:** four weeks at roughly 10 hours per day. Core path 210 hours; stretch path up to 280.
- **Environment:** Node 20+, pnpm, Docker for local Postgres/Redis, a Stripe test account, and a free-tier deployment target.

## Outcomes

| # | Outcome | Evidence |
|---|---|---|
| O1 | Model events, ticket types, holds, orders, tickets, and scans with explicit invariants | ERD, migration, invariant tests |
| O2 | Implement session auth and role-based authorization | Auth tests, role matrix, IDOR checks |
| O3 | Publish events and ticket types with correct capacity and sale windows | Organizer flow, public event page |
| O4 | Prevent overselling with concurrency-safe holds and expiry | Race test, hold-expiry test |
| O5 | Integrate Stripe test-mode payments with idempotent webhooks | Paid order, duplicate-webhook test |
| O6 | Issue signed QR tickets and deliver them | Ticket email, forged-code rejection |
| O7 | Check tickets in online and offline without duplicates | Online/offline scan tests |
| O8 | Harden, deploy, and defend the system | Deployed URL, test suite, runbook, viva |

## Four-week shape

| Week | Focus | Modules | Core hours | Demo at the end |
|---|---|---|---|---|
| 1 | Foundation and organizer flow | M1, M2, M3 | 64 | Organizer publishes an event; buyer finds it |
| 2 | Inventory and payments | M4, M5 | 60 | Last-ticket race is safe; paid order issues tickets |
| 3 | Tickets and gate | M6, M7 | 42 | QR ticket scans once; offline sync works |
| 4 | Hardening and defense | M8 + buffer | 44 | Deployed system, passing tests, viva |

**Core total:** 192 hours of chapter work + 18 hours of buffer/stretch = **210 hours**. The stretch path adds optional labs up to 280 hours.

## Capstone

**Ticketline, deployed.**

The learner demonstrates:

1. Organizer creates and publishes an event with two ticket types and a capacity.
2. Two buyers race for the last ticket; one gets a hold, the other gets a clear conflict.
3. The winner pays with a Stripe test card; a webhook confirms the order and issues a QR ticket.
4. Gate staff scans the ticket; a second scan is rejected as a duplicate.
5. The scanner goes offline, checks in another ticket, reconnects, and syncs without duplication.
6. The organizer dashboard shows sales, capacity, and check-in counts.

**Defense questions:** the hold state machine, the concurrency mechanism, the webhook idempotency contract, duplicate-scan handling, offline conflict resolution, time-zone handling, the authorization matrix, and what would change at 100× scale.

**Production requirements:** auth/RBAC, migrations, validation, background worker, object storage, rate limits, tests, CI, deploy, logs, runbook, seed data.

## Variants

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone evidence |
|---|---|---|---|---|---|
| **Festival** | Multi-day festival promoter and attendee | Multi-day access zones and re-entry | Pass tiers, zone entitlements, re-entry rules | `Pass`, `AccessZone`, `ScanEvent` | Multi-day pass scans into the correct zones; re-entry behaves correctly |
| **Conference** | Conference organizer and attendee | Session capacity and add-on selection | Agenda builder, session seats, badge printing | `Session`, `SessionSeat`, `AddOn` | Attendee buys a pass plus a limited session; badge scans once |
| **Sports** | Club and season-ticket holder | Seat-level inventory and season packages | Interactive seat map, season passes | `VenueSection`, `Seat`, `SeasonPass` | Two buyers race for one seat; season pass admits the right games |
| **Workshops** | Small-class instructor and student | Recurring sessions and waitlists | Waitlist promotion and attendance | `WorkshopSeries`, `Session`, `WaitlistEntry` | A cancellation promotes the next waitlisted learner |
| **Cinema** | Cinema chain and moviegoer | Showtime scheduling and seat holds | Showtime grid and hold expiry | `Screen`, `Showtime`, `SeatHold` | Two showtimes share a screen without conflict; holds expire |
| **Museum** | Museum and timed-entry visitor | Slot capacity and member windows | Timed slots, member windows, group entry | `TimeSlot`, `Membership`, `GroupBooking` | A member books a reserved window; capacity is enforced |

**Variant rule:** each variant must differ on at least four of the six dimensions in `02-course-architecture.md`. A canvas with different labels and the same model is a reskin.

## Out of scope

- Real payment capture, payouts, merchant onboarding, tax, or PCI compliance.
- Full bot detection, device fingerprinting, proof-of-work, or CAPTCHA infrastructure.
- Dynamic pricing, secondary resale, ticket transfers, or BNPL.
- Native mobile apps.
- Full offline-first sync or CRDTs.
- Reserved seat maps in the core course; they belong to Sports and Cinema.
- Multi-currency, invoicing, or accounting.
- Machine-learning recommendations or fraud scoring.
- Microservices, Kafka, or Kubernetes.

## Open decisions for instructors

| # | Decision | Recommendation | Why | Instructor decision |
|---|---|---|---|---|
| 1 | Split web/API or single Next.js full-stack? | Split: Next.js web + Express API, in one repo | Teaches the client/server trust boundary and independent deploy, which the capstone defense depends on | |
| 2 | Stripe Checkout or Payment Intents/Elements? | Stripe Checkout for the core; Elements as a stretch lab | Fastest path to a real test-mode payment; leaves room for the webhook deep dive | |
| 3 | Session cookies or JWT? | Session cookies with opaque tokens | Simpler revocation, safer default, less token-handling code | |
| 4 | General admission or reserved seating in core? | General admission in core; seat maps in Sports/Cinema | Keeps the core finishable; seat maps are a strong variant hero feature | |
| 5 | Offline: cached fallback or full sync engine? | Cached signed tickets + local scan queue + idempotent sync | Teaches the real conflict problem without building a CRDT | |
| 6 | Refunds and admin: core or stretch? | Refunds core; admin minimal | Refunds force the inventory-release and state-machine lesson; a full admin console does not | |
| 7 | Deployment target? | Web on Vercel; API + worker on Render/Fly; managed Postgres/Redis | Realistic split deploy without requiring a credit card for the core path | |
| 8 | Bot mitigation: rate limits or more? | Rate limits + a simple queue/backpressure signal | Teaches the principle without turning the course into a fraud-detection course | |
| 9 | Email: Resend or console? | Console fallback required; Resend optional | The course must be finishable without email credentials | |
| 10 | Course name? | Ticketline | Clear, product-like, and easy to brand across variants | |

## What happens after confirmation

1. G2B: instructors sign `roadmap-confirmation.md`.
2. G2C: the detailed blueprint, skill graph, timeline, project brief, and module briefs are derived from this roadmap.
3. G3: interaction map, assessment plan, and one sample chapter are reviewed.
4. Only then does chapter writing begin.

---

# Appendix A — Module and chapter sequence

**Legend:** C = concept, B = build, K = checkpoint/quiz, G = gate. Hours include reading, build, verification, and reflection.

## Module 1 — Foundation (20h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 1.1 | The product, the promise, and the four invariants | C | Explain the core loop and the four invariants using the product diagram | 5 |
| 1.2 | People, permissions, and trust boundaries | C | Map actors and prove role plus object-level authorization | 5 |
| 1.3 | Architecture, stack, and repository | C | Draw the request path, choose the stack, and scaffold the monorepo | 5 |
| 1.4 | Data model, migrations, and the running skeleton | B/G | Turn the invariants into a Prisma schema and pass the Module 1 gate | 5 |

**Gate evidence:** deployed skeleton, ERD asset, permission matrix, health test, learning log.

## Module 2 — Auth and roles (22h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 2.1 | Sessions, cookies, and the auth model | C | Explain the session lifecycle, token hashing, and cookie flags | 5.5 |
| 2.2 | Signup, login, logout, and account enumeration | B | Ship auth endpoints with generic errors, rate limits, and cookies | 5.5 |
| 2.3 | Roles, ownership, and IDOR | B | Enforce ownership on organizer and gate routes | 5.5 |
| 2.4 | Organizer onboarding, email verification, and auth tests | K/G | Make the role transition verified and prove the matrix with tests | 5.5 |

**Gate evidence:** auth tests, role matrix, IDOR test, onboarding verification, learning log.

## Module 3 — Events and ticket types (22h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 3.1 | Event lifecycle, creation, and time zones | C | Model states, publish readiness, and UTC + IANA time | 5.5 |
| 3.2 | Ticket types, pricing, and capacity | B | Add tiers, integer-cent prices, capacity, and price snapshots | 5.5 |
| 3.3 | The public event page, images, and search | B | Upload covers, render the storefront, and search the catalogue | 5.5 |
| 3.4 | Week 1 gate: publish and browse | G | Run the end-to-end demo and close Week 1 | 5.5 |

**Gate evidence:** published event, public page, search, diagrams, audit, learning log.

## Module 4 — Inventory, holds, and concurrency (30h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 4.1 | Why overselling is a trust failure | C | Explain the cost of a double sale and the invariants that prevent it | 4 |
| 4.2 | The hold model | C | Model active, converted, expired, and released holds | 4 |
| 4.3 | Atomic inventory | B | Use a transaction, row lock, and conditional update to claim inventory | 5 |
| 4.4 | Hold API | B | Create, extend, and release holds with idempotency keys | 4 |
| 4.5 | Hold expiry worker | B | Expire holds with delayed jobs and idempotent release | 4 |
| 4.6 | Concurrency tests | B | Prove the last ticket cannot be sold twice | 5 |
| 4.7 | Availability UI | K/G | Show a trustworthy countdown, sold-out, and retry state | 4 |

**Canvas:** seat-hold race (SVG timeline/bars) before 4.6; prediction before, transfer check after.

**Gate evidence:** race test, expiry test, availability UI, logging of hold transitions.

## Module 5 — Checkout and payments (30h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 5.1 | Payment flow and trust boundaries | C | Map client, API, Stripe, webhook, and order responsibilities | 4 |
| 5.2 | Stripe test mode | B | Create a test-mode checkout and use test cards | 4 |
| 5.3 | Order creation and price snapshots | B | Convert a hold to an order atomically with the price paid | 5 |
| 5.4 | Webhooks | B | Verify signatures, deduplicate events, and confirm idempotently | 5 |
| 5.5 | Payment failures and reconciliation | B | Handle expired holds, late events, and status drift | 4 |
| 5.6 | Refunds and cancellations | B | Refund an order and release inventory by policy | 4 |
| 5.7 | Verify payments | K/G | Test success, failure, duplicate webhook, and late webhook | 4 |

**Canvas:** payment webhook state machine (SVG) before 5.4; prediction before, transfer check after.

**Gate evidence:** paid order, duplicate-webhook test, refund path, reconciliation log.

## Module 6 — Tickets, QR codes, and delivery (18h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 6.1 | Ticket lifecycle | C | Model issued, valid, checked in, and void tickets | 3 |
| 6.2 | QR codes and signed tokens | B | Generate an opaque, signed ticket code with no PII | 4 |
| 6.3 | Email delivery | B | Send tickets with retries and a console fallback | 4 |
| 6.4 | Buyer ticket wallet | B | Show tickets, QR codes, and event details | 4 |
| 6.5 | Verify issuance and delivery | K/G | Prove uniqueness, delivery, and forged-code rejection | 3 |

**Canvas:** ticket lifecycle state machine (SVG) in 6.1.

**Gate evidence:** ticket email, QR uniqueness, forged-code rejection.

## Module 7 — Gate check-in and offline mode (24h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 7.1 | Check-in invariants | C | Define one-ticket-one-entry and the scan outcomes | 4 |
| 7.2 | Scanner page | B | Scan with a camera or enter a code manually | 4 |
| 7.3 | Scan API | B | Validate, mark, and return distinct scan states | 4 |
| 7.4 | Offline check-in | B | Cache signed tickets, queue scans, and sync idempotently | 4 |
| 7.5 | Conflict resolution | B | Handle two scanners, duplicates, and stale caches | 4 |
| 7.6 | Verify the gate | K/G | Test online, offline, duplicate, wrong-event, and stress cases | 4 |

**Canvas:** gate queue (SVG line/area) before 7.6; offline scan timeline in 7.4.

**Gate evidence:** online/offline scan tests, duplicate prevention, sync report.

## Module 8 — Hardening, deploy, and defense (26h)

| # | Chapter | Type | One-line outcome | Hours |
|---|---|---|---|---|
| 8.1 | Rate limits and abuse | B | Protect holds, checkout, and scan with per-user limits | 4 |
| 8.2 | Caching and query performance | B | Measure, cache the public page, and fix a slow query | 4 |
| 8.3 | Error handling and observability | B | Add structured logs, error reporting, and key metrics | 4 |
| 8.4 | Security review | B | Test IDOR, webhook forgery, QR tampering, and PII exposure | 4 |
| 8.5 | Tests and CI | B | Run unit, integration, and one end-to-end race test in CI | 4 |
| 8.6 | Deploy and operate | B | Deploy web, API, worker, Postgres, Redis, and storage; write the runbook | 3 |
| 8.7 | Capstone demo and viva | K/G | Demo the six-step script and defend the architecture | 3 |

**Canvas:** token bucket rate limiter (SVG) in 8.1; cache hit rate in 8.2.

**Gate evidence:** deployed URL, passing test suite, runbook, viva.

## Appendix B — Stretch path (up to 280h)

Optional labs, each with evidence:

- reserved seat map for Sports/Cinema (SVG seat map, accessibility seats, hold expiry);
- Stripe Elements instead of Checkout;
- ticket transfer with a signed handoff and revocation;
- waitlist promotion for Workshops;
- dynamic pricing ladder with price-at-hold snapshots;
- simple virtual waiting room;
- load test of the last-ticket race;
- PDF ticket and Apple/Google Wallet pass;
- multi-currency display (not settlement);
- incident postmortem: simulate a duplicate-scan incident and write the report.

## Appendix C — Instructor review questions

1. Is this the right sequence for how you teach production full-stack work?
2. Are the outcomes what you expect from a learner who finishes?
3. Is 210 hours realistic for your learners?
4. What is missing that you would refuse to teach the course without?
5. What would you cut?
6. Do the six variants represent the audiences you serve?
7. Is the capstone something you would be proud to review and defend?

## Confirmation

Instructors confirm this roadmap in `roadmap-confirmation.md`. No blueprint, sample chapter, or general course chapter is written until at least two instructors sign.
