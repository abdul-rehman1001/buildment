---
artifact: variant-diff
course: multi-vendor-marketplace
variant: handmade
version: 1
owner: variant-producer
status: draft
---

# Variant diff: handmade (Ghurza)

## Dimensions

| Dimension | General course (FreshMarket) | Variant (Ghurza) | Why it matters |
|---|---|---|---|
| Primary user journey | Shopper fills one cart from several grocery shops, pays once, each shop packs its order the same day | Two journeys. Ready-made: buyer browses a gallery of one-off pieces (sold ones stay as portfolio), checks out across workshops with per-workshop shipping. Made to order: buyer sends a custom request, maker quotes (and may revise), buyer pays a deposit, maker posts progress for weeks, buyer approves, pays the balance, piece ships | The value is a conversation that ends in an object, not a basket. Both parties act in turns over weeks, so the product is a workflow, not a checkout |
| Hardest constraint | Stock counts under a split checkout; overselling, solved later with quantity reservations (FM 24) | Made to order: the piece is sold before it exists, through a weeks-long, two-party, two-payment workflow with honest lead-time ranges. One-off pieces must sell once, but that part is shared spine (see Rejected similarities) | Forces a guarded state machine, versioned quotes, two PaymentIntents with metadata, idempotent webhooks over a long life, delayed jobs for expiry, refunds by stage, and range-based time copy. None of this exists in FreshMarket |
| Data model | User, Profile, Store, Product (`stockQty`, unit, perishable), CartItem (quantity), Order (snapshots), StockReservation, Coupon, CouponRedemption | Workshop owns pieces while **Artisan** is credited (new one-to-many plus a credit relationship that is not ownership); **Piece** has a status and hold instead of a stock count; Cart has no quantity; **CustomRequest**, **Quote** (versioned, terms snapshotted), **Commission** (state machine, embedded payments for deposit and balance, progress updates, audit trail); **ShippingProfile** (zones, handling and transit ranges, paused state). Coupon models removed | At least five entities or relationships change materially: Artisan credit, Piece status, CustomRequest, Quote versions, Commission with two payments, ShippingProfile. The ownership chain gains a branch that authorization must respect |
| Hero feature | Multi-vendor cart split into per-vendor orders with price snapshots (plus coupons) | Custom order flow: request with reference photos, versioned quote, deposit, progress updates with photos, approval with one revision, balance, shipping, delivered, and stage-based cancellation with refund | Central to week 4 and to the capstone; absent from FreshMarket and from all four sibling variants |
| Visual and verbal identity | FreshMarket: clean editorial grocery; product names, units, perishables; shop names like Ali's Grocer | Ghurza: calm gallery, linen-toned surfaces, one deep red accent, maker credit on every card; copy names materials and technique, gives ranges not dates, never says "supplier" | A learner's portfolio reads as a craft and commission product, not a shop |
| Capstone evidence | Two-store grocery checkout with Stripe test pay, split orders, cache, async notify, deploy, reservations, coupon pricing | Full commission on a live URL: request from a sold piece, quote v1 then v2 (accepting v1 fails), deposit, two progress updates with photos, approval, balance, shipped with tracking reference; a second commission cancelled in production refunds exactly what its terms say; a cross-border cart that blocks a workshop that does not ship to the buyer's country | The defense is about long-lived state, two payments and honest promises, not about a basket |

## Uniqueness score

The contract needs at least four of six dimensions different from FreshMarket and from every sibling. Scores are mine and should be checked by two reviewers who have not read this file.

| Compared with | Journey | Constraint | Data model | Hero | Identity | Capstone | Score |
|---|---|---|---|---|---|---|---|
| FreshMarket | Different | Different | Different | Different | Different | Different | **6/6** |
| services | Different (commission over weeks vs booking a time slot) | Different (made to order vs slot holds and double booking) | Different (Quote, Commission, ShippingProfile vs slot and booking entities) | Different (custom order flow vs availability and booking) | Different | Different | **6/6**, provided services stays slot-based (see Rejected similarities) |
| home-kitchens | Different (weeks, negotiated vs minutes to hours, fixed menu) | Different (made to order vs cutoffs and delivery windows) | Different | Different (custom order flow vs live order tracking) | Different | Different | **6/6** |
| digital-goods | Different (physical, made later, shipped vs instant download) | Different (sold before it exists vs access granted once and revocable) | Different | Different (custom order flow vs licensing and signed links) | Different | Different | **6/6** |
| books | Different (commission vs reading-list match) | Different (made to order vs edition matching and grades) | Different (Commission, Quote, Artisan vs edition, graded copy, want-list) | Different (custom order flow vs reading-list matcher and want-list alerts) | Different | Different after the change below (books headlines a last-copy race; Ghurza no longer does) | **6/6**, with one shared spine element (single-unit hold) declared below |

**Evidence for the hardest call (books).** Before revision, Ghurza's hardest constraint was "one-off items and made-to-order requests", and its capstone opened with a two-tab race for one piece. The books roadmap already builds single-copy holds (its module 26) and demos a two-tab last-copy race. On that version, constraint and capstone overlapped with books, and the honest score against books was 4/6: a pass, but only by counting dimensions that were half shared. I changed the variant (next section) so the overlap is spine, not identity.

### What I changed from the candidate, and why

1. **Narrowed the hardest constraint to made to order.** The candidate said "one-off items and made-to-order requests". Single-unit holds are also built by books and are the same outcome as FreshMarket module 24, so claiming them as Ghurza's constraint would pad the score. Sold-once stays in the course (module 19) as spine, because a piece with no stock count cannot be checked out without it.
2. **Removed the hold-race canvas and the race from the capstone headline.** The canvas set is now Lead-time range and Deposit and cancellation, both on the hero. The race test is still required as gate evidence.
3. **Moved sold-once from post-deploy into core checkout.** FreshMarket teaches reservations in module 24, after deploy. A one-off piece has nothing to decrement, so the hold is part of checkout from the start.
4. **Dropped the coupon engine from core.** Its outcome, "the server owns the total", is taught on quotes and deposits in module 23, where it matters more.
5. **Added a shipping module.** International shipping of fragile and wooden objects is part of the product truth; it is taught as ranges, zones, paused shipping and customs basics, with no claims about routes or carriers.

## Shared spine

- **Outcomes:** O1 to O10 are FreshMarket's outcomes. Only the evidence changes. O7 (long-lived state machine) is FreshMarket's order-status outcome taken further, not a new outcome.
- **Production bar:** HTTPS, secrets in env, API and worker survive restart, webhook signatures verified, idempotent handlers, scoped list routes, rate limits.
- **Stack:** MERN, Redis, BullMQ, Cloudinary, Stripe test mode. Same as FreshMarket.
- **Chapter archetypes and arc:** set the scene, the trap, what you'll build, learn, quiz, build steps, verify, recap, checklist gate. Step labels Read, Learn, Check, Build, Wrap.
- **Interaction grammar and density:** same blocks and budget as FreshMarket. Two canvases, both new models.
- **Assessment standard:** checklist gate per module, learning log, viva, bar-raiser.
- **Module order of the first two weeks:** skeleton, config, data model, auth, isolation, owner setup, listings, photos. Modules 2, 4, 6, 7, 13 and 27 carry over almost unchanged.
- **Time budget:** 199 chapter hours plus 11 buffer equals 210 core; stretch adds 47 for 257.

## Rejected similarities

| Looks similar to | Verdict | Reasoning |
|---|---|---|
| Books: single-copy holds and a two-tab race | **Accepted as spine, not identity** | Both variants hold one unit at checkout and test a race. That is FreshMarket's concurrency outcome (O5). Ghurza does not count it toward its constraint, does not demo it as the capstone headline, and has no canvas for it. Its extra piece, a refund when a payment succeeds after the hold was taken over, is a build step, not a hero |
| Books: want-list alerts ("tell me when a matching copy is listed") | **Rejected for Ghurza** | Books owns saved-search and back-in-stock style alerts as its hero. Ghurza has no "notify me when available", back-in-stock or saved-search alert anywhere, including the capstone. A sold piece leads to "Request something similar", which opens a custom request to that maker, not a standing alert. Ghurza's worker jobs only notify the two parties of an existing order or commission (quote sent, deposit received, progress posted, balance due) |
| Books: stretch "buyback quotes" | **Acceptable** | A stretch lab where shops price a student's used book. It has no deposit, no production, no balance and no weeks-long state. If books moves it into core, both variants should re-check the hero rule |
| Services: quotes for jobs (for example an electrician) | **Watch** | If services builds request, quote and deposit, it reuses this hero with a different label. Services should keep fixed-price bookable slots. If it needs quotes, they should be trivial (one price, no versions, no deposit split) |
| Home kitchens: lead times | **Acceptable** | Home kitchens has prep lead in minutes to hours, cutoffs and delivery windows, with a fixed menu and live tracking. Ghurza has negotiated production in weeks, shown as ranges, with progress posted by a person, polled, never live. No WebSockets or SSE in Ghurza |
| Home kitchens: progress visibility | **Acceptable** | Live tracking is a stream of machine status; Ghurza's progress updates are a few photo posts by a maker over weeks. Different model, different interaction |
| Digital goods: private files | **Watch** | Buyer reference photos are private. Ghurza uses an authorized listing route with unguessable ids and states the limit. Signed, expiring delivery URLs are the digital-goods hero and are not built here |
| Digital goods: refunds | **Acceptable** | Digital goods revokes access on refund. Ghurza refunds by commission stage according to quote terms. Both use the Stripe Refunds API (spine); the rules are different |
| FreshMarket: quantity reservations (FM 24) | **Replaced** | No quantity arithmetic, no available-to-promise sum. One document's status is the whole model |
| FreshMarket: coupon engine (FM 25) | **Removed** | Kept the trust outcome only, taught on quotes |
| FreshMarket canvases | **Not reused** | Lead-time range and Deposit and cancellation model this variant's constraint. Neither models stock |

## Identity

- **Product name:** Ghurza (working name; meant as the Arabic word for a stitch). Needs an Arabic-speaking instructor to confirm spelling, meaning and tone before use. Fallback: a plain English name the learner chooses, as FreshMarket allows.
- **One-line pitch:** Handmade pieces and commissions from artisan workshops: buy a one-of-a-kind piece, or ask its maker to make one for you.
- **Tone of voice:**
  - Calm, warm and exact. Short sentences a second-language reader can follow on a phone.
  - Credit the maker by the name they chose to show. Say "maker" or "artisan", never "supplier" or "vendor" in the UI.
  - Describe materials, technique, size and care plainly. Do not use words such as "exotic" or "ethnic", and do not use pity or rescue framing.
  - Never invent motif meanings, family stories or history. If a maker gives the meaning of a motif, show it as the maker's words.
  - Never promise dates. Show ranges, and say what the range depends on.
  - Be honest about borders: "Import charges may apply in your country" and "Shipping from this workshop is paused: [maker's note]" are normal UI states, not errors.
- **Visual direction:** off-white linen-toned surfaces, one deep red accent, a serif for piece titles and a sans serif for UI, generous photos with close-up detail shots, a visible "Sold" label on portfolio pieces. Canvases follow the shared canvas standard (neutral surfaces, one accent, semantic colour only). Arabic and right-to-left support is stretch S1, so typefaces should be chosen with an Arabic companion in mind.
- **Seed content ideas (all fictional; check that no name matches a real business):**
  - An embroidery cooperative with three artisans: a cross-stitch cushion cover with a cypress tree motif in red on cream, a small framed tatreez panel, a set of bookmarks. Motif names only; no stated meanings unless an instructor or real maker supplies them.
  - An olive wood workshop with one carver: a serving bowl (sold, so it appears as portfolio), a spoon set, a carved box. Care notes about oiling the wood; a note that grain differs on every piece.
  - A ceramics studio with two potters: a painted plate, a glazed bowl, a set of tiles. Notes that glaze colour varies between firings and that pieces in a set will differ slightly.
  - One open custom request: a cushion cover in the buyer's chosen colours, with a size, a budget range and a wished date marked as a wish.
  - One commission mid-production with two progress updates: "pattern drafted" and "first half stitched".
  - Shipping profiles: one workshop ships to three zones with flat rates, one requires a quote for large pieces, one has shipping paused with a short note.
- **Real-world anchors for the research dossier (to verify before use, not to cite from this file):** UNESCO's inscription of the art of embroidery in Palestine on its intangible cultural heritage list; how established craft marketplaces handle custom orders and reserved listings. No statistics are claimed here.

## Follow-up specialization course

**Long-running orders: state machines, sagas and money over weeks.** A fellow who finishes Ghurza has built one long-lived workflow by hand: a commission that waits on two people, two payments and a few timers, held together by guarded updates, idempotent webhooks and delayed jobs. The natural next course takes that hardest constraint and makes it the whole subject: modelling business processes that run for days or months as explicit state machines; the saga pattern, where each step has a compensating action (a refund, a release, a cancellation) instead of one big transaction; durable timers and the difference between a job that reminds and a guard that decides; an append-only event history for audit and dispute review; reconciling your records with a payment provider's after missed or out-of-order events; and versioning a workflow while old instances are still running. The capstone would be a second, unrelated long-running process (for example a repair or tailoring service with drop-off, estimate, approval, work and pickup) built on a small workflow engine the learner writes and defends.

## Handoff

```yaml
artifact: variant-set-entry
course: multi-vendor-marketplace
variant:
  slug: handmade
  product: Ghurza (working name)
  primary_user: artisan workshops (tatreez, olive wood, ceramics) and buyers who want unique or custom work
  hardest_constraint: made to order; the piece is sold before it exists, through a weeks-long, two-party, two-payment workflow with honest lead-time ranges
  hero_feature: custom order flow (request, versioned quote, deposit, progress, approval, balance, delivery, stage-based cancellation)
  roadmap_confirmed: false
  canvases: [lead-time-range, deposit-and-cancellation]
  dimensions_changed: 6/6 vs FreshMarket and every sibling (single-unit hold declared as shared spine with books)
  core_hours: 210
  stretch_hours: 257
  status: revise-pending-instructor-review
```
