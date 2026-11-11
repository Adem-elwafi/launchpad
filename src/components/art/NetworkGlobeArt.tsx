import React, { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useAnimationControls } from 'framer-motion'
import { EdgeLocation } from '../../data/content'
import { useOnScreen } from '../../lib/useOnScreen'

export interface NetworkGlobeArtProps {
  nodes: EdgeLocation[]
  selectedNodeId: string
  onSelectNode: (node: EdgeLocation) => void
  className?: string
}

// Connection links between major hubs
const NETWORK_LINKS = [
  { from: 'SFO1', to: 'IAD1', d: 'M 144 131 Q 200 110 256 128' },
  { from: 'IAD1', to: 'LHR1', d: 'M 256 128 Q 350 70 450 96' },
  { from: 'IAD1', to: 'GRU1', d: 'M 256 128 Q 285 200 334 284' },
  { from: 'LHR1', to: 'FRA1', d: 'M 450 96 Q 463 98 476 104' },
  { from: 'FRA1', to: 'CAI1', d: 'M 476 104 Q 487 140 498 175' },
  { from: 'CAI1', to: 'JNB1', d: 'M 498 175 Q 515 250 485 320' },
  { from: 'GRU1', to: 'JNB1', d: 'M 334 284 Q 410 320 485 320' },
  { from: 'FRA1', to: 'SIN1', d: 'M 476 104 Q 590 140 705 224' },
  { from: 'SIN1', to: 'NRT1', d: 'M 705 224 Q 755 180 785 138' },
  { from: 'SIN1', to: 'SYD1', d: 'M 705 224 Q 770 260 820 310' },
  { from: 'JNB1', to: 'SIN1', d: 'M 485 320 Q 590 280 705 224' },
]

export const NetworkGlobeArt: React.FC<NetworkGlobeArtProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion()
  const svgRef = useRef<SVGSVGElement | null>(null)
  // Beam animations are JS-driven (attribute writes every frame); only run while visible
  const isOnScreen = useOnScreen(svgRef, '50px')
  const beamControls = useAnimationControls()
  const beamsStartedRef = useRef(false)

  useEffect(() => {
    if (isOnScreen) {
      beamsStartedRef.current = true
      beamControls.start((i: number) => ({
        pathLength: 1,
        opacity: [0.6, 0.9, 0.6],
        transition: { duration: 3, repeat: Infinity, repeatType: 'reverse' as const, delay: i * 0.15 },
      }))
    } else if (beamsStartedRef.current) {
      beamControls.stop() // freeze at current values while off-screen
    }
  }, [isOnScreen, beamControls])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 900 450"
      className={`w-full h-full select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Abstract dotted world map showing global Anycast edge network with 10 active Points of Presence"
    >
      <title>Global Anycast Edge Network Map</title>
      <defs>
        {/* Glow for active beams */}
        <linearGradient id="globalBeam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.95" />
        </linearGradient>

        {/* Arc blur filter */}
        <filter id="globeArcGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Coordinate grid */}
      <g opacity="0.08" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="4 4">
        <line x1="0" y1="112.5" x2="900" y2="112.5" />
        <line x1="0" y1="225" x2="900" y2="225" />
        <line x1="0" y1="337.5" x2="900" y2="337.5" />
        <line x1="225" y1="0" x2="225" y2="450" />
        <line x1="450" y1="0" x2="450" y2="450" />
        <line x1="675" y1="0" x2="675" y2="450" />
      </g>

      {/* Abstract dotted continent silhouettes */}
      <g fill="#1F1640" stroke="#312268" strokeWidth="1" opacity="0.85">
        {/* North America */}
        <path d="M 120 75 L 170 55 L 240 50 L 290 70 L 285 105 L 255 125 L 275 160 L 245 195 L 210 180 L 175 185 L 145 170 L 125 130 Z" />
        {/* Greenland */}
        <path d="M 330 40 L 375 35 L 390 65 L 345 80 Z" />
        {/* Central & South America */}
        <path d="M 230 200 L 260 215 L 295 240 L 360 260 L 365 310 L 340 370 L 310 400 L 290 350 L 280 270 L 240 230 Z" />
        {/* Europe */}
        <path d="M 425 80 L 460 70 L 510 75 L 520 115 L 485 135 L 450 145 L 420 135 L 430 100 Z" />
        {/* UK & Ireland */}
        <path d="M 435 90 L 455 85 L 452 105 L 438 108 Z" />
        {/* Africa */}
        <path d="M 435 155 L 515 150 L 550 200 L 530 270 L 500 340 L 460 330 L 430 260 L 415 195 Z" />
        {/* Asia & Eurasia */}
        <path d="M 525 75 L 610 65 L 720 70 L 800 90 L 830 130 L 780 155 L 740 180 L 710 215 L 660 210 L 620 180 L 550 160 L 525 120 Z" />
        {/* Japan */}
        <path d="M 780 125 L 795 130 L 790 155 L 778 145 Z" />
        {/* Southeast Asia Islands */}
        <path d="M 685 245 L 730 250 L 715 270 Z" />
        <path d="M 740 230 L 760 245 L 745 260 Z" />
        {/* Australia & New Zealand */}
        <path d="M 750 295 L 830 285 L 850 330 L 820 370 L 760 365 L 735 325 Z" />
        <path d="M 865 350 L 880 355 L 870 380 Z" />
      </g>

      {/* Dotted mesh grid overlaid on continents */}
      <g fill="#A78BFA" opacity="0.22">
        {/* Sample dots mimicking constellation dot matrix */}
        {[
          [160, 90], [180, 80], [200, 75], [220, 85], [240, 95], [260, 110], [180, 120], [200, 140], [220, 150],
          [310, 260], [330, 280], [340, 310], [330, 340], [310, 370],
          [440, 95], [460, 90], [480, 85], [500, 95], [470, 115], [450, 125],
          [450, 190], [470, 210], [490, 240], [510, 220], [480, 270], [490, 300],
          [560, 110], [590, 100], [630, 95], [680, 110], [720, 115], [760, 125], [780, 140],
          [650, 170], [690, 185], [730, 200], [710, 230],
          [770, 310], [800, 310], [820, 330], [810, 350], [780, 340]
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" />
        ))}
      </g>

      {/* Connection Arcs */}
      <g filter="url(#globeArcGlow)">
        {NETWORK_LINKS.map((link, i) => (
          <g key={i}>
            <path
              d={link.d}
              stroke="#6D28D9"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.3"
              fill="none"
            />
            <motion.path
              d={link.d}
              fill="none"
              stroke="url(#globalBeam)"
              strokeWidth="2.2"
              strokeLinecap="round"
              initial={{ pathLength: shouldReduceMotion ? 1 : 0.2 }}
              animate={beamControls}
              custom={i}
            />
          </g>
        ))}
      </g>

      {/* PoP Nodes */}
      {nodes.map((pop) => {
        const isSelected = selectedNodeId === pop.id

        return (
          <g
            key={pop.id}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`Select ${pop.city}, ${pop.country} (${pop.id}) edge PoP node. Ping: ${pop.ping}ms`}
            onClick={() => onSelectNode(pop)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectNode(pop)
              }
            }}
            className="cursor-pointer group focus:outline-none"
            transform={`translate(${pop.x}, ${pop.y})`}
          >
            {/* Pulsing ring on active */}
            {isSelected && (
              <>
                <circle
                  r="18"
                  fill="none"
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  opacity="0.6"
                  className="animate-ping"
                />
                <circle
                  r="28"
                  fill="none"
                  stroke="#6D28D9"
                  strokeWidth="1"
                  opacity="0.35"
                  className="animate-pulse"
                />
              </>
            )}

            {/* Outer halo */}
            <circle
              r={isSelected ? 10 : 7}
              fill={isSelected ? '#6D28D9' : '#1E124A'}
              stroke={isSelected ? '#22D3EE' : '#8B5CF6'}
              strokeWidth={isSelected ? 2.5 : 1.5}
              className="transition-all duration-300 group-hover:stroke-[#22D3EE]"
            />

            {/* Core dot */}
            <circle
              r={isSelected ? 4 : 2.5}
              fill={isSelected ? '#22D3EE' : '#10B981'}
              className="transition-all duration-300"
            />

            {/* Node Code Label */}
            <text
              y={pop.y > 300 ? -14 : 20}
              x="0"
              textAnchor="middle"
              fill={isSelected ? '#22D3EE' : '#E2E8F0'}
              fontSize={isSelected ? '12' : '10'}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={isSelected ? '700' : '500'}
              className="select-none transition-colors group-hover:fill-white"
            >
              {pop.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default NetworkGlobeArt
