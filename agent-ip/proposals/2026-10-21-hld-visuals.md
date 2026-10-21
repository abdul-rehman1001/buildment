# Proposal — HLD diagrams and system-design canvases

**Status:** Ready for delivery lead and second-reviewer sign-off.
**Raised by:** Aqib, after reviewing a DNS → load balancer → private servers teaching diagram.
**IP version:** v0.2 draft.

## Problem

The previous default told agents to use static SVG for conceptual architecture. An HLD chapter could therefore contain a polished picture while leaving the learner unable to explain name resolution, request routing, public/private boundaries, or what happens when traffic or failures change.

## Change

Use Mermaid first for HLD topology and request paths. Include a text alternative and explain the diagram's claim. Plan a separate, registered interactive canvas only when the learner needs to change a bounded condition and observe a causal consequence. Record the decision in module briefs and interaction maps even if Mermaid plus a worked trace is sufficient. Keep static SVG for precise compositions Mermaid cannot express legibly.

## Evidence for review

- Existing `MermaidDiagram` can express the fixed DNS/load-balancer/server graph and grouped private servers.
- Existing `InteractiveCanvas` accepts only registered slugs, so a new failover or backpressure model requires reviewed code and QA.
- The example separates a DNS response from the later HTTPS request; treating DNS as a proxy would teach the wrong system behavior.

## Requested review

- Delivery lead: confirm this is the desired HLD teaching standard.
- Second reviewer: check technical accuracy and whether the static-versus-dynamic decision is clear.

No published course or platform behavior changes are part of this proposal.
