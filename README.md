# Kostiantyn Bryl — Personal Portfolio

A multilingual, evidence-first personal portfolio and recruiter-focused resume site published with GitHub Pages.

## Live site

`https://kostiantynbryl.github.io/My-Resume/`

## Identity

This is **Kostiantyn Bryl's personal portfolio**. NORVEXA appears only as a project/product ecosystem inside the portfolio (Software, Games, Media and Labs); it is not the primary site brand.

The public identity is:
- Kostiantyn Bryl
- Personal Portfolio
- Creating Tomorrow

## Languages

The site supports five interface languages:
- English
- Polish
- Russian
- Ukrainian
- Simplified Chinese (简体中文)

All five languages use the same application renderer. Language state, labels and page copy are centralized in `app/i18n.js`; Chinese is not a late UI overlay.

## Modular architecture

The public runtime is intentionally split into independent modules:

```text
portfolio-data.js            domain/project data
pro-v11-data.js              project deep-dive data
proof-v12-data.js            evidence/proof data
zh-v13-data.js               Chinese data augmentation
multipage.js                 lightweight module loader
app/
  core.js                    route/path/page context
  i18n.js                    one five-language locale state
  header.js                  shared Header component
  main.js                    page-aware Main renderer
  footer.js                  shared Footer component
  utilities.js               CV, theme, command palette, easter egg
  bootstrap.js               Header → Main → Footer orchestration
  app.css                    modular shell overrides
```

Changing language dispatches one application event and rerenders Header, Main and Footer from the same locale state. Legacy UI overlay scripts are not loaded by the public runtime.

## Structure

- `/` — concise personal landing page and featured proof case
- `/work/` — selected projects and evidence
- `/experience/` — career timeline
- `/case-studies/` — focused product/engineering cases
- `/about/` — working style and capabilities
- `/now/` — active products and experiments
- `/contact/` — Telegram, email, LinkedIn, GitHub, QR and vCard
- `/ecosystem/` — project ecosystem; NORVEXA directions live here as project grouping
- `/recruiter/`, `/engineering/`, `/product/` — audience-specific views
- `/work/<project>/` — project deep dives
- `/system/` — hidden personal console unlocked by the logo easter egg

## Evidence policy

Project metrics must be traceable to source code, repository documentation, build configuration or direct operating history. The portfolio avoids invented revenue, growth and performance claims.

Examples:
- ClearUp: 3 privileged execution paths, 4 fixed Shizuku operations, 90-second Accessibility request timeout, no ads/analytics/account/cloud processing.
- CutFlow Batch: 6 input video extensions, 2 processing paths, trim values to 0.001 second.
- BrylTab Bouncer Glass: Android 16 target, 90% bouncer transparency, SystemUI-only scope.

## CV PDFs

General recruiter/ATS-friendly PDFs are generated for EN / PL / RU / UA / ZH. Recruiter, Engineering and Product variants are available in all five languages.

## Metadata and social cards

`scripts/site_snapshot.py` builds the public GitHub snapshot and media. `scripts/personal_meta.py` applies the personal Kostiantyn Bryl identity to canonical metadata, Open Graph cards and structured data, while retaining NORVEXA only where it describes project categories.

## Quality gates

`Portfolio quality` validates the modular runtime, JavaScript/Python syntax, internal references, five-language CV generation and Lighthouse CI. It explicitly rejects legacy UI scripts in the public loader.

`Responsive visual QA` checks responsive layouts and runs a full modular Simplified-Chinese browser pass across Home, Work, Experience, Cases, About, Now, Contact, Ecosystem, audience views and every published project page.

## Contact

- Telegram: `https://t.me/kostiantynbryl`
- GitHub: `https://github.com/kostiantynbryl`
- LinkedIn: `https://www.linkedin.com/in/kostiantyn-bryl97/`
- Email: `kostiantynbryl@gmail.com`

## Stack

Static HTML/CSS/JavaScript, GitHub Pages, GitHub Actions, Pillow, ReportLab and Playwright.

## Brand

**Kostiantyn Bryl — Personal Portfolio — Creating Tomorrow.**
