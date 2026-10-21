# Agent IP decision log

## 2026-10-21 — HLD diagrams and system-design canvases

**Status:** Draft for delivery lead and reviewer sign-off under `09-review-and-governance.md`.

**Problem:** The IP defaulted to static SVG for conceptual architecture. That can lead agents to upload pictures of high-level designs without explaining request paths, public/private boundaries, or the effects of load and failure. A DNS → load balancer → private servers example exposed the ambiguity.

**Decision:** Use `MermaidDiagram` first for HLD topology and request paths. Keep static SVG for compositions Mermaid cannot make legible. Plan a separate registered, deterministic `InteractiveCanvas` when learners must vary conditions and observe a causal outcome; if no honest model is feasible, document a worked trace and the reason. Require the HLD diagram and canvas decision in module briefs, interaction maps, chapter briefs, and review.

**Platform impact:** Existing Mermaid and canvas slots support this instruction. Each new canvas still requires a coded and reviewed slug; the IP does not claim a generic authorable canvas editor exists.

**Review:** Delivery lead and one additional reviewer pending. No published course structure changes in this IP update.
