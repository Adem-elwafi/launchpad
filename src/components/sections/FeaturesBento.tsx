import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RotateCcw,
  GitCommit,
  GitPullRequest,
  Activity,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Globe2,
} from 'lucide-react'
import { useOnScreen } from '../../lib/useOnScreen'
import { COMMITS_DATA, TELEMETRY_LOGS, FEATURES_BENTO_CONTENT, SITE_CONFIG } from '../../data/content'

export const FeaturesBento: React.FC = () => {
  // Card 1 state: Active commit pointer
  const [activeCommit, setActiveCommit] = useState(COMMITS_DATA[0].hash)
  const [rollbackSuccess, setRollbackSuccess] = useState(false)
  const rollbackTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Card 2 state: Preview URL copy
  const [copiedUrl, setCopiedUrl] = useState(false)
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Card 3 state: Live telemetry filter & streaming logs
  const [logs, setLogs] = useState(TELEMETRY_LOGS)
  const [isStreaming, setIsStreaming] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState('ALL')
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const isOnScreen = useOnScreen(sectionRef, '0px')

  useEffect(() => {
    return () => {
      if (rollbackTimerRef.current) clearTimeout(rollbackTimerRef.current)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    }
  }, [])

  // Commit swap handler
  const handleSelectCommit = (hash: string) => {
    if (hash === activeCommit) return
    setActiveCommit(hash)
    setRollbackSuccess(true)
    if (rollbackTimerRef.current) clearTimeout(rollbackTimerRef.current)
    rollbackTimerRef.current = setTimeout(() => setRollbackSuccess(false), 2400)
  }

  // Copy preview URL handler
  const handleCopyPreview = () => {
    navigator.clipboard?.writeText('https://feat-ai-embeddings--lp-edge.app')
    setCopiedUrl(true)
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopiedUrl(false), 2000)
  }

  // Live log stream generator
  useEffect(() => {
    // Only stream while the section is on screen (and the toggle is on)
    if (!isStreaming || !isOnScreen) {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
      return
    }

    streamIntervalRef.current = setInterval(() => {
      if (document.hidden) return
      const candidates = [
        { method: 'GET' as const, path: '/api/v1/auth/session', status: 200, region: 'IAD1', latency: Math.floor(Math.random() * 4 + 6), cache: 'HIT' as const },
        { method: 'POST' as const, path: '/api/checkout/verify', status: 201, region: 'LHR1', latency: Math.floor(Math.random() * 6 + 10), cache: 'BYPASS' as const },
        { method: 'GET' as const, path: '/assets/bundle.wasm', status: 304, region: 'FRA1', latency: Math.floor(Math.random() * 3 + 3), cache: 'HIT' as const },
        { method: 'GET' as const, path: '/api/nodes/ping', status: 200, region: 'NRT1', latency: Math.floor(Math.random() * 5 + 8), cache: 'HIT' as const },
      ]
      const pick = candidates[Math.floor(Math.random() * candidates.length)]
      const now = new Date()
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`

      setLogs((prev) => [
        { id: Date.now(), ...pick, time: timeStr },
        ...prev.slice(0, 4),
      ])
    }, 2600)

    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    }
  }, [isStreaming, isOnScreen])

  const filteredLogs = logs.filter((log) => {
    if (selectedRegion === 'ALL') return true
    return log.region === selectedRegion
  })

  return (
    <section id="features" ref={sectionRef} className="py-24 sm:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Background subtle dotted pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#0F0C20 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (SOLID accent color, NEVER gradient text) */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/10 border border-[#6D28D9]/20 text-[#6D28D9] text-xs font-mono font-semibold tracking-wider uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9] animate-pulse" />
            {FEATURES_BENTO_CONTENT.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0C20] tracking-tight leading-[1.15] mb-5">
            {FEATURES_BENTO_CONTENT.titleLead}
            <span style={{ color: SITE_CONFIG.accentColor }}>{FEATURES_BENTO_CONTENT.titleAccent}</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {FEATURES_BENTO_CONTENT.subhead}
          </p>
        </div>

        {/* ========================================================
            3-CARD BENTO GRID (SPEC REQUIREMENT: 3 FEATURES MAX)
            Card 1 (md:col-span-2): Instant Atomic Rollbacks
            Card 2 (md:col-span-1): Ephemeral Preview Environments
            Card 3 (md:col-span-3): Real-Time Edge Telemetry
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* ========================================================
              CARD 1: INSTANT ATOMIC ROLLBACKS (md:col-span-2)
             ======================================================== */}
          <div className="lg:col-span-2 group relative rounded-[18px] bg-white border border-[#EEF0F5] shadow-xs hover:shadow-md hover:border-[#6D28D9]/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[12px] bg-[#6D28D9]/10 text-[#6D28D9] flex items-center justify-center border border-[#6D28D9]/20 shrink-0">
                    <RotateCcw className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F0C20] tracking-tight">
                      Instant Atomic Rollbacks
                    </h3>
                    <p className="text-xs font-mono text-[#64748B]">
                      Zero-downtime routing pointer swaps at L4 Anycast edge
                    </p>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Zero Downtime Cutover
                </div>
              </div>

              <p className="text-[#475569] text-sm leading-relaxed mb-6">
                Never wait for container spins or database teardowns to revert a faulty release. Re-target Anycast edge routing pointers in under 800 microseconds with zero dropped TCP connections.
              </p>

              {/* Interactive Deployment History Timeline */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center justify-between text-xs font-mono text-[#64748B] px-1">
                  <span>DEPLOYMENT REGISTRY</span>
                  <span>CLICK HASH TO SWAP LIVE ROUTE</span>
                </div>

                <div className="space-y-2">
                  {COMMITS_DATA.map((commit) => {
                    const isActive = activeCommit === commit.hash
                    return (
                      <div
                        key={commit.hash}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isActive}
                        aria-label={`Select commit ${commit.hash}: ${commit.msg}. Current status: ${isActive ? 'Active live route' : 'Standby'}`}
                        onClick={() => handleSelectCommit(commit.hash)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleSelectCommit(commit.hash)
                          }
                        }}
                        className={`relative rounded-[12px] p-3.5 sm:p-4 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] ${
                          isActive
                            ? 'bg-[#6D28D9]/5 border-[#6D28D9] shadow-xs'
                            : 'bg-[#FAFAFC] border-[#E2E8F0] hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                              isActive
                                ? 'bg-[#6D28D9] text-white shadow-xs'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            <GitCommit className="w-4 h-4" strokeWidth={1.5} />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                                {commit.hash}
                              </span>
                              <span className="text-xs font-medium text-slate-800 line-clamp-1">
                                {commit.msg}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-[11px] text-[#64748B]">
                              <span>author: {commit.author}</span>
                              <span>•</span>
                              <span>{commit.time}</span>
                              <span>•</span>
                              <span>sync: {commit.deployTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6D28D9] text-white text-xs font-mono font-medium shadow-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                              Active Live Route
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-slate-600 border border-slate-200 text-xs font-mono font-medium hover:border-[#6D28D9]/40">
                              Point Traffic Here
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Instant Feedback Ribbon */}
            <div className="pt-4 border-t border-[#EEF0F5] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Current Edge Pointer: <strong className="text-slate-900">{activeCommit}</strong></span>
              </div>

              <AnimatePresence mode="wait">
                {rollbackSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-emerald-700 font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
                    Pointer swapped in 0.4ms across 184 PoPs
                  </motion.div>
                ) : (
                  <div className="text-[#64748B]">
                    Propagates globally via Anycast BGP tables
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================
              CARD 2: EPHEMERAL PREVIEWS WITH PR CARD & SVG GRAPHIC (md:col-span-1)
             ======================================================== */}
          <div className="group relative rounded-[18px] bg-white border border-[#EEF0F5] shadow-xs hover:shadow-md hover:border-[#6D28D9]/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-[12px] bg-cyan-500/10 text-cyan-600 flex items-center justify-center border border-cyan-500/20 shrink-0">
                  <GitPullRequest className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F0C20] tracking-tight">
                    Ephemeral Previews
                  </h3>
                  <p className="text-xs font-mono text-[#64748B]">
                    Instant staging for every Git branch
                  </p>
                </div>
              </div>

              <p className="text-[#475569] text-sm leading-relaxed mb-5">
                Push code to GitHub, GitLab, or Bitbucket. LaunchPad automatically provisions isolated WebAssembly runtimes with deterministic URLs.
              </p>

              {/* GitHub PR Mock Card */}
              <div className="rounded-[12px] border border-slate-200 bg-[#FAFAFC] p-3.5 space-y-3 font-sans">
                {/* PR Header */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#6D28D9]" />
                    <span className="font-semibold text-xs text-slate-800">PR #142: feat/ai-embeddings</span>
                  </div>
                  <span className="text-[10px] font-mono bg-purple-100 text-[#6D28D9] px-2 py-0.5 rounded-full font-medium">
                    Open
                  </span>
                </div>

                {/* Bot Comment Box */}
                <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#6D28D9] text-[9px] text-white flex items-center justify-center font-mono">LP</span>
                      <span>launchpad-bot</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" strokeWidth={1.5} /> Ready
                    </span>
                  </div>

                  {/* Generated URL Box */}
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                    <div className="font-mono text-xs text-slate-700 truncate select-all">
                      https://feat-ai-embeddings--lp-edge.app
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyPreview}
                      aria-label="Copy preview deployment URL"
                      title="Copy Preview URL"
                      className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={1.5} /> : <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />}
                    </button>
                  </div>
                </div>

                {/* PR Stats */}
                <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] px-1">
                  <span>Branch: feat/ai-embeddings</span>
                  <span className="text-emerald-600">+240 / -18</span>
                </div>
              </div>

              {/* Inline SVG Mini Graphic (Isolated WebAssembly Isolate) */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 280 48"
                  className="w-full h-12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="4" width="84" height="40" rx="8" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
                  <text x="44" y="24" textAnchor="middle" fill="#6D28D9" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">isolate-1</text>
                  <text x="44" y="36" textAnchor="middle" fill="#8B5CF6" fontSize="9" fontFamily="JetBrains Mono">3.2ms boot</text>

                  <path d="M90 24 L114 24" stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="3 3" />

                  <rect x="118" y="4" width="76" height="40" rx="8" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
                  <text x="156" y="24" textAnchor="middle" fill="#047857" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">KV Store</text>
                  <text x="156" y="36" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono">Isolated</text>

                  <path d="M198 24 L222 24" stroke="#C4B5FD" strokeWidth="1.5" strokeDasharray="3 3" />

                  <rect x="226" y="4" width="50" height="40" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
                  <text x="251" y="27" textAnchor="middle" fill="#15803D" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">SSL</text>
                </svg>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-4 border-t border-[#EEF0F5] flex items-center justify-between text-xs font-mono text-[#64748B]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#6D28D9]" strokeWidth={1.5} />
                Isolated KV state
              </span>
              <span className="text-slate-700 font-medium">Auto-destructs on merge</span>
            </div>
          </div>

          {/* ========================================================
              CARD 3: REAL-TIME EDGE TELEMETRY (md:col-span-3)
             ======================================================== */}
          <div className="lg:col-span-3 group relative rounded-[18px] bg-white border border-[#EEF0F5] shadow-xs hover:shadow-md hover:border-[#6D28D9]/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header with region chips & streaming controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[12px] bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20 shrink-0">
                    <Activity className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F0C20] tracking-tight">
                      Real-Time Edge Telemetry
                    </h3>
                    <p className="text-xs font-mono text-[#64748B]">
                      Distributed HTTP request log waterfall across global PoP mesh
                    </p>
                  </div>
                </div>

                {/* Region Chips & Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center rounded-[10px] border border-slate-200 bg-slate-50 p-1 text-xs font-mono" role="group" aria-label="Region filters">
                    {['ALL', 'IAD1', 'LHR1', 'FRA1', 'NRT1'].map((region) => (
                      <button
                        key={region}
                        type="button"
                        onClick={() => setSelectedRegion(region)}
                        aria-pressed={selectedRegion === region}
                        className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                          selectedRegion === region
                            ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsStreaming(!isStreaming)}
                    aria-label={isStreaming ? 'Pause log stream' : 'Resume log stream'}
                    className={`px-3 py-1.5 rounded-[10px] border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isStreaming
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                    {isStreaming ? 'Streaming' : 'Paused'}
                  </button>
                </div>
              </div>

              {/* Waterfall Log Table */}
              <div className="rounded-[14px] border border-slate-800 bg-[#0F0C20] text-slate-200 overflow-hidden font-mono text-xs shadow-md">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-4 py-2.5 bg-[#140F2D] text-slate-400 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider">
                  <span className="col-span-2">Method</span>
                  <span className="col-span-3">Path</span>
                  <span className="col-span-2 text-center">PoP</span>
                  <span className="col-span-2 text-center">Cache</span>
                  <span className="col-span-3 text-right">Waterfall</span>
                </div>

                {/* Rows */}
                <div className="relative divide-y divide-slate-800/80">
                  <AnimatePresence initial={false} mode="popLayout">
                    {filteredLogs.map((log) => {
                      const is2xx = log.status >= 200 && log.status < 300
                      return (
                        <motion.div
                          key={log.id}
                          layout="position"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="grid grid-cols-12 px-4 py-2.5 items-center hover:bg-slate-800/50 transition-colors"
                        >
                          {/* Method & Status */}
                          <div className="col-span-2 flex items-center gap-1.5">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                is2xx
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              }`}
                            >
                              {log.method}
                            </span>
                            <span className="text-slate-400">{log.status}</span>
                          </div>

                          {/* Route Path */}
                          <div className="col-span-3 min-w-0 font-mono text-slate-100 truncate pr-2">
                            {log.path}
                          </div>

                          {/* Edge Region */}
                          <div className="col-span-2 text-center">
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                              {log.region}
                            </span>
                          </div>

                          {/* Cache Status */}
                          <div className="col-span-2 text-center">
                            <span className={`text-[10px] ${log.cache === 'HIT' ? 'text-emerald-400' : 'text-slate-400'}`}>
                              {log.cache}
                            </span>
                          </div>

                          {/* Animated Waterfall Sparkline & Latency */}
                          <div className="col-span-3 flex items-center justify-end gap-2 min-w-0">
                            <div className="w-14 shrink-0 bg-slate-800 h-2 rounded-full overflow-hidden flex">
                              <div
                                className="bg-gradient-to-r from-[#22D3EE] to-[#6D28D9] h-full rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(100, log.latency * 7)}%` }}
                              />
                            </div>
                            <span className="font-semibold text-slate-200 w-10 shrink-0 text-right tabular-nums">
                              {log.latency}ms
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Stream Metrics */}
            <div className="pt-4 mt-4 border-t border-[#EEF0F5] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#64748B]">
              <div className="flex items-center gap-4">
                <span>Global Ingress: <strong className="text-slate-900">142,840 req/s</strong></span>
                <span>•</span>
                <span>Cache Hit Ratio: <strong className="text-emerald-600 font-semibold">98.4%</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500">
                <Globe2 className="w-3.5 h-3.5 text-cyan-500" strokeWidth={1.5} />
                Aggregated live from 184 Anycast PoPs
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default FeaturesBento
