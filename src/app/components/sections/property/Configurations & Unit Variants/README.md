# Configurations & Unit Variants — Section Guide

This folder holds everything for the **Configurations** section of the property page — the part where users browse available unit types, filter them, and view floor plan details.

---

## Files Overview

### `types.tsx`
Holds all the **TypeScript interfaces** (data shapes) shared across this section. Nothing renders here — it's just type definitions.

- `UnitItem` — shape of a single unit row (BUA, facing, availability, tower, type, price, etc.)
- `UnitSpec` — shape of a spec row inside the floor plan detail (e.g. `Living: 16' x 12'`)
- `FeedbackOption` — shape of each feedback button (emoji, label, value)

---

### `data.tsx`
Holds all the **mock data and constants**. Nothing renders here either — just exports data.

- `mockData` — the list of all units shown in the table (6 sample entries)
- `defaultUnitData` — the fallback unit used when opening the floor plan detail without a specific unit selected
- `FEEDBACK_OPTIONS` — the four emoji feedback buttons (Love it, Like it, It's okay, Not for me)

---

### `configuration.tsx`
The **main/root component** for this section. This is the entry point.

**What it does:**
- Holds all the state: active BHK tab, selected tower, saved items, selected unit
- Calculates filtered data using `useMemo`
- Handles tower change logic (auto-switches to a valid BHK tab if the current one doesn't exist in the new tower)
- Renders the header (`Configurations` title + `TowerDropdown`), the `BHKTabNav`, and either `ConfigurationTable` or `Tower` depending on whether a unit is selected

---

### `TowerDropdown.tsx`
The **animated tower filter dropdown** shown in the top-right of the section header.

**What it does:**
- Shows the currently selected tower (e.g. "All Towers", "Tower A")
- Opens an animated dropdown list on click (uses `framer-motion`)
- Closes when clicking outside
- Calls `onSelect(tower)` when a tower is picked

**Props:**
| Prop | Type | Description |
|---|---|---|
| `towers` | `string[]` | List of tower options |
| `selected` | `string` | Currently selected tower |
| `onSelect` | `(tower: string) => void` | Called when a tower is selected |

---

### `BHKTabNav.tsx`
The **BHK type tab switcher** (2 BHK / 3 BHK / 4 BHK).

**What it does:**
- Renders a pill-style tab bar
- Highlights the active tab in dark
- Calls `onTabChange(tab)` when a tab is clicked

**Props:**
| Prop | Type | Description |
|---|---|---|
| `tabs` | `string[]` | Available BHK options for the current tower |
| `activeTab` | `string` | Currently selected tab |
| `onTabChange` | `(tab: string) => void` | Called when a tab is clicked |

---

### `ConfigurationTable.tsx`
The **unit listing table** — the main content of the section when no unit detail is open.

**What it does:**
- Shows filter pills above the table (BUA, Facing, Status) — each opens a dropdown
- Filters the table rows based on active pills
- Shows a "Clear all" link when any filter is active
- Shows a proper empty state when no rows match the filters
- Each row has: BUA, Facing, Availability badge, Save star, View Plan button

**Props:**
| Prop | Type | Description |
|---|---|---|
| `data` | `UnitItem[]` | The pre-filtered units to display (filtered by tower + BHK tab) |
| `savedItems` | `Set<string>` | Set of unit IDs the user has saved |
| `onToggleSave` | `(id: string) => void` | Called when save star is clicked |
| `onViewUnit` | `(item: UnitItem) => void` | Called when View Plan button is clicked |

---

### `tower.tsx`
The **floor plan detail panel** shown when a user clicks "View Plan" on a unit row.

**What it does:**
- Shows a summary bar (BUA, facing, availability) with a close button
- Shows the floor plan image
- Shows the Cost + price grouped row
- Shows the room specifications table (living, dining, kitchen, etc.)
- Shows the feedback buttons (Love it / Like it / It's okay / Not for me)
- Shows seller questions via `SellerQueries`
- Has a bottom action bar: Save Plan + Ask availability buttons

**Props:**
| Prop | Type | Description |
|---|---|---|
| `onClose` | `() => void` | Called when the X button is clicked |
| `unitData` | `UnitItem` (optional) | The unit to display; falls back to `defaultUnitData` if not provided |

---

### `SellerQueries.tsx`
A small component for the **question action buttons** at the bottom of the floor plan detail.

**What it does:**
- Renders a list of tappable question rows
- Questions are stored in a `SELLER_QUESTIONS` array — easy to add more
- Each row has a chevron arrow on the right

No props — self-contained.

---

## Data Flow

```
configuration.tsx  (state + filtering)
├── TowerDropdown    → user picks a tower → updates selectedTower state
├── BHKTabNav        → user picks 2/3/4 BHK → updates activeTab state
├── ConfigurationTable  → displays filtered units
│   └── FilterPill   → user refines by BUA / Facing / Status
└── tower.tsx        → shown when user clicks "View Plan"
    └── SellerQueries
```
