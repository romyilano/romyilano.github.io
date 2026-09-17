# Requirements: Romy Ilano Portfolio Site

**Defined:** 2026-09-16
**Core Value:** The page must load fast, look hand-crafted (not templated), and clearly land the pitch — "AI product engineer, Apple platforms, San Francisco" — with real project work and career receipts as proof, on a URL Romy can put on a resume today.

## v1 Requirements

Requirements for the Projects page milestone. Each maps to roadmap phases.

### Projects Page

- [ ] **PROJ-01**: Visitor can view a Projects listing page that implements the "Projects v3" Claude Design canvas (`Projects v3.dc.html`, including its `image-slot.js` and `support.js` behavior)
- [ ] **PROJ-02**: Visitor can click through from the Projects listing to an individual project's detail page
- [ ] **PROJ-03**: Each project detail page is built from a shared, reusable template rather than one-off per-project markup
- [ ] **PROJ-04**: Projects listing and detail pages preserve the site's accessibility patterns — `prefers-reduced-motion` handling, skip links, ARIA attributes, semantic HTML
- [ ] **PROJ-05**: Projects listing and detail pages are plain static HTML/CSS/vanilla JS with no build step and no framework, consistent with the rest of the site

### Navigation

- [ ] **NAV-01**: Visitor can reach the Projects page from a nav link added to the existing `index.html` landing page, which otherwise stays as-is

### Delivery

- [ ] **SHIP-01**: The change is delivered as a working draft pull request

## v2 Requirements

Deferred to a future pass. Tracked but not in current roadmap.

### Projects Page

- **PROJ-06**: Migrate/retire the existing inline Projects section on `index.html` now that a dedicated Projects page exists

## Out of Scope

| Feature | Reason |
|---------|--------|
| Rewriting the existing inline Projects section on `index.html` | Deferred — nav link added instead so the shipped landing page stays stable this pass |
| Any JS framework or build tooling | Site stays plain static HTML/CSS/JS per existing architectural constraint |
| CMS or dynamic project data | Project content stays hand-authored static HTML, consistent with the rest of the site |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PROJ-01 | Phase 1 | Pending |
| PROJ-02 | Phase 1 | Pending |
| PROJ-03 | Phase 1 | Pending |
| PROJ-04 | Phase 1 | Pending |
| PROJ-05 | Phase 1 | Pending |
| NAV-01 | Phase 2 | Pending |
| SHIP-01 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 7 total
- Mapped to phases: 7 (Phase 1: 5, Phase 2: 2)
- Unmapped: 0 ✓

---
*Requirements defined: 2026-09-16*
*Last updated: 2026-09-16 after initial definition*
