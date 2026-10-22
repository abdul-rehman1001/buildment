# Personalization layer: multi-vendor marketplace family

**Status:** draft for instructor review
**Applies to:** every variant in the multi-vendor marketplace family: FreshMarket (grocery, the general course), services, handmade, home-kitchens, digital-goods, books
**Companion:** `platform-needs.md` in this folder lists what buildment must add to support this layer

## 1. Purpose

Inside one variant, every fellow builds the same product type against the same chapters. Two fellows in the home-kitchens variant both build slot ordering with live kitchen capacity. Without a second layer, their portfolios would look like twins: same layout language, same colours, same placeholder name.

The personalization layer gives each fellow a brand of their own on top of their variant:

- one of six **brand styles** (a ready-made visual system: palette, fonts, shape language);
- their own **project name**;
- a **wordmark** (their project name set as a logo);
- one **accent colour**.

Assignment rules (a cap of 2 fellows per variant and style combination, plus a random draw for anyone undecided) make sure that in a cohort of 60, no two fellows ship the same combination of product, look and name.

### Why this is not a variant

`agent-ip/02-course-architecture.md` is explicit: "A variant that changes only names, colours, and seed data is rejected." A variant must differ on at least four of six dimensions: primary user journey, hardest constraint, data model, hero feature, visual and verbal identity, and capstone evidence.

The personalization layer touches only part of one dimension (visual identity). It does not change the journey, the constraint, the data model, the hero feature or the capstone. So:

- it is **not** a variant and never counts toward the uniqueness contract;
- a variant cannot pass its uniqueness check by pointing at brand styles;
- every chapter, test, rubric and capstone requirement is identical for two fellows in the same variant, whatever style they picked.

Variants make the products different. Personalization makes two copies of the same product look like two different companies built them.

## 2. The six brand styles

Each style is a complete, pre-checked visual system so fellows spend their time on engineering, not on picking colours. Hex values are suggestions; every pair marked "text" below was checked against the WCAG 2.x contrast formula (ratios given). Fellows may adjust a value as long as the checks in section 3 still pass.

### 2.1 Summary table

| Style | Palette in words | Suggested hex values | Fonts | Shape language | Suits well | Accessibility notes |
|---|---|---|---|---|---|---|
| **Fresh** | Warm cream page, deep forest-green ink, leafy green for actions, pale mint panels | page `#FBF8EF`, ink `#1F2D1F`, muted text `#5B6B5B`, accent `#1B6E3A`, mint panel `#DDEFD9`, leaf decoration `#7FB77E` | Nunito (headings and body) | Rounded: 12 to 16px corners, pill buttons, soft low shadows, generous spacing | FreshMarket (grocery), home-kitchens, handmade | Ink on page 13.6:1; muted 5.4:1; accent as text 5.9:1; white on accent 6.3:1. Leaf green is 2.2:1 on cream: decoration only, never text or the only signal |
| **Bold street** | White content area framed by black bands, signal yellow highlights, heavy black type | page `#FFFFFF`, band `#111111`, ink `#111111`, text on band `#F5F5F0`, muted `#5C5C5C`, accent `#FFD400` | Space Grotesk (500 and 700) | Square: 0 to 2px corners, 2 to 3px black borders, hard offset shadows, short uppercase labels | home-kitchens (street food), services, digital-goods | Ink on white 18.9:1; yellow on black 13.2:1; black on yellow 13.2:1. Yellow on white is 1.4:1: yellow is a fill behind black text or text on a black band, never text on white |
| **Editorial** | Off-white paper, near-black ink, one deep red for links and highlights, thin rules | page `#FAF7F2`, ink `#1A1A1A`, muted `#5E5A55`, accent `#B3261E`, rule `#1A1A1A` at 1px | Fraunces (headings, 600) and Inter (body, 400 and 600) | Thin 1px rules, 2 to 4px corners, wide margins, large serif headings, column grid | books, handmade, digital-goods | Ink 16.3:1; muted 6.4:1; accent as text 6.1:1; white on accent 6.5:1. Red accent sits close to error red: errors must carry an icon and words, not colour alone |
| **Night market** | Dark-first: deep navy-black page, slightly lighter cards, soft lavender-white text, one neon accent | page `#0F1020`, card `#1A1B2E`, text `#EDEBFF`, muted `#A9A6C8`, accent `#22D3EE` (alternatives `#FF4FD8`, `#A3E635`, `#FFB020`) | Sora (400, 600, 700) | 8 to 12px corners, 1px accent outlines on focus and selection, chip tags, dark cards on darker page | home-kitchens (night food markets), digital-goods (music, game assets, presets), services | Text 16.1:1; muted 8.1:1; cyan accent 10.4:1 on page and 9.4:1 on card; magenta 6.6:1. Button labels on neon fills must be dark (`#0F1020`), not white. Dark mode is the default; see 2.2 |
| **Heritage** | Parchment page, dark brown ink, deep terracotta and indigo, ochre embroidery motifs | page `#F6EFE3`, ink `#3B2416`, muted `#6E5443`, accent `#9C4221`, indigo `#2F3E6B`, motif ochre `#C8902E` | Amiri (headings, 400 and 700) and Inter (body, 400 and 600) | 6 to 8px corners, framed cards, ornamental dividers, a repeating embroidery-inspired pattern at low opacity behind headers only | handmade, home-kitchens, books | Ink 12.7:1; muted 6.1:1; accent 5.7:1; indigo 9.1:1. Ochre is 2.5:1 on parchment: motifs only. Lighter terracotta `#B5532A` fails as text on parchment (4.3:1): use `#9C4221` |
| **Clean pro** | Cool near-white page, white cards, slate ink, hairline grey borders, one blue accent | page `#F8FAFC`, card `#FFFFFF`, ink `#0F172A`, muted `#475569`, border `#E2E8F0`, accent `#2563EB` | Inter (400, 500, 600) with tabular numbers | 6px corners, 1px hairlines, compact 8px spacing scale, dense tables and dashboards | services, digital-goods, FreshMarket (vendor operations) | Ink 17.1:1; muted 7.2:1; accent 4.9:1 on page and 5.2:1 on white; white on accent 5.2:1. Hairline border `#E2E8F0` is 1.2:1: fine between cards, never the only edge of a form input. Inputs use `#64748B` borders (4.8:1 on white, above the 3:1 non-text minimum) |

"Suits well" is guidance, not a restriction. Every one of the 36 variant and style combinations is open. An unexpected pairing (Clean pro for handmade, Night market for books) is a fine design challenge.

### 2.2 Dark mode

- **Night market is dark-first.** The dark palette is the default in `:root`. A light mode is optional (stretch). If a fellow ships light mode, the neon accents fail on light backgrounds, so they also choose a darker light-mode accent (for example `#0E7490` cyan, 5.0:1 on `#F7F7FB`, or `#B0249A` magenta, 5.5:1). The default follows `prefers-color-scheme`; a manual toggle stores the choice locally.
- **Night market cautions:** no glow `text-shadow` on body text (it blurs letters on low-end screens), no flicker or neon "buzz" animations (WCAG 2.3.1 flashing limits, and `prefers-reduced-motion` must turn off any motion), no pure `#000000` page with pure `#FFFFFF` text (the suggested navy and lavender reduce glare).
- **The other five styles are light-first.** Dark mode for them is an optional stretch, never required, and never graded.

### 2.3 Style notes worth keeping

- **Fresh:** the rounded shapes carry the friendliness. Do not add a second accent colour; the leaf green is decoration.
- **Bold street:** heavy type is Space Grotesk 700 (the family's heaviest weight). Do not fake heavier weight with `font-weight: 900`; the browser synthesises a smeared bold.
- **Editorial:** Fraunces is used for headings only. Body text in a display serif at small sizes is hard to read on phones.
- **Heritage:** the pattern is "embroidery-inspired", meaning simple geometric stitch motifs (cross-stitch diamonds, chain lines). Keep it decorative and respectful: no religious symbols, no calligraphy of sacred text, no motif copied from a specific living artisan's work. The pattern file is one small SVG tile marked `aria-hidden`, never placed behind body text. Amiri supports Arabic script (Naskh). If a fellow wants Arabic interface text, Amiri covers the script, but the layout must switch to right-to-left; this is out of scope unless instructors decide otherwise (section 9).
- **Clean pro:** turn on tabular numbers (`font-variant-numeric: tabular-nums`) for prices, stock and order totals so columns line up.

## 3. Project name, wordmark and accent

### 3.1 Project name

| Rule | Detail |
|---|---|
| Length | 2 to 24 characters |
| Characters | Letters (any script), digits, spaces, hyphens and apostrophes. No quotes, braces, angle brackets, `*`, `_`, `#`, `|`, `&` or backslash. Write "and" instead of `&`. An apostrophe is stored as the typographic `’` |
| Unique in the cohort | Compared ignoring case and spaces: "Daal Darbar" and "daaldarbar" collide |
| Not a reference name | Not FreshMarket and not the reference name of any other variant in the family |
| Not someone else's brand | Not an existing marketplace or well-known brand (for example Daraz, Foodpanda, Etsy, Fiverr, Amazon, Goodreads), and not a close imitation of one |
| No personal data | No phone numbers, full legal names of other people, or contact details |
| A slug | The fellow also picks a lower-case ASCII slug (letters, digits, hyphens) for the repository, package names and URLs, for example `daal-darbar` |
| Approval | The mentor approves the name at the lock date. A name can be refused for being offensive, misleading or a brand imitation |

The character rule exists for two reasons: names appear inside chapter text and code samples (see `platform-needs.md`, placeholders), and characters such as `{`, `<` and `"` would break MDX or JavaScript strings.

### 3.2 Wordmark

The wordmark is the project name set as a logo. It is typographic, so no design tools or image uploads are needed.

- Set in the style's heading font (Nunito, Space Grotesk, Fraunces, Sora, Amiri or Inter), one weight.
- One colour: the style's ink, or the fellow's accent where the accent passes the text check.
- Optional mark: one simple geometric shape or a single-letter monogram beside the name. No gradients, no photos, no clip art.
- Delivered as a hand-written SVG in the fellow's repository (`client/public/wordmark.svg`) under 2 KB, with `<title>` set to the project name, plus a 32px favicon version of the mark or first letter.
- Must be legible at 24px tall in the site header and recognisable at 32px as a favicon.
- No copying of existing logos.

WCAG exempts logotypes from contrast rules. We do not: the wordmark meets the same 4.5:1 check as body text, because it is usually the first thing a reviewer reads.

### 3.3 Accent colour

Each fellow picks one accent. It may be the style default, one of the pre-checked alternatives below, or their own.

**The rule:** the accent must pass WCAG AA contrast for text, **4.5:1**, against the background it is used on as text. Where the accent is used as a fill (a button), the label on it must pass 4.5:1 against the accent. Where it is used for non-text UI (focus rings, selected borders, icons that carry meaning), it must pass **3:1** against the adjacent colour.

Per style, "the background" means:

| Style | Accent is checked as text against | Fill label colour |
|---|---|---|
| Fresh | page `#FBF8EF` | white |
| Bold street | band `#111111` (accent is never text on white) | ink `#111111` |
| Editorial | page `#FAF7F2` | white |
| Night market | page `#0F1020` and card `#1A1B2E` (plus the light page if light mode ships) | page colour `#0F1020` |
| Heritage | page `#F6EFE3` | white |
| Clean pro | page `#F8FAFC` and card `#FFFFFF` | white |

**Pre-checked alternatives** (ratio as text against the style background, then the fill label ratio):

| Style | Alternatives |
|---|---|
| Fresh | teal `#0F766E` (5.2, 5.5), tomato brown `#9A3412` (6.9, 7.3), plum `#6D28D9` (6.7, 7.1) |
| Bold street | orange `#FF7A00` (7.2, 7.2), mint `#39E58C` (11.5, 11.5), sky `#4DD0FF` (10.6, 10.6) |
| Editorial | ink blue `#1D4ED8` (6.3, 6.7), racing green `#166534` (6.7, 7.1), aubergine `#7C2D92` (7.4, 7.9) |
| Night market | magenta `#FF4FD8` (6.6, 6.6), lime `#A3E635` (12.5, 12.5), amber `#FFB020` (10.3, 10.3) |
| Heritage | indigo `#2F3E6B` (9.1, 10.4), pomegranate `#7A2E3A` (8.1, 9.2), olive `#3F6212` (6.2, 7.1) |
| Clean pro | teal `#0F766E` (5.2, 5.5), violet `#7C3AED` (5.5, 5.7), burnt orange `#C2410C` (5.0, 5.2) |

**Seat partner rule.** When two fellows share a variant and style combination, their accents must be visibly different: at least 60 degrees apart in hue (HSL), or one of them uses the style default and the other does not share its hue family. The second fellow to submit an accent adjusts.

**How to check:**

1. Open the WebAIM contrast checker (webaim.org/resources/contrastchecker), enter the accent as foreground and the style background as background. It must say "Pass" for "WCAG AA: Normal Text".
2. Or, in Chrome DevTools, inspect a text element using the accent, click the colour swatch, and read the contrast ratio line (it shows a tick for AA).
3. Repeat for the fill label: label colour as foreground, accent as background.
4. Record both ratios in the project README under "Brand".
5. Once buildment has the setup step (`platform-needs.md`), the platform computes the same ratios and refuses a failing accent, so steps 1 to 3 become a confirmation rather than the only check.

The formula, for anyone scripting it: contrast = (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter colour and L2 of the darker one. Relative luminance is 0.2126 R + 0.7152 G + 0.0722 B on linearised sRGB channels.

Colour is never the only signal, whatever the accent: links are underlined or otherwise marked, errors carry an icon and words, selected states carry a check or a label.

## 4. Assignment and the draw

### 4.1 The numbers

- 6 variants x 6 styles = 36 combinations.
- Cap: 2 fellows per combination, so 72 seats.
- A cohort of 60 fills 60 of 72 seats. At most 24 combinations hold a pair; at least 12 seats stay empty.
- Each variant has 12 seats (6 styles x 2). With 60 fellows the average is 10 per variant.

### 4.2 Who runs it

- **Runs the draw:** the programme coordinator (the delivery lead or someone they name).
- **Witness:** one instructor from the panel, who checks the seed and signs the result.
- **Approves names:** each fellow's mentor, at the lock date.
- **Handles exceptions after lock:** the coordinator, with a written reason in the cohort log.

### 4.3 Step by step

**Day -7: publish the board.** The coordinator shares the six variant summaries, the six style cards (section 2), these rules, and the dates. The board shows all 36 combinations and their two seats.

**Day -7 to Day -4: preference window (72 hours).** Each fellow submits:

- first choice of variant, or "undecided";
- first choice of style, or "undecided";
- an optional second choice of each;
- optionally, a project name (it can come later).

The window is long on purpose, and order of submission does not matter. First come, first served would reward fellows with the fastest connection, which is the wrong thing to reward. Fellows without reliable internet may reply to the coordinator by WhatsApp or SMS; the coordinator enters their choice.

**Day -3: the draw.**

1. The coordinator freezes submissions and exports them (fellow, variant 1, style 1, variant 2, style 2).
2. The seed is fixed in public before the draw: for example, the cohort name plus the draw date, or a number rolled live on the call. The draw script is deterministic for a given seed and input file, so anyone can re-run it and get the same result.
3. The script shuffles the list of fellows with the seed. This shuffled order is the only tie-breaker anywhere in the draw.
4. **Round 1, full first choices.** In shuffled order, each fellow who named both a variant and a style gets that combination if a seat is free. If it is full, they try their second choice (any half they left blank keeps their first choice). If that is also full, they join the undecided pool and keep any half they did name.
5. **Round 2, half choices.** Fellows who named only a variant get the style with the fewest fellows in that variant. Fellows who named only a style get the variant with the fewest fellows overall, in that style. Equal counts are broken by the fixed list order of variants and styles, rotated by the seed.
6. **Round 3, undecided.** Each undecided fellow is placed in the variant with the fewest fellows, then the style with the fewest fellows inside that variant. An empty combination is always preferred over a half-full one. This keeps variants balanced for mentors and spreads pairs out.
7. The coordinator publishes the result (fellow, variant, style, seat 1 or 2, how they got it: chosen or drawn), together with the seed and the script version. The witness signs.

**Day -3 to Day -1: swap window (48 hours).**

- A fellow may move into any free seat by telling the coordinator.
- Two fellows may swap seats if both confirm in writing. A swap can trade the whole combination or only the style.
- The cap must hold after every move; the coordinator refuses any move that would put a third fellow into a combination.
- No three-way chains: complex trades are done as a series of two-way swaps.

**Day 0: lock.** Variant and style lock. The project name and slug are due at lock and are approved by the mentor in the first week.

**Before the first chapter that builds a user-facing screen:** accent and wordmark are due, with their contrast ratios in the README.

### 4.4 After lock

- **Variant never changes after the first build module.** The data model and hero feature diverge from that point, so a switch means restarting the build.
- **Style may change once, before the first user-facing screen chapter,** and only into a free seat. After that, a change is a coordinator exception (for example a fellow discovers a visual accessibility need) recorded in the cohort log.
- **Name and accent** may change until the first user-facing screen chapter, provided the new values pass the rules again.
- **A fellow who leaves** frees their seat. Nobody is reshuffled.
- **A late joiner** takes the emptiest combination by the round 3 rule, or any free seat they ask for.

### 4.5 Fewer or more than 60 fellows

| Cohort size | What happens |
|---|---|
| 36 or fewer | Every fellow can have a combination of their own. The draw only ever places undecided fellows into empty combinations, so pairs form only when two fellows ask for the same one |
| 37 to 72 | The rules above, unchanged. Pairs form as needed; round 3 keeps them spread out |
| 73 to 84 | The cap of 2 cannot hold. Preferred fix: add a seventh brand style (42 combinations, 84 seats). Alternative: raise the cap to 3 for this cohort and apply the seat partner rule to all three accents |
| More than 84 | Split into two cohorts with separate draws. Uniqueness is guaranteed within a cohort, not across cohorts |
| A variant is not confirmed in time | Its 12 seats disappear. Five variants give 60 seats, exactly enough for 60 fellows with no slack: instructors should either add a seventh style or accept that some fellows get a style they did not ask for |

### 4.6 What "no two projects match" means

With a cap of 2, two fellows can share a variant and a style. They build the same product type with the same visual system. What separates them is their project name, wordmark and accent (enforced by the uniqueness and seat partner rules), and the product decisions they make. Side by side, the pair will look related, like two shops in the same shopping street. They will not look identical, and no other pair in the cohort looks like either of them. If instructors want stronger separation, cohorts of 36 or fewer can run with a cap of 1 (section 9).

## 5. What changes in the fellow's project, and what does not

### Changes

| Area | Where it lives in the fellow's repository |
|---|---|
| Colour, font, radius, shadow and spacing tokens | `client/src/styles/tokens.css` as CSS custom properties: `--color-page`, `--color-surface`, `--color-ink`, `--color-muted`, `--color-accent`, `--color-on-accent`, `--font-heading`, `--font-body`, `--radius`, `--shadow`, `--space-unit` |
| Project name, slug and accent | `client/src/brand.js` (one small module the UI imports), server `APP_NAME` in `.env` for email subjects and page titles |
| Wordmark and favicon | `client/public/wordmark.svg`, `client/public/favicon.svg` |
| Page titles, header, footer, README title and "Brand" section | as normal |
| Demo narrative | the capstone demo uses the fellow's project name |
| Layout density | Clean pro uses the compact spacing scale; the others use the default |

The course writes every style-dependent value as a token. Chapter code samples use `var(--color-accent)`, never a hex value, so a sample works under all six styles without edits.

### Does not change

- The variant, its domain, journey, hardest constraint, data model and hero feature.
- Routes, API contracts, validation rules and error formats.
- Chapter order, chapter content, code exercises, quizzes and acceptance tests.
- The seed data and sample assets of the variant's example pack (the shops and products inside the fellow's platform are the same for everyone in the variant; only the platform's own name changes).
- Grading, rubrics, deadlines and capstone evidence.
- The accessibility bar.

Tests in the course select elements by role, label or `data-testid`, never by the brand name or a colour, so a fellow's tests pass whatever they named their project.

## 6. How mentors see it

**What the mentor sees for each fellow:** variant, style, project name and slug, accent as a swatch with its hex value and contrast ratios, and the link to the deployed site where the wordmark appears.

**Where they see it:**

- the mentee roster for the course, as a short line under the fellow's name;
- each item in the review queue, so feedback can use the fellow's own project name;
- the review detail page, beside the submission;
- the cohort board (all 36 combinations and who holds each seat), owned by the coordinator.

Until buildment supports this (see `platform-needs.md`), the coordinator keeps the same columns in a shared cohort sheet, linked from the mentors' channel.

**What mentors check (pass or fix, not a grade):**

- tokens are used; there are no stray hex values in components;
- text and accent contrast pass, in light mode and, for Night market, in dark mode;
- the wordmark is legible at 24px and as a 32px favicon;
- the project name is used consistently (title, header, README, emails);
- nothing in the brand imitates a real company.

**What mentors do not do:** grade taste. A fellow is never marked down because a mentor dislikes a style. Brand work earns no points beyond the accessibility checks above.

**Mentor allocation follows variants, not styles.** A mentor reviews the variant they know. Style knowledge needed for review fits on one page (section 2).

## 7. Low-bandwidth notes

Many fellows learn on phones or on unreliable connections. Fonts are the largest brand cost, so each style loads the minimum.

### 7.1 Google Fonts weights to load

| Style | Families and weights | Google Fonts `css2` query |
|---|---|---|
| Fresh | Nunito 400, 700 | `family=Nunito:wght@400;700&display=swap` |
| Bold street | Space Grotesk 500, 700 | `family=Space+Grotesk:wght@500;700&display=swap` |
| Editorial | Fraunces 600; Inter 400, 600 | `family=Fraunces:wght@600&family=Inter:wght@400;600&display=swap` |
| Night market | Sora 400, 600 | `family=Sora:wght@400;600&display=swap` |
| Heritage | Amiri 400, 700; Inter 400, 600 | `family=Amiri:wght@400;700&family=Inter:wght@400;600&display=swap` |
| Clean pro | Inter 400, 500, 600 | `family=Inter:wght@400;500;600&display=swap` |

Rules: at most four font files on first load; always `display=swap` so text shows immediately in a fallback font; no italics unless a chapter needs them. Only the Latin subset is needed unless the fellow uses Arabic script with Amiri.

**Wordmark trick:** if a style's heading font is used only for the wordmark, load just those letters with the `text=` parameter, for example `family=Fraunces:wght@600&text=Daal%20Darbar`. The file is a few kilobytes.

### 7.2 Self-hosting (recommended default)

Self-hosting avoids two extra connections (`fonts.googleapis.com` and `fonts.gstatic.com`), works on networks that block or throttle Google, and keeps working offline during development once installed.

- Install the family from Fontsource, for example `npm install @fontsource/nunito`, and import only the weights needed: `import "@fontsource/nunito/latin-400.css"` and `import "@fontsource/nunito/latin-700.css"` in `client/src/main.jsx`. Vite bundles the `woff2` files with the build.
- Or download the `woff2` files into `client/public/fonts/` and write the `@font-face` rules by hand with `font-display: swap`.
- Preload only the body font's regular weight: `<link rel="preload" href="/fonts/<file>.woff2" as="font" type="font/woff2" crossorigin>`.
- All six families (Nunito, Space Grotesk, Fraunces, Inter, Sora, Amiri) are published under the SIL Open Font License, so self-hosting is allowed. Keep the license file next to the font files.
- Check the real cost in the browser's Network panel with throttling set to "Slow 4G". Aim for under 100 KB of fonts on first load for Latin text.

### 7.3 Fallback system fonts

Every `font-family` ends with a system stack, so the site is readable before (or without) the web font:

| Font | Fallback stack |
|---|---|
| Nunito | `"Nunito", ui-rounded, "SF Pro Rounded", system-ui, "Segoe UI", Roboto, Arial, sans-serif` |
| Space Grotesk | `"Space Grotesk", system-ui, "Segoe UI", Roboto, Arial, sans-serif` |
| Fraunces | `"Fraunces", Georgia, "Times New Roman", serif` |
| Inter | `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif` |
| Sora | `"Sora", system-ui, "Segoe UI", Roboto, Arial, sans-serif` |
| Amiri | `"Amiri", "Noto Naskh Arabic", "Times New Roman", serif` |

### 7.4 Other weight savings

- Heritage pattern: one SVG tile under 5 KB, repeated with CSS `background-repeat`. No raster textures.
- Night market: no large blurred `box-shadow` glows; they cost paint time on low-end phones. A 1px accent outline does the same job.
- No background video or autoplaying animation in any style.
- Example pack images (from the variant) are WebP, about 800px wide and under 80 KB each.

## 8. What instructors and coordinators need to prepare

- The six style cards (one page each: palette, fonts, shape language, a sample header and product card).
- The token file template (`tokens.css`) filled in for each style, so a fellow copies one file and changes only the accent.
- The draw script and a dry run with fake names before the real draw.
- The cohort sheet (until the platform holds the data).
- A short chapter in each variant's Module 1 that walks the fellow through applying their style and checking contrast. It is the same chapter text in every variant, with the variant's own example screens.

## 9. Open decisions for instructors

1. **Required or optional?** Recommendation: every fellow gets a style and a name (required), so no portfolio ships as "FreshMarket".
2. **Window lengths.** 72-hour preference window and 48-hour swap window are proposed. Are they long enough for fellows with poor connectivity?
3. **Second choices.** Collect them (proposed), or go straight to the undecided pool when a first choice is full?
4. **Variant balance.** Should each variant have a hard ceiling (for example 11 of its 12 seats) so mentor load stays even, or is the round 3 balancing enough?
5. **Cap of 1 for small cohorts.** For cohorts of 36 or fewer, run with a cap of 1 for complete separation?
6. **Seventh style.** Prepare a seventh style now, as the fallback for cohorts over 72 or a variant that is not confirmed in time?
7. **Lock point for style.** Is "before the first user-facing screen chapter" the right moment, given each variant's module order?
8. **Dark mode.** Is Night market's light mode a stretch (proposed) or required? Should dark mode be offered as a stretch in the other five styles?
9. **Right-to-left and Arabic.** Is Arabic interface text with right-to-left layout in scope for any fellow (most likely in Heritage, which already loads Amiri), or explicitly out of scope for this cohort?
10. **Brand in assessment.** Confirm that brand work is pass or fix on accessibility only, never scored on taste.
11. **Public display.** Can project names, wordmarks and deployed links appear in a public cohort showcase, and does each fellow need to opt in?
12. **The draw seed.** Which public seed do we use, and who witnesses?
13. **Placeholders in the general course.** Should FreshMarket chapters also switch to the fellow's project name (via placeholders), or keep "FreshMarket" as the reference name in text and screenshots?
