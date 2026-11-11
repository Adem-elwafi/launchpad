import React, { useSyncExternalStore } from 'react';
import { motion, useTransform, useReducedMotion, useMotionValue } from 'framer-motion';

function subscribeDesktop(callback) {
  const media = window.matchMedia('(min-width: 768px)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 768px)').matches;
}

function getDesktopServerSnapshot() {
  return false;
}

/**
 * WaveDivider component
 * Exact 1:1 implementation matching Claude Design reference prototype with
 * Signature Move 2 Fluid S-Curve Wave Dynamics:
 * - Desktop: .lp-wave-side (left: -159px; width: 175px; height: 100%)
 * - Mobile: .lp-wave-bottom (bottom: -1px; width: 100%; height: 72px)
 * - Retains responsive breakpoint utilities (hidden lg:block / lg:hidden)
 * - S-curve wave unrolls and shifts organically as user scrolls into features canvas
 * - Clouds billow into the wave divider and organically terminate against the S-curve boundary (no vertical cut!)
 * - Full reduced-motion fallback to static path curves
 */
export default function WaveDivider({ variant = 'side', className = '', scrollProgress }) {
  const fallback = useMotionValue(0);
  const progress = scrollProgress || fallback;
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  );

  const isScrollyActive = Boolean(scrollProgress) && !shouldReduceMotion && (variant === 'bottom' || isDesktop);

  // Desktop S-curve wave morph paths (scroll 0 to 0.85)
  // Right side extended to 175 to guarantee 16px seamless overlap into .lp-right with zero seam
  const sideFillStart = 'M 175 0 L 64 0 C 120 150 132 300 104 430 C 74 570 4 650 18 780 C 28 880 70 940 92 1000 L 175 1000 Z';
  const sideFillEnd = 'M 175 0 L 48 0 C 112 165 146 310 94 440 C 66 580 -6 660 12 790 C 24 888 78 945 110 1000 L 175 1000 Z';

  const sideEdgeStart = 'M 64 0 C 120 150 132 300 104 430 C 74 570 4 650 18 780 C 28 880 70 940 92 1000';
  const sideEdgeEnd = 'M 48 0 C 112 165 146 310 94 440 C 66 580 -6 660 12 790 C 24 888 78 945 110 1000';

  const sideFillD = useTransform(progress, [0, 0.85], [sideFillStart, sideFillEnd]);
  const sideEdgeD = useTransform(progress, [0, 0.85], [sideEdgeStart, sideEdgeEnd]);

  // Mobile bottom wave morph paths
  const bottomStart = 'M 0 34 C 70 74 150 4 240 30 C 310 50 360 18 400 32 L 400 72 L 0 72 Z';
  const bottomEnd = 'M 0 28 C 65 68 158 10 248 38 C 318 44 355 24 400 28 L 400 72 L 0 72 Z';

  const bottomD = useTransform(progress, [0, 0.85], [bottomStart, bottomEnd]);
  const bottomWaveY = useTransform(progress, [0, 0.85], [0, 4]);

  if (variant === 'tablet') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 834 90"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-1px',
          width: '100%',
          height: '90px',
          display: 'block',
          zIndex: 2,
        }}
        className={className}
      >
        <path
          d="M0,40 C140,96 300,6 470,34 C620,58 720,20 834,44 L834,90 L0,90 Z"
          fill="#FAFAFC"
        />
        <path
          d="M0,40 C140,96 300,6 470,34 C620,58 720,20 834,44"
          fill="none"
          stroke="#A78BFA"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (variant === 'mobile') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 390 70"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          bottom: '-1px',
          width: '100%',
          height: '70px',
          display: 'block',
          zIndex: 2,
        }}
        className={className}
      >
        <path
          d="M0,30 C70,70 140,4 220,28 C290,48 340,18 390,32 L390,70 L0,70 Z"
          fill="#FAFAFC"
        />
        <path
          d="M0,30 C70,70 140,4 220,28 C290,48 340,18 390,32"
          fill="none"
          stroke="#A78BFA"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </svg>
    );
  }

  if (variant === 'bottom') {
    return (
      <motion.svg
        className={`lp-wave-bottom lg:hidden md:hidden ${className}`}
        aria-hidden="true"
        viewBox="0 0 400 72"
        preserveAspectRatio="none"
        style={isScrollyActive ? { y: bottomWaveY } : undefined}
      >
        <motion.path
          d={isScrollyActive ? bottomD : bottomStart}
          fill="#FAFAFC"
        />
      </motion.svg>
    );
  }

  return (
    <svg
      className={`lp-wave-side hidden lg:block md:block ${className}`}
      aria-hidden="true"
      viewBox="0 0 175 1000"
      preserveAspectRatio="none"
      style={{ width: '175px', left: '-159px', pointerEvents: 'none' }}
    >
      <defs>
        <linearGradient id="lpWaveFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F0C20" />
          <stop offset="0.52" stopColor="#1E124A" />
          <stop offset="1" stopColor="#3B1E78" />
        </linearGradient>
        <linearGradient id="lpWaveEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A78BFA" stopOpacity="0" />
          <stop offset="0.45" stopColor="#A78BFA" stopOpacity="0.55" />
          <stop offset="1" stopColor="#C4B5FD" stopOpacity="0.2" />
        </linearGradient>

        {/* ClipPath following the exact organic S-curve wave boundary */}
        <clipPath id="lpWaveCloudClip">
          <motion.path d={isScrollyActive ? sideFillD : sideFillStart} />
        </clipPath>
      </defs>

      {/* Base Wave Background */}
      <motion.path
        d={isScrollyActive ? sideFillD : sideFillStart}
        fill="url(#lpWaveFill)"
      />

      {/* 
        CLOUDS INTEGRATED INSIDE THE WAVE DIVIDER:
        Clipped by lpWaveCloudClip so clouds organically terminate against the S-curve boundary,
        eliminating the straight vertical cut-off bug and stopping naturally with the curvy last point!
      */}
      <g clipPath="url(#lpWaveCloudClip)">
        {/* Layer 1: Soft deep shadow clouds (aligned with RocketArt cy=760 * 1.111 = 844) */}
        <g className="lp-drift-b">
          <g fill="#C4B5FD" opacity="0.5">
            <circle cx="175" cy="844" r="95" />
            <circle cx="115" cy="830" r="85" />
            <circle cx="55" cy="820" r="70" />
            <circle cx="20" cy="800" r="50" />
          </g>
        </g>

        {/* Layer 2: Mid-tone billowing clouds (aligned with RocketArt cy=830 * 1.111 = 922) */}
        <g className="lp-drift">
          <g fill="#DDD6FE">
            <circle cx="175" cy="922" r="105" />
            <circle cx="110" cy="910" r="95" />
            <circle cx="50" cy="890" r="75" />
            <circle cx="20" cy="860" r="55" />
            <circle cx="70" cy="935" r="75" />
            <circle cx="135" cy="930" r="90" />
          </g>
        </g>

        {/* Layer 3: Foreground luminous launch clouds extending completely to the bottom S-curve end point (92, 1000) without vertical cutoff */}
        <g fill="#EDE9FE">
          <circle cx="175" cy="988" r="95" />
          <circle cx="135" cy="980" r="90" />
          <circle cx="95" cy="970" r="80" />
          <circle cx="60" cy="940" r="70" />
          <circle cx="35" cy="910" r="55" />
          <circle cx="92" cy="1000" r="65" />
          <circle cx="110" cy="940" r="45" fill="#F5F3FF" />
        </g>
      </g>

      {/* Illuminated Edge Glow Stroke */}
      <motion.path
        d={isScrollyActive ? sideEdgeD : sideEdgeStart}
        fill="none"
        stroke="url(#lpWaveEdge)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
