# Review packet — G2B curriculum roadmap

## Artifact

- **Course brief:** `00-course-brief.md`
- **Research dossier:** `01-research-dossier.md`
- **Curriculum roadmap:** `02-curriculum-roadmap.md`
- **Decision log:** `decision-log.md`

## What the instructor panel must decide

1. Is this the right sequence for how you actually teach production full-stack work?
2. Are these the outcomes you would expect from someone who finished?
3. Is the 210-hour core path realistic for the learners you will send here?
4. What is missing that you would refuse to teach the course without?
5. What is included that you would cut?
6. Do the six variants represent the audiences and products you serve?
7. Is the capstone something you would be proud to review and defend?

Do not review prose, quiz wording, or block density at this gate. Review the shape.

## Evidence

| Item | Where |
|---|---|
| One-paragraph course promise | `02-curriculum-roadmap.md` → In one paragraph |
| Entry prerequisites | `02-curriculum-roadmap.md` → Learner and entry prerequisites |
| Outcomes and evidence | `02-curriculum-roadmap.md` → Outcomes |
| Four-week shape and hours | `02-curriculum-roadmap.md` → Four-week shape |
| Module and chapter sequence | `02-curriculum-roadmap.md` → Appendix A |
| Capstone and demo | `02-curriculum-roadmap.md` → Capstone |
| Variants | `02-curriculum-roadmap.md` → Variants |
| Out of scope | `02-curriculum-roadmap.md` → Out of scope |
| Domain constraints and failure modes | `01-research-dossier.md` → Hard constraints, Production failure modes |
| Proposed decisions | `02-curriculum-roadmap.md` → Open decisions; `decision-log.md` |

## Open decisions

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Split web/API vs single Next.js | Split: Next.js web + Express API | |
| 2 | Stripe Checkout vs Elements | Checkout core; Elements stretch | |
| 3 | Session cookies vs JWT | Session cookies | |
| 4 | General admission vs seat maps in core | GA core; seat maps in Sports/Cinema | |
| 5 | Offline fallback vs full sync | Cached signed tickets + local queue | |
| 6 | Refunds/admin scope | Refunds core; admin minimal | |
| 7 | Deployment target | Vercel + Render/Fly + managed Postgres/Redis | |
| 8 | Bot mitigation | Rate limits + simple queue | |
| 9 | Email | Console fallback; Resend optional | |
| 10 | Course name | Ticketline | |

## Recommendation

**Approve the roadmap with the recommended decisions**, subject to two confirmations:

1. The split web/API stack is acceptable for the learner's time budget.
2. Stripe Checkout is acceptable as the core payment path, with Elements as stretch.

If either is rejected, the roadmap is revised and re-confirmed before G2C.

## Consequence

No blueprint, sample chapter, or general course chapter is written until at least two instructors sign `roadmap-confirmation.md`.
