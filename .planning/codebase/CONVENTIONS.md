# Coding Conventions

**Analysis Date:** 2026-09-16

## Naming Patterns

**Files:**
- Lowercase with hyphens for multi-word files (e.g., `script.js`, `styles.css`, `index.html`)
- CSS file named `styles.css`
- JavaScript entry file named `script.js`
- Asset directories use lowercase (e.g., `public/assets/images/`, `public/assets/icons/`)

**Functions:**
- camelCase for JavaScript function names (e.g., `prefersReducedMotion()`, `initReveal()`, `initHackathonToggle()`)
- Traditional function declarations (not arrow functions): `function functionName() { }`
- Descriptive names indicating action/purpose (e.g., `init*` prefix for initialization functions)

**Variables:**
- camelCase for JavaScript variables (e.g., `targets`, `observer`, `button`, `panel`, `expanded`)
- Descriptive names for clarity

**CSS Classes (BEM Pattern):**
- Block-Element-Modifier (BEM) convention throughout
- Block: `.section`, `.site-nav`, `.hero`, `.project-card`
- Element: `.section__head`, `.site-nav__logo`, `.hero__text` (double underscore separator)
- Modifier: `.site-nav__link--cta`, `.hero__cta:hover` (double dash separator for variants)
- Utility classes: `.visually-hidden`, `.skip-link`, `.page`, `.js` (for JavaScript feature detection)

**CSS Custom Properties (Design Tokens):**
- Double-dash prefix: `--variable-name`
- Semantic naming by category: `--color-*`, `--font-*`, `--weight-*`, `--text-*`, `--leading-*`, `--tracking-*`, `--space-*`
- Size scale follows: `--space-xs` (4px), `--space-sm` (8px), `--space-md` (16px), up to `--space-6xl` (96px)
- Color tokens: `--color-bg`, `--color-ink`, `--color-accent`, `--color-muted`, `--color-paper`, `--color-sticker`
- Type sizes use semantic names: `--text-body`, `--text-label`, `--text-heading`, `--text-display`

**HTML Attributes:**
- camelCase for data attributes (e.g., `data-reveal`)
- Lowercase for standard HTML attributes

## Code Style

**Formatting:**
- No linter or formatter configured
- Manual formatting follows clean, readable style
- 2-space indentation (observed in HTML and CSS)
- Consistent use of spaces around operators and in declarations

**Linting:**
- No ESLint, Prettier, or other linting tools configured
- Reliance on manual code review and visual consistency

**JavaScript Style:**
- Strict mode enabled at top of script: `'use strict';`
- Semicolons used consistently at end of statements
- Spacing: spaces around function parameters, consistent brace style
- Vanilla JavaScript only — no frameworks or transpilation
- Comments minimal — code is self-documenting through clear naming

## Import Organization

**Script Loading:**
- External scripts loaded via `<script>` tags in `<head>`
- Google Fonts loaded with `preconnect` for performance
- Stylesheet linked via `<link rel="stylesheet" href="styles.css">`
- Script file deferred: `<script src="script.js" defer></script>`
- JavaScript feature detection: `<script>document.documentElement.classList.add('js');</script>` added to `<head>` to detect JS support

**External Resources:**
- Preconnect hints for performance: `<link rel="preconnect" href="https://fonts.googleapis.com">`
- Canonical URL included: `<link rel="canonical" href="https://romyilano.github.io/">`
- Security policy: `referrerpolicy="no-referrer"` on font load

## Error Handling

**Patterns:**
- Early returns for guard conditions (e.g., `if (!button || !panel) { return; }`)
- Feature detection before API use (e.g., `if (!('IntersectionObserver' in window))`)
- Graceful degradation: fallback to immediate reveal without animation if IntersectionObserver unavailable
- Silent failures on missing DOM elements (functions check element existence before attaching listeners)

## Logging

**Framework:** `console` (browser built-in)

**Patterns:**
- No logging present in current codebase
- No console.log or console.error statements
- Code design assumes successful execution; no debug logging

## Comments

**When to Comment:**
- Section headers in CSS to organize related rules (e.g., `/* Nav bar */`, `/* Hero */`, `/* Scroll-reveal system */`)
- Inline comments for non-obvious token choices (e.g., weight correction note in CSS for Space Mono font)
- CSS variable definitions grouped with inline labels: `/* Color */`, `/* Fonts */`, `/* Spacing scale */`

**Comment Style:**
- CSS: block comments `/* ... */`
- JavaScript: no inline comments observed; self-documenting code preferred
- Comments in CSS are sparse and high-level, not per-rule

## Module Design

**Exports:**
- No module system (pure static HTML/CSS/JS)
- Script execution is top-level (e.g., `initReveal(); initHackathonToggle();` at end of `script.js`)
- Single global script with IIFE-like execution at module level

**DOM Manipulation:**
- Direct DOM queries: `document.querySelectorAll()`, `document.getElementById()`
- Data attributes as selectors for initialization: `[data-reveal]`
- Class manipulation for state: `.classList.add()`, `.classList.toggle()`
- aria attributes for accessibility: `aria-expanded`, `inert`

## Accessibility

**Patterns:**
- Skip link provided: `<a class="skip-link" href="#main">Skip to content</a>`
- Semantic HTML: proper heading hierarchy (`<h1>`, `<h2>`, etc.)
- ARIA attributes: `aria-expanded` for toggle buttons, `aria-hidden` for decorative elements
- Focus management: `:focus-visible` pseudo-class for visible focus states
- Color contrast: design system ensures adequate contrast via token choices
- Reduced motion: `prefers-reduced-motion` media query and feature check in JavaScript
- Touch targets: `--touch-target: 44px;` CSS variable ensures accessible hit areas
- Semantic button elements with proper click handlers

## Responsive Design

**Mobile-First Approach:**
- Base styles for mobile
- Breakpoints: 768px (tablet), 1024px (desktop), 1440px (wide)
- Media queries use `(min-width: X)` format for progressive enhancement
- Fluid typography using `clamp()`: `clamp(40px, 5vw, 72px)` for heading responsiveness
- Flexible spacing using CSS variables adjusted per breakpoint

## Typography

**Font Stack:**
- Display: `"Instrument Serif", Georgia, serif`
- Accent/Handwriting: `"Caveat", cursive`
- Body: `"Space Mono", ui-monospace, SFMono-Regular, monospace` (monospace design aesthetic)
- Weights: exactly 400 (regular) and 700 (bold) — no faux-bold

**Sizing:**
- Semantic size variables: `--text-body`, `--text-label`, `--text-heading`, `--text-display`
- Clamp() for responsive scaling without breakpoints
- Consistent line-height tokens: `--leading-body: 1.7`, `--leading-heading: 1`

## Interactive Behaviors

**State Management:**
- Class-based state: `.is-revealed`, `.is-expanded` (prefix with `is-` for state classes)
- ARIA attributes for dynamic state: `aria-expanded="true/false"`
- Inert attribute for accessibility: `panel.inert = !expanded;`

**Event Handling:**
- addEventListener for click handlers
- Focus management: `:focus-visible` for keyboard users
- Hover states: `:hover` pseudo-class

---

*Convention analysis: 2026-09-16*
