## Source structure

```text
src/
  01_app/                 App composition
  02_features/            Property sections, numbered in page order
    01_hero/
    02_overview/
    03_timeline/
    04_layout/
    05_configurations/
    06_commute/
    07_amenities/
    08_specifications/
    09_payments/
    10_files/
    11_summary/
    12_meetings/
  03_shared/
    01_components/        Shared page components
    02_ui/                Button and back-to-top icon
    03_utils/             Class-name helper
  04_styles/              Global CSS, font loading, and theme
  05_assets/
    01_popup_images/
  main.tsx                Application entry point
  vite-env.d.ts           Vite and SVG import types
```

Outfit is loaded once in `src/04_styles/fonts.css`. Its font family is defined
once as `--font-sans` in `src/04_styles/theme.css` and applied to `html`, so
components, form controls, and portals inherit it. Component classes should only
set font size, weight, or other typography properties, without repeating Outfit.
The `@/` import alias continues to resolve to `src/`.

## Deploy to GitHub Pages

This project is configured for GitHub Pages with repository name `Figma-GP`.

1. Push your code to GitHub (branch: `main`).
2. Install dependencies:
	- `npm install`
3. Deploy:
	- `npm run deploy`
4. In GitHub repo settings:
	- Go to **Settings → Pages**
	- In **Build and deployment**, set **Source** to **Deploy from a branch**
	- Choose branch **gh-pages** and folder **/(root)**

Your site URL will be:

- `https://onemanwithoneserver.github.io/`
