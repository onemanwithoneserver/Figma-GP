# Property Details Screen

The property page is composed in `src/01_app/App.tsx` and mounted by
`src/main.tsx`. Its content is constrained to a 390px-wide column.

## Page sections

Feature folders under `src/02_features/` follow the displayed page order:

1. `01_hero`: property image, details, and statistics.
2. `02_overview`: overview and highlights tabs.
3. `03_timeline`: project timeline and image viewer.
4. `04_layout`: layout gallery and tower selection.
5. `05_configurations`: unit table, filters, saved units, and floor-plan dialog.
6. `06_commute`: commute information and frequent places.
7. `07_amenities`: amenities tabs and seller questions.
8. `08_specifications`: specification tabs and seller questions.
9. `09_payments`: costs, payment schedule, offers, banks, and sellers.
10. `10_files`: project documents.
11. `11_summary`: project summary and questions.
12. `12_meetings`: visit tabs and slot booking.

Shared navigation and section wrappers live in `src/03_shared/01_components/`.
Shared Material UI buttons, dialogs, tabs, and icons live in `src/03_shared/02_ui/`.

## Styling and assets

Global styles are imported once through `src/04_styles/index.css`.
Outfit is loaded in `fonts.css` and configured in `theme.css`; components inherit
it without repeating font-family declarations. Tailwind scans source files through
`src/04_styles/tailwind.css` and is integrated using the Vite plugin.
`AppThemeProvider` uses the same CSS tokens for Material UI. Tailwind utilities
control component appearance, while Material UI supplies interaction behavior.

Local images and SVGs live in `src/05_assets/`; remote image URLs are defined in
the feature components. Keep layout, colors, and typography changes in the relevant
component or global theme rather than duplicating page implementations.

## Development

- Run `npm run dev` for the Vite development server.
- Run `npm run build` to generate the production site in `dist/`.
- Deployment instructions are in the root `README.md`.
