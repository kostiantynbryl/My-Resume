# Kostiantyn Bryl — NORVEXA Portfolio

A multilingual personal portfolio and recruiter-focused resume site published with GitHub Pages.

## Live site

`https://kostiantynbryl.github.io/My-Resume/`

## Structure

- `/` — concise portfolio landing page
- `/work/` — NORVEXA Software, Games, Media and Labs
- `/experience/` — career timeline
- `/case-studies/` — focused product/engineering cases
- `/about/` — working style, capabilities and toolset
- `/now/` — active products and experiments
- `/contact/` — contact links, QR and vCard
- `/recruiter/`, `/engineering/`, `/product/` — audience-specific views
- `/work/<project>/` — project detail pages

## Languages

English, Polish, Russian and Ukrainian. The selected language is stored locally in the browser.

## CV PDFs

Recruiter/ATS-friendly CVs are generated from `cv/generate.py`:

- `assets/cv/Kostiantyn_Bryl_CV_EN.pdf`
- `assets/cv/Kostiantyn_Bryl_CV_PL.pdf`
- `assets/cv/Kostiantyn_Bryl_CV_RU.pdf`
- `assets/cv/Kostiantyn_Bryl_CV_UA.pdf`

The `Build CV PDFs` workflow refreshes these files when the generator changes.

## Quality gates

`Portfolio quality` validates required files, JavaScript syntax, internal links, generates all four CV PDFs and runs Lighthouse CI. Lighthouse thresholds are configured in `lighthouserc.cjs` at 0.95 for Performance, Accessibility, Best Practices and SEO.

## Stack

Static HTML/CSS/JavaScript, GitHub Pages, GitHub Actions and ReportLab for PDF generation. No frontend framework or runtime backend is required.

## Brand

NORVEXA × Kostiantyn Bryl — Creating Tomorrow.
