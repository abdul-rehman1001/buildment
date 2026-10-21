# Architect requirements

**Owner:** the architect (Zeeshan). IP owners (Aqib, Shehryar) build and maintain the IP on top of these requirements.

This is the list of capabilities the course factory must have. Every other document in this folder serves one or more of these requirements. When a requirement is missing from the IP, add it in the document that owns that topic and update the status here in the same change. When the IP and this list disagree, raise it with the architect; do not silently drop a requirement.

Status: **In IP** means the rule exists and agents must follow it. **Platform gap** means the rule exists but buildment cannot render or record it yet. **Planned** means the requirement is agreed and not yet specified.

## 1. The agent learns from our feedback (2 to 3 weeks)

Corrections from the architect and IP owners become rules, so the same mistake is not made twice.

| Requirement | Where it lives | Status |
|---|---|---|
| Feedback on agent output becomes IP rules | `09-review-and-governance.md` → How the IP learns, Changing the IP | In IP |
| Asides | `03-authoring-standards.md` → Asides | In IP |
| Interactive elements | `04-interactive-playbook.md`, `10-interactive-canvases.md` | In IP; canvases are a platform gap |
| Diagrams and HLD system design | `11-visual-explanations.md` → System design and HLD; `04-interactive-playbook.md` → Diagram plan; `10-interactive-canvases.md` → System-design canvas decision | In IP; Mermaid topology works now; new model-backed canvases require registered platform code |
| Big Word Alerts: bold term, click for details, a small model can expand it | `04-interactive-playbook.md` → `GlossaryTerm` versus `BigWordAlert`, AI expansion | In IP; AI expansion is a platform gap |
| Further reading, must-read and optional | `04-interactive-playbook.md` → `MUST_READ`; `03-authoring-standards.md` → Asides (`InterestingRead`) | In IP |
| Building curiosity | `03-authoring-standards.md` → Curiosity | In IP |
| Real-world examples and use cases | `03-authoring-standards.md` → Examples, `RealWorldEvent` | In IP |
| Pros, cons and trade-offs | `03-authoring-standards.md` → Trade-offs and alternatives | In IP |
| Alternatives, including advice that is not the common one | `03-authoring-standards.md` → Trade-offs and alternatives | In IP |
| Options, tools, frameworks and open source, so learners reuse existing knowledge | `03-authoring-standards.md` → Tools, frameworks, and open source | In IP |

## 2. Agent workflow

| Requirement | Where it lives | Status |
|---|---|---|
| Research before writing | `07-research-and-sources.md`, `agents/research.md`, gate G1 | In IP |
| Right-sized chapters | `03-authoring-standards.md` → Length budgets; `02-course-architecture.md` → Chapter anatomy | In IP |
| Keep the course inside its time budget (for example 40 hours) | `02-course-architecture.md` → Time budget; `agents/prerequisites-timeline.md` | In IP |
| Adaptive prerequisites | `02-course-architecture.md` → Prerequisites and the skill graph, Adaptive paths; `05-assessment-and-motivation.md` → Adaptive learning | In IP; the entry diagnostic and repair paths are a platform gap |

## 3. Combinations (1 week)

| Requirement | Where it lives | Status |
|---|---|---|
| Industries and use cases: 5 or 6 variants per course under the 4-of-6 uniqueness contract | `02-course-architecture.md` → Variants, Variant uniqueness contract, Combinations; `agents/variant-producer.md` | In IP |
| Design elements: the personalization layer, not a variant; 6 brand styles plus project name, wordmark and accent | `02-course-architecture.md` → Combinations (personalization layer); `work/multi-vendor-marketplace/personalization-layer.md` | In IP; choice at enrollment is a platform gap |
| Special interests and specialization areas: a variant's hardest constraint becomes the fellow's specialization in follow-on courses | `02-course-architecture.md` → Combinations; `09-review-and-governance.md` → Continuing a course | In IP |

## 4. Multi-agent, multi-provider orchestrator (1 month)

| Requirement | Where it lives | Status |
|---|---|---|
| Orchestrator that runs the phases | `01-agent-system.md`, `agents/orchestrator.md` | In IP (run by hand today) |
| Multiple model providers; drafting and critique on different model families | `01-agent-system.md` → model policy, `agents/orchestrator.md` → Model routing | In IP |
| Phasing and gates | `01-agent-system.md` → Phase plan and gates | In IP |
| Critique agents | `agents/critic.md`, `06-quality-gates.md` | In IP |
| An orchestrator that runs automatically | None yet | Planned |

## 5. Human in the loop (1 month)

| Requirement | Where it lives | Status |
|---|---|---|
| Human sign-off at the gates | `09-review-and-governance.md`, `agents/human-review-board.md`, gate G2B | In IP |
| Feedback and implementation divided by type of person | `09-review-and-governance.md` → Feedback by type of person | In IP; collection tools are a platform gap |
| Continuation of courses | `09-review-and-governance.md` → Continuing a course | In IP |

## 6. Interactive elements

| Requirement | Where it lives | Status |
|---|---|---|
| NotebookLM-style study guides and audio overviews | `04-interactive-playbook.md` → Learning maps and study aids | In IP; AI generation and audio are a platform gap |
| Mind maps | `04-interactive-playbook.md` → Learning maps and study aids (Mermaid `mindmap`) | In IP |
| roadmap.sh-style learning maps | `04-interactive-playbook.md` → `Roadmap`, Learning maps and study aids | In IP; branching skill maps are a platform gap |

## 7. Attention span (2 to 3 weeks)

| Requirement | Where it lives | Status |
|---|---|---|
| Days on which a learner is productive | `05-assessment-and-motivation.md` → Attention, pacing and support | Platform gap |
| Reminders | `05-assessment-and-motivation.md` → Attention, pacing and support | In IP; built on the existing inactivity nudges |
| Adaptive help | `05-assessment-and-motivation.md` → Attention, pacing and support, Adaptive learning | In IP; detection is a platform gap |
| Hand-holding that fades | `05-assessment-and-motivation.md` → Attention, pacing and support, Feedback | In IP |
| Engagement | `05-assessment-and-motivation.md` → Motivation | In IP |
| Mind maps for review | `04-interactive-playbook.md` → Learning maps and study aids | In IP |

## 8. Fellowship audience

| Requirement | Where it lives | Status |
|---|---|---|
| Fellows in Gaza with English as a second language: plain English, short sentences, jargon defined | `03-authoring-standards.md` → Audience: the fellowship (Plain English); `08-templates.md` → Course brief (Learner) | In IP |
| Phones on weak or expensive data and power cuts: light pages, few heavy images, no autoplay video, progress saved often | `03-authoring-standards.md` → Audience: the fellowship (Light pages); `05-assessment-and-motivation.md` → Attention, pacing and support | In IP |
| Hardship handled with care: never forced, never graded | `03-authoring-standards.md` → Audience: the fellowship (Hardship with care); `05-assessment-and-motivation.md` → Open question | In IP |
| Wellbeing and harassment contacts are a real person | `03-authoring-standards.md` → Audience: the fellowship; `05-assessment-and-motivation.md` → Attention, pacing and support | In IP |

## 9. Writing rules

| Requirement | Where it lives | Status |
|---|---|---|
| No em dashes or en dashes anywhere | `03-authoring-standards.md` → Forbidden patterns; `06-quality-gates.md` → Anti-slop checklist; `agents/critic.md` → Slop | In IP; older IP text is cleaned when its section is next edited |
| No AI or tool attribution in content, commits or PRs | `03-authoring-standards.md` → Forbidden patterns; `09-review-and-governance.md` → Pull requests | In IP |

## 10. Variants and personalization

Variants, the personalization layer and specialization are mapped in section 3, Combinations. This section adds only the rules section 3 does not cover.

| Requirement | Where it lives | Status |
|---|---|---|
| Cap of 2 fellows per variant and style, random draw for anyone undecided | `02-course-architecture.md` → Combinations; `work/multi-vendor-marketplace/personalization-layer.md` → Assignment and the draw | In IP; seat cap and draw are a platform gap |
| `%%product.name%%` variant placeholder rules | `03-authoring-standards.md` → Variant placeholders; `08-templates.md` → 10A. Variant intake | In IP; shipped in PR #21 |

## 11. Reference builds

| Requirement | Where it lives | Status |
|---|---|---|
| One full reference build per course and variant in `AQIB-NAWAB/buildment-courses` (`<course>/<NN-variant>/`) | `02-course-architecture.md` → Reference builds | In IP; gap: only `multi-vendor-course/01-food-marketplace/` exists, every other course and variant still needs its build |
| Used as the answer key, as mentor help, and as the base each variant reuses | `02-course-architecture.md` → Reference builds; `05-assessment-and-motivation.md` → Answer-key check | In IP |
| Consistency gate between course text and reference code | `06-quality-gates.md` → Reference consistency; `agents/technical-validator.md` | In IP; FreshMarket has open mismatches in `work/multi-vendor-marketplace/qa/reference-consistency.md` |
| One brand config in the reference UI: name, logo, colour role tokens, fonts, dark mode | `02-course-architecture.md` → Reference builds; `agents/project-designer.md` | In IP; not yet in the FreshMarket reference build |

## 12. Interactive blocks

| Requirement | Where it lives | Status |
|---|---|---|
| When to use the stepper, sequence, state-machine and factor canvases | `10-interactive-canvases.md` → Reusable renderers | In IP |
| Theme tokens, dark mode, focus ring, reduced motion, phone behaviour | `10-interactive-canvases.md` → Reusable renderers, The design language, QA checklist | In IP |

## 13. Assessment

| Requirement | Where it lives | Status |
|---|---|---|
| Every answer key re-answered blind | `05-assessment-and-motivation.md` → Answer-key check; `agents/assessment-designer.md` | In IP |
| An explanation for every option, shown one option per line | `04-interactive-playbook.md` → `QUIZ` | In IP |
| Balanced option lengths; the audit warns at 10% or more | `04-interactive-playbook.md` → Option-length hygiene, `QUIZ` | In IP |
| Correct positions spread out | `04-interactive-playbook.md` → Option-length hygiene; `08-templates.md` → Assessment plan | In IP |
| Opinion questions go to open questions, not graded quizzes | `04-interactive-playbook.md` → `QUIZ`; `05-assessment-and-motivation.md` → Quiz | In IP |
| Quiz chapters hold activities only; no "Quiz:" prefix in titles | `04-interactive-playbook.md` → `QUIZ`, Placement matrix | In IP |
| Recording-link-only submissions need `minWords: 0` | `04-interactive-playbook.md` → `OPEN_QUESTION` | In IP |
| A step for answering a mentor's follow-up questions | `04-interactive-playbook.md` → `OPEN_QUESTION`; `05-assessment-and-motivation.md` → Open question | In IP; uses the `NEEDS_REVISION` verdict, a dedicated follow-up thread is a platform gap |

## 14. Readability

| Requirement | Where it lives | Status |
|---|---|---|
| About 70 characters per line, 17 to 18px body text | `03-authoring-standards.md` → Readability; `06-quality-gates.md` → Accessibility validation | In IP |
| Contrast of 7:1 for body text and 4.5:1 for small text, in light and dark themes | `03-authoring-standards.md` → Readability | In IP |
| Never fade paragraph text with opacity | `03-authoring-standards.md` → Readability | In IP |

## 15. Quiz integrity

| Requirement | Where it lives | Status |
|---|---|---|
| Signals are flags for mentors only, never penalties; the learner sees no flag count | `05-assessment-and-motivation.md` → Quiz integrity signals | In IP; signals shipped in PR #23 |
| Camera stills optional per course, with consent, private storage and deletion after 30 days; camera off never blocks a submit | `05-assessment-and-motivation.md` → Quiz integrity signals | In IP; snapshots shipped in PR #23 |
| Full screen requested, never required; copy, paste and right-click blocked and logged | `05-assessment-and-motivation.md` → Quiz integrity signals | In IP; a separate code PR is restoring this policy |
| The web cannot block screenshots | `05-assessment-and-motivation.md` → Quiz integrity signals | In IP |

## 16. Verification before a PR

| Requirement | Where it lives | Status |
|---|---|---|
| `content:validate:source`, `content:audit` and `content:import` per course | `06-quality-gates.md` → Before a pull request; `agents/technical-validator.md` | In IP |
| Student click-through at 375px and desktop width, in both themes | `06-quality-gates.md` → Before a pull request | In IP |
| Grading tested with one quiz answered right and one wrong | `06-quality-gates.md` → Before a pull request | In IP |

## 17. Process

| Requirement | Where it lives | Status |
|---|---|---|
| The course pipeline file | `09-review-and-governance.md` → Pull requests | In IP |
| Both reviewers requested through the REST endpoint; dropped reviewers re-requested | `09-review-and-governance.md` → Pull requests | In IP |
| Check a PR has not merged before pushing more commits | `09-review-and-governance.md` → Pull requests | In IP |
| Small logical commits | `09-review-and-governance.md` → Pull requests | In IP |
