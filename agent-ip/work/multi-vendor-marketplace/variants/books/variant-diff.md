---
artifact: variant-diff
course: multi-vendor-marketplace
variant: books
version: 1
owner: variant-producer
status: draft
---

# Variant diff: books (Hamesh)

## What changed from the candidate brief, and why

The candidate brief proposed **search and recommendations** as the hero feature. I tested it and rejected it.

- **Search fails the hero rule.** FreshMarket already teaches catalogue search in Module 21 (Cache and search): a MongoDB text index on name and category, `$text` queries, `explain()` and caching of search responses. A books catalogue searched by title and author is the same lesson with different field names. The contract says a hero feature must be "absent or trivial in the others" and forbids "the same hero feature with a different label". Search, on its own, is both.
- **Recommendations fail the evidence rule.** With seed data there is no purchase history, so a recommender either returns nothing or returns hand-made results. A learner could not show that it works or defend why it is right, and the outcome it would teach (aggregation) is already covered by Module 14. It moves to stretch lab S3 as a simple co-occurrence suggestion.

**New hero feature: the reading-list matcher with want-list alerts.** A student imports a course reading list; the matcher picks the best copy for each title across all shops, at or above the student's grade floor and within budget; titles that cannot be matched go onto a want-list, and a background worker alerts the student once when a matching copy is listed or drops in price. It rests on ISBN-based edition matching, so it uses this variant's hardest constraint directly instead of sitting beside it.

Search survives as an adapted chapter (Module 22): exact ISBN lookup after normalisation, then `$text` on title and authors as the fallback. That is a real difference in what is taught (an exact key lookup vs a full-text query) but it is not the hero.

I also sharpened the **hardest constraint**. "Condition grades and used-item pricing" alone is close to handmade's "one-off items", because a used copy is also a single unit. The constraint is now: **one edition is sold as many separate copies, each graded and priced on its own, and each must be matched to the exact edition a course needs.** Handmade items have no shared identity; book copies are interchangeable within an edition up to their grade. That difference drives the data model.

## Dimensions

| Dimension | General course (FreshMarket) | Variant (Hamesh) | Why it matters |
|---|---|---|---|
| Primary user journey | A shopper browses products across vendors, fills a cart with quantities, pays once, gets split orders | A student starts from a course reading list, not from browsing: match the list, accept or adjust per title, save gaps to a want-list, get alerted later, pay, collect from shops with a code | The student's question is "where is every book on my list" not "what can I buy". The entry point, the decision per item and the long wait for missing titles are all new |
| Hardest constraint | Stock quantities and perishable goods across a split checkout; overselling | One edition, many separately graded and priced copies; matching copies to the exact edition (ISBN-10 vs ISBN-13, several acceptable printings); each copy sold once | Forces a shared catalogue, grade ranks, ISBN normalisation and a concurrency-safe find-or-create; none of these exist in FreshMarket |
| Data model | User, Profile, Store, Product (owned by Store, with `stockQty`), CartItem (product, quantity), Order with snapshot lines | Product splits into **Work** and **Edition** (shared, unowned, unique `isbn13`) and **Listing** (a shop-owned physical copy with grade rank, defects, photos, status). CartItem has no quantity. New **ReadingList** (items accept a set of editions), **WantListEntry** (accepted editions, grade floor, price ceiling), **MatchAlert** (unique on want entry and listing), **PricingRule** and price audit. Order lines snapshot grade and defects | Changes at least four entities and two relationships: ownership is no longer a single chain, and a new many-to-many (want entries to editions) is queried in reverse by the worker |
| Hero feature | Multi-vendor cart split into per-vendor orders with price snapshots (plus promotions) | Reading-list matcher (Module 18) and want-list alerts from a standing match in the worker (Module 24) | Central to the product; absent in FreshMarket and in the other four variants; uses the hardest constraint directly |
| Visual and verbal identity | FreshMarket: clean editorial grocery style, produce photography, units and weights | Hamesh: paper and ink, serif headings, grade badges as text, photos of real copies with their flaws, calm librarian voice | A learner's portfolio reads as a different product at first glance |
| Capstone evidence | Browse, cart from two vendors, Stripe test payment, split orders, cached search, async jobs, reservations, coupon pricing | Reading list matched across shops; ISBN-10 typed by a shop matches an existing edition; one alert arrives and does not repeat on republish; paid split orders with grade snapshots and collection codes; last-copy race with substitute; markdown triggers re-match | The demo and viva are about identity, matching and idempotent standing queries, not stock arithmetic or coupons |

## Uniqueness score

**Against FreshMarket: 6 of 6.** Every dimension changed, as shown above. The shared parts (auth, Stripe test mode, deploy, worker infrastructure) are spine, not product.

**Against the other four candidate variants: 6 of 6 each, with the honest overlaps named.**

| Against | Journey | Constraint | Data model | Hero | Identity | Capstone | Notes |
|---|---|---|---|---|---|---|---|
| services | Different | Different | Different | Different | Different | Different | Services sells time, not objects. Holds on a time slot and on a copy are both single-unit holds, but that is spine (concurrency), not either hero |
| handmade | Different | Different | Different | Different | Different | Different | Closest risk. Both sell single units. Handmade items have no shared identity and add made-to-order requests; Hamesh copies share an Edition and are matched by ISBN and grade. A handmade "notify me" feature would be a reskin of Module 24, so the handmade producer should avoid one |
| home-kitchens | Different | Different | Different | Different | Different | Different | Both send notifications from a worker. Kitchens push status changes for one order the user already placed; Hamesh evaluates a standing query against new supply and must not alert twice. Different model, different failure modes |
| digital-goods | Different | Different | Different | Different | Different | Different | Ebooks belong to digital-goods and are out of scope here. Hamesh has physical copies, pickup and condition; digital-goods has licences and signed links |

Evidence for the data model claim: compared with FreshMarket, the entities that change materially are Product (split into Edition and Listing, ownership moved), CartItem (quantity removed, points at one copy), ReadingList (new), WantListEntry (new), MatchAlert (new), and the Order line (adds grade and defect snapshot). The relationship that changes most is ownership: FreshMarket has one chain (User to Store to Product); Hamesh has an owned chain (User to Shop to Listing) that points into an unowned shared catalogue (Edition to Work), which changes the authorization rules in Module 8.

Risks to the score, stated plainly:

- If instructors cut Module 24 (want-list alerts) to save time, the hero shrinks to the synchronous matcher. That still passes, but the async half of the capstone is what makes the demo memorable. Keep it.
- If the handmade variant adds a "notify me when available" feature, it will collide with Module 24. Flag this to the handmade producer.

## Shared spine

Unchanged from FreshMarket and identical across variants:

- **Outcomes O1 to O13.** Same verbs and evidence standard; the domain nouns change.
- **Stack.** MongoDB, Express, React with Vite, Node.js, Redis, BullMQ, Cloudinary, Stripe test mode.
- **Module order.** Foundations, auth, isolation, seller surface, buyer surface, cart, checkout with snapshots, payment, order tracking, cache and search, async jobs, deploy, concurrency hardening, server-owned pricing, closing. The two new modules are inserted after the modules they depend on (18 after cart, 24 after async jobs).
- **Chapter archetypes.** Open, Learn, Check, Build, Wrap; checklist gate on every module; set-the-scene chapters with bridge, plain English, an analogy and beginner questions.
- **Production bar.** Hashed passwords, ownership checks, verified webhooks, idempotency, secrets in env, restart survival, Redis-down fallback.
- **Assessment standard.** Gate evidence per module, five-minute demo, viva without notes.
- **Carried almost unchanged:** Modules 2, 4, 6, 7, 9, 10, 17, 20, 25.

## Rejected similarities

| Looks similar | Decision | Why |
|---|---|---|
| Search as hero (FreshMarket Module 21) | **Rejected as hero**, kept as adapted chapter | Same text-index lesson with a new label. Hamesh adds exact ISBN lookup, but that is a chapter, not a hero |
| Recommendations as hero | **Rejected**, moved to stretch S3 | Cannot be demonstrated honestly with seed data; teaches nothing O6 does not |
| Copy holds vs FreshMarket inventory reservations (FM 24) | **Accepted as spine** | Same outcome (O11). The build differs: no available-to-promise arithmetic, a status change on one copy, plus a substitute suggestion. Not claimed as a difference in the score |
| Want-list alerts vs FreshMarket order notification jobs (FM 22) | **Accepted**, and counted as different | Both use a BullMQ worker. FM notifies about a known order; Hamesh runs a reverse match over a multikey index and must guarantee one alert per student per copy with a unique index |
| Grade pricing and markdowns vs FM promotions (FM 25) | **Accepted as spine** | Same trust-boundary outcome (O12). Coupons are dropped; the build is grade rules, a repeatable markdown job with a floor, and price audit |
| Pickup collection code vs any variant's delivery tracking | **Accepted** | Small chapter in Module 21, not a hero, and different from home-kitchens' live tracking |
| Reusing FreshMarket's canvases | **Rejected** | The only proposed canvas is the Copy matcher (inputs: grade floor, price ceiling, accept other printings; output: which seed copies pass each rule and which one wins). It teaches this variant's constraint. Stated limit: it ignores holds and shop distance |

## Identity

- **Product name:** Hamesh (from the Arabic هامش, "margin": the margins where earlier readers left their notes in a used book).
- **One-line pitch:** Find every book on your course list, in the edition your lecturer asked for and the condition you can afford, from bookshops near you.
- **Tone of voice:** calm, precise and honest, like a good librarian. It always says the condition plainly ("Good: some pencil notes in chapter 3"), never oversells a copy, and explains what a grade means in one line. Short sentences, plain English, no hype.
- **Visual identity:** warm paper background, deep ink-blue accent, serif headings with a plain sans-serif body, grade badges that carry the grade name as text (never colour alone), real photos of real copies with their flaws visible.
- **Seed content ideas:**
  - Three fictional shops: Olive Leaf Books (near a campus, mostly used textbooks), Corner Shelf (small general bookshop, mixed grades), Campus Copy House (new copies and Like New returns). Names are invented; the writer checks they do not match a real local business before use.
  - Openly licensed textbooks (for example OpenStax titles) and public-domain classics, using their real ISBNs, checked at seed-writing time. At least one title seeded with both an ISBN-10 and its ISBN-13, and one with a 979 ISBN-13 only, so the conversion rules are visible.
  - Copies in every grade, with honest defect notes ("highlighter in chapters 1 to 4", "access code used", "water mark on back cover").
  - Two fictional course codes with reading lists published by Olive Leaf Books: a first-year biology course (four titles, one with no copy in the seed so the want-list demo works) and a first-year writing course (two acceptable editions of one title).
  - Demo student: a first-year student who sets a grade floor of Good and a total budget.
  - This seed story belongs to this variant only and must not be reused by any sibling.

## Follow-up specialization course

**Catalogue identity and standing matches at scale.** A fellow who finishes Hamesh has met the hard edge of this domain in small form: deciding when two records are the same book, and answering a saved question every time new supply arrives. A natural next course takes both further. On identity, it covers books with no ISBN or wrong ISBNs, grouping editions into works across sources, merging duplicate records safely after they already have copies and orders attached, and measuring match quality with precision and recall on a labelled set. On standing matches, it moves from a MongoDB multikey index to a search engine's reverse-query feature (for example the Elasticsearch or OpenSearch percolator), handles fan-out when one listing matches thousands of saved searches, adds digest alerts and quiet hours so students are not flooded, and tests fairness when many students want the same scarce copy. The capstone is a matching service with a measured accuracy report and a load test, which is portable to any marketplace that must match supply to saved demand: jobs, housing, spare parts or tickets.
