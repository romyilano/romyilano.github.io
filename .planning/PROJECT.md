# Romy Ilano Portfolio Site

## What This Is

A hand-built, no-template single-page personal portfolio for Romy Ilano, positioning her as an AI product engineer on Apple platforms in San Francisco. Deployed as a GitHub Pages user site at `romyilano.github.io`, built as plain static HTML/CSS/vanilla JS with no framework and no build step.

## Core Value

The page must load fast, look hand-crafted (not templated), and clearly land the pitch — "AI product engineer, Apple platforms, San Francisco" — with real project work and career receipts as proof, on a URL Romy can put on a resume today.

## Requirements

### Validated

- ✓ Single-page landing site (hero, ticker, projects, hackathons, receipts, art, contact) — shipped
- ✓ Static HTML/CSS/vanilla JS, no build step, deployable directly to GitHub Pages — shipped
- ✓ Accessibility: skip links, ARIA attributes, `prefers-reduced-motion` support throughout — shipped
- ✓ Responsive, mobile-first layout with fluid typography — shipped

### Active

- [ ] Import and implement the "Projects v3" Claude Design canvas (`Projects v3.dc.html`, plus its `image-slot.js` and `support.js` imports) as a standalone Projects listing page
- [ ] Build a reusable project detail page template so each case study gets its own page, linked from the Projects listing
- [ ] Add a nav link from the existing `index.html` landing page to the new Projects page (landing page otherwise stays as-is)
- [ ] Ship the change via a working draft PR

### Out of Scope

- Rewriting/replacing the existing inline Projects section on `index.html` — out of scope for this pass; nav link added instead, existing section stays (may be revisited later)
- Any framework or build tooling — the site stays plain static HTML/CSS/JS per existing architectural constraint
- CMS or dynamic data — project content stays hand-authored static HTML, consistent with the rest of the site

## Context

- The site is brownfield: already shipped and live (see `.planning/codebase/` for full architecture/structure/conventions docs, generated 2026-09-16).
- Existing architecture is deliberately a single HTML document; adding a Projects page and detail-page template is a scoped, intentional exception to "single HTML file" — multiple static pages, still no build step, no framework.
- New design source is a Claude Design canvas project (`Projects v3.dc.html`) fetched via the `claude_design` MCP (DesignSync tool) from https://claude.ai/design/p/128985be-1857-4708-a157-2cdc6cc49ba8?file=Projects+v3.dc.html. It imports `image-slot.js` and `support.js` which need to be read for full context before translating the canvas into hand-written static markup (per CLAUDE.md: "implement, don't redesign").
- Must preserve the site's existing conventions: BEM-inspired CSS naming, CSS custom-property design tokens, `data-reveal` scroll-animation pattern, `prefers-reduced-motion` handling.

## Constraints

- **Hosting**: GitHub Pages, target repo `romyilano/romyilano.github.io` (serves from `main` root) — user's explicit choice.
- **Tech stack**: Plain static HTML/CSS/vanilla JS. No framework, no build step, no Claude Design runtime dependency — new pages must work as flat files GitHub Pages can serve directly.
- **Design fidelity**: Visual design for the Projects page comes directly from the `Projects v3.dc.html` canvas — implement, don't redesign.
- **Accessibility**: Preserve `prefers-reduced-motion` handling and other existing accessibility patterns in any new page.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Projects becomes its own page + detail-page template, not an inline section rewrite | Case studies need more room than a single-page layout allows; matches design canvas's dedicated page structure | — Pending |
| Landing page (`index.html`) gets a nav link to the new page rather than being restructured | Keeps the existing shipped landing page stable while extending the site | — Pending |
| Multi-page exception to the "single HTML file" architectural constraint | Necessary to support a Projects listing + per-project detail pages while keeping everything static | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-09-16 after initialization*
