# Property Details Screen - Documentation

## Overview
A modern, premium real estate mobile app property details screen designed for iPhone (390 × 844). Features a scroll-based progressive reveal animation system and comprehensive property information display.

## Features

### 1. Hero Section
- **Full-width property image** (280px height)
- **Dark gradient overlay** for text readability
- **Navigation controls**: Back, Bookmark, Share
- **Property info overlay**: Title, location, price
- **Floating builder card**: Logo, verification badge, ratings, contact CTA
- **Stats pills**: Horizontal scrollable statistics with icons
- **Scroll CTA**: Animated prompt to explore more

### 2. Content Sections
All sections use a consistent card-based design with scroll animations:

- **Overview & Highlights**: Tabbed interface with image gallery
- **Project Timeline**: Timeline visualization placeholder
- **Layout & Towers**: Image gallery grid
- **Configurations & Unit Variants**: Unit type cards
- **Distance / Commute To**: Map and location info
- **Amenities**: Icon grid for facilities
- **Specifications**: List of property specs
- **Payment Plans & Offers**: Highlighted offer cards
- **Project Files**: Downloadable documents
- **Exit Summary**: Summary content box
- **Project Meet**: Calendar and contact area

## Design System

### Colors
- **Primary**: `#2563EB` (Blue)
- **Accent**: `#F97316` (Orange)
- **Background**: `#F8FAFC` (Light Grey)
- **Cards**: `#FFFFFF` (White)

### Typography
- Title: 22px bold
- Section Headings: 18px bold
- Body: 13-15px
- Font: Sans-serif (inherits from project)

### Spacing
- Section gap: 20px (mb-5)
- Container padding: 16px (px-4)
- Card padding: 16px (p-4)
- Border radius: 14px (rounded-[14px])

### Animations

#### Scroll Animations
Each section animates into view on scroll:
- Initial state: `opacity: 0, translateY: 20px`
- Final state: `opacity: 1, translateY: 0`
- Duration: 300ms
- Easing: ease-out

#### Hero Animations
- Image fade-in (600ms)
- Builder card slide-up (500ms)
- Stats stagger animation (100ms delay increments)
- CTA arrow bounce (infinite)

## Component Structure

```
PropertyDetails
├── Hero Section
│   ├── Banner Image with Gradient
│   ├── Top Navigation
│   ├── Property Info Overlay
│   ├── Floating Builder Card
│   ├── Stats Pills
│   └── Scroll CTA
└── Content Sections (12 sections)
    └── ContentSection (reusable component)
```

## Usage

```tsx
import PropertyDetails from './components/sections/PropertyDetails';

function App() {
  return <PropertyDetails />;
}
```

## Customization

### Updating Property Data
Replace the hardcoded values in the component:
- Property title: Line 61
- Location: Line 63
- Price: Line 66
- Builder name: Line 83
- Builder reviews: Line 93
- Stats data: Lines 106-108

### Adding Images
Replace the Unsplash placeholder URL on line 35 with your property images.

### Modifying Sections
Each content section is defined using the `ContentSection` component. To add/remove sections, modify the render method starting at line 119.

## Technical Details

### Dependencies
- React 18+
- Lucide React (icons)
- Tailwind CSS

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-optimized for iOS Safari
- Responsive to 390px width

### Performance Optimizations
- Intersection Observer for scroll animations
- Single observer instance for all sections
- Cleanup on component unmount
- CSS transforms for smooth animations

## Accessibility
- ARIA labels on all interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## Developer Notes
- Component is production-ready
- All layers clearly named
- Auto-layout throughout
- Dynamic data areas marked with comments
- Responsive behavior ensured with max-width constraint
