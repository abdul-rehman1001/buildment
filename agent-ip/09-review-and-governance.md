# Review and Governance

This document defines how the team reviews the IP and the courses, who signs off, how feedback is handled, and how the system changes over time.

## Why governance matters

A course is a product with a public promise. If the review process is informal, the quality bar becomes whatever the last reviewer happened to notice. Governance makes the bar explicit, repeatable, and visible.

It also protects the IP. The methodology, the critique rubric, the variant map, and the answer keys are internal assets. Review access is need-to-know.

## The review board

| Role | Responsible for | Can block? |
|---|---|---|
| **Delivery lead** | Scope, schedule, final publish decision | Yes |
| **Subject-matter expert** | Domain accuracy, production realism | Yes |
| **Instructor panel** (2+ mentors) | Confirm the curriculum roadmap, sequence, hours, and capstone before writing; re-confirm material roadmap changes | Yes |
| **Editor** | Voice, structure, prose quality, anti-slop | Yes |
| **Simulation reviewer** | Model correctness, teaching clarity, visual simplicity, and SVG accessibility/security of interactive canvases | Yes |
| **Platform engineer** | Import, rendering, blocks, deployment | Yes |
| **Learner advocate** | Prerequisite realism, time budget, frustration points | Yes |
| **Curriculum architect** | Outcomes, evidence, sequencing | Yes |

A review needs at least three roles for the sample chapter and full draft. The G2B roadmap review requires at least two instructors; the delivery lead's approval cannot substitute for theirs. The delivery lead signs publish.

## Review cadence

| Point | What is reviewed | Time |
|---|---|---|
| G0 | Brief and scope | Before research |
| G1 | Research dossier | Before architecture |
| G2A | Curriculum roadmap | Before instructor review |
| G2B | Instructor roadmap confirmation | Before the blueprint and before any chapter |
| G2C | Blueprint, skill graph, timeline, project brief | Before writing |
| G3 | Interaction map, assessment plan, one sample chapter, canvas specs if any | Before the full draft |
| G4 | Full draft, module by module | During writing |
| G5 | Technical and pedagogical QA, including canvas QA | Before variants |
| G6 | Variant roadmaps, variants, and diff report | Before publish |
| G7 | Publish package | Final |

The sample chapter is the most important review. If it is wrong, every chapter will repeat the mistake.

## How to give feedback

Every comment has four parts:

1. **Location.** The exact chapter, section, or line.
2. **Observation.** What is on the page, not what you assume was intended.
3. **Why it matters.** The standard it violates, or the learner harm it causes.
4. **Required fix or a question.** Be specific enough that the writer knows what to change.

Weak feedback:

> "This section feels a bit flat."

Strong feedback:

> "The quiz in 03.05 asks 'What is a hold?' immediately after the definition. That measures recall, not the concurrency decision the outcome requires. Replace it with a scenario: two buyers, one seat, one hold. The learner should choose the response and explain why."

## Feedback severity

Use the defect severity from `06-quality-gates.md`:

- **S1:** wrong, unsafe, broken, or IP-leaking. Blocks everything.
- **S2:** teaches the wrong thing, misaligned assessment, missing prerequisite. Blocks publish.
- **S3:** clarity, consistency, polish. Fix before publish or track explicitly.
- **S4:** optional improvement. May defer.

Do not mix severities in one comment. A typo and a broken security lesson are not the same conversation.

## Disagreement resolution

1. The writer responds with evidence, not preference.
2. If the critic and writer disagree, the orchestrator runs a third blind review from a different model family.
3. If the disagreement persists, the human review board decides.
4. The decision and its rationale go into the decision log.

No one wins an argument by repeating it. The artifact and the evidence decide.

## Versioning

- The IP has a version in `README.md`.
- Each course has a version in its brief.
- Each artifact has a version in its frontmatter.
- Each published course has a changelog.

A change to a principle, a gate, or a template is a version bump. A typo fix is not. When a course is republished, record what changed and why.

## Change control

### Changing the IP

1. Propose the change in a pull request or a written proposal.
2. State which problem it solves and which course or artifact exposed it.
3. Update the affected documents in the same change.
4. Update the version and the decision log.
5. Get sign-off from the delivery lead and one other reviewer.

Do not leave two competing rules in the folder. If a rule is replaced, remove the old one or mark it explicitly superseded.

### Changing a published course

- **Content fix** (typo, broken link, wrong command): normal review, patch version.
- **Structural change** (new chapter, reordered module, changed outcome): full gate review.
- **Roadmap change** (outcome, module order, capstone, or variant direction): re-run G2A/G2B with the instructor panel; do not patch the blueprint silently.
- **Canvas change** (model, teaching claim, or visualisation): re-run the canvas QA and the chapter review; a canvas whose claim changed is a new teaching artifact, even if the layout is the same.
- **Variant change** (new domain, new hero feature): treat as a new variant, confirm the variant roadmap, and run G2A–G6.
- **Emergency fix** (security or broken deploy): apply, notify the delivery lead, and document within 24 hours.

## Approval matrix

| Change | Writer | Critic | Curriculum architect | Instructors | Delivery lead |
|---|---|---|---|---|---|
| Typo or formatting | ✓ | | | | |
| Chapter rewrite | ✓ | ✓ | | | |
| New chapter | ✓ | ✓ | ✓ | | |
| New module | ✓ | ✓ | ✓ | ✓ | |
| New interactive canvas | | ✓ | ✓ | | ✓ |
| Canvas model or teaching-claim change | | ✓ | ✓ | | ✓ |
| Curriculum roadmap | | | ✓ | ✓ | ✓ |
| Roadmap change after confirmation | | | ✓ | ✓ | ✓ |
| New course | ✓ | ✓ | ✓ | ✓ | ✓ |
| New variant | ✓ | ✓ | ✓ | ✓ | ✓ |
| IP principle change | | | ✓ | | ✓ |

## IP protection

The following are internal and must not appear in learner-facing content:

- the agent prompts and orchestration logic;
- the critique rubric and scorecard;
- the curriculum roadmap and instructor confirmation record (internal planning artifacts);
- canvas QA reports and model test evidence (internal); the learner-facing canvas and its explanation are public;
- the variant map and differentiation strategy;
- the full capstone solution;
- hidden tests and answer keys;
- private company data, credentials, or URLs.

Access to `agent-ip/` is limited to the course team. Published courses contain the learner-facing artifacts, not the factory.

## Post-launch review

Within two weeks of launch, review:

- completion rate by module;
- the chapters with the most support questions;
- the assessments with the highest failure or lowest discrimination;
- the builds with the most environment failures;
- the open questions with the most generic answers;
- whether learners can defend the capstone;
- whether the variants produce distinct portfolios;
- mentor time per learner.

Within one month, update the course and the IP if a pattern appears. A single learner's problem may be personal; three learners with the same problem is a course defect.

## The governance promise

The system is working when:

- a reviewer can point to the standard, not just an opinion;
- a writer knows what "done" means before starting;
- a defect is fixed at the brief, not patched in the prose;
- a variant is approved because it is different, not because it is finished;
- a published course can be traced from learner outcome back to research, blueprint, critique, and sign-off.
