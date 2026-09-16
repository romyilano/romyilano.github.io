# Testing Patterns

**Analysis Date:** 2026-09-16

## Test Framework

**Status:** Not configured

- No test framework installed (no Jest, Vitest, Mocha, etc.)
- No test runner configured
- No test files present in repository
- No test command in build/dev workflow

**Rationale:**
- Codebase is a small static portfolio site (~60 lines of JavaScript)
- Plain HTML/CSS/vanilla JS with no build process or package manager
- Manual testing via browser inspection and GitHub Pages preview is sufficient for project scope

## Run Commands

Not applicable — no automated testing configured.

**Manual Testing:**
```bash
# Open in browser
open index.html

# Or test via GitHub Pages
# https://romyilano.github.io/
```

## Test File Organization

**Current:** No test files

**If testing were added:**
- Suggested pattern: co-located test files (`*.test.js` or `*.spec.js` next to source)
- Or separate `/tests` directory for integration tests
- Test data fixtures in `/tests/fixtures/` if needed

## Test Structure

**No automated test suite present.**

### If Framework Were Added

Consider Jest or Vitest for lightweight testing:

```javascript
// Suggested pattern (not currently used):
describe('prefersReducedMotion', () => {
  it('should detect reduced motion preference', () => {
    // Test media query detection
  });
});

describe('initReveal', () => {
  it('should skip animation when reduced motion preferred', () => {
    // Test graceful degradation
  });

  it('should observe elements with data-reveal', () => {
    // Test IntersectionObserver setup
  });
});
```

## Manual Testing Checklist

### Visual Regression
- [ ] Open `index.html` in modern browser (Chrome, Safari, Firefox, Edge)
- [ ] Verify layout matches design canvas at multiple breakpoints (mobile, tablet, desktop)
- [ ] Test scroll-reveal animations (should appear smoothly on scroll)
- [ ] Test hero section load and presentation
- [ ] Verify all project cards render correctly

### Accessibility
- [ ] Test keyboard navigation (Tab through all interactive elements)
- [ ] Verify skip link works (press Tab immediately after page load)
- [ ] Test reduced motion preference (disable animations in browser, verify graceful fallback)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Verify ARIA attributes on toggle buttons (`aria-expanded`)
- [ ] Check color contrast ratios meet WCAG AA standards

### Responsive Design
- [ ] Mobile (320px–479px): single column, readable text
- [ ] Tablet (480px–1023px): optimized layout
- [ ] Desktop (1024px+): full-width layout with side-by-side elements
- [ ] Landscape orientation on mobile: still usable

### JavaScript Functionality
- [ ] Scroll reveal animation works smoothly
- [ ] Hackathon toggle button (more/less) toggles state correctly
- [ ] Text changes when expanded/collapsed: "(more)" ↔ "(less)"
- [ ] Panel inert attribute prevents focus when collapsed
- [ ] Feature detection works: IntersectionObserver fallback activates if unavailable
- [ ] Graceful degradation: site works without JavaScript (content visible, links functional)

### Performance
- [ ] Page loads in <3s on 4G throttling
- [ ] Scroll performance smooth (60 FPS)
- [ ] No layout shifts during animation
- [ ] All assets load (images, fonts)
- [ ] No console errors or warnings

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### Deployment
- [ ] Links resolve correctly on GitHub Pages (`romyilano.github.io`)
- [ ] Canonical URL works: `https://romyilano.github.io/`
- [ ] Open Graph meta tags populate correctly in social shares
- [ ] Twitter card displays correctly

## What NOT to Test Automatically

- **CSS visuals:** Visual regression testing not necessary for small, hand-built site; manual visual inspection sufficient
- **External fonts:** Google Fonts reliability is guaranteed by CDN; focus on fallback font rendering
- **Static content:** Copy/text content verified manually; no grammar checker integration needed

## Mocking

**Not applicable** — no external APIs or async operations to mock.

**If Future Integrations Added:**
- Consider Jest or Vitest with `@testing-library/dom` for DOM manipulation tests
- Mock `window.matchMedia()` for `prefers-reduced-motion` testing
- Mock IntersectionObserver for scroll-reveal testing

## Accessibility Testing Tools

**Recommended (manual):**
- Browser DevTools Accessibility tab
- axe DevTools browser extension
- WAVE (WebAIM)
- Keyboard-only navigation

**Command-line (if added):**
```bash
# Example: eslint-plugin-jsx-a11y can be added to check HTML/accessibility
npm install --save-dev eslint-plugin-jsx-a11y
```

## Performance Monitoring

**Current:** Manual via browser DevTools

**If Monitoring Added:**
- Lighthouse CI in GitHub Actions
- Performance budget tracking
- Core Web Vitals monitoring via web-vitals package

## Browser Capabilities to Test

**JavaScript APIs Used:**
- `window.matchMedia()` — prefers-reduced-motion detection
- `IntersectionObserver` — scroll reveal (with fallback)
- `document.querySelectorAll()`, `getElementById()` — DOM queries
- `classList.add()`, `classList.toggle()` — class manipulation
- `setAttribute()`, `getAttribute()` — attribute manipulation
- `addEventListener()` — event binding

**Fallback Testing:**
- IntersectionObserver unavailable: verify elements get `is-revealed` class immediately
- Reduced motion enabled: verify reveal animation skipped, content visible instantly

## Testing Coverage Gaps

**Currently Untested:**
- Scroll-reveal animation timing and staggering (i % 4) * 80ms calculation
- Hackathon toggle button state management (aria-expanded, inert, text updates)
- Media query breakpoint behavior (CSS only — visual testing needed)
- Cross-browser JavaScript API support (IntersectionObserver)

**Risk Level:** Low
- Codebase is small and visually obvious when broken
- Manual visual testing and browser testing sufficient for scope

## Future Testing Recommendations

**Phase 1 (Current):** Manual testing via browser — adequate for static site

**Phase 2 (If Complexity Grows):**
- Add Vitest for unit tests on interactive functions (`prefersReducedMotion()`, toggle state)
- Add Playwright for E2E tests (scroll reveal, toggle interactions)
- Automate accessibility checks in CI via axe-core

**Phase 3 (Production Maturity):**
- Add Lighthouse CI to GitHub Actions
- Add performance budget tracking
- Screenshot-based visual regression testing (if frequent design updates)

## Example Test (Conceptual)

If tests were added, example pattern:

```javascript
// script.test.js (conceptual)
import { prefersReducedMotion, initReveal, initHackathonToggle } from './script.js';

describe('prefersReducedMotion()', () => {
  it('returns true when prefers-reduced-motion: reduce is set', () => {
    const mediaQueryList = {
      matches: true,
    };
    window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);
    expect(prefersReducedMotion()).toBe(true);
  });

  it('returns false when prefers-reduced-motion: reduce is not set', () => {
    const mediaQueryList = {
      matches: false,
    };
    window.matchMedia = jest.fn().mockReturnValue(mediaQueryList);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe('initHackathonToggle()', () => {
  it('should toggle aria-expanded and panel state on button click', () => {
    document.body.innerHTML = `
      <button id="hackathon-more-toggle" aria-expanded="false">(more)</button>
      <div id="hackathon-more-panel"></div>
    `;
    
    initHackathonToggle();
    const button = document.getElementById('hackathon-more-toggle');
    button.click();
    
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.textContent).toBe('(less)');
  });
});
```

---

*Testing analysis: 2026-09-16*
