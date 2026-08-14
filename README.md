# Kostiantyn Bryl — NORVEXA Portfolio

A multilingual personal portfolio and recruiter-focused resume site published with GitHub Pages.

## Live site

`https://kostiantynbryl.github.io/My-Resume/`

## Structure

- `/` — concise portfolio landing page
- `/ecosystem/` — NORVEXA Software, Games, Media and Labs
- `/work/` — selected products and project timeline
- `/experience/` — career timeline
- `/case-studies/` — focused product/engineering cases
- `/about/` — working style, capabilities and toolset
- `/now/` — active products and experiments
- `/contact/` — Telegram, email, LinkedIn, GitHub, QR and vCard
- `/recruiter/`, `/engineering/`, `/product/` — audience-specific views with tailored project ordering and CVs
- `/work/<project>/` — deeper project pages with architecture, decisions, evidence and galleries
- `/system/` — hidden NORVEXA console unlocked by the logo easter egg

## Languages

English, Polish, Russian and Ukrainian. The selected language is stored locally in the browser and can also be selected with `?lang=en|pl|ru|uk`.

## CV PDFs

General recruiter/ATS-friendly PDFs are generated from `cv/generate.py`. Role-specific variants are generated from `cv/generate_roles.py` for Recruiter, Engineering and Product views in all four languages.

## Build-time snapshot

`Refresh portfolio snapshot` periodically collects public GitHub metadata, self-hosts the GitHub profile image and the available CutFlow screenshot, generates page-specific 1200×630 social cards, structured metadata and build information. Visitors read the local snapshot instead of calling the GitHub API directly.

## Quality gates

`Portfolio quality` validates required files, JavaScript/Python syntax, internal links, generates all general and role-specific PDFs and runs Lighthouse CI. Lighthouse thresholds are configured in `lighthouserc.cjs` at 0.95 for Performance, Accessibility, Best Practices and SEO.

## Contact

- Telegram: `https://t.me/kostiantynbryl`
- GitHub: `https://github.com/kostiantynbryl`
- LinkedIn: `https://www.linkedin.com/in/kostiantyn-bryl97/`
- Email: `kostiantynbryl@gmail.com`

## Stack

Static HTML/CSS/JavaScript, GitHub Pages, GitHub Actions, Pillow and ReportLab. No frontend framework or runtime backend is required.

## Brand

NORVEXA × Kostiantyn Bryl — Creating Tomorrow.
