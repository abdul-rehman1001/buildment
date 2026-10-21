# Week 1 review packet — v2

## What was built

Week 1 of Ticketline is now **12 deeper chapters** under `courses/ticketline/`:

- **Module 1 — Foundation:** 1.1–1.4
- **Module 2 — Auth and roles:** 2.1–2.4
- **Module 3 — Events and ticket types:** 3.1–3.4

**12 chapters · 14,319 prose words · audit 0 issues · 3 modules · 26 blocks imported.**

The audit measures prose paragraphs only, excluding code, lists, tables, and components. Every chapter passes the 1,200-word concept/build threshold or the 700-word checkpoint/gate threshold, and every chapter has a diagram.

## Diagram coverage

- **Excalidraw-style SVG:** the core loop, the Week 1 ERD, and the session authentication flow.
- **Live diagrams:** the trust-boundary architecture, the public-catalogue request trace, the session lifecycle, the authorization decision flow, the onboarding/verification trace, the event lifecycle, the inventory states, and the presigned cover upload trace.
- **Assets:** `frontend/public/course-assets/ticketline/`.

## Read these first

1. **`01-foundation/01.01-the-product-the-promise-and-the-invariants.md`** — the product promise, the four invariants, and the core-loop diagram.
2. **`01-foundation/01.04-data-model-skeleton-and-first-deploy.md`** — the ERD, the schema, the running skeleton, and the Module 1 gate.
3. **`03-events-and-ticket-types/03.04-week-1-gate-publish-and-browse.md`** — the end-to-end demo and Week 1 gate.

If those three are right, the rest of Week 1 is likely to be right.

## What changed from v1

- 18 thin chapters → 12 deeper chapters.
- 4,572 → 14,319 prose words (measured without code, lists, tables, or components).
- Repeated `LearningObjectives`, `BigWordAlert`, `ChapterRecap`, and quizzes removed from every chapter; they now appear at module starts and gates.
- One diagram per chapter, including three Excalidraw-style SVGs.
- Added worked examples, alternatives, failure modes, debugging paths, and tests to the build chapters.
- Added the executable course audit and the `diagram` fence same-origin asset support.

## Review questions

1. Is the product promise clear enough for a learner to explain it after 1.1?
2. Are the four invariants the right spine for the course?
3. Is the Week 1 build realistic at roughly 64 hours?
4. Does 1.4 give enough guidance without handing over the implementation?
5. Is the auth module sequenced correctly: sessions, routes, roles, onboarding, tests?
6. Does the events module teach time zones, capacity, images, and search without becoming a feature checklist?
7. Do the diagrams argue, or do any of them merely restate the prose?
8. Is anything missing that a learner would need before Week 2?

## Known gaps

- **No learner pilot.** The prose depth and 64-hour estimate still need one real learner run.
- **No technical validation against a real learner repository.** The code snippets are contracts; the commands have not been executed end-to-end as a learner project.
- **G3 artifacts are still informal.** The interaction map and assessment plan are embedded in the chapters, not yet extracted as separate artifacts.
- **Week 2 is not built.** Holds, concurrency, payments, webhooks, QR tickets, and check-in remain.
- **The platform canvas is not built.** The first canvas is the seat-hold race in Week 2.

## Next options

1. **Review and revise Week 1 v2** — focus on 1.1, 1.4, and 3.4 first.
2. **Continue to Week 2** — inventory holds, concurrency, Stripe checkout, and webhooks.
3. **Run a learner pilot** — one developer, one module, measure time and confusion.
