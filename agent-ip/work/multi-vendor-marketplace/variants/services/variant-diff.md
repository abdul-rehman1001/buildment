---
artifact: variant-diff
course: multi-vendor-marketplace
variant: services
version: 1
owner: variant-producer
status: draft
roadmap: curriculum-roadmap.md
---

# Variant diff: services (SkillSlot)

## Dimensions

| Dimension | General course (FreshMarket) | Variant (SkillSlot) | Why it matters |
|---|---|---|---|
| Primary user journey | Shopper browses products from local shops, adds quantities to one cart, pays once, gets one order per shop; the shop packs and dispatches | Client finds a freelancer, picks a free time shown in the client's own time zone, puts slots from several providers in one cart, pays once, gets one order per provider and one booking per slot, then attends, reschedules or cancels; the provider sets weekly hours, blocks time off, and works from an agenda | The value is a promise about a future hour, not goods in a bag. The journey keeps going after payment (reschedule, cancel, remind, complete), which FreshMarket does not have |
| Hardest constraint | Finite stock counts: do not oversell `stockQty` under concurrent checkout; reservations by quantity with expiry (Module 24) | Exclusive time on one person's calendar: no two bookings may overlap for the same provider, including buffers, even under concurrent checkout; and every time must be correct for two people in two time zones across daylight saving changes; and the booking can later move or be cancelled with the right refund | Shapes the architecture: a lock collection with a unique index, all-or-nothing transactions, UTC instants plus IANA zones, a slot engine, policy snapshots, delayed jobs that must move. Quantity math does not solve any of this |
| Data model | User, Profile, Store, Product (`unit`, `weightOrQuantity`, `isPerishable`, `stockQty`, `reservedQty`), CartItem (product, quantity), Order with embedded snapshot OrderItems, StockReservation, Coupon, CouponRedemption | **Changed:** Product becomes **Service** (duration in 15-minute blocks, buffer, location type, cancellation policy, price; no stock). CartItem loses quantity and gains a UTC `startAt`. Order stops being the unit of fulfilment: it is one provider's share of a payment with a refund ledger, and it references bookings instead of embedding lines. Profile and Provider gain an IANA `timeZone`. **New:** **AvailabilityRule** (weekly wall-clock hours in the provider's zone), **TimeOff** (UTC ranges), **SlotClaim** (one lock row per provider per 15-minute block, unique index on both fields), **Booking** (its own collection with a state machine: held, confirmed, completed, cancelled, expired; snapshots of price, duration, policy and zone; history of reschedules). **Removed:** StockReservation, `stockQty`, `reservedQty` | At least five entities change and two relationships change shape: Order to Booking is referenced one-to-many instead of embedded, and Booking to SlotClaim is a new one-to-many lock relationship |
| Hero feature | Multi-vendor cart split into per-vendor orders with price snapshots | Availability and booking: the slot engine (rules to UTC slots, minus time off, claims, buffers and notice period), the two-zone slot picker, atomic multi-slot holds, and reschedule as a single swap | Central to Weeks 2 to 4 (M15, M17, M19, M22) and absent or trivial in every other variant |
| Visual and verbal identity | FreshMarket: clean editorial grocery style; produce, units, freshness | SkillSlot: agenda-first, calendar grid and time chips; every time labelled with its zone; calm, exact voice about time | One screenshot of a week grid with "15:00 your time (16:00 Gaza)" is not mistaken for a shop |
| Capstone evidence | Two-store checkout with Stripe test payment, split orders on both sides, cached catalogue, async jobs, reservation concurrency evidence, coupons, live URL | Provider hours in Gaza time and the same slots in Berlin time; one payment for two providers; 20 parallel attempts on one slot with one winner; late payment after hold expiry handled; reschedule moves the slot and the reminder job; cancel in the late window gives a partial refund on the shared payment; clock-change report; `docs/EVIDENCE.md` from the live system | The learner defends time and concurrency decisions that a grocery demo never raises |

## Uniqueness score

**Against FreshMarket: 6 of 6.** Evidence is in the table above. The per-vendor order split is kept on purpose (it is spine); what sits under the order (bookings, claims, the slot engine) is new.

**Against the other four variants.** Scored from the candidate table in the brief and from the drafts the other producers have written so far in this folder. Their drafts may still change, so this needs a recheck at G6.

| Dimension | handmade | home-kitchens | digital-goods | books |
|---|---|---|---|---|
| Primary user journey | Different | Different | Different | Different |
| Hardest constraint | Different (adjacent, see below) | Different (adjacent, see below) | Different | Different |
| Data model | Different | Different (one shared building block, see below) | Different | Different |
| Hero feature | Different | Different | Different | Different |
| Visual and verbal identity | Different | Different | Different | Different |
| Capstone evidence | Different | Different (one shared proof style, see below) | Different | Different |
| **Score** | **6 of 6** | **5 of 6 to 6 of 6** | **6 of 6** | **6 of 6** |

Honest notes on the two close neighbours:

- **home-kitchens (Sufra) is the closest.** Its draft also has a weekly schedule template with exceptions, an IANA zone per kitchen, a daylight saving test day, a claim held with an expiry and confirmed by webhook, and a partial refund for one kitchen's share. The hardest constraint is still different in mechanism: Sufra decrements a capacity counter on a shared delivery window and enforces cutoffs against the server clock in one kitchen's zone. SkillSlot claims an exclusive, variable-length set of time blocks on one person's calendar, shows every time to two people in two zones, and lets the booking move later. I count the constraint as different. The capstone overlaps in proof style (a parallel checkout script and a partial refund on the Stripe test dashboard), so a strict reviewer may score capstone as similar. That gives 5 of 6 at worst, still above the bar.
- **handmade** has a one-off item, which is also an exclusive claim. Its draft holds one document (the piece) with a status change. SkillSlot claims many rows at once (duration plus buffer, several providers in one checkout) and has no physical item, no making time and no shipping. Different.

**Result: passes the 4-of-6 contract against FreshMarket and all four other variants.** Lowest score is 5 of 6, against home-kitchens.

## Shared spine

Unchanged from FreshMarket:

- Outcomes: data modelling with ownership and snapshots, auth with role-aware JWT and OTP, object-level authorization, multi-vendor split checkout, Stripe test-mode payment gated by a verified webhook, idempotency, object storage, cache with invalidation, text search with an index, async jobs off the request path, deploy over HTTPS with restart survival, server-owned pricing, and a defended capstone.
- Production bar: secrets only in env, webhook signatures checked, every state change through a guarded transition, idempotent retries, tests for one failure mode per build chapter.
- Chapter archetypes and module rhythm: set the scene, why it matters, what you will build, learn, quiz, where the project is now, one step per file, verify, recap, checklist gate.
- Interaction grammar and density budget: the same step type labels and quiz style as FreshMarket.
- Assessment standard: a checklist gate per module, weekly demos, the closing bar raiser and viva.
- Stack: MERN with Redis, BullMQ, Cloudinary and Stripe test mode. One new library for time zone math (Luxon recommended, open decision 4).
- Modules carried over almost unchanged: 02 Project skeleton, 04 Config and database, 06 Authentication API, 07 Login and registration, 13 Product photos, 23 Deploy.

## Rejected similarities

| What looks similar | Decision | Why |
|---|---|---|
| FreshMarket Module 24 holds (reserve, confirm on webhook, expiry worker) vs SkillSlot holds | Accepted, with a different model | Shared part is spine (expiring holds, idempotent confirm, sweep job). The model differs: FreshMarket guards a quantity counter; SkillSlot inserts one lock row per time block and lets a unique index refuse the second writer. SkillSlot adds the late-payment path (re-claim or refund). The FreshMarket 24 timeline exercise is not reused |
| Per-vendor order split | Kept on purpose | It is the spine of the family. The variant changes what lives below the order |
| Weekly schedule with exceptions and an IANA zone (also in home-kitchens) | Accepted, boundary set | A weekly template is a common building block. SkillSlot owns two-party time display and slot generation across a clock change; home-kitchens owns cutoffs against the server clock. Seed stories and examples must not repeat between the two |
| Canvas name "Two clocks" | Changed | home-kitchens has a chapter called "Two clocks: payment and cutoff". The SkillSlot canvas is now "Your time, their time" and teaches a different model (one wall-clock rule seen from two zones across a clock change) |
| Parallel checkout script and partial refund in the capstone (also in home-kitchens and digital-goods) | Accepted | It is the shared evidence standard for concurrency and refunds. What is raced and what is refunded differ: overlapping time blocks of different lengths here, capacity units and licences there |
| Quotes and custom requests for in-person jobs | Rejected from SkillSlot | That is the handmade hero. Every SkillSlot service has a fixed price and duration |
| Delivery windows with capacity per window | Rejected from SkillSlot | That is home-kitchens. SkillSlot has no shared capacity in core; group sessions are stretch only |
| "Notify me when a slot opens" | Rejected from core | Books owns want-list alerts. SkillSlot does not add a waitlist in core |
| Live status tracking | Rejected | Home-kitchens hero. SkillSlot shows booking states on refresh, as FreshMarket does |
| Coupons module (FreshMarket 25) | Kept, shorter | Keeps the pricing trust outcome. Only one services rule is new (first session with this provider) and refunds use the paid amount |
| Photos module (FreshMarket 13) | Kept | Object storage is spine; only the subject changes (avatar and portfolio) |

## Changes from the candidate

The candidate row was: freelancers and clients; "the cart holds booked time slots, not stock"; hero "availability and booking". Three changes:

1. **The cart holds requested slots, not booked or held ones.** If a cart line held a slot, one idle cart could block a provider's day for hours, and any client could squat a popular tutor's week. Holds start at checkout, last 10 minutes, are capped per client, and are confirmed or released by payment. This is open decision 1 for instructors.
2. **The hardest constraint now includes time zones and change after payment.** "Slots, not stock" alone is close to FreshMarket's Module 24 and to home-kitchens' window claims. Two-party time zones, daylight saving, rescheduling as a single swap, and policy-based partial refunds are what make the constraint genuinely different.
3. **Quotes, capacity windows and waitlists were kept out.** They would overlap the handmade, home-kitchens and books heroes.

## Canvases

Both teach this variant's constraint. Neither reuses a FreshMarket or sibling model.

| Canvas | Module | Inputs | Claim the learner can state after | Stated limit |
|---|---|---|---|---|
| Your time, their time | M5 (5.5) | Provider zone, client zone, week of the year, provider's local start time | A fixed local working hour lands at different instants, and at a different hour for the client, in weeks when only one of the two zones has changed its clocks | Uses a small fixed set of zones and the browser's time zone data; does not model future rule changes |
| Block claims | M15 (15.3) | Service duration, buffer, start time, existing bookings | A start is bookable only if every 15-minute block of duration plus buffer is free, so a 60-minute service can fail where a 30-minute one fits | One provider, one day, no concurrency |

## Identity

- **Product name:** SkillSlot (reference name; learners may name their own product, as in FreshMarket).
- **One-line pitch:** Book an hour of real skill from a tutor, designer or electrician, shown in your own time, and never double booked.
- **Tone of voice:** Calm and exact about time. Every time carries its zone ("Tue 15:00 your time, 16:00 in Gaza"). Short sentences in plain English. No vague words like "soon" or "later"; say the time or the number of minutes. Money and refunds are stated as exact amounts with the rule that produced them ("Cancelled 6 hours before start: 50% refund, 7.50 USD back to your card").
- **Visual identity:** Agenda first. A week grid and time chips with tabular numerals. One accent colour (deep teal). Semantic status colours only: held (amber, with a countdown), confirmed (green), cancelled and expired (grey). Provider portfolio images are the only photography. Works on a narrow phone screen first.
- **Seed content ideas:**
  - Providers, all in `Asia/Gaza`: a Tawjihi maths tutor (60-minute online lessons, 24-hour free cancellation); an English conversation tutor (30 and 45-minute online sessions, 15-minute buffer); a brand designer (30-minute online logo review); an electrician in Gaza City (90-minute home visit with a 30-minute buffer, address shown only after booking); a laptop repair technician (45-minute diagnosis at his workshop).
  - Clients: one in `Asia/Gaza`, one in `Europe/Berlin` (a different clock-change schedule), one in `Asia/Qatar` (no daylight saving).
  - Calendar states: a fully booked Thursday for the maths tutor; a seeded time-off block labelled "power cut"; one existing booking in the week of the next clock change; one held booking that expires during the demo.
  - Generic first names only; no real people or businesses.

## Follow-up specialization course

**Scheduling systems in depth.** Fellows who finish SkillSlot have solved one person's calendar for one-off sessions. The natural next course takes the hardest constraint further: recurring bookings with iCalendar recurrence rules (RFC 5545), exceptions and "this and following" edits; two-way sync with external calendars through their APIs and OAuth, with conflict handling when the outside calendar changes; booking several resources at once (a tutor and a room, or two technicians) where all must be free; group sessions with capacity and waitlist promotion; a side-by-side rebuild of the claim on Postgres using range types and an exclusion constraint, compared with the MongoDB lock collection under load; and operating the system through time zone data updates and clock changes in production. It reuses the same spine and gives fellows a deeper, specialist portfolio piece for scheduling-heavy products such as clinics, schools and field service teams.
