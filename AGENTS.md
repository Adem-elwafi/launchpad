# LaunchPad Multi-Agent Hierarchy & Roles Specification

This document defines the roles, interfaces, constraints, and contracts for all specialist agents collaborating on the LaunchPad project.

---

## 1. Hierarchy Overview

```
                  ┌────────────────────────────────────────┐
                  │    System & Rules Architect (L1)       │
                  │   Foundation, Tokens & Agent Contracts │
                  └───────────────────┬────────────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         │                            │                            │
┌────────┴─────────────┐   ┌──────────┴─────────────┐   ┌──────────┴─────────────┐
│ Hero & Celestial     │   │ Features & Showcase    │   │ Conversion, Pricing    │
│ Specialist (L2-A)    │   │ Specialist (L2-B)      │   │ & Social Proof (L2-C)  │
└────────┬─────────────┘   └──────────┬─────────────┘   └──────────┬─────────────┘
         │                            │                            │
         └────────────────────────────┼────────────────────────────┘
                                      │
                  ┌───────────────────┴────────────────────┐
                  │  Quality Assurance, Polish &           │
                  │  Verification Specialist (L3)          │
                  └────────────────────────────────────────┘
```

---

## 2. Specialist Roles & Responsibilities

### Level 1: System & Rules Architect (Completed)
- **Status**: Active & Initialized.
- **Scope**: Project scaffolding (Vite + React + Tailwind v4), motion system keyframes, typography bindings, `.agents/` rules, and agent communication protocol.
- **Deliverables**:
  - `vite.config.js` with `@tailwindcss/vite`
  - `src/index.css` with `@theme` tokens and keyframe utilities
  - `.agents/rules/design-rules.md`
  - `.agents/rules/motion-system.md`
  - `AGENTS.md`

### Level 2-A: Hero & Celestial Section Specialist
- **Mission**: Craft the above-the-fold experience.
- **Components to Own**:
  - `src/components/Navbar.jsx`: Floating sticky frosted glass navigation bar with brand mark, link anchors, and CTA button.
  - `src/components/Hero.jsx`: High-impact headline, sub-headline, dual CTAs with `lp-glow`, interactive social proof pill (`#10B981` status pulse).
  - `src/components/CelestialBackground.jsx`: Handcrafted cosmic starfield (`lp-twinkle`, `lp-flicker`), dynamic orbital trajectory paths (`lp-traj`), and multi-layer radial gradient mesh.
  - `src/components/WaveDivider.jsx`: Handcrafted asymmetric SVG fluid wave bridging `#0F0C20` into `#FAFAFC`.
- **Contracts & Constraints**:
  - Zero generic 3D shapes.
  - Handcrafted SVG trajectory paths and bespoke rocket/satellite motifs.
  - Full responsiveness down to 320px screen width.

### Level 2-B: Features & Showcase Specialist
- **Mission**: Build the core capability and technical validation sections on the light `#FAFAFC` canvas.
- **Components to Own**:
  - `src/components/Features.jsx`: 6-card modular capability grid with bespoke SVG diagrams and subtle hover transforms.
  - `src/components/TerminalShowcase.jsx`: Interactive terminal/code switcher demonstrating CLI deployment in JetBrains Mono with syntax color highlights.
  - `src/components/TelemetryMetrics.jsx`: Real-time benchmark indicators, uptime metrics, and animated stat counters.
- **Contracts & Constraints**:
  - Must use Plus Jakarta Sans for titles/body and JetBrains Mono for telemetry/code.
  - Strict zero-clip-art enforcement.

### Level 2-C: Conversion, Pricing & Social Proof Specialist
- **Mission**: Build the conversion engines, social proof, and closing architecture.
- **Components to Own**:
  - `src/components/SocialProof.jsx`: Enterprise tech stack badges, high-credibility testimonial cards, and metric benchmarks.
  - `src/components/Pricing.jsx`: Monthly/Annual billing toggle, tiered comparison cards with recommended tier highlighting (`#6D28D9` border & glow).
  - `src/components/FAQ.jsx`: Accessible animated accordion for pre-sales objections.
  - `src/components/FinalCTA.jsx`: High-converting closing banner with ambient celestial glow.
  - `src/components/Footer.jsx`: Clean technical footer with status indicator, links, and copyright.
- **Contracts & Constraints**:
  - Clear visual hierarchy with distinct CTA states and accessible contrast ratios.

### Level 3: QA, Polish & Verification Specialist
- **Mission**: End-to-end integration, performance optimization, and quality gates.
- **Verification Criteria**:
  - Full build pass (`npm run build`) without warnings or errors.
  - `prefers-reduced-motion` compliance across all animated components.
  - Zero hydration or console errors.
  - Cross-device layout stability across mobile, tablet, and desktop viewports.

---

## 3. Communication Protocol

- **Shared State**: All components reside under `src/components/`. Shared utility helpers should be placed in `src/lib/utils.js` (e.g. `cn` function combining `clsx` and `tailwind-merge`).
- **Styles**: Always use utility classes declared in `src/index.css` and Tailwind v4 core tokens.
- **Handoff Verification**: Every agent must verify code modifications via quick dry run or syntax validation before marking tasks complete.
