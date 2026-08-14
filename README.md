# Kostiantyn Bryl — NORVEXA Portfolio

A multilingual, evidence-first personal portfolio and recruiter-focused resume site published with GitHub Pages.

## Live site

`https://kostiantynbryl.github.io/My-Resume/`

## v1.2 — Proof & Conversion

The v1.2 release freezes the visual system and shifts future work toward evidence, project screenshots, measurable scope and recruiter conversion rather than additional decoration.

Highlights:
- Home explains the profile in four verbs: Build products · Lead operations · Automate systems · Ship software.
- Featured ClearUp case with source-backed technical metrics.
- Project pages use Problem → My role → What I built → Result → Stack → Evidence.
- Real screenshots are labelled as real. Concept/product visuals are never presented as captured UI.
- Experience is enriched with scope and impact without invented growth percentages.
- Build-time GitHub snapshot powers recent shipping/activity cards without client-side GitHub API calls.
- CV / Telegram / Email remain one-click actions from every page.
- Responsive visual smoke tests cover 375, 430, 768 and 1024 px widths.
- Privacy-friendly analytics integration is implemented but disabled until an endpoint is configured.
- Custom-domain activation is controlled from `site.config.json`.
- LinkedIn alignment copy lives in `brand/linkedin-profile.md`.
- Visual foundations are frozen in `DESIGN_FREEZE.md`.

## Structure

- `/` — concise portfolio landing page and featured proof case
- `/ecosystem/` — NORVEXA Software, Games, Media and Labs
- `/work/` — selected products, evidence labels and shipping timeline
- `/experience/` — career timeline with scope and impact
- `/case-studies/` — focused product/engineering cases
- `/about/` — working style, capabilities, delivery/privacy infrastructure
- `/now/` — active products and recent repository activity
- `/contact/` — Telegram, email, LinkedIn, GitHub, QR and vCard
- `/recruiter/`, `/engineering/`, `/product/` — audience-specific views with tailored project ordering and CVs
- `/work/<project>/` — project deep dives with evidence sections
- `/system/` — hidden NORVEXA console unlocked by the logo easter egg

## Languages

English, Polish, Russian and Ukrainian. The selected language is stored locally and can also be selected with `?lang=en|pl|ru|uk`.

## Evidence policy

Project metrics must be traceable to source code, repository documentation, build configuration or direct operating history. The portfolio intentionally avoids invented revenue, percentage-growth or performance claims.

Current source-backed examples:
- ClearUp: 3 privileged execution paths, 4 fixed Shizuku operations, 90-second Accessibility request timeout, no ads/analytics/account/cloud processing.
- CutFlow Batch: 6 input video extensions, 2 processing paths, trim values to 0.001 second.
- BrylTab Bouncer Glass: Android 16 target, 90% bouncer transparency, SystemUI-only scope, v0.1.1 hardware-test build.

## CV PDFs

General recruiter/ATS-friendly PDFs are generated from `cv/generate.py`. Role-specific variants are generated from `cv/generate_roles.py` for Recruiter, Engineering and Product views in all four languages.

## Build-time snapshot

`Refresh portfolio snapshot` collects public GitHub metadata, latest commit/release context, self-hosts the GitHub profile image and the available CutFlow screenshot, generates page-specific social cards, structured metadata and build information. Visitors read the local snapshot instead of calling GitHub directly.

## Custom domain

Edit `site.config.json`:

```json
{
  "custom_domain": "example.com"
}
```

The snapshot workflow will switch canonical/OG URLs and create `CNAME`. DNS and domain registration remain external to this repository.

## Privacy-friendly analytics

The analytics layer is disabled by default. `analytics-v12.js`:
- sets no cookies;
- generates no user ID;
- respects Global Privacy Control and Do Not Track;
- sends nothing while the endpoint is empty.

To activate it, configure an HTTPS endpoint in `proof-v12-data.js` / deployment config after choosing a provider or self-hosted collector.

## Quality gates

`Portfolio quality` validates required files, JavaScript/Python syntax, internal links, generates all general and role-specific PDFs and runs Lighthouse CI. Thresholds remain at 0.95 for Performance, Accessibility, Best Practices and SEO.

`Responsive visual QA` opens Home, Work and ClearUp at 375, 430, 768 and 1024 px, rejects horizontal overflow and stores full-page screenshots as a workflow artifact.

## Contact

- Telegram: `https://t.me/kostiantynbryl`
- GitHub: `https://github.com/kostiantynbryl`
- LinkedIn: `https://www.linkedin.com/in/kostiantyn-bryl97/`
- Email: `kostiantynbryl@gmail.com`

## Stack

Static HTML/CSS/JavaScript, GitHub Pages, GitHub Actions, Pillow, ReportLab and Playwright-based QA. No frontend framework or runtime backend is required.

## Brand

NORVEXA × Kostiantyn Bryl — Creating Tomorrow.
