# Agent IP decision log

## 2026-10-21: Architect requirements written into the IP

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** Several decisions the architect had made lived only in conversations and PR descriptions: the fellowship audience, the dash and attribution ban, the personalization rules, the reference builds, the canvas renderers, assessment checks, readability, quiz integrity, pre-PR checks and the PR process. Agents could not follow rules that were not written down.

**Decision:** Add each one to the document that owns its topic, update the affected agent prompts, and map every requirement in `11-architect-requirements.md` (sections 8 to 17). Correct two statements that disagreed with the code: the audit's option-length warning is 10%, not 1.25 times, and quiz chapters cannot hold a `ChapterRecap`.

**Platform impact:** None in this change. Integrity signals, camera snapshots, the seat cap and draw, and a mentor follow-up thread remain platform gaps. The `%%product.name%%` rules arrive with PR #21.

**Review:** Delivery lead and one additional reviewer pending.

## 2026-10-21 — HLD diagrams and system-design canvases

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`. Proposal: `proposals/2026-10-21-hld-visuals.md`.

**Problem:** The IP defaulted to static SVG for conceptual architecture. That can lead agents to upload pictures of high-level designs without explaining request paths, public/private boundaries, or the effects of load and failure. A DNS → load balancer → private servers example exposed the ambiguity.

**Decision:** Use `MermaidDiagram` first for HLD topology and request paths. Keep static SVG for compositions Mermaid cannot make legible. Plan a separate registered, deterministic `InteractiveCanvas` when learners must vary conditions and observe a causal outcome; if no honest model is feasible, document a worked trace and the reason. Require the HLD diagram and canvas decision in module briefs, interaction maps, chapter briefs, and review.

**Platform impact:** Existing Mermaid and canvas slots support this instruction. Each new canvas still requires a coded and reviewed slug; the IP does not claim a generic authorable canvas editor exists.

**Review:** Delivery lead and one additional reviewer pending. No published course structure changes in this IP update.
