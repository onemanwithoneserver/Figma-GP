## Source structure

```text
src/
  01_app/                 App composition and Material UI theme provider
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
    02_ui/                Material UI buttons, dialogs, tabs, and icons
    03_utils/             Class-name helper
    04_motion/            Animation provider, reveals, transitions, and timings
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

## UI and styling

- Use `ActionButton` for Tailwind-styled Material UI buttons and `MotionButton`
  for animated buttons. The existing `Button` adds reusable visual variants.
- Use `AppDialog` or `ImageDialog` for modal content. They provide focus trapping,
  Escape/backdrop dismissal, and focus restoration through Material UI Dialog.
- Use `SectionTabs` for scrollable tab navigation with keyboard support. Give
  each instance a unique `idPrefix` and link its panel using `aria-labelledby`.
- Import Material UI icons from their individual `@mui/icons-material/...` paths.
  Custom property artwork remains in the feature components and asset folder.
- Use Tailwind for layout, spacing, typography, colors, borders, and shadows.
  Shared utilities include `text-ink`, `bg-surface`, `border-outline`,
  `bg-active-gradient`, `rounded-control`, and `shadow-footer`.

`src/04_styles/theme.css` owns shared design values. `AppThemeProvider` reads
those CSS values for the Material UI palette, font, and border radius.
`src/04_styles/index.css` defines shared effects and the cascade order:
`theme, base, mui, components, utilities`. This follows the
[Material UI Tailwind integration](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/)
so Tailwind utilities override Material UI defaults without `!important`.
Inline styles are reserved for values supplied by data, such as offer colors
and variable icon dimensions.

## Animation

Import animation APIs from `motion/react`. The project uses one direct Motion
dependency, following the [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide).
`framer-motion` is Motion's transitive implementation and should not be added separately.

`MotionProvider` centralizes defaults. Use `Reveal` for section entrances,
`TransitionPanel` for views that already mount on tab selection, and the shared
variants in `useMotionSettings` for staggered cards. Keep persistent form views
mounted so transitions do not clear user input. `MotionButton` handles hover
and press feedback without changing the settled layout.

System reduced-motion preferences disable entrances, movement, stagger delays,
and smooth scrolling. Shared CSS also minimizes utility-based animations and
transitions for this preference.

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
