# External Integrations

**Analysis Date:** 2026-09-16

## APIs & External Services

**Typography:**
- Google Fonts - Font delivery and CSS generation
  - SDK/Client: HTTP `<link>` tag (CSS2 API)
  - Domains: `fonts.googleapis.com`, `fonts.gstatic.com`
  - Usage: Line 29-35 in `index.html`
  - No authentication required (public CDN)

**Social & Professional Links:**
- GitHub - Portfolio link to `https://github.com/romyilano`
  - Usage: Navigation link (line 56 in `index.html`) and project source links
  - No API integration — direct web links only
- LinkedIn - Professional profile link to `https://linkedin.com/in/rilano`
  - Usage: Contact section link (line 433-439 in `index.html`)
  - No API integration — direct web link only

**Project Links:**
- External portfolio projects displayed as static links:
  - `comicexplain.com` - Line 140, 153-154
  - `poelove.com` - Line 178, 189
  - `miromi.com` - Line 379, 384
  - `agentnativesurfskate.vercel.app` - Line 266, 278-279 (Vercel deployment)
  - `github.com/romyilano/cuentame` - Line 229, 242
  - All project links open in new tabs with `rel="noopener noreferrer"`

## Data Storage

**Databases:**
- None - Purely static site with no persistent storage

**File Storage:**
- Local filesystem only - All assets committed to repository
  - Images: `public/assets/images/` (avatar, project backgrounds, illustrations)
  - Icons: `public/assets/icons/favicon.svg`
  - No cloud storage integration (AWS S3, Cloudinary, etc.)

**Caching:**
- Browser cache via HTTP headers (GitHub Pages standard behavior)
- No explicit cache service layer (Redis, Memcached, etc.)

## Authentication & Identity

**Auth Provider:**
- Custom (none) - No authentication system
- No login, user sessions, or protected content
- All content is publicly accessible

## Monitoring & Observability

**Error Tracking:**
- None detected - No error tracking service (Sentry, Rollbar, etc.)

**Analytics:**
- None detected - No analytics service (Google Analytics, Mixpanel, etc.)
- No tracking pixels, UTM parameters, or telemetry

**Logs:**
- GitHub Pages server logs only (not accessible from application layer)

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (GitHub user site)
- Repository: `romyilano/romyilano.github.io` (implied target from CLAUDE.md)
- Deployment: Direct git push to `main` branch (automatic)
- No build step required — served as static files from repository root

**CI Pipeline:**
- None - No GitHub Actions workflows detected
- Direct file deployment on git push

**Deployment Constraints:**
- All files must be in repository root (GitHub Pages user site serves from `/`)
- Flat file structure (no nested build output directories)

## Environment Configuration

**Required env vars:**
- None - No environment variables used

**Configuration approach:**
- All configuration is hardcoded in HTML meta tags (`index.html`, lines 4-25)
- CSS custom properties defined in `:root` selector (`styles.css`, lines 17-80)
- No secrets or sensitive data in codebase (except for public email `hello@romyilano.com`)

## Webhooks & Callbacks

**Incoming:**
- None - No webhooks received

**Outgoing:**
- Email contact: `mailto:hello@romyilano.com` (line 415 in `index.html`)
  - Handled by browser's default mailto handler
  - No email service integration (SendGrid, Mailgun, etc.)

## Performance Integrations

**Font Loading:**
- DNS preconnect to Google Fonts domains (performance optimization)
- Font display strategy: `display=swap` (ensures text renders while fonts load)

**Image Loading:**
- Hero image uses `loading="eager"` and `fetchpriority="high"` (line 89 in `index.html`)
- Other images load lazily by default

## Third-Party Scripts

**Loaded:**
- None - Only `script.js` (local, inline in `index.html` at line 37)
- No external analytics, tracking, advertising, or third-party libraries loaded

---

*Integration audit: 2026-09-16*
