# Technology Stack

**Analysis Date:** 2026-09-16

## Languages

**Primary:**
- HTML5 - Page markup and semantic structure
- CSS3 - Styling, typography, animations, and responsive design
- JavaScript (vanilla) - Client-side interactivity, Intersection Observer for animations, accessibility features

**No build language/transpiler used** - files serve as-is to GitHub Pages

## Runtime

**Environment:**
- Browser (client-side only) - No backend runtime
- Target: Modern browsers with ES6+ support
- Accessibility: `prefers-reduced-motion` media query respected in all animations

**Package Manager:**
- None - Zero npm/node dependency. Project is pure static files.
- No lockfile required.

## Frameworks

**Core:**
- None - Plain vanilla HTML, CSS, and JavaScript

**Testing:**
- None - No test runner or testing framework

**Build/Dev:**
- None - No build step, no bundler (Webpack, Vite, Rollup, etc.), no CSS preprocessor (Sass, PostCSS)

## Key Dependencies

**Critical:**
- Google Fonts API (googleapis.com, gstatic.com) - Typography delivery
  - Fonts loaded: `Instrument Serif`, `Caveat`, `Space Mono`
  - Import: `<link>` tag with CSS2 API query string in `index.html` (line 32)

**Client-side APIs used (browser standard):**
- Intersection Observer API - Scroll-triggered reveal animations (`script.js`, lines 21-37)
- matchMedia API - Motion preference detection (`script.js`, lines 3-4)
- DOM/classList manipulation - State management for UI interactions

## Configuration

**Environment:**
- No environment variables used
- No configuration files (.env, .config.json, etc.)
- All configuration is hardcoded in HTML meta tags and CSS variables

**CSS Custom Properties (root-level variables in `styles.css`, lines 17-80):**
- Color palette (--color-bg, --color-ink, --color-accent, etc.)
- Typography scales (--text-body, --text-heading, --text-display, etc.)
- Line heights, spacing, animation timing

**Build:**
- No build configuration files present
- Direct flat-file deployment to GitHub Pages

## Platform Requirements

**Development:**
- Text editor (any)
- Git for version control
- Browser for testing
- No build tools, npm, or development dependencies required

**Production:**
- Deployment target: GitHub Pages (`romyilano.github.io` user site)
- Server: GitHub's static hosting — serves files from repository root (`main` branch)
- No server-side runtime, no build process
- All assets must be committed to git (`public/` and root-level HTML/CSS/JS files)

## Static Assets

**Located in `public/` directory:**
- Images: `public/assets/images/` (JPEG and SVG formats)
- Icons: `public/assets/icons/favicon.svg`
- Total asset weight: Minimal (hand-crafted, no bloat)

## Font Loading

**Strategy:**
- CSS2 Google Fonts API with `display=swap` parameter (font-display behavior)
- DNS preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` for performance
- Three font families loaded; specific weights per family defined in query string (line 32)
  - `Instrument Serif: ital@0;1` (regular + italic)
  - `Caveat: wght@500;600` (medium, semibold weights)
  - `Space Mono: ital,wght@0,400;0,700;1,400` (regular, bold, italic)

---

*Stack analysis: 2026-09-16*
