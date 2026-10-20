# Visual Explanations

A diagram must **argue**, not decorate. It exists to make a relationship, flow, boundary, or state change legible in a way prose cannot. If the diagram only restates the paragraph above it, cut it.

This document covers both live diagrams and Excalidraw-style static SVGs. The platform supports both; use the lightest format that makes the idea clear.

## Choose the format

| Format | Use for | Avoid when |
|---|---|---|
| **Excalidraw / static SVG** | Conceptual architecture, boundaries, ERDs, request flows, mental models, annotated walkthroughs | The diagram must update with data or theme automatically |
| **`MermaidDiagram` / `StateMachine`** | State machines, flowcharts, sequence diagrams, simple dependency graphs | The layout needs precise visual composition |
| **`EntityDiagram`** | Entity relationships and cardinality | The schema is trivial or already fully explained by a short table |
| **`ArchitectureDiagram`** | Layer boundaries: client, API, data, external services | You need arrows between individual services |
| **`TraceRequest`** | A request lifecycle across actors (browser → API → DB → worker) | The flow is a static hierarchy |
| **`VisualDiagram` / `diagram` fence** | A static image with alt text, caption, and legend | A live diagram can stay in sync |
| **`VisualWalkthrough`** | A sequence of UI states with annotations | A single static screen is enough |

Default: **Excalidraw-style SVG for conceptual/architecture/ER diagrams; live Mermaid/State/Trace for dynamic flows.**

## Excalidraw design rules

These rules come from Excalidraw's own technical-diagram guidance and our own style constraints.

### Layout

- Align elements on a grid. Use spacing in multiples of 50 (50, 100, 150, 200).
- Flow left-to-right for processes and time; top-to-bottom for hierarchies.
- Keep one arrow direction per diagram.
- Group related elements visually.
- Leave whitespace. A crowded diagram is unreadable at mobile width.

### Color

- Follow the 60-30-10 rule: 60% background/white space, 30% primary accent, 10% secondary accent.
- Use semantic colors:
  - blue — information/input/user
  - green — success/output/database
  - yellow — warning/decision
  - red — error/danger/stop
  - purple — external/storage
  - gray — neutral/disabled/notes
- Use at most two or three accent colors. Most shapes should be neutral.
- Do not use color as the only signal; add labels.

### Typography

- Main title: 28–36.
- Section header: 24.
- Box label: 20.
- Description: 16.
- Annotation: 14.
- Do not use the hand-drawn Virgil font for technical documentation. Use Helvetica or Cascadia.
- Keep text in shapes to 2–4 words per line. Put detail in the caption or prose.

### Shapes and arrows

- Rectangle: process, service, container.
- Rounded rectangle: card, button, user-facing element.
- Ellipse: start/end, data store.
- Diamond: decision.
- Minimum shape size for text: 80×60; standard: 120×80; container: 160×100+.
- Solid arrow: primary flow.
- Dashed arrow: response or return.
- Dotted arrow: reference or dependency.
- Prefer horizontal/vertical arrows. Bind arrows to shapes so they move together.
- Label complex arrows. Avoid crossed arrows.
- Use `roughness: 0` for technical docs; keep the visual clean.

### Diagram-specific

- **Flowchart:** start ellipse → process rectangles → decision diamonds → labeled yes/no → end ellipse.
- **Architecture:** group tiers, color by tier, label protocols, show boundaries, include a legend.
- **Sequence:** actors at top, lifelines, numbered messages, dashed responses.
- **ERD:** entity rectangles, key fields, relationship lines, cardinality labels.

### Common mistakes

- Too many colors.
- Inconsistent spacing.
- Tiny text.
- Unlabeled arrows.
- Crowded layouts.
- Missing legend.
- Crossed arrows.
- Inconsistent shapes for the same concept.
- A diagram that only repeats the paragraph.

## Static SVG workflow

Use this for Excalidraw exports and any hand-authored SVG.

1. **Design in Excalidraw.** Use the rules above. Prefer a simple, neutral palette.
2. **Export as SVG.** Keep a white or transparent background; do not export a screenshot.
3. **Sanitize.** Remove `<script>`, `<foreignObject>`, event attributes, external `href`, and remote fonts/images. If the SVG was authored by someone else, run it through a strict sanitizer.
4. **Optimize.** Run SVGO or an equivalent optimiser. Keep the `<title>` and `<desc>`.
5. **Host locally.** Put the asset under `frontend/public/course-assets/<course>/<slug>.svg`. Do not use a remote URL.
6. **Add accessibility.** Put `<title>` and `<desc>` inside the SVG, and provide alt text on the consuming block. The alt text describes the relationship, not the pixels.
7. **Consume it with the platform.** Use a `diagram` fence or the `VisualDiagram` block. Do not inject raw SVG into MDX.
8. **Caption and legend.** Add a one-sentence caption that states the claim, and a legend if color or shape encodes meaning.
9. **Test.** Check light and dark surfaces, mobile width, and screen-reader text.

Example `diagram` fence:

````md
```diagram
title: Ticketline Week 1 data model
imageUrl: /course-assets/ticketline/er-model.svg
alt: "Entity relationship diagram: User owns Events; Event has TicketTypes; User has Sessions and EmailVerificationTokens."
caption: "The Week 1 schema before holds, orders, tickets, and scans."
kind: system
legend:
  - "User → Event is one-to-many."
  - "Event → TicketType is one-to-many."
```
````

The `diagram` fence becomes a `VISUAL_DIAGRAM` block. The image is served from the platform's `public` folder. The block's `alt` is the accessible description.

## Live diagram workflow

Use live diagrams when the structure should stay theme-aware or is easier to maintain as text.

- **`StateMachine` / `MermaidDiagram`** for state transitions and flowcharts.
- **`EntityDiagram`** for ERDs that should stay in sync with the schema text.
- **`ArchitectureDiagram`** for layered boundaries.
- **`TraceRequest`** for request lifecycles and actor handoffs.

Live diagrams still need a title, a legend or direct labels, and a text alternative. The importer protects `MermaidDiagram` and `TraceRequest`; if you add a new live diagram component, add it to the importer's protected block list and the allowlist.

## Placement and density

- At least **one diagram per module**.
- At least **one diagram per concept-heavy chapter** where a relationship, flow, or state is central.
- At most **one diagram per chapter** unless the chapter covers two genuinely different relationships.
- Put the diagram next to the prose that explains it. Never make a section that is only a diagram.
- Introduce the diagram in prose: "The diagram below shows…" and then explain what to notice.
- After the diagram, state the takeaway in one or two sentences.
- A diagram counts as a high-effort visual. Do not pair it with two other high-effort interactions in the same section.
- On mobile, the diagram must remain readable. If it cannot, split it or simplify it.

## Accessibility

### Static SVG

- Use `<title>` and `<desc>` inside the SVG.
- Provide alt text on the consuming `diagram`/`VisualDiagram` block.
- If the SVG is decorative, mark it decorative and hide it from assistive tech; do not use meaningful diagrams as decoration.
- Do not rely on color alone; label the meaning.
- Provide a data table or text summary when the diagram encodes quantitative data.

### Live diagrams

- Add a title and a legend or direct labels.
- Provide a one-sentence text alternative in the surrounding prose.
- For charts, include a data table or a text summary.
- For interactive shapes, make them keyboard reachable with an accessible name and visible focus.

### Interactive SVG

- Use HTML controls for sliders, toggles, and buttons.
- Make interactive shapes focusable (`tabIndex={0}`), with `role="button"` or `role="option"`, an accessible name, and Enter/Space activation.
- Use `aria-pressed` or `aria-selected` for state.
- Do not make decorative shapes focusable.
- Respect `prefers-reduced-motion`.

## QA checklist

- [ ] The diagram makes a claim that prose alone makes expensive.
- [ ] The type is appropriate: static SVG/Excalidraw, Mermaid, Entity, Architecture, or Trace.
- [ ] The layout flows in one direction and uses consistent spacing.
- [ ] The palette is neutral with at most two or three accents; color is semantic.
- [ ] Text is readable at mobile width; no tiny labels.
- [ ] Arrows are labeled where the meaning is not obvious.
- [ ] There is a legend when color or shape encodes meaning.
- [ ] The diagram is introduced and explained in prose.
- [ ] The diagram has a text alternative or `<title>`/`<desc>`.
- [ ] Static SVG is sanitized, optimised, hosted locally, and referenced through a `diagram` fence or `VisualDiagram`.
- [ ] The diagram does not restate the paragraph above it.
- [ ] The diagram does not reveal the capstone solution.

## Anti-patterns

- A decorative illustration with no teaching claim.
- A diagram that repeats the paragraph above it.
- A diagram with unlabeled arrows and no legend.
- A rainbow diagram where color has no meaning.
- A 1,500-node diagram that should be split.
- A screenshot of a diagram when a live or SVG diagram is possible.
- Raw author SVG injected into MDX.
- Tiny text that is unreadable on a phone.
- A diagram-only section with no explanation.
- A diagram that is the only way to learn the concept, with no text alternative.

## Sources

- Excalidraw design best practices: https://github.com/rnjn/cc-excalidraw-skill/blob/main/best-practices.md
- SVG accessibility guide: https://imagetosvg.com/blog/svg-accessibility-guide
- Excalidraw software architecture use case: https://plus.excalidraw.com/use-cases/software-architecture-diagram
- We already use the platform's live diagram components; see `04-interactive-playbook.md`.
