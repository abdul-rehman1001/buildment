---
artifact: roadmap-change-proposal
course: multi-vendor-marketplace
version: 1
status: approved-user-reported
owner: curriculum-architect
instructors_reviewed: ["two or more instructors; approval reported by course owner"]
---

# Roadmap change proposal — FreshMarket core modules 24–25

## Problem before this update

The current learner-facing course presents two conflicting structures:

- The catalog calls chapters 21–23 the four-week core and labels modules 24–25 an optional extension.
- The introductory outline lists modules 24–25 in Week 4, then repeats them under Week 5.
- The closing chapter and the course outline describe Week 5 as production hardening.
- The enrolled course page presents modules 24–25 outside the week dropdowns.

The content itself makes modules 24–25 part of the product outcome: inventory holds prevent overselling, and server-priced promotions keep checkout totals aligned with Stripe. Both modules already have 14 lessons, a quiz, and a completion checklist.

## Approved structure

Modules 24 and 25 are required core work, after deployment, in **Week 4 — Polish, harden, and ship**. The duplicate Week 5 section and optional-extension wording have been removed. Module order and technical implementation lessons remain intact.

Week 4 demo/gate should require the learner to:

1. Show two concurrent checkouts cannot sell the last unit twice.
2. Show a server-validated promotion produces the same amount in the cart, order snapshot, and Stripe test payment.
3. Demo the deployed marketplace and explain the production trade-offs.

This recommendation preserves the existing four-week course promise and follows the Week 4 placement already present in the primary outline table. It does not change what modules 24–25 teach.

## Time-budget check

The current chapter frontmatter totals 8,035 minutes (133.9 hours) across 385 lessons. Modules 24 and 25 contribute 775 minutes (12.9 hours). These are lesson estimates, not roadmap-level learner effort: the course has no reliable split for reading, guided build, independent build, verification, reflection, and buffer.

The course record already sets the course at 240 hours, within the agent-IP flagship range of 210–280 hours. The existing module estimates cover 133.9 hours across all 385 lessons; no separate reading/build/verification breakdown was found. Modules 24–25 already appear in the primary Week 4 outline, so this change corrects a duplicate Week 5 label and does not add course work or change the 240-hour promise. A detailed timeline split remains a follow-up quality improvement; it does not make these existing modules optional.

## Learner-facing updates implemented after reported instructor agreement

These learner-facing sources were updated together to reflect the approved Week 4 core structure:

- Catalog and enrolled syllabus: place modules 24–25 in the Week 4 dropdown and use the reference's compact rows with a left chevron, week title, counts, and separate card spacing.
- `01.06-course-outline.md` and `COURSE-OUTLINE.md`: remove the duplicate Week 5 entry and update Week 4 goals, gates, and chapter labels.
- `23.15-recap-and-whats-next.md`: identify deploy as a milestone and Chapters 24–25 as required remaining Week 4 work.
- `99.01-ship-it.md`: include inventory and promotion evidence in the Week 4 capstone.
- Modules 24–25: keep the conceptual teaching in their Prime lessons; make quiz chapters activity-only and point learners from Prime lessons to the required checkpoints.
- Course metadata, import notes, and other learner-facing Week 5 references: update to match the four-week structure.

No rewrite of the technical implementation lessons was needed. Modules 24–25 already had build lessons, application quizzes, and checklists.

## Agent-IP gate status

The course owner reports that at least two instructors agreed to this structure. This record captures that approval as user-reported; individual instructor names and the panel's meeting date were not supplied. See `roadmap-confirmation.md`. The learner-facing change follows that reported decision.

## Instructor decisions

| # | Decision | Recommendation | Instructor decision |
|---|---|---|---|
| 1 | Keep modules 24–25 required core work? | Yes | Approved (user-reported) |
| 2 | Place them after deployment in Week 4? | Yes | Approved (user-reported) |
| 3 | Keep the current 240-hour / four-week promise? | Yes; no work added | Approved (user-reported) |

## Confirmation

| Instructor | Role | Decision (approve/revise/reject) | Comments | Date |
|---|---|---|---|---|
| Instructor panel (2+; individual names not supplied) | Course instructors | Approve | Course owner reports agreement to make Modules 24–25 required Week 4 core work | 2026-10-21 |
