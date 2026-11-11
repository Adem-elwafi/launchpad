# LaunchPad Design System & Rules

This document outlines the strict visual, architectural, and aesthetic rules governing all user interface elements across the LaunchPad landing platform. All builder agents must strictly adhere to these standards.

---

## 1. Core Philosophy & Aesthetic Principles

### Handcrafted SVG Over Generic 3D Renders
- **Bespoke Vector Artistry**: Avoid generic 3D rendered claymorphic shapes, AI-generated amorphous blobs, and low-fidelity illustration assets.
- **Precision Engineering Aesthetic**: Use handcrafted, crisp SVG vectors, coordinate grids, orbital trajectories, geometric crosshairs, and glowing telemetry paths.
- **Technical Cohesion**: Diagrams and illustrations must appear purpose-built for high-performance software engineering and infrastructure.

### Strict Zero-Clip-Art Rule
- **No Stock Icons or Generic Clip Art**: Never introduce standard canned illustrations, generic cartoon characters, or unstyled stock icons.
- **Lucide + Hand-Crafted SVGs**: Use `lucide-react` with precise stroke-widths (1.5px to 2px) or custom-authored SVG paths styled with matching gradient strokes and drop-shadow filters.

### Asymmetric Fluid Wave Divider
- **Section Transition**: The seam between the dark celestial hero/header zone and the crisp light canvas section MUST be an asymmetric fluid wave SVG path.
- **Dynamic Organic Flow**: Avoid symmetric sinusoidal waves. The transition curve must feel natural, high-tech, and sweeping (e.g. cubic bezier curves with varying crests).
- **Seamless Blending**: The wave must cleanly bridge `#0F0C20` / `#1E124A` into `#FAFAFC` with zero visual banding or white gaps.

---

## 2. Color Palette & Token System

| Token Name | Hex Code | Purpose / Application |
| :--- | :--- | :--- |
| **Canvas** | `#FAFAFC` | Primary light background for body, features, and content sections |
| **Celestial Dark** | `#0F0C20` | Base deep celestial space background for hero, command center |
| **Celestial Mid** | `#1E124A` | Mid-tone celestial gradient stop |
| **Celestial Violet** | `#3B1E78` | Highlight celestial gradient stop and ambient glow centers |
| **Violet Primary** | `#6D28D9` | Brand primary color, prominent CTAs, active highlights |
| **Cyan Glow** | `#22D3EE` | Secondary glow, telemetry lines, star flickers, accents |
| **Emerald Accent** | `#10B981` | Success states, uptime indicators, metrics, conversion pills |

### Celestial Gradient Definition
```css
background: linear-gradient(135deg, #0F0C20 0%, #1E124A 50%, #3B1E78 100%);
```

---

## 3. Typography & Hierarchy

### Font Families
- **Primary Headings & Body**: `Plus Jakarta Sans`
  - Weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold)
  - Letter spacing: `-0.02em` to `-0.03em` on headings for tight, authoritative modern punch.
- **Code, Metrics & Telemetry**: `JetBrains Mono`
  - Weights: `400`, `500`, `700`
  - Used for code blocks, terminal mockups, benchmark counters, badge tags, and numeric stats.

---

## 4. Component & Layout Conventions

### Container & Grid System
- Maximum width: `max-w-7xl` (`1280px`) for wide sections, `max-w-5xl` for focused narrative sections.
- Spacing rhythm: Tailwind multiples of 4 (e.g. `gap-6`, `py-20`, `py-28`).

### Glassmorphism & Elevation
- Dark Surface Glass: `bg-[#0F0C20]/75 backdrop-blur-md border border-[#6D28D9]/25`
- Light Surface Glass: `bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-sm`
- Depth: Layered ambient shadows combining violet primary glow with soft ambient drop shadows.
