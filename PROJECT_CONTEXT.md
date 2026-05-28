# Project Context: She Can Foundation — Official Website

## Overview

This is the official frontend website for **She Can Foundation**, a non-profit NGO dedicated to empowering women and girls through education, technology mentorship, and professional development. The project is a fully static, single-page website built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies beyond CDN-hosted libraries.

The website serves as the public face of the organisation: communicating the mission, showcasing programs, displaying impact metrics, accepting newsletter sign-ups, and facilitating donations through an interactive modal.

---

## Project Structure

```
she-can-foundation/
├── index.html          # Main HTML document — all page sections
├── styles.css          # Complete stylesheet with design system & theming
├── script.js           # All interactivity and DOM logic
└── images/
    └── hero.png        # Hero section image
```

### File Responsibilities

| File | Role |
|------|------|
| `index.html` | Semantic page structure, all sections, modal, footer |
| `styles.css` | CSS custom properties, light/dark themes, layout, animations |
| `script.js` | Theme toggling, scroll effects, counters, form validation, modal logic |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic page structure |
| CSS3 | Styling, CSS variables, Flexbox, Grid, animations |
| Vanilla JavaScript (ES6+) | All interactivity — no frameworks |
| Google Fonts | `Inter` (body) + `Outfit` (headings) |
| Font Awesome 6 | Icons throughout the UI |

> No npm, no bundler, no build step. Open `index.html` directly in a browser and it works.

---

## Page Sections

The single `index.html` file is divided into the following sections, each with a unique `id` for anchor navigation:

| Section ID | Description |
|------------|-------------|
| `#hero` | Full-screen landing with headline, CTA buttons, floating stat cards |
| `#about` | Mission, Vision, Values cards + organisation story and feature highlights |
| `#programs` | Three program cards: She Codes Bootcamp, Sisters in Leadership, She Starts Incubator |
| `#impact` | Animated counter stats: 10,000+ students, 85% placement, 500+ mentors, 25+ countries |
| `#testimonials` | Testimonial cards from alumni |
| `#contact` | Newsletter subscription form with validation + contact details |
| Footer | Brand info, quick links, resources, social icons, legal |

---

## Features & JavaScript Modules

All JavaScript lives in `script.js` and is organised into clearly commented modules inside a single `DOMContentLoaded` listener:

### 1. Light / Dark Theme Toggle
- Reads `localStorage` for a saved preference on page load
- Falls back to `prefers-color-scheme` system setting
- Toggles `data-theme` attribute on `<html>` between `"light"` and `"dark"`
- Updates the toggle button icon (moon ↔ sun) accordingly
- Persists preference to `localStorage`

### 2. Sticky Header & Scroll-to-Top Button
- Header gains a `.scrolled` class after 50px of scroll (triggers shadow/backdrop effect)
- Scroll-to-top button becomes visible after 500px of scroll
- Smooth scroll to top on button click

### 3. Mobile Navigation Drawer
- Hamburger button toggles `.active` on both the toggle button and `#nav-menu`
- Menu auto-closes when any nav link is clicked
- Active link state is tracked and updated on click

### 4. Scroll Reveal Animations
- Uses `IntersectionObserver` on all `.scroll-reveal` elements
- Adds `.revealed` class when element enters the viewport (threshold: 10%)
- Each element is unobserved after first animation to avoid re-triggering

### 5. Animated Impact Counters
- `IntersectionObserver` watches the `.impact-stats-grid` section
- On intersection, triggers a `countUp()` for each `.stat-number` element
- Reads target value from `data-target` attribute
- Uses ease-out quadratic easing over 2000ms at 60fps
- Counters only animate once (guarded by `countersAnimated` flag)

### 6. Newsletter Form Validation
- Validates that both name and email fields are non-empty
- Shows a loading spinner state on the submit button during mock API delay (1.2s)
- Displays personalised success message using the subscriber's first name
- Resets all fields after success
- Clears the success/error message automatically after 5 seconds

### 7. Donation Modal
- Triggered by: nav "Donate Now" button, hero "Explore Programs" button, impact section CTA, and "Learn More" links on program cards
- Preset donation amounts: $25, $50 (default), $100, Custom
- Custom amount input shown/hidden conditionally
- Validates donor name and email before processing
- Shows processing spinner (1.5s mock delay) then success confirmation message
- Auto-closes modal 4 seconds after successful donation
- Closes on: close button click, backdrop click, `Escape` key
- `document.body.overflow` toggled to prevent background scroll while modal is open
- Full state reset (`resetModalState`) called on every close

---

## Design System

Defined entirely through CSS custom properties in `styles.css`. Two complete theme sets:

### Light Theme (`data-theme="light"`)
- Primary: Warm Coral `#ff6f61`
- Secondary: Warm Gold `#d4af37`
- Background: Soft blush white `#fffaf9`
- Text: Charcoal/Eggplant `#1e1926`
- Accent gradient: Coral → Gold

### Dark Theme (`data-theme="dark"`)
- Primary: High-contrast Coral `#ff8b7f`
- Secondary: Warm Gold `#e5c158`
- Background: Deep space violet `#0a0712`
- Text: Pale violet-white `#f3efff`
- Glass effect: semi-transparent dark panels

### Key CSS Patterns Used
- CSS Custom Properties for all colours and shadows
- `glass-panel` utility class for frosted-glass effect sections
- `scroll-reveal` + `revealed` classes for entrance animations
- `animate-hover` for card lift effects
- CSS Grid and Flexbox for all layouts
- SVG wave divider between hero and about sections

---

## How to Run

No setup required.

```bash
# Option 1 — just open the file
open index.html

# Option 2 — serve locally with Python
python3 -m http.server 8000
# then visit http://localhost:8000

# Option 3 — serve with VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## Deployment

This is a fully static site with zero build steps. It can be deployed to any static hosting platform instantly:

| Platform | How |
|----------|-----|
| **Netlify** | Drag and drop the project folder onto netlify.com/drop |
| **Vercel** | `vercel --prod` or connect GitHub repo, set root directory |
| **GitHub Pages** | Push to repo → Settings → Pages → Deploy from `main` branch |
| **Render** | New Static Site → connect repo → publish directory: `/` |

---

## External Dependencies (CDN only)

| Library | Version | Purpose |
|---------|---------|---------|
| Google Fonts | — | Inter + Outfit typefaces |
| Font Awesome | 6.4.0 | UI icons |

No npm packages. No `package.json`. No `node_modules`.

---

## Known Limitations / Demo Notes

- The donation flow is **fully simulated** — no real payment gateway is connected
- The newsletter form uses a **mock API delay** — no backend or email service is integrated
- The "Read Annual Report" button shows a browser `alert()` as a demo placeholder
- `images/hero.png` must be present locally — the hero image is not fetched from a CDN
- Social media links (`#`) are placeholder anchors

---

## Potential Enhancements

- Integrate a real payment gateway (Stripe, Razorpay) for donations
- Connect newsletter form to Mailchimp or a backend API
- Add a CMS (e.g. Contentful, Sanity) for program and testimonial content management
- Implement a testimonials carousel/slider with JS
- Add Google Analytics or Plausible for visitor tracking
- Internationalisation (i18n) support for multiple languages

---

## Author

Built as a Frontend Development Internship Task for **She Can Foundation**.  
Stack: HTML · CSS · Vanilla JavaScript  
© 2026 She Can Foundation. All rights reserved.
