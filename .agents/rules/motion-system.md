# LaunchPad Motion System & Animation Guidelines

This specification defines the temporal and kinematic rules for animations across LaunchPad. All motion must feel frictionless, celestial, and technologically refined.

---

## 1. Keyframe Definitions

### 1. `lp-float`
- **Purpose**: Gentle anti-gravity elevation for floating badges, UI preview cards, and hero elements.
- **Timing**: `6s ease-in-out infinite`
- **Keyframe Behavior**:
  ```css
  @keyframes lp-float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  ```

### 2. `lp-flicker`
- **Purpose**: High-frequency starlight shimmer and telemetry sensor indicators.
- **Timing**: `3s ease-in-out infinite`
- **Keyframe Behavior**:
  ```css
  @keyframes lp-flicker {
    0%, 100% {
      opacity: 1;
      filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.5));
    }
    50% {
      opacity: 0.35;
      filter: drop-shadow(0 0 0px transparent);
    }
  }
  ```

### 3. `lp-twinkle`
- **Purpose**: Subtle ambient cosmic background stars and distant orbital nodes.
- **Timing**: `4s ease-in-out infinite`
- **Keyframe Behavior**:
  ```css
  @keyframes lp-twinkle {
    0%, 100% {
      opacity: 0.9;
      transform: scale(1);
    }
    50% {
      opacity: 0.25;
      transform: scale(0.65);
    }
  }
  ```

### 4. `lp-drift`
- **Purpose**: Slow planetary or celestial cloud drift along an organic trajectory.
- **Timing**: `14s ease-in-out infinite`
- **Keyframe Behavior**:
  ```css
  @keyframes lp-drift {
    0% {
      transform: translate(0px, 0px) rotate(0deg);
    }
    33% {
      transform: translate(10px, -6px) rotate(1deg);
    }
    66% {
      transform: translate(-6px, 8px) rotate(-1deg);
    }
    100% {
      transform: translate(0px, 0px) rotate(0deg);
    }
  }
  ```

### 5. `lp-pulse`
- **Purpose**: Live server status pings, radar sweeps, and active conversion beacon rings.
- **Timing**: `3s cubic-bezier(0.4, 0, 0.6, 1) infinite`
- **Keyframe Behavior**:
  ```css
  @keyframes lp-pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.92;
    }
    50% {
      transform: scale(1.04);
      opacity: 1;
    }
  }
  ```

### 6. `lp-traj`
- **Purpose**: SVG path stroke animation simulating rocket trajectory and network routing flow.
- **Timing**: `10s linear infinite`
- **Keyframe Behavior**:
  ```css
  @keyframes lp-traj {
    0% {
      stroke-dashoffset: 800;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  ```

### 7. `lp-glow`
- **Purpose**: Breathing cosmic aura around primary call-to-actions and spotlight cards.
- **Timing**: `4s ease-in-out infinite`
- **Keyframe Behavior**:
  ```css
  @keyframes lp-glow {
    0%, 100% {
      box-shadow: 0 0 16px -2px rgba(109, 40, 217, 0.35), 0 0 8px -2px rgba(34, 211, 238, 0.25);
    }
    50% {
      box-shadow: 0 0 28px 4px rgba(109, 40, 217, 0.55), 0 0 16px 2px rgba(34, 211, 238, 0.45);
    }
  }
  ```

---

## 2. Framer Motion Integration

When using `framer-motion`, adhere to these spring and easing conventions:
- **Default Entrance**: `transition: { type: "spring", stiffness: 260, damping: 25 }`
- **Hover Micro-interaction**: `whileHover={{ y: -3, scale: 1.01 }}`
- **Tap Feedback**: `whileTap={{ scale: 0.98 }}`
- **Viewport Triggers**: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}`

---

## 3. Accessibility & `prefers-reduced-motion`

All agents must respect the user's motion preferences.
When `@media (prefers-reduced-motion: reduce)` is triggered:
- Keyframe animations collapse duration to instant (`0.01ms`) or cease looping.
- Essential transitions fall back to instant or opacity-only transitions (`opacity 0.15s ease`).
- High-frequency flickers and orbital path animations must be paused.
