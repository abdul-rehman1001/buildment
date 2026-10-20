---
artifact: variant-diff
course: multi-vendor-marketplace
variant: home-kitchens
version: 1
owner: variant-producer
status: draft
---

# Variant diff: home kitchens (Sufra)

## Dimensions

| Dimension | General course (FreshMarket) | Variant (Sufra, home kitchens) | Why it matters |
|---|---|---|---|
| Primary user journey | Shopper browses products across local shops, adds items from several shops to one cart, pays once, gets one order per shop; vendor packs and marks dispatched | Diner picks a delivery window first, sees only kitchens that can still cook for it, orders from one or more kitchens, pays, then watches the order live; cook accepts or rejects within a deadline, cooks and sends out | The journey starts with "when" instead of "what", and value continues after payment (tracking), so the learner builds a different browse query, a different cart rule and a post-purchase surface FreshMarket does not have |
| Hardest constraint | Finite stock of physical items: do not oversell `stockQty`; reservations, available-to-promise, price snapshots | Finite cooking capacity per kitchen per delivery window, consumed in load units by each dish, with a per-dish cutoff (window start minus prep time minus travel buffer) decided by the server clock in the kitchen's time zone. Capacity disappears when the window passes, whether used or not | Stock is a count that persists until sold. Capacity here is a pool that expires on a schedule and depends on what was ordered and when. The learner must handle time zones, daylight saving, fake clocks in tests and the race between payment and cutoff, none of which FreshMarket needs |
| Data model | User, Profile, Store, Product (`unit`, `weightOrQuantity`, `isPerishable`, `stockQty`), Cart with CartItems, Order with snapshot OrderItems, StockReservation, Coupon, CouponRedemption | User, Profile, **Kitchen** (IANA time zone, service area, weekly schedule template, schedule exceptions), **Dish** (prepMinutes, loadUnits, maxPerOrder, allergens, weekdays; no stock), **DeliveryWindow** (kitchen, startsAt, endsAt, cutoffAt, capacityUnits, remainingUnits), **CapacityClaim** (window, order, units, held/confirmed/released, expiresAt), Cart bound to **one window**, Order with snapshots plus an **embedded status timeline** (sequence-numbered events) and `acceptBy` | Five entities or relationships change materially: Product becomes a stockless Dish; DeliveryWindow is new; CapacityClaim replaces StockReservation and points at a window, not a product; Cart gains a window and loses free mixing; Order gains a timeline and an acceptance deadline. Coupon models leave the core path |
| Hero feature | Multi-vendor cart with a single payment split into per-vendor orders (FreshMarket scope explicitly excludes real-time features and accepts refresh or polling for status) | Live order tracking that survives weak connections: one SSE stream per user, snapshot on connect then deltas, sequence-based dedupe, Redis pub/sub fan-out across processes, polling fallback with ETag, honest connection state on screen, plus a cook acceptance deadline that auto-rejects and partially refunds | Central here (the capstone demo depends on it) and absent in FreshMarket, which shows a status badge on refresh. It teaches a spine skill (sync versus async, failure handling) through a mechanism no other variant uses |
| Visual and verbal identity | FreshMarket: clean editorial grocery style; products are tomatoes and bread; Instacart as the real-world reference | Sufra: warm home-cooking identity; every screen shows time ("order by 11:30", "ready around 13:20"); seed is home kitchens and cooked dishes; real-world references are order trackers and home kitchen rules, not grocery delivery | A reviewer can tell the product from one screenshot: the time labels and window picker are on every page |
| Capstone evidence | Browse, multi-vendor cart, Stripe test payment, split orders, cache and search, async jobs, reservation concurrency evidence, live URL | Two-phone demo: slow dish past cutoff hidden while fast dishes remain; two-kitchen order; one kitchen accepts, one auto-rejects with partial refund; diner goes offline and the timeline catches up in order; parallel checkout fills a window exactly to capacity; ADR defending SSE | The defense questions are about clocks, capacity pools and event delivery, not stock and coupons. A learner cannot reuse FreshMarket's demo script |

## Uniqueness score

The contract needs at least four of six dimensions materially different from the general course and from every other variant. Scores below are strict: a dimension counts only if the mechanism the learner builds is different, not only the labels.

| Compared with | Journey | Constraint | Data model | Hero | Identity | Capstone | Score |
|---|---|---|---|---|---|---|---|
| FreshMarket (general) | Yes | Yes, with a caveat | Yes | Yes | Yes | Yes | 6/6 (5/6 on the strictest reading) |
| Services | Yes | Yes, with a caveat | Yes | Yes | Yes | Yes | 6/6 (5/6 on the strictest reading) |
| Handmade | Yes | Yes | Yes | Yes | Yes | Yes | 6/6 |
| Digital goods | Yes | Yes | Yes | Yes | Yes | Yes | 6/6 |
| Books | Yes | Yes | Yes | Yes | Yes | Yes | 6/6 |

Evidence and caveats:

- **FreshMarket, constraint caveat.** Both variants prevent over-allocating a finite resource with an atomic conditional update and a hold that expires. That mechanism is part of the spine (concurrency and idempotency) and is meant to be shared. What differs: the resource expires on a schedule, the amount taken depends on the dish (load units), whether an order is allowed depends on the dish's prep time and the server clock, and the learner must handle time zones and daylight saving. FreshMarket's stock never expires and has no cutoff. If a reviewer counts the shared hold pattern as the same constraint, the score is 5/6, which still passes.
- **FreshMarket, identity.** Both sell food. To keep identity distinct: no grocery items, no Instacart reference, no "fresh produce" copy; every screen is built around time; the seed is cooked dishes from named home kitchens.
- **Services, constraint caveat.** Both are "time" products. Services books exclusive slots: one slot belongs to one client, and the problem is double booking. Sufra fills a shared pool: many diners share one window until its load units run out, and slow dishes close earlier than fast ones in the same window. The data model differs (Slot and Booking there; DeliveryWindow with load units and CapacityClaim here), and the hero differs (availability and booking there; post-purchase live tracking here). If the services variant later adds group sessions with a capacity counter, this caveat must be re-checked.
- **Handmade.** Made-to-order also has lead time, but handmade lead times are days or weeks with a negotiated request and quote. Sufra has a fixed menu, minutes to hours, no negotiation, and automatic rejection if the cook does not answer in time.
- **Digital goods and books.** No shared constraint, entity or hero.

Result: passes the four-of-six contract against all five comparisons.

## Shared spine

Unchanged from FreshMarket:

- The outcomes in the general roadmap: model data with ownership, authenticate and authorize, isolate vendors, multi-vendor checkout split per vendor with price snapshots, Stripe Payment Intents in test mode with verified webhooks, object storage for images, cache with invalidation, async jobs off the hot path, concurrency-safe allocation, deploy with secrets in env, defend the work.
- The stack: MongoDB, Express, React with Vite, Node.js, Redis, BullMQ, Cloudinary, Stripe test mode.
- The production bar, chapter archetypes and sub-chapter arc (open, learn, check, build, wrap, checklist gate), step type labels, interaction grammar and assessment standard.
- Six modules carry over almost unchanged (FreshMarket 02, 04, 06, 07, 08, 13), with renamed roles and examples.
- The time budget: core 210 hours, stretch 276 of a possible 280.

Interactive canvases are new, not relabelled:

- **Window fill and cutoff** (Modules 14 and 26): inputs are window capacity, dish mix (load and prep time), order arrival rate and cutoff lead. It shows units filling over time and which orders fail because of capacity versus cutoff. Model limit: it ignores cook speed variation and travel time variation.
- **Reconnect and staleness** (Module 23): inputs are polling interval, outage length and number of status changes. It compares requests sent, seconds of staleness and missed events for polling versus SSE with snapshot on reconnect. Model limit: it assumes a fixed reconnect delay and ignores proxy timeouts.

Neither canvas models stock or available-to-promise, so neither is a FreshMarket canvas with new labels.

## Rejected similarities

| Looks similar | Decision | Why |
|---|---|---|
| Hold, confirm, expire pattern (FreshMarket 24 and Sufra 19, 21, 26) | Accepted | Spine skill. The resource, the expiry rules (bounded by cutoff) and the tests (fake clock, cutoff race) differ |
| Order status values (FreshMarket 20 has pending, packed, dispatched) | Changed | A status badge alone would make the hero a reskin. Sufra adds a real state machine with preconditions, an acceptance deadline, a sequence-numbered timeline and a resumable live stream |
| Price snapshots on order lines | Accepted | Spine skill. Sufra also snapshots prep time and window times, which the tracking screen needs |
| Split checkout per vendor | Accepted | Spine outcome. The split now also claims capacity in a different window per kitchen |
| Promotions module (FreshMarket 25) | Moved to stretch | Not related to the hardest constraint; frees hours for Modules 14, 22 and 23 |
| Catalogue cache (FreshMarket 21) | Changed | Remaining units and cutoff state must never be cached; only menus are |
| "Live" tracking with GPS maps (as in large delivery apps) | Rejected | Heavy on data for weak connections, raises rider privacy issues, and would push the course past budget. Status-based tracking teaches the same delivery and reconnect skills |
| Using the same RealWorldEvent as FreshMarket (Instacart) | Rejected | Rule: no reused examples. Candidates for research to verify: Domino's Pizza Tracker as a known status-tracking product, and California's 2018 law allowing microenterprise home kitchen operations (AB 626) as context for home kitchens. Both must be checked and sourced by the research agent before use |

## Changes from the candidate

The brief's candidate was: home cooks and diners; prep times, order cutoffs and delivery windows; live order tracking. Changes:

1. **Hardest constraint sharpened to "capacity per window in load units, with per-dish cutoffs".** "Delivery windows" alone would sit too close to the services variant's time slots, and "prep times" alone could be taught as a label. Making many orders share one window's load, and making slow dishes close earlier than fast ones, gives a different mechanism from both stock and slot booking.
2. **Hero defined as resumable event delivery, not a status badge.** FreshMarket already has a status badge with refresh. The hero is now the SSE stream with snapshot on connect, dedupe, pub/sub fan-out, polling fallback and the acceptance deadline. Without this change the hero would fail the "absent or trivial in the others" test against FreshMarket.
3. **No GPS maps or rider app in the core path.** Kept the hero achievable on weak connections and within budget. A rider role is stretch.
4. **Promotions moved to stretch** to keep the core path at 210 hours.

## Identity

- **Product name:** Sufra (Arabic for the spread of food on a table, the place where a family eats together). Working name; learners may rename it, as with FreshMarket.
- **One-line pitch:** Home-cooked meals from kitchens in your neighbourhood, ordered for a time that suits you, and you always know where your food is.
- **Tone of voice:** warm, plain and honest about time. Say exactly when: "Order by 11:30 for lunch at 13:00", "Ready around 13:20", "Umm Yousef has not confirmed yet, we will tell you by 11:45". When the connection drops, say so plainly: "Last updated 2 minutes ago, reconnecting". Never promise a time the server has not computed.
- **Visual direction:** warm neutral surfaces with one warm accent (for example a saffron or terracotta tone), large tap targets, time labels always visible, small images. Canvases keep the course's neutral canvas standard.
- **Seed content ideas (fictional kitchens):**
  - Umm Yousef's Kitchen: maqluba (slow, high load, early cutoff), musakhan rolls, lentil soup.
  - Beit Hanan Sweets: ka'ak, ma'amoul, knafeh by the tray.
  - Abu Sami's Table: falafel wraps (fast, low load), hummus plates, foul.
  - A Gaza dishes kitchen: sumaghiyya, rummaniyya and qidra, as a showcase for long prep times and day-before cutoffs.
  - Windows: lunch 12:00 to 13:00 and 13:00 to 14:00, dinner 18:00 to 19:00, and seasonal iftar windows in Ramadan through schedule exceptions.
  - Diners: Lina (tracks her order on a phone with a weak signal) and Omar (orders for a family gathering from two kitchens).
  - Seed text uses English with Arabic dish names alongside, pending open decision 8.

## Follow-up specialization course

Fellows who finish Sufra have met the core of time-bound and real-time systems in a small form, so the natural next course is **"Real-time scheduling and delivery systems"**. It would take the hardest constraint further: capacity planning across many kitchens and riders (assigning orders to the cook or rider with the earliest feasible time), dispatch with a rider persona and handoffs, durable event logs with Redis Streams and consumer groups instead of fire-and-forget pub/sub, backpressure and connection limits when thousands of streams are open, load testing long-lived connections, offline-first clients that queue actions and reconcile on reconnect, and clock correctness across services (time zones, daylight saving, clock skew and idempotent scheduled jobs). The capstone would be a dispatch board that stays correct while connections, workers and clocks misbehave, defended with measured evidence.
