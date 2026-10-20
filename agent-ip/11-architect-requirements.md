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
| Diagrams | `04-interactive-playbook.md` → Presentation blocks (`VisualDiagram`), Prose components (`MermaidDiagram`); `10-interactive-canvases.md` for SVG | In IP |
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
| Industries and use cases | `02-course-architecture.md` → Variants, Variant uniqueness contract, Combinations | In IP |
| Design elements | `02-course-architecture.md` → Combinations (personalization layer) | In IP; choice at enrollment is a platform gap |
| Special interests and specialization areas | `02-course-architecture.md` → Combinations | In IP |

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
