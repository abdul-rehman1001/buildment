# Run log — Ticketline

| Date | Phase | Artifact | Agent | Status | Notes |
|---|---|---|---|---|---|
| 2026-10-20 | G0 — Brief | `00-course-brief.md` | Course engineering | complete | Draft for instructor review |
| 2026-10-20 | G1 — Research | `01-research-dossier.md` | Research | complete | Sources checked 2026-10-20; some claims marked verify-at-authoring |
| 2026-10-20 | G2A — Curriculum roadmap | `02-curriculum-roadmap.md` | Curriculum architect | complete | 8 modules, 44 chapters, 192 core hours + 18 buffer |
| 2026-10-20 | G2B — Instructor confirmation | `roadmap-confirmation.md` | Course owner (acting) | provisional | Course owner approved starting Week 1; two-instructor sign-off still required before publish |
| 2026-10-20 | G2C — Detailed architecture | `04-blueprint.yaml`, `05-skill-graph.yaml`, `06-timeline.yaml`, `07-project-brief.md` | Curriculum architect + project designer | complete | Derived from the confirmed roadmap |
| 2026-10-20 | Week 1 v1 | `courses/ticketline/` (archived) | Chapter writer | superseded | 18 chapters, 20,607 words; audit found thin prose and component overuse |
| 2026-10-20 | Course review | `05-course-review.md` | Course auditor | complete | 4,572 prose words across 18 chapters; 18/18 failed the new audit |
| 2026-10-20 | Week 1 v2 | `courses/ticketline/` | Chapter writer | complete | 12 chapters, 14,319 prose words, audit 0 issues |
| 2026-10-20 | G3 — Sample review | `01.01` and `01.04` | Interaction designer + writer | ready | Product/invariant sample and data-model/gate sample with diagrams |
| 2026-10-20 | Import — v2 | `content:import:ticketline` | Technical validator | complete | 3 modules, 12 chapters, 26 blocks; pages and diagrams verified |
| — | G3 — Interaction map + assessment plan | `interaction-map.yaml`, `assessment-plan.yaml` | Interaction designer + assessment designer | not started | Sample chapter exists; map and plan still to be formalized |
| — | G4 — Full draft | `chapters/` | Chapter writers | not started | Blocked by G3 |
| — | G5 — QA | `qa/`, `critiques/` | Technical validator + critics | not started | Blocked by G4 |
| — | G6 — Variants | `variants/` | Variant producer | not started | Each variant roadmap needs G2B confirmation |
| — | G7 — Publish | publish package | Delivery lead | not started | Human sign-off required |

## Local platform status

The Buildment app was set up locally on 2026-10-20:

- Postgres container `buildment-postgres-1` healthy on `:5432`
- API on `:4000`, web on `:3000`
- Database migrated, seeded, and FreshMarket imported
- Dev login verified for mentee, mentor, and admin
- Dev servers started with `NODE_ENV=development` because the ambient shell had `NODE_ENV=production`
