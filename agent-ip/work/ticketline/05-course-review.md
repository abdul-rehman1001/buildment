# Course review — Ticketline Week 1

**Date:** 2026-10-20
**Scope:** Week 1 v1, now archived at `agent-ip/work/ticketline/archive/week-1-v1/` (18 chapters, Modules 1–3)
**Verdict:** not acceptable as a teaching draft. The structure was too component-driven, the explanatory prose was too thin, and diagrams were almost absent.

> **Resolution (2026-10-20):** Week 1 was restructured into 12 deeper chapters. The new course is under `courses/ticketline/`, the audit now passes with 14,319 prose words and 0 flags, and it has been re-imported (3 modules, 12 chapters, 26 blocks). The findings below are the baseline that drove the rewrite.

## Audit

The audit counts prose paragraphs only. It excludes code fences, headings, tables, JSX components, and bullet lists. That is deliberate: the question is whether the chapter teaches in prose, not whether it contains words.

| Chapter | Type | Prose words | Top-level components | Total JSX tags | Interactions | Diagrams |
|---|---|---:|---:|---:|---:|---:|
| 1.1 What you're building | Read | 349 | 6 | 6 | 3 | 0 |
| 1.2 People and trust boundaries | Learn | 306 | 5 | 11 | 3 | 1 |
| 1.3 Scope and four-week shape | Learn | 258 | 4 | 11 | 3 | 0 |
| 1.4 Architecture and stack | Learn | 250 | 8 | 37 | 2 | 1 |
| 1.5 Data model and invariants | Learn | 329 | 5 | 13 | 3 | 0 |
| 1.6 Ship the skeleton | Build | 303 | 4 | 18 | 0 | 0 |
| 2.1 Sessions vs JWT | Learn | 286 | 5 | 7 | 3 | 0 |
| 2.2 Users, passwords, sessions | Build | 196 | 3 | 3 | 2 | 0 |
| 2.3 Signup, login, logout | Build | 224 | 2 | 2 | 3 | 0 |
| 2.4 Roles and permissions | Build | 192 | 3 | 3 | 3 | 0 |
| 2.5 Organizer onboarding | Build | 185 | 4 | 6 | 3 | 0 |
| 2.6 Verify auth | Check | 210 | 3 | 6 | 0 | 0 |
| 3.1 Event lifecycle | Learn | 188 | 3 | 3 | 3 | 0 |
| 3.2 Create and edit events | Build | 324 | 4 | 4 | 3 | 0 |
| 3.3 Ticket types and pricing | Build | 257 | 3 | 3 | 2 | 0 |
| 3.4 Capacity and availability | Build | 274 | 2 | 2 | 2 | 0 |
| 3.5 Images and public page | Build | 211 | 3 | 3 | 2 | 0 |
| 3.6 Browse and search | Check | 230 | 3 | 3 | 3 | 0 |

**Total prose words:** 4,572 across 18 chapters.
**Average:** 254 prose words per chapter.
**Chapters with at least one diagram:** 2 of 18.
**Chapters failing the new threshold:** 18 of 18.

## Findings

### 1. The course reads like a component template, not a lesson

Almost every chapter follows the same shell: `LearningObjectives` → two or three short sections → a code block → `BigWordAlert` → two quizzes → `OpenQuestion` → `ChapterRecap`. The components repeat the same pattern across chapters, and the prose between them is often a few sentences. The result is a course that looks structured but does not explain the material in enough depth.

### 2. Prose depth is far below the target

The target is 1,200–2,000 prose words for a concept/build chapter and 700–1,000 for a checkpoint/gate. The current average is 254. Several chapters are under 200 prose words (2.2, 2.4, 2.5, 3.1). The learner gets headings and code, but not the reasoning, worked example, alternatives, or failure modes that make the code make sense.

### 3. Too many interactions per chapter

Every chapter has two quizzes or a quiz plus an open question. Many questions test definitions or recall. The density trains the learner to click through components rather than read and reason. Interactions should be concentrated at module checkpoints and key decisions, not spread across every chapter.

### 4. Diagrams are almost absent

Only 1.2 and 1.4 contain a diagram. There is no ERD, no session/auth flow, no authorization decision flow, no event lifecycle state machine, and no presigned-upload trace. The relationships and flows that most need visual explanation are left to prose and code.

### 5. Build instructions are too high-level

Several build chapters say “create the module” or “add the route” without:
- the exact file path and exported interface;
- the acceptance criteria;
- the expected response or error envelope;
- one failure test;
- the debugging path when it breaks.

The learner can copy the snippet but cannot reconstruct the decision.

### 6. Trade-offs, alternatives, and tools are thin

The IP requires alternatives, trade-offs, and tool choices. Most chapters mention one choice and move on. There is little on why not the alternative, when the choice changes, or what open-source/managed options exist.

### 7. Real-world examples and curiosity are underused

There is one composite real-world event in 1.1. Modules 2 and 3 have none. The course rarely opens a loop, shows a production failure, or connects the decision to a real product.

### 8. Technical verification is incomplete

Some snippets are contracts, not executed code. Specific items to verify before publish:
- the Argon2id dummy-hash timing path;
- Prisma 7 transaction and adapter behaviour;
- Next.js 16 async `params`;
- presigned PUT size enforcement;
- Stripe webhook raw-body handling (Week 2);
- the exact `prisma migrate dev` workflow with `prisma.config.ts`.

### 9. "Excalidraw" usage is limited

The course uses one architecture component and no Excalidraw-style static diagrams. The IP had a canvas/SVG section, but it did not require diagrams in chapters or define an Excalidraw export workflow.

## Root causes in the IP

1. **Density was count-based, not prose-based.** The IP limited how many components a chapter could have, but not how many words of explanation it needed.
2. **No component budget per module.** `LearningObjectives`, `BigWordAlert`, `ChapterRecap`, and quizzes were repeated in every chapter.
3. **No diagram requirement.** The IP allowed diagrams but did not require them where relationships or flows were central.
4. **No executable audit.** The rules were prose; nothing measured them.
5. **No course-auditor role.** The critic reviewed the artifact, but no agent owned prose depth, component density, and visual explanation across the course.

## Actions taken

### IP updates

- Added a prose-depth minimum and component budget to the authoring standards.
- Added a diagram-first rule and `11-visual-explanations.md`, including the Excalidraw/SVG workflow.
- Added a course-auditor agent and an executable `audit-course.mjs`.
- Added explanatory-depth and diagram-quality dimensions to the quality gate.
- Updated the chapter brief and review packet templates.

### Course updates

- Rewrite the thin chapters with proper prose, worked examples, trade-offs, failure modes, and build detail.
- Remove repeated `LearningObjectives`, `BigWordAlert`, `ChapterRecap`, and quizzes where they are template filler.
- Add diagrams: ERD, auth/session flow, authorization flow, onboarding flow, event lifecycle, inventory states, presigned upload.
- Add Excalidraw-style SVG assets for at least the ERD and auth flow.
- Re-run the audit and re-import the course.

## Re-review criteria

The course is ready for G3 only when:

- every concept/build chapter has at least 1,200 prose words and at least one diagram;
- every checkpoint/gate has at least 700 prose words;
- no chapter has more than 6 top-level components, 25 total JSX tags, or 3 interactions;
- every build chapter has file paths, acceptance criteria, a failure test, and a debugging section;
- every module has one worked example, one trade-off treatment, one real-world example, and one required or optional reading;
- the audit script exits `0`;
- the technical validator has run the commands and imports.
