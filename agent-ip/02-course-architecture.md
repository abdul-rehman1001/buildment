# Course Architecture

This document defines how a course is shaped: the skill spine, the general course, the variants, the time budget, the module sequence, the chapter anatomy, and the rules that keep variants from becoming reskins.

## Backward design

Every course is designed backward from evidence.

1. **Desired results.** What can the learner do at the end that they could not do before? Write outcomes with observable verbs: design, implement, debug, deploy, defend. Avoid "understand" and "know" unless you define the observable behaviour.
2. **Acceptable evidence.** What artifact proves the outcome? A deployed demo, a test suite, a data model, an incident write-up, an architecture defense, a code review. If an outcome has no evidence, it is not an outcome.
3. **Learning activities.** What must the learner read, decide, build, break, and explain to produce that evidence? Chapters are the sequence of those activities.

The blueprint is not a table of contents. It is a contract between outcomes, evidence, and activities. If a chapter does not serve an outcome or produce evidence, cut it.

## The three layers

### Layer 0 — Skill spine

The spine is domain-agnostic and stable across every course:

- product discovery and scope control;
- data modelling and schema evolution;
- API design, validation, and error contracts;
- authentication, authorization, and trust boundaries;
- synchronous vs asynchronous work;
- file and object storage;
- state machines and lifecycle rules;
- concurrency and idempotency;
- testing at unit, integration, and end-to-end levels;
- security, privacy, and abuse resistance;
- performance measurement and caching;
- deployment, observability, and operations;
- technical communication and defense.

The spine is what makes the course a course, not a tutorial for one stack.

### Layer 1 — General course

The general course instantiates the spine in one domain. It defines:

- the product and the learner's demo target;
- the domain vocabulary and data model;
- the module sequence and chapter archetypes;
- the interaction grammar and density budget;
- the assessment style and capstone evidence;
- the production bar for the domain.

The general course is the approved reference. It is not published to learners as a "template". It is the source from which variants are derived.

### Layer 2 — Variants

A variant is a complete course for a different product in the same family. It keeps the spine, outcomes, evidence standards, and chapter archetypes. It changes the domain, primary user journey, hardest constraint, data model, hero feature, visual identity, and capstone evidence.

The variant contract is in this document. The variant producer executes it. Before variant chapters are written, the variant roadmap is confirmed with the instructors using the same process as the general course.

## The curriculum roadmap gate

Before the general course is written, the curriculum roadmap is confirmed by the instructors who will teach it. The roadmap is drafted at G2A and confirmed at G2B. This is a hard gate, not a courtesy review.

The roadmap is the cheapest artifact to change and the most expensive one to get wrong. A wrong chapter costs a rewrite; a wrong roadmap costs the course.

### What the roadmap contains

Keep it short enough for an instructor to review in one sitting. It is not the blueprint, and it is not a chapter.

- the course promise in one paragraph;
- the learner and entry prerequisites;
- the outcomes, with observable verbs;
- the module sequence, with one-line purpose and hours;
- the chapter titles, each with a one-line outcome;
- the gate evidence at a glance;
- the capstone and the five-minute demo;
- the variant directions and how each differs;
- what is explicitly out of scope;
- the open decisions the instructors must settle.

### The seven instructor questions

1. Is this the right sequence for how you actually teach this material?
2. Are these the outcomes you would expect from someone who finished?
3. Is the time budget realistic for the learners you will send here?
4. What is missing that you would refuse to teach the course without?
5. What is included that you would cut?
6. Do the variants represent the audiences and products you serve?
7. Is the capstone something you would be proud to review and defend?

The instructors do not need to review prose, block density, or quiz wording at this gate. They review the shape of the course.

### What confirmation means

- At least two instructors sign the roadmap.
- Every open decision is resolved or explicitly deferred with a reason.
- Requested changes are applied and the roadmap is re-confirmed.
- The delivery lead records the result in `roadmap-confirmation.md`.
- No blueprint, sample chapter, or general course is written until this record exists.

After G2B, the detailed blueprint and project brief are produced at G2C. If they contradict the confirmed roadmap, stop and re-run G2A/G2B; do not patch the roadmap silently.

If the instructors cannot confirm the roadmap, revise it or cut scope. Do not write the course and hope they approve later.

### Variants

A variant roadmap is derived from the confirmed general roadmap. It changes the domain, primary user, hardest constraint, data model, hero feature, visual identity, and capstone evidence. The instructors confirm the variant roadmap before variant chapters are written. A variant that the instructors would not teach is not a variant; it is a different course that needs its own brief.

## Constructor profiles

A constructor profile is the pedagogical shape of the course — how the learner encounters the problem. Choose one profile per course. Variants may use a different profile to create genuine variety, provided the outcomes stay the same.

| Profile | Opening move | Best for | Risk |
|---|---|---|---|
| **Build-first** | Ship a thin slice, then deepen | Learners who need momentum | Can become feature tourism if the architecture is postponed |
| **Case-first** | A real incident or company decision, then the principle | Learners who need relevance | Can become storytelling without enough building |
| **Systems-first** | Map the system, then implement the parts | Architecture-heavy domains | Can overwhelm novices before they ship |
| **Decision-first** | A trade-off lab, then the implementation that follows | Senior learners and interview prep | Can under-teach fundamentals |
| **Debug-first** | A broken system, diagnose, then rebuild | Learners who freeze when things fail | Can normalise fixing code without understanding it |

The profile changes the opening move and the rhythm, not the production bar. Every profile still ends with a deployed, defensible product.

## Time budget

Every course has a time budget, set in the course brief and confirmed with the roadmap. The factory keeps the course inside it: the prerequisites/timeline agent rejects a blueprint whose core path exceeds the budget, and chapters are sized to fit it, not the other way round.

| Course type | Typical budget | Example |
|---|---|---|
| Flagship engineering course | 210 to 280 hours over 3 to 4 weeks | The general course and its variants |
| Short course or specialization | 30 to 60 hours | A 40-hour course on one hard constraint |
| Soft-skills course | 8 to 20 hours | Decision-making, communication |

The numbers below are the flagship default. Scale the shares, not the rigor, for a smaller budget.

The flagship course is sized for 3 to 4 weeks at roughly 10 hours per day.

- **Core path:** 210 hours — the minimum a learner must complete to finish.
- **Stretch path:** 280 hours — optional depth, extra polish, and portfolio work.

Allocate the core path roughly as follows:

| Activity | Share | Hours (core) |
|---|---|---|
| Reading, concept, and decision work | 20% | 42 |
| Guided build | 35% | 74 |
| Independent build | 25% | 52 |
| Testing, debugging, and verification | 10% | 21 |
| Review, reflection, and defense | 5% | 10 |
| Buffer | 5% | 11 |

These are planning targets, not a promise. The prerequisites/timeline agent must sum chapter estimates and reject a blueprint whose core path exceeds the budget in the brief (210 hours for the flagship default).

## Course shape

A typical course has 8–10 modules and 45–65 chapters. A chapter is 2–4 focused hours. A module is 4–7 chapters plus a gate.

| Module archetype | Purpose | Typical chapters |
|---|---|---|
| Orientation | Product, people, outcomes, scope, working rhythm, prerequisite repair | 5–7 |
| Product and architecture | Domain model, trust boundaries, feature slices, demo target | 5–7 |
| Foundation slice | Running skeleton, first deploy, first end-to-end path | 5–7 |
| Core loop | The primary user journey, built and verified | 6–8 |
| Second persona | Admin, operator, or seller surface | 4–6 |
| Production hardening | Auth, validation, async, storage, rate limits, tests | 6–8 |
| Performance and observability | Measure, cache, log, alert, recover | 4–6 |
| Deploy and operate | Production configuration, migrations, rollback, runbook | 4–6 |
| Capstone defense | Demo, architecture walkthrough, viva, portfolio | 3–5 |

Not every domain needs every archetype in the same order. The order must still follow the dependency chain: foundations before features, features before hardening, hardening before scale, scale before defense.

## Chapter anatomy

Every chapter follows the same skeleton. The depth changes; the skeleton does not.

1. **Hook.** A concrete problem, tension, or failure the learner can feel. Two to four sentences.
2. **Outcome.** What the learner will be able to do or show by the end. One sentence, observable.
3. **Context.** Where the project is now and why this chapter comes next. One short paragraph.
4. **Concept.** The minimum theory needed for the next decision. Explain the mechanism, not just the vocabulary.
5. **Worked example.** A solved example for an adjacent case. Show the reasoning, not only the result. Where a small causal model is the best teacher, an interactive canvas may replace or extend the worked example — see `10-interactive-canvases.md`.
6. **Decision.** The trade-off the learner must make. Name the alternatives and the consequence of each.
7. **Build.** The task, with constraints, interfaces, and acceptance criteria. The learner writes the implementation.
8. **Verify.** A command, test, screenshot, or checklist that proves the build works — including one failure mode.
9. **Reflect.** A short retrieval or learning-log prompt that makes the learner articulate what they now understand.
10. **Bridge.** What this unlocks and what comes next. One or two sentences, no recap of the whole chapter.

Chapters that are pure quizzes or gates compress steps 1–8. They must not introduce new conceptual content.

## Prerequisites and the skill graph

Every chapter declares:

- **requires:** concepts or artifacts the learner must already have.
- **introduces:** the new concept or skill.
- **reinforces:** prior concepts practised again.
- **evidence:** what the learner produces.

The prerequisites/timeline agent builds a directed graph from these declarations. The graph must be acyclic. Every `requires` edge must point to an earlier chapter or an entry prerequisite.

Entry prerequisites are stated in the course brief. For a production-grade full-stack course, the baseline is usually:

- JavaScript or TypeScript fundamentals;
- HTTP and the request/response cycle;
- one prior CRUD app;
- Git and the command line;
- basic relational or document data modelling.

If the course needs more, add a diagnostic and a repair path. Do not silently assume it.

## Adaptive paths

The course must be finishable by a determined learner without being trivial for a strong one.

- **Diagnostic.** A short entry check maps the learner to core, stretch, or repair.
- **Core path.** The minimum sequence that reaches the outcomes.
- **Repair path.** Targeted refreshers for missing prerequisites, linked from the diagnostic. They do not block the main line longer than necessary.
- **Stretch path.** Optional labs, harder constraints, performance targets, or a second persona. They add evidence, not busywork.
- **Hints.** Each build chapter has at least one progressive hint and one "if you are stuck" diagnostic. The hint reveals the next decision, not the full solution.
- **Checkpoints.** A learner can self-check before a gate without waiting for a mentor.

Adaptivity is not a branching CYOA. It is a small number of explicit paths with clear entry and exit points.

## Variant uniqueness contract

A variant must differ from the general course and from every other variant on at least **four** of these six dimensions:

1. **Primary user journey.** Who does what, in what order, to get value.
2. **Hardest constraint.** The technical or domain rule that shapes the architecture (seat concurrency, multi-day access, recurring sessions, timed entry, geospatial search, etc.).
3. **Data model.** At least two entities or relationships change materially.
4. **Hero feature.** One capability that is central to the variant and absent or trivial in the others.
5. **Visual and verbal identity.** Product name, brand, seed content, copy, and demo narrative.
6. **Capstone evidence.** What the learner demos and defends.

A variant that changes only names, colours, and seed data is rejected. A variant may reuse the same tech stack; it may not reuse the same product story. An interactive canvas counts as product evidence: reusing the same canvas with different labels is a reskin.

The variant producer writes a `variant-diff.md` that states, for each dimension, what changed and why. Two reviewers must be able to explain the differences without reading the diff.

## Combinations

A fellow's course is a combination of three layers. Only the first changes the product; the other two make each fellow's path and portfolio their own.

| Layer | What it changes | Counts toward variant uniqueness? |
|---|---|---|
| **Industry or use case** (the variant) | Domain, user journey, hardest constraint, data model, hero feature, capstone | Yes |
| **Specialization or special interest** | One stretch module or a follow-up course on a deeper topic, such as payments, search, realtime, offline-first mobile or AI features | No; it adds evidence on top of the core |
| **Design elements** (personalization) | Brand style, project name, wordmark and accent colour chosen by the fellow | No; on its own it is a reskin |

Rules:

- A specialization adds stretch hours inside the budget or becomes its own short course. It never replaces a core module.
- A variant's hardest constraint is the natural first specialization for fellows who finish that variant.
- Personalization is chosen at enrollment and stored with the enrollment, so mentors see it in review. Assignment caps keep two fellows from shipping the same combination.

## Worked example: event ticketing

The general course is **Ticketline**, a production-grade event ticketing platform. The learner builds organizer, buyer, and gate-check-in surfaces, handles seat or capacity inventory under concurrency, integrates a test payment provider, issues scannable tickets, and deploys the system.

The spine stays constant: product scope, data model, auth, inventory concurrency, payments, webhooks, QR check-in, notifications, tests, deploy.

The variants change the product and the hardest constraint:

| Variant | Primary user | Hardest constraint | Hero feature | Data-model delta |
|---|---|---|---|---|
| **Festival** | Multi-day festival promoter and attendee | Multi-day access zones and wristband re-entry | Pass tiers, zone entitlements, re-entry rules | `Pass`, `AccessZone`, `ScanEvent` |
| **Conference** | Conference organizer and speaker | Session capacity and add-on selection | Agenda builder, session seats, badge printing | `Session`, `SessionSeat`, `AddOn` |
| **Sports** | Club and season-ticket holder | Seat map, season passes, resale rules | Interactive seat selection and season packages | `VenueSection`, `Seat`, `SeasonPass` |
| **Workshops** | Small-class instructor and student | Recurring sessions and waitlists | Waitlist promotion and attendance | `WorkshopSeries`, `Session`, `WaitlistEntry` |
| **Cinema** | Cinema chain and moviegoer | Showtime scheduling and seat holds | Showtime grid and hold expiry | `Screen`, `Showtime`, `SeatHold` |
| **Museum** | Museum and timed-entry visitor | Capacity slots and membership access | Timed slots, member windows, group entry | `TimeSlot`, `Membership`, `GroupBooking` |

The outcomes are identical: model inventory, prevent overselling, take payment, issue a scannable ticket, handle failure, deploy, and defend. The products are not.

## What stays invariant

Across the general course and every variant:

- the instructor-confirmed roadmap;
- the outcomes and evidence standard;
- the production-grade bar;
- the chapter archetypes;
- the interaction grammar and density budget;
- the interactive canvas standard: one causal claim, two to four inputs, a tested model, a stated limit, a simple visual language, and a safe rendering choice (HTML/CSS, inline SVG, or Canvas 2D);
- the anti-slop contract;
- the assessment quality bar;
- the requirement that the learner can defend the work.

If a variant cannot keep these invariants, it is not a variant. It is a different course and needs its own brief.
