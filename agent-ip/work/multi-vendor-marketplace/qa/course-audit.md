---
artifact: course-audit
course: multi-vendor-marketplace
version: 1
owner: course-auditor
script: agent-ip/scripts/audit-course.mjs
---

# Course audit — FreshMarket (multi-vendor marketplace)

## Summary

FreshMarket is a 26-module, 385-chapter course written in the older short-lesson
format. This pass ran the agent-IP course auditor and the platform content audit,
then remediated every assessment and structural defect that could be fixed
without restructuring the course into a different chapter format.

| Metric | Before | After | Threshold | Pass |
|---|---:|---:|---:|---|
| Content-audit errors | 0 | 0 | 0 | yes |
| Content-audit warnings | 87 | 0 | 0 | yes |
| MCQ / prediction length leaks | 63 | 0 | 0 | yes |
| Modules with no quiz | 6 | 0 | 0 | yes |
| MCQ / prediction questions | 55 / 21 | 73 / 21 | — | — |
| Chapters compiling from source | 379/379 | 385/385 | all | yes |
| Component-budget violations | 6 | 0 | 0 | yes |
| Interaction-budget violations | 2 | 0 | 0 | yes |
| Prose below agent-IP long-form budget | 382 | 382 | 0 | no (format-level) |
| Chapters without a diagram | 330 | 330 | 0 | no (format-level) |

### Platform evidence

```text
pnpm content:audit
  [multi-vendor-marketplace] Audit complete: 0 error(s), 0 warning(s) across 26 module dirs.

pnpm content:validate:source
  [multi-vendor-marketplace] Validated 385 chapters: 385 OK, 0 failed

option-length verifier
  Checked 386 files (73 MCQs, 21 predictions). Offenders: 0

pnpm content:import
  MDX ok: 385 chapters
  Modules: 26, Chapters: 385, Blocks: 161
```

## Per-resource results

### Assessment remediation

All 63 questions whose correct option was the longest were rewritten across 31
files. The correct answer key (`correct:` index and `correctOptionId`) was
preserved. Options are now comparable in length, the correct position varies,
and each rewritten question remains plausible to a half-understanding learner.

Six quizzes were added so every module has a checkpoint before its gate:

| Module | New quiz | Covers |
|---|---|---|
| 03 — Why MongoDB | `03.10-quiz.md` | order snapshots, store-name denormalisation, per-vendor order split |
| 10 — Open your shop | `10.12-quiz.md` | onboarding gate state, gate placement, duplicate-shop 409 |
| 12 — Vendor dashboard | `12.12-quiz.md` | 400 field mapping, failed publish PATCH, missing product id |
| 15 — Shop the marketplace | `15.12-quiz.md` | filter/page reset, server-side filtering, cart-ready detail data |
| 17 — Your cart | `17.12-quiz.md` | grouping, state after mutations, cart scope across users |
| 20 — Track orders | `20.13-quiz.md` | frozen receipts, stale status transitions, vendor-scoped orders |

Each new quiz has three application-level MCQs with an explanation, balanced
option lengths, varied correct positions, and no optional enrichment.

### Structural remediation

- Renumbered six gates so the quiz sits before the gate:
  `03.10 → 03.11`, `10.12 → 10.13`, `12.12 → 12.13`, `15.12 → 15.13`,
  `17.12 → 17.13`, `20.13 → 20.14`. Frontmatter, H1s, module references, and
  `COURSE-OUTLINE.md` were updated.
- Fixed four table cells over 120 characters: `01.01`, `04.11`, `08.06`, `21.01`.
- Corrected `23.08-production-env-checklist.md` from `stepType: Check` to `Gate`.
- Reduced component density in four lessons by removing decorative
  `ArticleBreak` wrappers and converting optional `InterestingRead` / `Callout`
  blocks into the surrounding prose. No teaching content was lost.
- Fixed the agent-IP auditor itself: quiz chapters with 3–5 questions now count
  as one assessment instrument, and component/diagram counts ignore code fences
  (the previous version counted JSX examples as course components).

## Remaining format-level gap

The agent-IP long-form standard expects 1,200 prose words for a concept/build
chapter and 700 for a gate, plus one diagram per chapter. FreshMarket is 385
short lessons averaging about 338 prose words; it totals 130,119 prose words.
Applying the long-form threshold literally marks all 382 non-gate chapters as
below budget, and 330 chapters have no diagram.

This is a course-architecture mismatch, not a defect introduced by this pass.
Closing it requires one of two deliberate decisions:

1. **Keep the short-lesson format.** Adopt a legacy budget for this course
   (for example, 300–500 prose words per build step) and audit against that.
2. **Restructure to long-form.** Consolidate the 385 lessons into fewer,
   deeper chapters and add diagrams. This is a separate rewrite project, not a
   line edit.

## Defects

### S2 — resolved

- **63 MCQ/prediction length leaks.** The correct option was the longest in
  63 of 76 questions, teaching "pick the longest option". Rewritten and verified.
- **6 modules had no quiz.** Added module-specific application quizzes before
  each gate.
- **2 quiz chapters exceeded the interaction budget** because the auditor counted
  individual quiz questions as separate interactions. The auditor now matches the
  documented 3–5 questions per quiz chapter rule.

### S3 — resolved

- Four table cells exceeded the 120-character style limit.
- `23.08` had the wrong gate `stepType`.
- Six lessons exceeded the top-level component budget; four were caused by
  decorative wrappers or optional enrichment, and two were code-fence false
  positives in the auditor.

### S3 — open (format-level)

- 382 chapters are below the agent-IP long-form prose budget.
- 330 chapters have no diagram.
- 26 chapters are list-heavy; most are gates and checklists, where lists are the
  intended form. Review these only if the course moves to the long-form format.

## Recommendation

**Approve the assessment and structural remediation.** The course now has clean
content audits, compiling source, balanced assessment options, and a quiz in
every module. The remaining prose-depth and diagram gap is a deliberate
course-format decision: either adopt a legacy budget for FreshMarket or schedule
a separate long-form restructure.
