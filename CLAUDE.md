<!-- GSD:project-start source:PROJECT.md -->

## Project

**Romy Ilano Portfolio Site**

A hand-built, no-template single-page personal portfolio for Romy Ilano, positioning her as an AI product engineer on Apple platforms in San Francisco. Deployed as a GitHub Pages user site at `romyilano.github.io`, built as plain static HTML/CSS/vanilla JS with no framework and no build step.

**Core Value:** The page must load fast, look hand-crafted (not templated), and clearly land the pitch — "AI product engineer, Apple platforms, San Francisco" — with real project work and career receipts as proof, on a URL Romy can put on a resume today.

### Constraints

- **Hosting**: GitHub Pages, target repo `romyilano/romyilano.github.io` (serves from `main` root) — user's explicit choice.
- **Tech stack**: Plain static HTML/CSS/vanilla JS. No framework, no build step, no Claude Design runtime dependency — new pages must work as flat files GitHub Pages can serve directly.
- **Design fidelity**: Visual design for the Projects page comes directly from the `Projects v3.dc.html` canvas — implement, don't redesign.
- **Accessibility**: Preserve `prefers-reduced-motion` handling and other existing accessibility patterns in any new page.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->

## Technology Stack

## Languages

- HTML5 - Page markup and semantic structure
- CSS3 - Styling, typography, animations, and responsive design
- JavaScript (vanilla) - Client-side interactivity, Intersection Observer for animations, accessibility features

## Runtime

- Browser (client-side only) - No backend runtime
- Target: Modern browsers with ES6+ support
- Accessibility: `prefers-reduced-motion` media query respected in all animations
- None - Zero npm/node dependency. Project is pure static files.
- No lockfile required.

## Frameworks

- None - Plain vanilla HTML, CSS, and JavaScript
- None - No test runner or testing framework
- None - No build step, no bundler (Webpack, Vite, Rollup, etc.), no CSS preprocessor (Sass, PostCSS)

## Key Dependencies

- Google Fonts API (googleapis.com, gstatic.com) - Typography delivery
- Intersection Observer API - Scroll-triggered reveal animations (`script.js`, lines 21-37)
- matchMedia API - Motion preference detection (`script.js`, lines 3-4)
- DOM/classList manipulation - State management for UI interactions

## Configuration

- No environment variables used
- No configuration files (.env, .config.json, etc.)
- All configuration is hardcoded in HTML meta tags and CSS variables
- Color palette (--color-bg, --color-ink, --color-accent, etc.)
- Typography scales (--text-body, --text-heading, --text-display, etc.)
- Line heights, spacing, animation timing
- No build configuration files present
- Direct flat-file deployment to GitHub Pages

## Platform Requirements

- Text editor (any)
- Git for version control
- Browser for testing
- No build tools, npm, or development dependencies required
- Deployment target: GitHub Pages (`romyilano.github.io` user site)
- Server: GitHub's static hosting — serves files from repository root (`main` branch)
- No server-side runtime, no build process
- All assets must be committed to git (`public/` and root-level HTML/CSS/JS files)

## Static Assets

- Images: `public/assets/images/` (JPEG and SVG formats)
- Icons: `public/assets/icons/favicon.svg`
- Total asset weight: Minimal (hand-crafted, no bloat)

## Font Loading

- CSS2 Google Fonts API with `display=swap` parameter (font-display behavior)
- DNS preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` for performance
- Three font families loaded; specific weights per family defined in query string (line 32)

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

## Naming Patterns

- Lowercase with hyphens for multi-word files (e.g., `script.js`, `styles.css`, `index.html`)
- CSS file named `styles.css`
- JavaScript entry file named `script.js`
- Asset directories use lowercase (e.g., `public/assets/images/`, `public/assets/icons/`)
- camelCase for JavaScript function names (e.g., `prefersReducedMotion()`, `initReveal()`, `initHackathonToggle()`)
- Traditional function declarations (not arrow functions): `function functionName() { }`
- Descriptive names indicating action/purpose (e.g., `init*` prefix for initialization functions)
- camelCase for JavaScript variables (e.g., `targets`, `observer`, `button`, `panel`, `expanded`)
- Descriptive names for clarity
- Block-Element-Modifier (BEM) convention throughout
- Block: `.section`, `.site-nav`, `.hero`, `.project-card`
- Element: `.section__head`, `.site-nav__logo`, `.hero__text` (double underscore separator)
- Modifier: `.site-nav__link--cta`, `.hero__cta:hover` (double dash separator for variants)
- Utility classes: `.visually-hidden`, `.skip-link`, `.page`, `.js` (for JavaScript feature detection)
- Double-dash prefix: `--variable-name`
- Semantic naming by category: `--color-*`, `--font-*`, `--weight-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--space-*`
- Size scale follows: `--space-xs` (4px), `--space-sm` (8px), `--space-md` (16px), up to `--space-6xl` (96px)
- Color tokens: `--color-bg`, `--color-ink`, `--color-accent`, `--color-muted`, `--color-paper`, `--color-sticker`
- Type sizes use semantic names: `--text-body`, `--text-label`, `--text-heading`, `--text-display`
- camelCase for data attributes (e.g., `data-reveal`)
- Lowercase for standard HTML attributes

## Code Style

- No linter or formatter configured
- Manual formatting follows clean, readable style
- 2-space indentation (observed in HTML and CSS)
- Consistent use of spaces around operators and in declarations
- No ESLint, Prettier, or other linting tools configured
- Reliance on manual code review and visual consistency
- Strict mode enabled at top of script: `'use strict';`
- Semicolons used consistently at end of statements
- Spacing: spaces around function parameters, consistent brace style
- Vanilla JavaScript only — no frameworks or transpilation
- Comments minimal — code is self-documenting through clear naming

## Import Organization

- External scripts loaded via `<script>` tags in `<head>`
- Google Fonts loaded with `preconnect` for performance
- Stylesheet linked via `<link rel="stylesheet" href="styles.css">`
- Script file deferred: `<script src="script.js" defer></script>`
- JavaScript feature detection: `<script>document.documentElement.classList.add('js');</script>` added to `<head>` to detect JS support
- Preconnect hints for performance: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- Canonical URL included: `<link rel="canonical" href="https://romyilano.github.io/">`
- Security policy: `referrerpolicy="no-referrer"` on font load

## Error Handling

- Early returns for guard conditions (e.g., `if (!button || !panel) { return; }`)
- Feature detection before API use (e.g., `if (!('IntersectionObserver' in window))`)
- Graceful degradation: fallback to immediate reveal without animation if IntersectionObserver unavailable
- Silent failures on missing DOM elements (functions check element existence before attaching listeners)

## Logging

- No logging present in current codebase
- No console.log or console.error statements
- Code design assumes successful execution; no debug logging

## Comments

- Section headers in CSS to organize related rules (e.g., `/* Nav bar */`, `/* Hero */`, `/* Scroll-reveal system */`)
- Inline comments for non-obvious token choices (e.g., weight correction note in CSS for Space Mono font)
- CSS variable definitions grouped with inline labels: `/* Color */`, `/* Fonts */`, `/* Spacing scale */`
- CSS: block comments `/* ... */`
- JavaScript: no inline comments observed; self-documenting code preferred
- Comments in CSS are sparse and high-level, not per-rule

## Module Design

- No module system (pure static HTML/CSS/JS)
- Script execution is top-level (e.g., `initReveal(); initHackathonToggle();` at end of `script.js`)
- Single global script with IIFE-like execution at module level
- Direct DOM queries: `document.querySelectorAll()`, `document.getElementById()`
- Data attributes as selectors for initialization: `[data-reveal]`
- Class manipulation for state: `.classList.add()`, `.classList.toggle()`
- aria attributes for accessibility: `aria-expanded`, `inert`

## Accessibility

- Skip link provided: `<a class="skip-link" href="#main">Skip to content</a>`
- Semantic HTML: proper heading hierarchy (`<h1>`, `<h2>`, etc.)
- ARIA attributes: `aria-expanded` for toggle buttons, `aria-hidden` for decorative elements
- Focus management: `:focus-visible` pseudo-class for visible focus states
- Color contrast: design system ensures adequate contrast via token choices
- Reduced motion: `prefers-reduced-motion` media query and feature check in JavaScript
- Touch targets: `--touch-target: 44px;` CSS variable ensures accessible hit areas
- Semantic button elements with proper click handlers

## Responsive Design

- Base styles for mobile
- Breakpoints: 768px (tablet), 1024px (desktop), 1440px (wide)
- Media queries use `(min-width: X)` format for progressive enhancement
- Fluid typography using `clamp()`: `clamp(40px, 5vw, 72px)` for heading responsiveness
- Flexible spacing using CSS variables adjusted per breakpoint

## Typography

- Display: `"Instrument Serif", Georgia, serif`
- Accent/Handwriting: `"Caveat", cursive`
- Body: `"Space Mono", ui-monospace, SFMono-Regular, monospace` (monospace design aesthetic)
- Weights: exactly 400 (regular) and 700 (bold) — no faux-bold
- Semantic size variables: `--text-body`, `--text-label`, `--text-heading`, `--text-display`
- Clamp() for responsive scaling without breakpoints
- Consistent line-height tokens: `--leading-body: 1.7`, `--leading-heading: 1`

## Interactive Behaviors

- Class-based state: `.is-revealed`, `.is-expanded` (prefix with `is-` for state classes)
- ARIA attributes for dynamic state: `aria-expanded="true/false"`
- Inert attribute for accessibility: `panel.inert = !expanded;`
- addEventListener for click handlers
- Focus management: `:focus-visible` for keyboard users
- Hover states: `:hover` pseudo-class

<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

## System Overview

```text

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

- No build tool, no framework dependencies — plain HTML/CSS/JS only
- Progressive enhancement: all content accessible without JavaScript
- Accessibility-first: skip links, ARIA attributes, prefers-reduced-motion support
- Component-based CSS naming (BEM-inspired): `.site-nav__logo`, `.project-card__title`
- CSS design system via custom properties (variables) for colors, typography, spacing
- Static assets served from `public/assets/`

## Layers

- Purpose: Semantic markup for the entire page
- Location: `index.html`
- Contains: Document structure, metadata, section landmarks
- Depends on: Nothing (standalone)
- Used by: CSS (styling), JavaScript (DOM queries)
- Purpose: Visual design, layout, animations, responsive behavior
- Location: `styles.css` (20,231 bytes)
- Contains: Global reset, CSS variables (design tokens), component styles, media queries
- Depends on: Google Fonts (Instrument Serif, Caveat, Space Mono)
- Used by: HTML (via class selectors and inline `style` attributes)
- Purpose: Enhance user experience with animations and state management
- Location: `script.js` (1,431 bytes, 58 lines)
- Contains: Intersection Observer setup for reveal animations, toggle logic for expanded sections
- Depends on: Browser APIs (IntersectionObserver, matchMedia)
- Used by: HTML (via defer-loaded script tag)
- Purpose: Images, icons, and illustrations
- Location: `public/assets/images/`, `public/assets/icons/`
- Contains: JPEG portraits, SVG illustrations, favicon
- Depends on: Nothing
- Used by: HTML (img and style src attributes)

## Data Flow

### Primary Page Load Path

### User Interaction: Scroll Reveal

### User Interaction: Hackathon Expand

- No persistent state — all state is ephemeral (DOM classes, ARIA attributes)
- No API calls, no database
- All data is static HTML content

## Key Abstractions

- Purpose: Centralized design system for reusable values
- Examples: `--color-accent`, `--font-display`, `--space-lg`
- Located in: `styles.css:17-97` (`:root` selector)
- Pattern: Single source of truth for all visual constants
- Purpose: Encapsulate styles for reusable visual patterns
- Examples: `.site-nav__logo`, `.project-card__title`, `.hero__avatar`
- Pattern: Block Element Modifier (BEM-inspired): `[block]__[element]--[modifier]`
- Used for: Navigation, hero section, project cards, receipts table, footer
- Purpose: Markup-based feature activation without inline JavaScript
- Examples: `data-reveal` for animation triggers, `data-tilt` for card rotation CSS variables
- Located in: `index.html` (throughout)
- Pattern: CSS and JS both key off data attributes for behavior

## Entry Points

- Location: `index.html`
- Triggers: Browser loads URL `https://romyilano.github.io/` or `file://` locally
- Responsibilities: Load all resources, render entire page, seed JavaScript targets
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

- JavaScript is optional: page is fully readable without it (reveal animations just show immediately, expand button doesn't toggle)
- IntersectionObserver polyfill check: if not supported, all `[data-reveal]` elements get `is-revealed` class immediately (`script.js:14-18`)
- No error logging or monitoring — errors silently fail; page continues

## Cross-Cutting Concerns

- Skip-to-main link for keyboard users (`index.html:40`, `styles.css:216-232`)
- ARIA attributes on interactive elements (`index.html:219` — `aria-expanded`, `aria-controls`)
- Prefers-reduced-motion respected throughout (`script.js:3-4`, `styles.css:234-267`)
- Semantic HTML (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`)
- Lazy loading on project images: `loading="lazy"` on cards (`index.html:165, 200, 254, 290`)
- Eager loading on hero avatar: `loading="eager"` and `fetchpriority="high"` (`index.html:89-90`)
- No JavaScript framework overhead
- Single CSS file (20KB), single JS file (1.4KB)
- Mobile-first approach with breakpoints at `768px`, `1440px` (`styles.css:99-109`)
- Flexible layout via flexbox and grid
- Fluid typography with `clamp()` for scalable font sizes (`styles.css:47-55`)

<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
