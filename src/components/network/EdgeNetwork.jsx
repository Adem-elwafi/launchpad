import React, { useState, useRef } from 'react'
import { 
  Globe2, 
  Wifi, 
  Activity, 
  Zap, 
  Radio
} from 'lucide-react'
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useReducedMotion, 
  useMotionValueEvent 
} from 'framer-motion'

// 10 Edge PoP Nodes defined in spec (including Africa hubs)
const EDGE_POPS = [
  {
    id: 'IAD1',
    city: 'North Virginia',
    country: 'United States',
    x: 256,
    y: 128,
    ping: 4,
    throughput: 48.4,
    requests: '84,200 req/s',
    tier: 'Tier 1 Backbone',
    status: 'Optimal',
    ip: '104.28.16.1'
  },
  {
    id: 'SFO1',
    city: 'San Francisco',
    country: 'United States',
    x: 144,
    y: 131,
    ping: 6,
    throughput: 39.8,
    requests: '62,100 req/s',
    tier: 'Tier 1 Backbone',
    status: 'Optimal',
    ip: '104.28.22.4'
  },
  {
    id: 'LHR1',
    city: 'London',
    country: 'United Kingdom',
    x: 450,
    y: 96,
    ping: 8,
    throughput: 44.2,
    requests: '71,400 req/s',
    tier: 'Tier 1 Transatlantic',
    status: 'Optimal',
    ip: '141.101.90.2'
  },
  {
    id: 'FRA1',
    city: 'Frankfurt',
    country: 'Germany',
    x: 476,
    y: 104,
    ping: 9,
    throughput: 41.5,
    requests: '68,900 req/s',
    tier: 'Tier 1 DE-CIX Core',
    status: 'Optimal',
    ip: '141.101.92.8'
  },
  {
    id: 'CAI1',
    city: 'Cairo',
    country: 'Egypt',
    x: 498,
    y: 175,
    ping: 11,
    throughput: 35.1,
    requests: '41,800 req/s',
    tier: 'Tier 1 North Africa Gateway',
    status: 'Optimal',
    ip: '102.132.8.2'
  },
  {
    id: 'JNB1',
    city: 'Johannesburg',
    country: 'South Africa',
    x: 485,
    y: 320,
    ping: 14,
    throughput: 38.6,
    requests: '48,200 req/s',
    tier: 'Tier 1 Pan-Africa Core',
    status: 'Optimal',
    ip: '102.130.16.1'
  },
  {
    id: 'NRT1',
    city: 'Tokyo',
    country: 'Japan',
    x: 785,
    y: 138,
    ping: 12,
    throughput: 36.7,
    requests: '54,300 req/s',
    tier: 'Tier 1 Asia-Pac Core',
    status: 'Optimal',
    ip: '172.68.10.9'
  },
  {
    id: 'SIN1',
    city: 'Singapore',
    country: 'Singapore',
    x: 705,
    y: 224,
    ping: 14,
    throughput: 32.1,
    requests: '49,800 req/s',
    tier: 'Tier 1 ASEAN Hub',
    status: 'Optimal',
    ip: '172.68.14.3'
  },
  {
    id: 'SYD1',
    city: 'Sydney',
    country: 'Australia',
    x: 820,
    y: 310,
    ping: 18,
    throughput: 26.4,
    requests: '38,100 req/s',
    tier: 'Tier 1 Oceania',
    status: 'Optimal',
    ip: '162.158.40.1'
  },
  {
    id: 'GRU1',
    city: 'São Paulo',
    country: 'Brazil',
    x: 334,
    y: 284,
    ping: 16,
    throughput: 28.9,
    requests: '41,200 req/s',
    tier: 'Tier 1 South America',
    status: 'Optimal',
    ip: '172.69.22.7'
  }
]

// Network connection paths linking the PoPs with sequential scroll progress triggers
const CONNECTIONS = [
  // 1. SFO1 -> IAD1 (US transcontinental backbone: 0.05 to 0.25) -> reaches IAD1 at 0.25
  { id: 'SFO1-IAD1', from: 'SFO1', to: 'IAD1', d: 'M 144 131 Q 200 110 256 128', start: 0.05, end: 0.25 },
  // 2. IAD1 -> LHR1 (Transatlantic cable: 0.22 to 0.42)
  { id: 'IAD1-LHR1', from: 'IAD1', to: 'LHR1', d: 'M 256 128 Q 350 70 450 96', start: 0.22, end: 0.42 },
  // 3. IAD1 -> GRU1 (Pan-American cable: 0.24 to 0.48)
  { id: 'IAD1-GRU1', from: 'IAD1', to: 'GRU1', d: 'M 256 128 Q 285 200 334 284', start: 0.24, end: 0.48 },
  // 4. LHR1 -> FRA1 (Europe core: 0.38 to 0.50) -> reaches FRA1 at 0.50
  { id: 'LHR1-FRA1', from: 'LHR1', to: 'FRA1', d: 'M 450 96 Q 463 98 476 104', start: 0.38, end: 0.50 },
  // 5. FRA1 -> CAI1 (Europe to North Africa gateway: 0.40 to 0.58) -> reaches CAI1 at 0.58
  { id: 'FRA1-CAI1', from: 'FRA1', to: 'CAI1', d: 'M 476 104 Q 487 140 498 175', start: 0.40, end: 0.58 },
  // 6. CAI1 -> JNB1 (Pan-African backbone: 0.55 to 0.72) -> reaches JNB1 at 0.72
  { id: 'CAI1-JNB1', from: 'CAI1', to: 'JNB1', d: 'M 498 175 Q 515 250 485 320', start: 0.55, end: 0.72 },
  // 7. GRU1 -> JNB1 (South Atlantic cable: 0.35 to 0.60)
  { id: 'GRU1-JNB1', from: 'GRU1', to: 'JNB1', d: 'M 334 284 Q 410 320 485 320', start: 0.35, end: 0.60 },
  // 8. JNB1 -> SIN1 (Indian Ocean cable: 0.65 to 0.85)
  { id: 'JNB1-SIN1', from: 'JNB1', to: 'SIN1', d: 'M 485 320 Q 590 280 705 224', start: 0.65, end: 0.85 },
  // 9. FRA1 -> SIN1 (Eurasian artery: 0.48 to 0.70) -> reaches SIN1 at 0.70
  { id: 'FRA1-SIN1', from: 'FRA1', to: 'SIN1', d: 'M 476 104 Q 590 140 705 224', start: 0.48, end: 0.70 },
  // 10. SIN1 -> NRT1 (Asia-Pac backbone: 0.68 to 0.82) -> reaches NRT1 at 0.82
  { id: 'SIN1-NRT1', from: 'SIN1', to: 'NRT1', d: 'M 705 224 Q 755 180 785 138', start: 0.68, end: 0.82 },
  // 11. SIN1 -> SYD1 (Oceania extension: 0.70 to 0.90)
  { id: 'SIN1-SYD1', from: 'SIN1', to: 'SYD1', d: 'M 705 224 Q 770 260 820 310', start: 0.70, end: 0.90 },
  // 12. SFO1 -> NRT1 (Pacific ring: 0.55 to 0.82)
  { id: 'SFO1-NRT1', from: 'SFO1', to: 'NRT1', d: 'M 144 131 Q 60 70 20 100', start: 0.55, end: 0.82 },
]

/**
 * TracedArc subcomponent
 * Renders an Anycast connection arc whose pathLength traces from 0 to 1 as user scrolls
 */
function TracedArc({ conn, scrollProgress, shouldReduceMotion }) {
  const pathLength = useTransform(
    scrollProgress,
    [conn.start, conn.end],
    [0, 1],
    { clamp: true }
  )

  const opacity = useTransform(
    scrollProgress,
    [conn.start, conn.start + 0.05, conn.end, 1],
    [0.1, 0.9, 0.8, 0.75],
    { clamp: true }
  )

  return (
    <g>
      {/* Background guide arc */}
      <path
        d={conn.d}
        stroke="#6D28D9"
        strokeWidth="1.2"
        strokeDasharray="4 6"
        opacity="0.22"
        fill="none"
      />
      {/* Animated Traced Arc */}
      <motion.path
        d={conn.d}
        fill="none"
        stroke="url(#popBeam)"
        strokeWidth="2.2"
        strokeLinecap="round"
        style={
          shouldReduceMotion
            ? { pathLength: 1, opacity: 0.8 }
            : { pathLength, opacity }
        }
      />
    </g>
  )
}

export default function EdgeNetwork() {
  const [selectedNode, setSelectedNode] = useState(EDGE_POPS[0]) // IAD1 default
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // Signature Move 3: Scroll-driven Arc Tracing & Radar Trigger
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'center center']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.001
  })

  // Dynamic radar ping waves on edge nodes reached by connection beams
  const [activePings, setActivePings] = useState({
    IAD1: false,
    FRA1: false,
    CAI1: false,
    JNB1: false,
    SIN1: false,
    NRT1: false
  })

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (shouldReduceMotion) return
    setActivePings({
      IAD1: latest >= 0.25,
      FRA1: latest >= 0.50,
      CAI1: latest >= 0.58,
      JNB1: latest >= 0.72,
      SIN1: latest >= 0.70,
      NRT1: latest >= 0.82
    })
  })

  return (
    <section id="network" ref={containerRef} className="py-24 sm:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Background Subtle Coordinate Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#0F0C20 1px, transparent 1px), linear-gradient(90deg, #0F0C20 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/10 border border-[#6D28D9]/20 text-[#6D28D9] text-xs font-mono font-semibold tracking-wider uppercase mb-5 shadow-xs">
            <Radio className="w-3.5 h-3.5 text-[#6D28D9] animate-pulse" />
            Global Infrastructure
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0C20] tracking-tight leading-[1.15] mb-5">
            Anycast routing across{' '}
            <span className="bg-gradient-to-r from-[#6D28D9] via-[#4F46E5] to-[#22D3EE] bg-clip-text text-transparent">
              180+ Edge PoPs
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Sub-20ms edge compute within 50 miles of 95% of internet users worldwide. Zero-downtime BGP failover and automatic DDoS scrubbing.
          </p>
        </div>

        {/* Selected Node Status Banner / Telemetry Card */}
        <div className="max-w-4xl mx-auto mb-10 rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#6D28D9]/5 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            {/* Left: Node Info & Radar */}
            <div className="flex items-start sm:items-center gap-4">
              {/* Radar Pulsing Animation */}
              <div className="relative w-12 h-12 rounded-xl bg-[#6D28D9]/10 border border-[#6D28D9]/30 flex items-center justify-center shrink-0">
                <Radio className="w-6 h-6 text-[#6D28D9] z-10" />
                <span className="absolute inset-0 rounded-xl bg-[#6D28D9]/20 animate-ping opacity-75" />
                <span className="absolute -inset-1 rounded-2xl border border-[#22D3EE]/40 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#0F0C20]">
                    {selectedNode.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold">
                    {selectedNode.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    IP: {selectedNode.ip}
                  </span>
                </div>
                <div className="text-sm font-medium text-slate-600">
                  {selectedNode.city}, {selectedNode.country} • <span className="text-xs font-mono text-purple-700">{selectedNode.tier}</span>
                </div>
              </div>
            </div>

            {/* Right: Live Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              {/* Ping */}
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-[#10B981]" />
                  Edge Ping
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-slate-900">
                    {selectedNode.ping}
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-600">ms</span>
                </div>
              </div>

              {/* Throughput */}
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#6D28D9]" />
                  Throughput
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-slate-900">
                    {selectedNode.throughput}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#6D28D9]">Gbps</span>
                </div>
              </div>

              {/* Requests */}
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-600" />
                  Load
                </div>
                <div className="text-xs sm:text-sm font-extrabold font-mono text-slate-800 mt-2 truncate">
                  {selectedNode.requests}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive SVG World Map Viewport */}
        <div className="rounded-3xl border border-slate-200/90 bg-[#0F0C20] shadow-[0_25px_60px_rgba(15,12,32,0.12)] p-4 sm:p-8 relative overflow-hidden">
          
          {/* Subtle cosmic background gradient for the map container */}
          <div className="absolute inset-0 bg-radial from-[#1E124A]/70 via-[#0F0C20] to-[#0A0716] pointer-events-none" />

          {/* Map Top Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 px-2 relative z-10">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#22D3EE]" />
              <span className="text-white font-semibold">ANYCAST GLOBAL TOPOLOGY</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                180+ Active Nodes
              </span>
              <span>•</span>
              <span>99.999% SLA</span>
            </div>
          </div>

          {/* SVG Map Container (viewBox 0 0 900 450) */}
          <div className="relative w-full aspect-[2/1] select-none">
            <svg
              viewBox="0 0 900 450"
              className="w-full h-full drop-shadow-[0_0_20px_rgba(109,40,217,0.15)]"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Interactive Global Anycast Edge Network Topology Map with 10 active Points of Presence"
            >
              <title>Interactive Global Anycast Edge Network Topology Map</title>
              <defs>
                {/* Linear Gradients for Connection Rays */}
                <linearGradient id="popBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.95" />
                </linearGradient>

                {/* Radial Glow for Selected Node */}
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
                </radialGradient>

                {/* Glow Filter for Global Traced Arcs */}
                <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Coordinate Grid Lines */}
              <g opacity="0.08" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="4 4">
                <line x1="0" y1="112.5" x2="900" y2="112.5" />
                <line x1="0" y1="225" x2="900" y2="225" />
                <line x1="0" y1="337.5" x2="900" y2="337.5" />
                <line x1="225" y1="0" x2="225" y2="450" />
                <line x1="450" y1="0" x2="450" y2="450" />
                <line x1="675" y1="0" x2="675" y2="450" />
              </g>

              {/* ========================================================
                  CONTINENT SILHOUETTES (Handcrafted precision vector paths)
                 ======================================================== */}
              <g fill="#1F1640" stroke="#312268" strokeWidth="1" opacity="0.85">
                {/* North America */}
                <path d="M 120 75 L 170 55 L 240 50 L 290 70 L 285 105 L 255 125 L 275 160 L 245 195 L 210 180 L 175 185 L 145 170 L 125 130 Z" />
                
                {/* Greenland */}
                <path d="M 330 40 L 375 35 L 390 65 L 345 80 Z" />

                {/* Central & South America */}
                <path d="M 230 200 L 260 215 L 295 240 L 360 260 L 365 310 L 340 370 L 310 400 L 290 350 L 280 270 L 240 230 Z" />

                {/* Europe */}
                <path d="M 425 80 L 460 70 L 510 75 L 520 115 L 485 135 L 450 145 L 420 135 L 430 100 Z" />

                {/* United Kingdom & Ireland */}
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

              {/* ========================================================
                  CONNECTION LINES / TELEMETRY ARCS (Move 3: Scroll-driven Arc Tracing)
                 ======================================================== */}
              <g filter="url(#arcGlow)">
                {CONNECTIONS.map((conn) => (
                  <TracedArc
                    key={conn.id}
                    conn={conn}
                    scrollProgress={smoothProgress}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </g>

              {/* ========================================================
                  CLICKABLE EDGE POP NODES (IAD1, SFO1, LHR1, FRA1, CAI1, JNB1, NRT1, SIN1, SYD1, GRU1)
                 ======================================================== */}
              {EDGE_POPS.map((pop) => {
                const isSelected = selectedNode.id === pop.id
                const isScrollyPinged = activePings[pop.id]
                const hasRadar = isSelected || isScrollyPinged

                return (
                  <g
                    key={pop.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`Select ${pop.city}, ${pop.country} (${pop.id}) edge PoP node. Ping: ${pop.ping}ms, Throughput: ${pop.throughput} Gbps`}
                    onClick={() => setSelectedNode(pop)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelectedNode(pop)
                      }
                    }}
                    className="cursor-pointer group focus:outline-none"
                    transform={`translate(${pop.x}, ${pop.y})`}
                  >
                    {/* Animated Pulsing Radar Rings on active node or when reached by scroll beam */}
                    {hasRadar && (
                      <>
                        <circle
                          r="18"
                          fill="none"
                          stroke="#22D3EE"
                          strokeWidth="1.5"
                          opacity={isSelected ? "0.6" : "0.45"}
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

                    {/* Outer glow ring on hover/active */}
                    <circle
                      r={hasRadar ? 10 : 7}
                      fill={isSelected ? '#6D28D9' : hasRadar ? '#312268' : '#1E124A'}
                      stroke={isSelected ? '#22D3EE' : hasRadar ? '#A78BFA' : '#8B5CF6'}
                      strokeWidth={hasRadar ? 2.5 : 1.5}
                      className="transition-all duration-300 group-hover:stroke-[#22D3EE] group-hover:scale-125"
                    />

                    {/* Core Indicator Dot */}
                    <circle
                      r={hasRadar ? 4 : 2.5}
                      fill={isSelected ? '#22D3EE' : hasRadar ? '#22D3EE' : '#10B981'}
                      className="transition-all duration-300"
                    />

                    {/* PoP Code Label */}
                    <text
                      y={pop.y > 300 ? -14 : 20}
                      x="0"
                      textAnchor="middle"
                      fill={isSelected ? '#22D3EE' : hasRadar ? '#A5F3FC' : '#E2E8F0'}
                      fontSize={isSelected || hasRadar ? '12' : '10'}
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={isSelected || hasRadar ? '700' : '500'}
                      className="select-none transition-colors group-hover:fill-white"
                    >
                      {pop.id}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Quick Node Selector Pills (Accessible for mobile and keyboard) */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 relative z-10" role="group" aria-label="Edge Node Quick Select">
            <span className="text-xs font-mono text-slate-400 mr-2">Quick PoP Select:</span>
            {EDGE_POPS.map((pop) => (
              <button
                key={pop.id}
                onClick={() => setSelectedNode(pop)}
                aria-pressed={selectedNode.id === pop.id}
                aria-label={`Select ${pop.id} edge node, ${pop.ping} millisecond latency`}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22D3EE] ${
                  selectedNode.id === pop.id
                    ? 'bg-[#6D28D9] text-white shadow-[0_0_12px_rgba(109,40,217,0.5)] border border-[#22D3EE]/60'
                    : 'bg-[#1E124A]/60 text-slate-300 hover:text-white hover:bg-[#1E124A] border border-white/5'
                }`}
              >
                {pop.id} ({pop.ping}ms)
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}