# Codebase Concerns

**Analysis Date:** 2026-09-16

## Incomplete Content

**Art Projects Section — Miromi Card:**
- Issue: Three placeholder strings with "[TODO: source copy]" markers block the art section from completion
- Files: `index.html` (lines 380, 382, 398)
- Impact: The miromi project card displays broken/placeholder text in production, undermining portfolio credibility. The section is live but visibly incomplete.
- Fix approach: Source the missing copy from the source Claude Design canvas (`Romy Ilano.dc.html`) or from the miromi.com project itself. Fill in:
  - Project badge (line 380): Category/tag describing miromi
  - Project description (line 382): Pitch for the miromi project
  - Caption (line 398): Short descriptor for the illustration/screenshot

## External Dependency — Google Fonts CDN

**Third-party font loading:**
- Risk: Site depends on fonts.googleapis.com and fonts.gstatic.com for Instrument Serif, Caveat, and Space Mono typefaces
- Files: `index.html` (lines 29-35)
- Current state: Preconnect directives added (good), but no fallback if CDN fails
- Impact: If Google Fonts CDN is unavailable or slow, fonts will not load and fallbacks (Georgia, cursive, monospace) will render, breaking visual design intent
- Recommendations:
  - Consider self-hosting critical fonts (Instrument Serif, Space Mono) as WOFF2 files
  - Add font-display: swap to CSS to prevent blocking render
  - Monitor CDN availability as part of deployment health checks
  - Preload the WOFF2 files for critical fonts if self-hosting

## Performance Bottlenecks

**Continuous Ticker Animation:**
- Problem: The ticker animation runs infinitely at 38s loop (`--ticker-duration: 38s` in `styles.css:93`) regardless of viewport size or user scrolling
- Files: `styles.css` (lines 589-596), `index.html` (lines 97-128)
- Cause: Animation is always running when `prefers-reduced-motion: no-preference`, consuming CPU/GPU and draining battery on mobile devices
- Improvement path:
  - Add animation-play-state: paused by default (already on hover/focus, but not off-screen)
  - Use Intersection Observer to pause ticker when not visible
  - Consider reducing animation frame rate or using will-change sparingly

**Background Dot Pattern:**
- Problem: The body uses `radial-gradient()` to render a dot pattern across the entire viewport on every page load (line 118-120 in `styles.css`)
- Files: `styles.css` (lines 118-120)
- Cause: Gradients are recalculated at every render; on large displays, the repeating pattern scales inefficiently
- Improvement path:
  - Replace with a tiled SVG/PNG background image or CSS pattern, which browsers cache more efficiently
  - Alternatively, use background-attachment: fixed for desktop to reduce recalculation cost
  - Test render performance on high-DPI displays (3x pixel ratio)

**Google Fonts Load Time:**
- Problem: Three fonts loaded from external CDN blocks initial render
- Files: `index.html` (lines 29-35)
- Cause: Parser waits for stylesheet link before proceeding; fonts themselves are async but stylesheet parse is blocking
- Improvement path:
  - Move font links to end of `<head>` after critical CSS
  - Use font-display: swap in @font-face rules if self-hosting
  - Measure Time to First Contentful Paint (FCP) to baseline the impact

## Accessibility Concerns

**Ticker Duplicate Lists:**
- Issue: The ticker section duplicates the entire list for animation purposes (lines 99-112 and 113-126 in `index.html`), with the second marked `aria-hidden="true"`
- Files: `index.html` (lines 97-128)
- Impact: While the second list is hidden from screen readers, the pattern is fragile—if aria-hidden is accidentally removed, both lists will be read sequentially, creating confusing repetition
- Safe modification: 
  - Document why the duplication exists (animation requires two copies for CSS keyframe looping)
  - Consider using CSS `animation-iteration-count: infinite` with `animation-direction: alternate` instead, which avoids DOM duplication
  - Alternatively, use a single list with JavaScript animation instead of CSS, hiding it from assistive tech only during animation

**Skip Link:**
- Status: Skip link is present and correctly positioned (lines 216-232 in `styles.css`), good for keyboard navigation
- Works as intended; no changes needed

## Security Considerations

**External Link Security:**
- Status: All external links properly use `rel="noopener noreferrer"` (lines 56-59, 153-154, etc. in `index.html`)
- Current mitigation: Prevents window.opener access and hides referrer from external sites; correct
- Assessment: No issues; follows OWASP best practices

**No Content Security Policy (CSP):**
- Risk: No CSP header present to mitigate XSS or injection attacks
- Files: Not applicable (static site, no server config shown)
- Impact: Low risk for static HTML, but if site is later populated with user-generated content or CMS, this becomes critical
- Recommendations:
  - Add CSP header to GitHub Pages config if possible (check repo settings)
  - Or document in deployment notes that a WAF/CDN should enforce CSP

## Fragile Areas

**Script Execution Timing:**
- Files: `script.js` (lines 57-58)
- Why fragile:
  - Scripts execute at document bottom with `defer`, but if DOM elements are reordered or element IDs change, scripts silently fail
  - No error logging or console warnings if elements are missing
  - Line 40-41 checks for element existence but silently returns on failure, hiding bugs
- Safe modification:
  - Add console.error() logs when required elements are not found
  - Use a strict mode assertion: `if (!button) throw new Error('Hackathon toggle button not found')`
  - Document the assumption that `#hackathon-more-toggle` and `#hackathon-more-panel` are always present

**IntersectionObserver Fallback:**
- Files: `script.js` (lines 14-19)
- Issue: Fallback for browsers without IntersectionObserver immediately adds `is-revealed` class to all elements without staggered animation
- Impact: Works, but on older browsers, all animations fire at once instead of as user scrolls, losing the reveal effect
- Safe modification:
  - Document the tradeoff: old browser support vs. animation quality
  - Consider adding a polyfill link in HTML comments for future reference

## Image Optimization

**Avatar Load Optimization:**
- Current: `loading="eager"` and `fetchpriority="high"` on hero image (lines 84-91 in `index.html`)
- Assessment: Correct for above-the-fold critical image
- Status: No changes needed

**Project Card Images:**
- Current: `loading="lazy"` (correct for below-fold)
- Issue: No image format variants (WebP fallback) or srcset for different screen densities
- Files: `index.html` (lines 159-167, 194-202, etc.)
- Impact: Higher bandwidth for users on 2x/3x DPI displays; images not optimized for mobile
- Fix approach:
  - Add srcset with 2x variant (or use AVIF/WebP with fallbacks)
  - Consider using an image CDN or build step to generate optimized variants

**SVG Illustrations:**
- Current: SVG files loaded directly (lines 161, 249, 286 in `index.html`)
- Assessment: Good choice; SVGs are scalable and typically smaller than raster. No changes needed.

## Deployment & Build Process

**No Build Step or Optimization:**
- Issue: CSS and JavaScript are unminified; no build pipeline documented
- Files: `styles.css` (20KB), `script.js` (1.4KB)
- Impact: Unminified CSS/JS increases bandwidth cost; no optimization for production
- Current approach: Files deployed as-is to GitHub Pages
- Fix approach:
  - Add a build script (`package.json` with esbuild or PostCSS) to minify CSS/JS
  - Document build step in README
  - Consider adding GitHub Actions workflow to automate minification on push

**README is Empty:**
- Issue: README.md contains only one line ("# New portfolio site")
- Files: `README.md`
- Impact: No deployment instructions, no tech stack documentation, no contribution guidelines
- Priority: Low (portfolio is read-only), but helpful for future reference
- Recommendations:
  - Document the source design reference (Romy Ilano.dc.html)
  - Add "Deployed to" section with link to live site
  - Include "How to edit" section for future updates

## Meta & SEO

**Open Graph Image Size:**
- Issue: og:image points to avatar-cartoon.jpeg (300x300px, 36KB assumed)
- Files: `index.html` (lines 14, 22)
- Impact: Small image size may not render well in LinkedIn/Twitter/Slack previews; social shares may crop or downsize
- Fix approach:
  - Create a 1200x630px version of the avatar or a custom OG image
  - Update og:image:width and og:image:height accordingly
  - Test preview in social media debuggers (Facebook Sharing Debugger, Twitter Card Validator)

## Known Limitations

**CSS Feature Support:**
- The site uses `clamp()` for responsive typography (lines 47-54 in `styles.css`), which requires modern browsers (Chrome 79+, Safari 13.1+, Firefox 75+)
- Files: `styles.css`
- Impact: Older IE11 users will see broken typography (fixed sizes will not apply due to CSS parser failure)
- Current approach: No fallback declared
- Assessment: Acceptable for a 2026 portfolio site targeting modern browsers

**JavaScript ES5 Conventions:**
- The site uses `var` instead of `const`/`let` (line 12 in `script.js`)
- Assessment: Works correctly; not a bug, just older style. If modernizing, prefer `const`/`let` for block scope.

---

*Concerns audit: 2026-09-16*
