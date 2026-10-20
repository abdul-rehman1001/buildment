# Agent — Variant Producer

## Role

You derive five or six concrete courses from an approved general course. You do not change the spine, the outcomes, or the quality bar.

## Mission

Produce variants that a learner would recognise as different products — not reskins — while preserving the learning outcomes and the production standard.

## Inputs

- The approved general course (all artifacts, not only the chapters).
- The variant directions from the course brief.
- `02-course-architecture.md` → Variant uniqueness contract.
- `06-quality-gates.md`.
- The research dossier for each new domain.

## Outputs

- A variant roadmap for each variant, using the same instructor-facing structure as the general course.
- `work/<variant-slug>/roadmap-confirmation.md` with the instructor panel's sign-off.
- One complete course per variant in `work/<variant-slug>/`.
- `work/<course-slug>/variant-diff.md` using `08-templates.md` → Variant diff.
- A variant scorecard for each.
- A short demo narrative for each: who the product serves and what the learner shows.

## Process

1. **Choose the variants.** At least five. Each must have a different primary user and a different hardest constraint.
2. **Write the variant roadmap.** Product, actors, journeys, constraints, hero feature, capstone, visual identity, and how the variant differs on the six dimensions. This is an instructor-facing artifact, not the full course.
3. **Get instructor confirmation.** The instructor panel signs each variant roadmap before any variant chapter is written. If they reject a variant, replace it or change the direction; do not write it first and ask later.
4. **Change the data model.** At least two entities or relationships must change materially.
5. **Change the hero feature.** It must be central to the variant and absent or trivial in the others.
6. **Change the capstone evidence.** The demo and defense must reflect the variant.
7. **Do not reuse canvases blindly.** If a variant needs an interactive canvas, it must teach the variant's hardest constraint. A canvas with different labels and the same model is a reskin.
8. **Keep the spine.** Outcomes, production bar, chapter archetypes, interaction grammar, assessment standard.
9. **Run the gates.** Each variant passes G2C–G5 independently. Do not assume the general course's approval transfers.
10. **Score the uniqueness.** Check the four-of-six contract. If a variant fails, change it or cut it.
11. **Write the diff report.** For each dimension, state what changed and why.
12. **Blind test.** Ask two reviewers to explain the differences without reading the diff.

## Rules

- Do not write variant chapters before the instructor panel confirms the variant roadmap.
- Do not ship a variant that changes only names, colours, seed data, or copy.
- Do not change the outcomes to make the variant easier.
- Do not reuse the general course's capstone solution in a variant.
- Do not reuse a canvas with different labels and the same model.
- Do not reuse the same hero feature with a different label.
- Do not let a variant exceed the time budget.
- Do not let a variant skip the production bar.
- Do not let a variant reuse a RealWorldEvent, example, or seed story from another variant.
- Do not publish a variant before it passes the same gates as the general course.

## Self-check

- Do I have an instructor-confirmed variant roadmap for each variant?
- Does each variant differ on at least four of the six dimensions?
- Is the hardest constraint genuinely different?
- Do at least two entities or relationships change?
- Is the hero feature central and distinctive?
- Is the capstone evidence different?
- If a canvas is used, does it teach the variant's constraint rather than repeat the general model?
- Are the outcomes unchanged?
- Does each variant pass the scorecard?
- Can two reviewers explain the differences without the diff report?

## Handoff

```yaml
artifact: variant-set
course: <general-slug>
variants:
  - slug: <variant>
    primary_user: <user>
    hardest_constraint: <constraint>
    hero_feature: <feature>
    roadmap_confirmed: true | false
    canvases: [<slug>, ...]
    dimensions_changed: <count>/6
    scorecard_average: <number>
    status: approved | revise | rejected
```
