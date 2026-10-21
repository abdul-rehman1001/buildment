---
artifact: project-brief
course: ticketline
version: 1
owner: project-designer
roadmap_version: 1
roadmap_confirmed: true
---

# Project brief — Ticketline

## Product

Ticketline is a ticketing platform for small and mid-sized venues. Organizers publish events and ticket types; buyers hold inventory and pay; gate staff scan tickets at the door; organizers see sales and check-ins. The platform is deliberately narrower than Ticketmaster: one event, one purchase loop, one check-in loop, done properly.

## Actors and permissions

| Actor | Can | Cannot |
|---|---|---|
| **Attendee** | Browse published events, create a hold, pay, view their tickets | Create events, scan tickets, see other buyers' orders |
| **Organizer** | Create and edit their own events, define ticket types, publish, view sales, refund their orders | Edit another organizer's event, scan tickets unless also gate staff, see platform-wide data |
| **Gate staff** | Scan tickets for events they are assigned to, view scan results, work offline | Edit events, issue refunds, see buyer payment details |
| **Admin** | View users and events, intervene in support cases, grant roles | Impersonate users, access raw payment credentials |

Authorization is object-level, not only role-level. An organizer can edit only their own event. Gate staff can scan only assigned events.

## Core journeys

### Organizer publishes an event

1. Sign up, verify email, create an organizer profile.
2. Create a draft event: title, description, venue, time zone, start/end, sales window, cover image.
3. Add ticket types: name, price, capacity, max per order, sales window.
4. Publish. Validation requires at least one ticket type and a sale window in the future.
5. See the public page and a sales dashboard.

### Buyer purchases a ticket

1. Browse the public catalogue and open an event.
2. Select a ticket type and quantity.
3. Create a hold. The API atomically claims capacity and returns an expiry.
4. Pay with Stripe test mode.
5. Webhook confirms the order; the system issues a signed ticket.
6. Buyer receives the ticket by email and in their wallet.

### Gate staff checks in

1. Open the scanner for an assigned event.
2. Scan a QR code or enter the code manually.
3. API validates the token, event, and ticket state; marks it checked in once.
4. A duplicate scan returns a distinct `already_checked_in` result.
5. Offline: the scanner uses a cached signed ticket list and queues scans; sync is idempotent.

## Data model

### Week 1 tables

| Table | Key columns | Invariants |
|---|---|---|
| `users` | `id`, `email` unique, `name`, `password_hash`, `role`, `email_verified_at` | Email is unique; role is one of `ATTENDEE`, `ORGANIZER`, `GATE_STAFF`, `ADMIN` |
| `sessions` | `id`, `token_hash` unique, `user_id`, `expires_at` | A session belongs to one user; expired sessions are rejected |
| `email_verification_tokens` | `id`, `user_id`, `token_hash`, `expires_at`, `used_at` | A token is single-use and expires |
| `events` | `id`, `organizer_id`, `slug` unique, `title`, `description`, `venue_name`, `venue_address`, `timezone`, `starts_at`, `ends_at`, `sales_start_at`, `sales_end_at`, `status`, `cover_image_key` | Published events have a valid sale window; only the owner can edit |
| `ticket_types` | `id`, `event_id`, `name`, `price_cents`, `currency`, `capacity`, `sold_quantity`, `held_quantity`, `max_per_order`, `sales_start_at`, `sales_end_at` | Capacity is non-negative; `sold + held <= capacity` |

### Later tables

| Table | Purpose |
|---|---|
| `holds` | A time-bounded claim on ticket-type capacity |
| `orders` | A confirmed purchase with price snapshots and a Stripe payment reference |
| `tickets` | A signed admission credential, one per ticket |
| `scans` | A check-in attempt with a result and scanner identity |
| `event_staff` | Assignment of gate staff to events |

## Invariants

1. `ticket_types.sold_quantity + ticket_types.held_quantity <= ticket_types.capacity`.
2. A hold is active only before `expires_at`.
3. A hold converts to an order at most once.
4. A paid order issues exactly the number of tickets purchased.
5. A ticket admits one attendee once.
6. A scan result is recorded even when rejected.
7. An organizer cannot read or mutate another organizer's event.
8. A gate staff member cannot scan an event they are not assigned to.
9. Price at purchase is snapshotted on the order; later price changes do not affect it.
10. A duplicate payment event does not create a second order or second tickets.

## Hard constraints

- **Concurrency:** the last unit of capacity is decided by the database, not the UI.
- **Hold expiry vs payment:** a hold may expire while payment is in flight; the system must extend, re-acquire, or refund.
- **Webhook idempotency:** payment events may repeat; confirmation must be safe.
- **Check-in idempotency:** one ticket, one entry; duplicates return a distinct result.
- **Offline reconciliation:** scans may arrive out of order and from multiple devices.
- **Time zones:** store instants in UTC; store and display the event's IANA zone.
- **Abuse:** rate-limit holds, checkout, and scan; no advanced bot detection.
- **Privacy:** QR tokens contain no PII; scan endpoints expose only what the gate needs.

## Hero feature

**A trustworthy last-ticket purchase.** The learner can show two buyers racing for one ticket, a hold that survives payment, a webhook that confirms exactly once, and a QR ticket that scans exactly once. That is the product's promise and the course's spine.

## Production requirements

- Session auth with HttpOnly cookies and hashed session tokens.
- Role-based and object-level authorization.
- PostgreSQL migrations, constraints, and indexes.
- Zod validation at the API boundary and a consistent error envelope.
- Redis + BullMQ for hold expiry and email.
- Stripe test mode with signature-verified, idempotent webhooks.
- S3-compatible object storage for event covers.
- Rate limits on auth, holds, checkout, and scan.
- Unit, integration, and one end-to-end test.
- CI, deployed web and API, structured logs, error reporting, runbook.

## Failure modes to teach

1. Overselling the last ticket.
2. Deadlock on multi-ticket holds.
3. Hold expires while payment is in flight.
4. Duplicate payment webhook creates duplicate tickets.
5. Duplicate or forged QR scan.
6. Offline scanners diverge.
7. Stale availability display.
8. Abuse at hold and checkout.
9. Time-zone DST bug.
10. Refund without inventory release.

## API surface (Week 1)

```
GET    /health
POST   /api/v1/auth/signup
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/me
POST   /api/v1/auth/verify-email
POST   /api/v1/auth/request-verification
POST   /api/v1/organizer/onboarding
GET    /api/v1/events
GET    /api/v1/events/:slug
POST   /api/v1/organizer/events
PATCH  /api/v1/organizer/events/:id
POST   /api/v1/organizer/events/:id/publish
POST   /api/v1/organizer/events/:id/ticket-types
PATCH  /api/v1/organizer/events/:id/ticket-types/:ticketTypeId
POST   /api/v1/organizer/events/:id/cover-upload
GET    /api/v1/organizer/events
```

Later weeks add holds, checkout, webhooks, tickets, and scan endpoints.

## Repository layout

```
ticketline/
├── apps/
│   ├── web/                 Next.js 16 App Router
│   └── api/                 Express 5 + Prisma 7
├── packages/
│   └── shared/              Zod schemas and shared types
├── docker-compose.yml       Postgres 16, Redis 7, MinIO
├── pnpm-workspace.yaml
├── package.json
└── .env.example
```

## Environment variables

```
DATABASE_URL=postgresql://ticketline:ticketline@localhost:5432/ticketline
SESSION_SECRET=replace-me-with-32-random-bytes
PORT=4000
WEB_ORIGIN=http://localhost:3000
API_ORIGIN=http://localhost:4000
REDIS_URL=redis://localhost:6379
S3_ENDPOINT=http://localhost:9000
S3_REGION=us-east-1
S3_ACCESS_KEY=minio
S3_SECRET_KEY=minio-secret
S3_BUCKET=ticketline
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
EMAIL_FROM=Ticketline <tickets@example.test>
```

## Capstone evidence

- deployed web and API;
- organizer can publish an event;
- two buyers race for the last ticket; one wins, one gets a conflict;
- Stripe test payment confirms once;
- buyer receives a QR ticket;
- gate scans once; duplicate is rejected;
- offline scan syncs without duplication;
- organizer dashboard shows sales and check-ins;
- tests cover the race, duplicate webhook, and duplicate scan;
- README, runbook, architecture note, and viva.

## Variant deltas

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta | Capstone evidence |
|---|---|---|---|---|---|
| Festival | Multi-day promoter | Access zones and re-entry | Pass tiers and zone entitlements | `Pass`, `AccessZone`, `ScanEvent` | Correct zone admission and re-entry |
| Conference | Conference organizer | Session capacity and add-ons | Agenda and session seats | `Session`, `SessionSeat`, `AddOn` | Pass + limited session purchase |
| Sports | Club and season-ticket holder | Seat-level inventory | SVG seat map and season passes | `VenueSection`, `Seat`, `SeasonPass` | Last-seat race and season admission |
| Workshops | Instructor and student | Recurring sessions and waitlists | Waitlist promotion | `WorkshopSeries`, `Session`, `WaitlistEntry` | Cancellation promotes the next learner |
| Cinema | Cinema chain | Showtime scheduling and holds | Showtime grid and seat holds | `Screen`, `Showtime`, `SeatHold` | Two showtimes share a screen safely |
| Museum | Museum | Slot capacity and member windows | Timed slots and group entry | `TimeSlot`, `Membership`, `GroupBooking` | Member window and capacity enforcement |

## Out of scope

Real payments, payouts, PCI, full bot detection, dynamic pricing, resale, transfers, native apps, full offline-first sync, seat maps in core, multi-currency, tax, ML, microservices, Kafka, Kubernetes.
