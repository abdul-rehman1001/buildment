---
artifact: variant-diff
course: multi-vendor-marketplace
variant: digital-goods
variant_course: multi-vendor-marketplace-digital-goods
version: 1
owner: variant-producer
status: draft
---

# Variant diff: digital-goods (Midad)

## Identity

- **Product name:** Midad (Arabic for "ink"). Short, easy to say in Arabic and English, and it fits creators of type, templates and books.
- **One-line pitch:** Buy a font, template or ebook from an independent creator and find it in your library, with your license key, before the payment screen has closed.
- **Tone of voice:** calm, exact and honest about limits, like a good print shop. Copy says what a license allows in plain sentences ("You can use this font in client work for up to 3 people"), never in legal language. Error messages say what happened and what to do next ("This link has expired. Ask for a new one from your library."). No hype words.
- **Visual identity:** a creator's studio, not a bookshop. Dark workspace surface by default with a light mode, one electric violet accent, sans-serif headings. License keys, file sizes and checksums in a monospace face, shown like a developer console. The library is a grid of license cards grouped by creator, each with its download count. (Changed from "paper and ink", which the books variant already uses.)
- **Seed content ideas (all fictional; check names do not collide with real products before seeding):**
  - *Noor Type Studio:* "Sahil", an Arabic and Latin display font family (personal and commercial licenses, 3 commercial seats).
  - *Bayan Templates:* bilingual CV and invoice templates for freelancers.
  - *Qalam Press:* short practical ebooks, for example "Freelancing from your phone" and "Your first client contract".
  - *Shams Icons:* an icon pack for small-business websites.
  - All seed deliverables are generated placeholder files (a small generated PDF, a ZIP with a README), so no real font or book license is involved and uploads work on a weak connection. Seed stories must not reuse tatreez, olive wood, food, tutoring or second-hand books, which belong to the other variants.
- **Demo narrative:** Rana runs a one-person type studio. She lists a font with a personal and a commercial license. Omar, a freelance designer, buys her font and a CV template from another creator in one payment, has both in his library within seconds, and adds two teammates to his commercial seats. When a refund is made for the template, only the template disappears from his library.

## Dimensions

| Dimension | General course (FreshMarket) | Variant (Midad) | Why it matters |
|---|---|---|---|
| Primary user journey | Vendor lists groceries with stock; shopper fills a multi-store basket, pays, and waits for vendors to pack and dispatch (`pending`, `packed`, `dispatched`) | Creator uploads a private file and sets license options; buyer picks a license per item, pays once, and gets access immediately in a library; later the buyer downloads, assigns seats, and may be refunded. No packing, no dispatch, no waiting on the creator | The value moment moves from "vendor ships later" to "system grants access now", so the core loop is driven by a webhook and an entitlement record, not by a vendor status update |
| Hardest constraint | Stock under concurrent checkout; perishable items; reservations with expiry (Module 24) | Access that is granted exactly once by a verified webhook, limited by license (downloads, seats), and withdrawn on refund, while the delivery link itself cannot be recalled once issued | Shapes the architecture: webhook as source of truth, idempotency at the effect, private storage, short link lifetimes, revocation states, reconciliation for missed webhooks |
| Data model | User, Store, Product (`unit`, `weightOrQuantity`, `isPerishable`, `stockQty`), CartItem with quantity, Order with snapshot items, StockReservation, Coupon | **Changed:** Product loses all stock and physical fields and gains embedded `licenseOptions` (type, price, seat limit, download limit, terms version). **New:** ProductFile (private, versioned, checksum) separate from the public listing; License (the entitlement: key, status, `downloadsRemaining`, embedded seats) created per order line; DownloadGrant (audit of each issued link); Refund; Checkout (one payment, many orders). **Changed relationship:** cart line is (product, license type) with no quantity; order lines snapshot license terms, not units. **Removed:** StockReservation | At least four entities and two relationships change materially. The stock that FreshMarket kept on the product now lives on the license, which is the key teaching move of Module 25 |
| Hero feature | Multi-vendor cart split into per-vendor orders with price snapshots | Licensing and signed download links: license types and keys, the library, server-issued expiring links, download and seat limits, refund revocation | Central to every week from Module 11 onward and absent from every other variant |
| Visual and verbal identity | FreshMarket: clean editorial grocery style; produce, units, freshness | Midad: a creator's studio, dark workspace with monospace keys; creators, licenses, keys, library; plain-language license copy | A reviewer can tell the products apart from one screenshot |
| Capstone evidence | Two-store checkout with Stripe test payment, split orders on both sides, cache, async jobs, reservations under concurrency | Webhook fills the library; replayed event creates nothing; expired link fails; parallel script shows exactly N downloads and seats granted; partial refund revokes one creator's license only; `docs/download-security.md` threat model | The learner demos and defends access control and exactly-once fulfilment, not inventory and order status |

## Uniqueness score

**Against FreshMarket: 6 of 6.** All six dimensions differ, with the evidence in the table above. Even if visual identity is discounted as the easiest dimension to change, five substantive dimensions remain.

**Against the other four candidate variants:**

| Dimension | services | handmade | home-kitchens | books |
|---|---|---|---|---|
| Primary user journey | Differs: they book a future time slot and the value is delivered later in person; Midad delivers immediately and digitally | Differs: they request, agree and wait for an item to be made; Midad has no request or making step | Differs: they order before a cutoff and follow a delivery; Midad has no delivery | Differs: they search, compare condition grades and wait for shipping |
| Hardest constraint | Differs: slot holds and double booking vs exactly-once access and revocation | Differs: unique items and custom requests vs unlimited copies with limited rights | Differs: time windows and cutoffs vs webhook-driven access | Differs: condition grading and used pricing vs license rights |
| Data model | Differs: no slots or bookings; License, ProductFile and DownloadGrant are unique to Midad | Differs: no custom request or quote entity | Differs: no delivery window or tracking entity | Differs: no condition grade or copy entity |
| Hero feature | Differs | Differs | Differs | Differs |
| Visual and verbal identity | Differs | Differs | Differs | Differs |
| Capstone evidence | Differs | Differs | Differs | Differs |
| **Score** | **6 of 6** | **6 of 6** | **6 of 6** | **6 of 6** |

The contract needs 4 of 6. Midad passes against every course in the family. The closest overlaps are listed under Rejected similarities with the rule that keeps each one apart.

## What I changed from the candidate, and why

1. **Sharpened the hardest constraint.** The candidate said "no shipping, instant delivery after payment". "No shipping" is an absence and does not shape any architecture by itself. The constraint is now: access granted exactly once by a verified webhook, limited by license, withdrawn on refund, delivered through links that cannot be recalled once issued. That version forces decisions in Modules 19 to 26 and gives the capstone something to prove.
2. **Replaced stock and reservations with an equal-weight pair.** Inventory is unlimited, so FreshMarket's atomic stock decrement (Module 18) and inventory reservations (Module 24) would be empty. Module 25 (download limits and seats under concurrency) keeps the concurrency lesson: atomic conditional updates, a race the learner predicts and then sees, and a parallel test as gate evidence. It adds a new idea FreshMarket does not teach: embedding seats in the license makes seat assignment atomic without a transaction. Module 26 (refunds and revocation) keeps the state-machine and time-limit lessons: order and license states, a decision about when access ends, and the window that link expiry bounds.
3. **Made refunds core, moved promotions to stretch.** Refund revocation is half of the hero feature and must be in the core path. FreshMarket's promotions module becomes stretch S1 (bundles, coupons and license upgrades), which keeps "never trust client totals" available without breaking the 210-hour budget. The core trust-boundary lesson stays in Modules 18 and 19, where the server prices every checkout.
4. **Chose Cloudinary over S3 for core private storage (open decision 1).** Cloudinary is already in the stack and needs no new account. S3 needs an AWS account, and AWS asks for a payment card at sign-up. S3 presigned URLs are taught as stretch S3 behind the same storage interface, so the comparison is still made.
5. **Orders are created before payment.** FreshMarket creates orders after the client confirms a paid intent. For webhook-triggered fulfilment the webhook must find something to fulfil, so Midad creates a Checkout and `pending_payment` orders first and links them through PaymentIntent metadata.

## Accuracy notes on the core mechanisms

These are the claims the chapters will rely on. The roadmap lists them again for the technical validator.

- **Cloudinary.** Assets uploaded with delivery type `private` or `authenticated` are not served from a plain public URL. A signed delivery URL proves the URL was not changed, but it does not expire on its own. Time-limited access in the core path uses a download URL generated on the server (`private_download_url` with an `expires_at` time). Expiring token-based delivery URLs exist but only on some paid plans, so the course does not depend on them.
- **S3 (stretch).** A presigned `GetObject` URL is signed with the credentials of whoever created it and works for anyone who holds it until it expires. With Signature Version 4 the longest allowed lifetime is 7 days, and a URL signed with temporary credentials stops working when those credentials expire.
- **Both providers.** A time-limited link is a bearer link: the server cannot recall it once issued. Download limits and revocation are therefore enforced when the server issues the link, and the link lifetime is what bounds the damage after a refund. The course states this plainly and never claims that a link "stops working" on refund.
- **Stripe.** Webhook signatures are checked against the raw request body with the endpoint's signing secret. Stripe can deliver the same event more than once and does not guarantee order, and it retries failed deliveries. A refund can be partial, which is how one creator's order is refunded out of a shared payment.

## Shared spine

Unchanged from FreshMarket:

- **Outcomes and evidence standard:** model data, enforce ownership, take a test payment for a multi-vendor cart, handle concurrency and idempotency, move work to a worker, cache, deploy, defend.
- **Production bar:** secrets in env, verified webhooks, rate limits on sensitive routes, API and worker survive restart, live HTTPS URL.
- **Stack:** MongoDB, Express, React (Vite), Node.js, Redis, BullMQ, Cloudinary, Stripe test mode.
- **Chapter archetypes and rhythm:** set the scene, learn, check, build steps, checklist gate; backend chapter then UI chapter in Weeks 2 and 3; week demos.
- **Interaction grammar and assessment standard:** same step-type labels, quizzes, learning log, checklist gates and bar-raiser format.
- **Modules carried over almost unchanged:** project skeleton, config and database, authentication API, login and registration, open your studio, browse catalogue API, cache and search, deploy.

## Rejected similarities

| Looks similar to | What it is | Verdict |
|---|---|---|
| FreshMarket's atomic stock decrement (Module 18) and reservation race (Module 24) | Module 25 uses the same `findOneAndUpdate` with the limit in the filter | Acceptable: this is the concurrency part of the spine. The object (a license, not a product), the second case (embedded seats) and the third case (duplicate webhooks) are different, and so is the gate evidence. Any canvas must not reuse FreshMarket's reservation timeline or two-tab checkout model |
| FreshMarket's reservation expiry and the services variant's slot holds | Midad also has "something that expires" | Acceptable: a hold is a database record that the server releases; a link expiry is checked by the storage provider from a signed timestamp. The candidate canvas for Midad shows the revocation window (link lifetime against refund time), not a hold countdown |
| FreshMarket's expiry worker | Midad's reconciliation job also runs on a schedule | Acceptable: it compares Stripe's record of succeeded payments with Midad's unfulfilled checkouts and repairs the gap. Different model, different evidence |
| home-kitchens' live order tracking | Midad's success page waits for fulfilment | Must stay small: a short "Preparing your files" poll, no status timeline, no live updates after fulfilment, no WebSockets. Otherwise it borrows the home-kitchens hero |
| books' search and recommendations | Midad has catalogue search (Module 22) | Acceptable as carry-over spine. Midad must not add recommendations, "buyers also bought" or ranking work |
| handmade's custom order flow | Midad has creators and listings | Acceptable: no requests, quotes or made-to-order states in Midad. Seed content avoids tatreez and olive wood |
| Webhook event log and idempotency keys in every variant | Shared with the whole family | Acceptable: spine. In Midad the webhook is also the trigger that grants access, which no other variant relies on |
| Cloudinary photos in FreshMarket (Module 13) | Midad reuses the upload pattern for previews | Acceptable: Module 13 is rebuilt around private deliverables and expiring access; previews take 1.5 hours of it |

## Follow-up specialization course

Fellows who finish Midad will have met the hardest constraint in one small form: access that is bought, limited and taken back. The natural next course is **Entitlements engineering: who may use what, for how long**. It would take the same idea into the places real products need it: subscriptions and renewals where access ends when a payment fails, metered plans where each use counts against a balance, team plans with seat changes in the middle of a billing period, offline license checks with signed keys and revocation lists, and access control at the edge with signed cookies on a CDN for whole folders of files. The capstone would be an entitlement service that several apps call to answer one question correctly under load: "may this user use this thing right now?"
