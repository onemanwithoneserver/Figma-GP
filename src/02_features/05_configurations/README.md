# Configurations & Unit Variants

This section lets users filter available units, save units, and open floor-plan
details. Its entry point is `configuration.tsx`.

## Files

- `configuration.tsx` maps tower display names, manages saved and selected units,
  and renders the table, seller questions, and selected unit dialog.
- `ConfigurationTable.tsx` contains the unit table and its filter controls. It
  receives `data`, `savedItems`, `onToggleSave`, and `onViewUnit`.
- `tower.tsx` renders floor-plan details, room specifications, and feedback. It
  receives `unitData` and `onClose`, with fallback data from `data.tsx`.
- `SellerQueries.tsx` renders the seller question buttons.
- `data.tsx` contains mock units, default unit data, and feedback options.
- `types.tsx` defines the shared unit and feedback types.

## Data flow

`configuration.tsx` passes the display data and callbacks to `ConfigurationTable`.
Selecting a unit opens `Tower` in a modal; closing the modal clears the selected
unit. Saving a table row updates the saved-unit set held by `configuration.tsx`.
