import React, { useSyncExternalStore } from 'react'
import { motion, useTransform, useReducedMotion, useMotionValue, MotionValue } from 'framer-motion'

function subscribeDesktop(callback: () => void) {
  const media = window.matchMedia('(min-width: 768px)')
  media.addEventListener('change', callback)
  return () => media.removeEventListener('change', callback)
}

function getDesktopSnapshot() {
  return window.matchMedia('(min-width: 768px)').matches
}

function getDesktopServerSnapshot() {
  return false
}

export interface WaveDividerProps {
  variant?: 'side' | 'bottom' | 'tablet' | 'mobile' | 'enter-dark' | 'exit-dark' | 'enter-finale'
  className?: string
  scrollProgress?: MotionValue<number> | null
  fill?: string
  /** Color painted above the wave curve (e.g. the section color it continues from) */
  backFill?: string
  edgeColor?: string
}

/**
 * WaveDivider component
 * Eliminates the clipping seam bug completely by removing internal bounding-box clipped clouds.
 * Unifies the wave boundary and gradient transitions seamlessly across all breakpoints.
 */
export const WaveDivider: React.FC<WaveDividerProps> = ({
  variant = 'side',
  className = '',
  scrollProgress,
  fill,
  backFill,
  edgeColor = '#A78BFA',
}) => {
  const fallback = useMotionValue(0)
  const progress = scrollProgress || fallback
  const shouldReduceMotion = useReducedMotion()
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot
  )

  const isScrollyActive = Boolean(scrollProgress) && !shouldReduceMotion && (variant === 'bottom' || isDesktop)

  // Desktop S-curve wave morph paths (scroll 0 to 0.85)
  const sideFillStart =
    'M 175 0 L 64 0 C 120 150 132 300 104 430 C 74 570 4 650 18 780 C 28 880 70 940 92 1000 L 175 1000 Z'
  const sideFillEnd =
    'M 175 0 L 48 0 C 112 165 146 310 94 440 C 66 580 -6 660 12 790 C 24 888 78 945 110 1000 L 175 1000 Z'

  const sideEdgeStart =
    'M 64 0 C 120 150 132 300 104 430 C 74 570 4 650 18 780 C 28 880 70 940 92 1000'
  const sideEdgeEnd =
    'M 48 0 C 112 165 146 310 94 440 C 66 580 -6 660 12 790 C 24 888 78 945 110 1000'

  const sideFillD = useTransform(progress, [0, 0.85], [sideFillStart, sideFillEnd])
  const sideEdgeD = useTransform(progress, [0, 0.85], [sideEdgeStart, sideEdgeEnd])

  // Mobile bottom wave morph paths
  const bottomStart =
    'M 0 34 C 70 74 150 4 240 30 C 310 50 360 18 400 32 L 400 72 L 0 72 Z'
  const bottomEnd =
    'M 0 28 C 65 68 158 10 248 38 C 318 44 355 24 400 28 L 400 72 L 0 72 Z'

  const bottomD = useTransform(progress, [0, 0.85], [bottomStart, bottomEnd])
  const bottomWaveY = useTransform(progress, [0, 0.85], [0, 4])

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
    )
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
    )
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
    )
  }

  // Horizontal wave entering dark section from light canvas
  if (variant === 'enter-dark') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`w-full block -mb-px relative z-10 ${className}`}
        style={{ height: '70px' }}
      >
        <path
          d="M0,0 C320,70 560,10 880,55 C1160,95 1320,30 1440,60 L1440,80 L0,80 Z"
          fill={fill || '#0F0C20'}
        />
        <path
          d="M0,0 C320,70 560,10 880,55 C1160,95 1320,30 1440,60"
          fill="none"
          stroke={edgeColor}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  // Horizontal wave exiting dark section back to light canvas
  if (variant === 'exit-dark') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={`w-full block -mt-px relative z-10 ${className}`}
        style={{ height: '70px' }}
      >
        {backFill && (
          <path
            d="M0,-1 L1440,-1 L1440,40 C1280,20 1120,75 840,45 C520,10 280,65 0,25 Z"
            fill={backFill}
          />
        )}
        <path
          d="M0,25 C280,65 520,10 840,45 C1120,75 1280,20 1440,40 L1440,80 L0,80 Z"
          fill={fill || '#FAFAFC'}
        />
        <path
          d="M0,25 C280,65 520,10 840,45 C1120,75 1280,20 1440,40"
          fill="none"
          stroke={edgeColor}
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  // Horizontal wave entering final dark finale section
  if (variant === 'enter-finale') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className={`w-full block -mb-px relative z-10 ${className}`}
        style={{ height: '80px' }}
      >
        <path
          d="M0,35 C340,85 620,15 960,60 C1220,95 1360,35 1440,55 L1440,90 L0,90 Z"
          fill={fill || '#0F0C20'}
        />
        <path
          d="M0,35 C340,85 620,15 960,60 C1220,95 1360,35 1440,55"
          fill="none"
          stroke={edgeColor}
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
      </svg>
    )
  }

  // Default: Desktop vertical S-curve wave divider (viewBox 0 0 175 1000)
  // CRITICAL FIX: Base wave fills seamlessly into .lp-right with zero clipped internal cloud rects.
  // The cloud layer is completely unified inside RocketArt without artificial 175px viewport clipping.
  return (
    <svg
      className={`lp-wave-side hidden lg:block md:block ${className}`}
      aria-hidden="true"
      viewBox="0 0 175 1000"
      preserveAspectRatio="none"
      style={{
        width: '175px',
        left: '-159px',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
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
          <stop offset="1" stopColor="#C4B5FD" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Base Wave Background connecting into celestial sky without seam */}
      <motion.path
        d={isScrollyActive ? sideFillD : sideFillStart}
        fill="url(#lpWaveFill)"
      />

      {/* Illuminated Edge Glow Stroke */}
      <motion.path
        d={isScrollyActive ? sideEdgeD : sideEdgeStart}
        fill="none"
        stroke="url(#lpWaveEdge)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default WaveDivider
