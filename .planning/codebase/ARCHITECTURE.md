<!-- refreshed: 2026-09-16 -->
# Architecture

**Analysis Date:** 2026-09-16

## System Overview

```text
┌──────────────────────────────────────────────────────────────┐
│                    HTML Entry Point                           │
│                    `index.html`                               │
│  Single document serving entire page with semantic sections   │
└────────────┬─────────────────────────┬──────────────────────┘
             │                         │
             ▼                         ▼
    ┌──────────────────┐     ┌────────────────────┐
    │   Styling        │     │   Interactivity    │
    │  `styles.css`    │     │  `script.js`       │
    │ CSS Variables    │     │ Vanilla JS (58 LOC)│
    │ BEM-like classes │     │ No frameworks      │
    └──────────────────┘     └────────────────────┘
             │                         │
             └────────────┬────────────┘
                          │
                          ▼
         ┌─────────────────────────────────┐
         │     Static Assets               │
         │  `public/assets/`               │
         │  - Images (avatar, projects)    │
         │  - Icons (favicon)              │
         │  - Illustrations (SVG)          │
         └─────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Navigation | Header nav with links to sections and external links | `index.html` lines 43-66 |
| Hero section | Personal pitch, avatar, role statement, CTA | `index.html` lines 70-95 |
| Ticker | Looping carousel of career achievements | `index.html` lines 97-128 |
| Projects | Major work: Comic Explain, Poelove with images | `index.html` lines 130-210 |
| Hackathons | Prize-winning projects with expandable section | `index.html` lines 212-323 |
| Receipts | Career facts table organized by domain | `index.html` lines 325-367 |
| Art section | Gallery card for miromi project (TODO: incomplete) | `index.html` lines 369-404 |
| Contact footer | Email, GitHub, LinkedIn, art site links | `index.html` lines 406-455 |
| Site footer | Copyright and location info | `index.html` lines 459-464 |

## Pattern Overview

**Overall:** Single-page, vanilla JavaScript, CSS-driven components

**Key Characteristics:**
- No build tool, no framework dependencies — plain HTML/CSS/JS only
- Progressive enhancement: all content accessible without JavaScript
- Accessibility-first: skip links, ARIA attributes, prefers-reduced-motion support
- Component-based CSS naming (BEM-inspired): `.site-nav__logo`, `.project-card__title`
- CSS design system via custom properties (variables) for colors, typography, spacing
- Static assets served from `public/assets/`

## Layers

**HTML Structure:**
- Purpose: Semantic markup for the entire page
- Location: `index.html`
- Contains: Document structure, metadata, section landmarks
- Depends on: Nothing (standalone)
- Used by: CSS (styling), JavaScript (DOM queries)

**CSS Styling:**
- Purpose: Visual design, layout, animations, responsive behavior
- Location: `styles.css` (20,231 bytes)
- Contains: Global reset, CSS variables (design tokens), component styles, media queries
- Depends on: Google Fonts (Instrument Serif, Caveat, Space Mono)
- Used by: HTML (via class selectors and inline `style` attributes)

**JavaScript Interactivity:**
- Purpose: Enhance user experience with animations and state management
- Location: `script.js` (1,431 bytes, 58 lines)
- Contains: Intersection Observer setup for reveal animations, toggle logic for expanded sections
- Depends on: Browser APIs (IntersectionObserver, matchMedia)
- Used by: HTML (via defer-loaded script tag)

**Static Assets:**
- Purpose: Images, icons, and illustrations
- Location: `public/assets/images/`, `public/assets/icons/`
- Contains: JPEG portraits, SVG illustrations, favicon
- Depends on: Nothing
- Used by: HTML (img and style src attributes)

## Data Flow

### Primary Page Load Path

1. Browser requests `index.html` (`index.html:1-468`)
2. HTML parses and loads resources:
   - Google Fonts via `<link>` tag (`index.html:29-35`)
   - `styles.css` via `<link>` tag (`index.html:36`)
   - `script.js` via deferred `<script>` tag (`index.html:37`)
3. CSS variables (`styles.css:17-97`) define design tokens (colors, fonts, spacing)
4. Page renders with semantic sections (`index.html:43-456`)
5. JavaScript defers and executes:
   - `initReveal()` sets up Intersection Observer on `[data-reveal]` elements (`script.js:7-37`)
   - `initHackathonToggle()` attaches click listener to toggle button (`script.js:39-55`)

### User Interaction: Scroll Reveal

1. User scrolls and element with `data-reveal` enters viewport
2. Intersection Observer callback triggers (`script.js:21-29`)
3. Element gets `is-revealed` class
4. CSS animation `.is-revealed` plays via `@keyframes rise` (`styles.css:239-247`)
5. Transitions respect `prefers-reduced-motion` media query (`styles.css:234`)

### User Interaction: Hackathon Expand

1. User clicks `#hackathon-more-toggle` button (`index.html:215-221`)
2. `initHackathonToggle()` handler fires (`script.js:47-54`)
3. Toggle button's `aria-expanded` attribute updates
4. Panel div gets `is-expanded` class
5. CSS `.hackathon-more__panel.is-expanded` reveals hidden content
6. Inert attribute toggled for accessibility

**State Management:**
- No persistent state — all state is ephemeral (DOM classes, ARIA attributes)
- No API calls, no database
- All data is static HTML content

## Key Abstractions

**CSS Custom Properties (Design Tokens):**
- Purpose: Centralized design system for reusable values
- Examples: `--color-accent`, `--font-display`, `--space-lg`
- Located in: `styles.css:17-97` (`:root` selector)
- Pattern: Single source of truth for all visual constants

**Component Class Naming:**
- Purpose: Encapsulate styles for reusable visual patterns
- Examples: `.site-nav__logo`, `.project-card__title`, `.hero__avatar`
- Pattern: Block Element Modifier (BEM-inspired): `[block]__[element]--[modifier]`
- Used for: Navigation, hero section, project cards, receipts table, footer

**Data Attributes:**
- Purpose: Markup-based feature activation without inline JavaScript
- Examples: `data-reveal` for animation triggers, `data-tilt` for card rotation CSS variables
- Located in: `index.html` (throughout)
- Pattern: CSS and JS both key off data attributes for behavior

## Entry Points

**Document Entry:**
- Location: `index.html`
- Triggers: Browser loads URL `https://romyilano.github.io/` or `file://` locally
- Responsibilities: Load all resources, render entire page, seed JavaScript targets

**JavaScript Entry:**
- Location: `script.js:57-58` (bottom of file)
- Triggers: After DOM fully parses (deferred script load)
- Responsibilities: Call `initReveal()` and `initHackathonToggle()`

## Architectural Constraints

- **No build step**: All files served as-is to GitHub Pages; no bundling or transpilation
- **No framework**: Vanilla JavaScript only; no React, Vue, or other framework
- **Single HTML file**: Entire page is one document (not split into multiple HTML pages)
- **No state persistence**: All state is ephemeral; no localStorage, no backend database
- **No API calls**: No XHR/fetch; all content is static
- **External dependencies**: Only Google Fonts for web typography; all else is local
- **Browser compatibility**: Requires modern browser (IntersectionObserver, matchMedia APIs)
- **No CI/CD build**: Changes committed directly; GitHub Pages deploys from `main` root

## Error Handling

**Strategy:** Graceful degradation

**Patterns:**
- JavaScript is optional: page is fully readable without it (reveal animations just show immediately, expand button doesn't toggle)
- IntersectionObserver polyfill check: if not supported, all `[data-reveal]` elements get `is-revealed` class immediately (`script.js:14-18`)
- No error logging or monitoring — errors silently fail; page continues

## Cross-Cutting Concerns

**Accessibility:**
- Skip-to-main link for keyboard users (`index.html:40`, `styles.css:216-232`)
- ARIA attributes on interactive elements (`index.html:219` — `aria-expanded`, `aria-controls`)
- Prefers-reduced-motion respected throughout (`script.js:3-4`, `styles.css:234-267`)
- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`)

**Performance:**
- Lazy loading on project images: `loading="lazy"` on cards (`index.html:165, 200, 254, 290`)
- Eager loading on hero avatar: `loading="eager"` and `fetchpriority="high"` (`index.html:89-90`)
- No JavaScript framework overhead
- Single CSS file (20KB), single JS file (1.4KB)

**Responsive Design:**
- Mobile-first approach with breakpoints at `768px`, `1440px` (`styles.css:99-109`)
- Flexible layout via flexbox and grid
- Fluid typography with `clamp()` for scalable font sizes (`styles.css:47-55`)

---

*Architecture analysis: 2026-09-16*
