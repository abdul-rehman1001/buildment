---
artifact: reference-consistency
course: multi-vendor-marketplace
reference: github.com/AQIB-NAWAB/buildment-courses/tree/main/multi-vendor-course/01-food-marketplace
date: 2026-10-21
status: open
---

# Reference consistency: FreshMarket

The check is in `agent-ip/06-quality-gates.md` → Reference consistency. These mismatches between the FreshMarket chapters and the reference build are known and open. Some also appear inside the course itself, where different chapters use different names. Each one is an S2 defect until one side is fixed and the decision is logged.

| Topic | The two versions in play | Status |
|---|---|---|
| Language and test runner | JavaScript and Jest, versus TypeScript and Vitest | Open |
| When an order is created | At checkout, versus after payment succeeds | Open |
| Starting payment | `POST /payments/intent`, versus `POST /checkout/start` | Open |
| Vendor order status update | `PATCH /vendor/orders/:id`, versus `PATCH /vendor/orders/:id/status` | Open |
| Admin panel | The course says there is no admin role in the MVP; the reference build has an admin module | Open |
| Currency | Dollars, versus rupees | Open |
| Brand config | `client/src/styles.css` names colours by hue (cream, forest, terracotta), not by role, and has no dark mode. A single brand config (name, logo, colour role tokens, fonts, dark mode) does not exist yet | Open |

For each row, decide which side is right, fix the other side, and re-run the checklist.
