# Roadmap: Romy Ilano Portfolio Site — Projects Page Milestone

## Overview

This milestone adds a dedicated Projects section to the site: a listing page implementing the "Projects v3" Claude Design canvas, and a reusable detail-page template so each case study gets its own page. Phase 1 imports and translates the design canvas into hand-written static HTML/CSS/vanilla JS (listing + detail template, wired together, accessible, no build step). Phase 2 wires the new page into the existing landing page via a nav link and ships the whole change as a draft PR, leaving the shipped `index.html` otherwise untouched.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Projects Listing & Detail Pages** - Import the "Projects v3" design canvas and build the static Projects listing page plus a reusable project detail-page template
- [x] **Phase 2: Navigation & Delivery** - Link the new Projects page from the landing page and ship the change as a draft PR

## Phase Details

### Phase 1: Projects Listing & Detail Pages
**Goal**: Visitors can browse a Projects listing page (implementing the "Projects v3" Claude Design canvas) and click through to individual project detail pages rendered from one shared, reusable template — all as accessible, static HTML/CSS/vanilla JS consistent with the site's existing conventions.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria** (what must be TRUE):
  1. Visitor can open a Projects listing page whose layout, content structure, and image/interaction behavior match the "Projects v3" canvas (including `image-slot.js` and `support.js` behavior, translated to hand-written vanilla JS)
  2. Visitor can click a project on the listing page and land on that project's own detail page
  3. Each project detail page is generated from one shared HTML/CSS/JS template rather than one-off per-project markup
  4. Listing and detail pages support `prefers-reduced-motion`, and include skip links, ARIA attributes, and semantic HTML consistent with the rest of the site
  5. Listing and detail pages open and function as flat static files — no build step, no framework, no Claude Design runtime dependency
**Plans**: TBD
**UI hint**: yes

### Phase 2: Navigation & Delivery
**Goal**: Visitors can discover the new Projects page from the existing landing page, and the completed change is delivered as a reviewable draft pull request.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: NAV-01, SHIP-01
**Success Criteria** (what must be TRUE):
  1. Visitor on `index.html` can click a new nav link that takes them to the Projects listing page
  2. The rest of `index.html` (content, layout, existing inline Projects section) is unchanged
  3. The change is opened as a working draft pull request against the target branch, ready for review
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Projects Listing & Detail Pages | N/A (implemented directly) | Complete | 2026-09-17 |
| 2. Navigation & Delivery | N/A (implemented directly) | Complete | 2026-09-17 |
