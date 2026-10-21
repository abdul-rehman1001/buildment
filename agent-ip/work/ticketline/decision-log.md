# Decision log — Ticketline

## Status

All proposed decisions below were accepted provisionally by the course owner on 2026-10-20 to unblock Week 1. The instructor panel may revise them at G2B; publishing remains blocked until two instructors sign `roadmap-confirmation.md`.

## Provisional gate exception

| Date | Decision | Why | Owner |
|---|---|---|---|
| 2026-10-20 | Start G2C and Week 1 with course-owner approval while instructor panel review is pending | The course owner asked to begin the build; publishing remains blocked until two instructors sign `roadmap-confirmation.md` | Course owner |


| Date | Decision | Alternatives | Why | Owner | Status |
|---|---|---|---|---|---|
| 2026-10-20 | Course slug `ticketline`; working title "Ticketline" | Other brand names | Clear product name; easy to extend to variants | Course engineering | proposed |
| 2026-10-20 | Split web/API: Next.js web + Express API | Single Next.js full-stack | Teaches the client/server trust boundary and independent deploy | Curriculum architect | proposed |
| 2026-10-20 | PostgreSQL + Prisma | MongoDB, raw SQL | Relational invariants, transactions, row locks, migrations | Curriculum architect | proposed |
| 2026-10-20 | Session cookies with opaque tokens | JWT access/refresh tokens | Simpler revocation and safer defaults for this project | Curriculum architect | proposed |
| 2026-10-20 | Stripe Checkout for the core; Elements as stretch | Payment Intents/Elements from day one | Fastest path to a real test-mode payment; leaves time for webhook depth | Project designer | proposed |
| 2026-10-20 | General admission in core; seat maps in Sports/Cinema | Reserved seating in core | Keeps the core finishable; seat maps are a strong variant hero feature | Project designer | proposed |
| 2026-10-20 | Cached offline check-in with a local queue | Full offline-first sync/CRDT | Teaches conflict handling without building a distributed sync engine | Project designer | proposed |
| 2026-10-20 | Refunds core; admin minimal | Admin console core | Refunds force inventory release and state-machine reasoning; a full admin console does not | Curriculum architect | proposed |
| 2026-10-20 | Console email fallback; Resend optional | Resend required | The course must be finishable without external email credentials | Technical lead | proposed |
| 2026-10-20 | Rate limits + simple queue for abuse; no bot detection | Device fingerprinting/proof-of-work | Teaches the principle without turning the course into fraud detection | Project designer | proposed |
| 2026-10-20 | Six variants: festival, conference, sports, workshops, cinema, museum | Fewer/more variants | Each changes the hardest constraint and produces a distinct portfolio | Variant producer | proposed |

## Decisions required at G2B

All rows above move from `proposed` to `accepted` or `rejected` when the instructor panel signs `roadmap-confirmation.md`.
