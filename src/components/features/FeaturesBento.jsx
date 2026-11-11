import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  GitCommit, 
  GitPullRequest, 
  RotateCcw, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck,
  Globe2
} from 'lucide-react'

// Commit data for Card 1 (Instant Atomic Rollbacks)
const INITIAL_COMMITS = [
  {
    hash: 'c8f3a9e',
    msg: 'feat(auth): migrate session storage to edgeworkers',
    author: 'sara-dev',
    time: '2 mins ago',
    status: 'healthy',
    traffic: '100% active',
    deployTime: '0.8s'
  },
  {
    hash: 'e410b2a',
    msg: 'fix(db): resolve connection pool spike on cold boot',
    author: 'alex-k',
    time: '18 mins ago',
    status: 'healthy',
    traffic: 'standby',
    deployTime: '1.1s'
  },
  {
    hash: '9b7a13f',
    msg: 'chore: bump dependencies to engine v4.2-wasm',
    author: 'ci-bot',
    time: '1 hour ago',
    status: 'healthy',
    traffic: 'standby',
    deployTime: '0.9s'
  }
]

// Sample logs for Card 4 (Real-Time Edge Telemetry)
const BASE_LOGS = [
  { id: 1, method: 'GET', path: '/api/v1/auth/session', status: 200, region: 'IAD1', latency: 8, time: '12:44:02.102', cache: 'HIT' },
  { id: 2, method: 'POST', path: '/api/checkout/verify', status: 201, region: 'LHR1', latency: 14, time: '12:44:02.245', cache: 'BYPASS' },
  { id: 3, method: 'GET', path: '/assets/app.wasm', status: 304, region: 'FRA1', latency: 4, time: '12:44:02.390', cache: 'HIT' },
  { id: 4, method: 'GET', path: '/api/telemetry/nodes', status: 200, region: 'NRT1', latency: 11, time: '12:44:02.518', cache: 'HIT' },
  { id: 5, method: 'GET', path: '/api/products/query', status: 200, region: 'SFO1', latency: 9, time: '12:44:02.684', cache: 'HIT' }
]

export default function FeaturesBento() {
  // State for Card 1: Active commit pointer
  const [activeCommit, setActiveCommit] = useState('c8f3a9e')
  const [rollbackSuccess, setRollbackSuccess] = useState(false)

  // State for Card 2: Preview URL copy
  const [copiedUrl, setCopiedUrl] = useState(false)

  // State for Card 3: Boot meter benchmark simulation
  const [meterValue, setMeterValue] = useState(8.4)
  const [isCalibrating, setIsCalibrating] = useState(false)

  // State for Card 4: Live Telemetry stream
  const [logs, setLogs] = useState(BASE_LOGS)
  const [isStreaming, setIsStreaming] = useState(true)
  const [logFilter, setLogFilter] = useState('ALL')

  const rollbackTimerRef = useRef(null)
  const copyTimerRef = useRef(null)
  const benchmarkTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (rollbackTimerRef.current) clearTimeout(rollbackTimerRef.current)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      if (benchmarkTimerRef.current) clearTimeout(benchmarkTimerRef.current)
    }
  }, [])

  // Handle Commit Swap
  const handleSelectCommit = (hash) => {
    if (hash === activeCommit) return
    setActiveCommit(hash)
    setRollbackSuccess(true)
    if (rollbackTimerRef.current) clearTimeout(rollbackTimerRef.current)
    rollbackTimerRef.current = setTimeout(() => setRollbackSuccess(false), 2400)
  }

  // Handle Copy Preview URL
  const handleCopyPreview = () => {
    navigator.clipboard?.writeText('https://feat-ai-embeddings--lp-edge.app')
    setCopiedUrl(true)
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopiedUrl(false), 2000)
  }

  // Recalibrate microVM boot time
  const handleBenchmarkRecalibrate = () => {
    if (isCalibrating) return
    setIsCalibrating(true)
    setMeterValue(3.2)
    if (benchmarkTimerRef.current) clearTimeout(benchmarkTimerRef.current)
    benchmarkTimerRef.current = setTimeout(() => {
      const nextVal = (7.5 + Math.random() * 2.5).toFixed(1)
      setMeterValue(parseFloat(nextVal))
      setIsCalibrating(false)
    }, 600)
  }

  // Auto stream logs effect
  useEffect(() => {
    if (!isStreaming) return
    const interval = setInterval(() => {
      const paths = [
        { method: 'GET', path: '/api/v1/auth/session', status: 200, region: 'IAD1', latency: Math.floor(Math.random() * 5 + 6), cache: 'HIT' },
        { method: 'POST', path: '/api/checkout/verify', status: 201, region: 'LHR1', latency: Math.floor(Math.random() * 6 + 10), cache: 'BYPASS' },
        { method: 'GET', path: '/assets/bundle.wasm', status: 304, region: 'FRA1', latency: Math.floor(Math.random() * 3 + 3), cache: 'HIT' },
        { method: 'GET', path: '/api/nodes/ping', status: 200, region: 'SIN1', latency: Math.floor(Math.random() * 7 + 8), cache: 'HIT' }
      ]
      const pick = paths[Math.floor(Math.random() * paths.length)]
      const now = new Date()
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`

      setLogs((prev) => [
        { id: Date.now(), ...pick, time: timeStr },
        ...prev.slice(0, 4)
      ])
    }, 2400)

    return () => clearInterval(interval)
  }, [isStreaming])

  const filteredLogs = logs.filter(item => {
    if (logFilter === '2XX') return item.status >= 200 && item.status < 300
    if (logFilter === '3XX') return item.status >= 300 && item.status < 400
    return true
  })

  return (
    <section id="features" className="py-24 sm:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#0F0C20 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/10 border border-[#6D28D9]/20 text-[#6D28D9] text-xs font-mono font-semibold tracking-wider uppercase mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9] animate-pulse"></span>
            Architecture & Capabilities
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0C20] tracking-tight leading-[1.15] mb-5">
            Engineered for developers who{' '}
            <span className="bg-gradient-to-r from-[#6D28D9] via-[#4F46E5] to-[#22D3EE] bg-clip-text text-transparent">
              refuse to wait
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Experience sub-second edge routing, deterministic atomic pointer switches, and instant preview builds. Everything compiled directly down to bare-metal V8 isolates.
          </p>
        </div>

        {/* 4-Card Bento Grid:
            Card 1 (Span 2 cols): Instant Atomic Rollbacks
            Card 2 (Span 1 col): Ephemeral Branch Previews
            Card 3 (Span 1 col): Sub-15ms Cold Starts
            Card 4 (Span 2 cols): Real-Time Edge Telemetry
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* ========================================================
              CARD 1: INSTANT ATOMIC ROLLBACKS (Col-Span 2)
             ======================================================== */}
          <div className="md:col-span-2 group relative rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#6D28D9]/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Top ambient highlight */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#6D28D9]/5 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

            <div>
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#6D28D9]/10 text-[#6D28D9] flex items-center justify-center border border-[#6D28D9]/20">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F0C20] tracking-tight">
                      Instant Atomic Rollbacks
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      Zero-downtime routing pointer swaps at L4 Anycast edge
                    </p>
                  </div>
                </div>

                {/* Zero Downtime Live Badge */}
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Zero Downtime Cutover
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Never wait for container spins or database teardowns to revert a faulty release. Re-target Anycast edge routing pointers in under 800 microseconds with zero dropped TCP connections.
              </p>

              {/* Interactive Deployment History Timeline */}
              <div className="space-y-2.5 mb-5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 px-2">
                  <span>DEPLOYMENT REGISTRY</span>
                  <span>CLICK HASH TO SWAP LIVE ROUTE</span>
                </div>

                <div className="space-y-2">
                  {INITIAL_COMMITS.map((commit) => {
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
                            e.preventDefault();
                            handleSelectCommit(commit.hash);
                          }
                        }}
                        className={`relative rounded-xl p-3.5 sm:p-4 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-[#6D28D9] ${
                          isActive
                            ? 'bg-[#6D28D9]/5 border-[#6D28D9] shadow-xs'
                            : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
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
                            <GitCommit className="w-4 h-4" />
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
                            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                              <span>author: {commit.author}</span>
                              <span>•</span>
                              <span>{commit.time}</span>
                              <span>•</span>
                              <span>sync: {commit.deployTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#6D28D9] text-white text-xs font-mono font-medium shadow-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Active Live Route
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white text-slate-600 border border-slate-200 text-xs font-mono font-medium group-hover:border-[#6D28D9]/40">
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
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Current Edge Pointer: <strong className="text-slate-900">{activeCommit}</strong></span>
              </div>

              <AnimatePresence mode="wait">
                {rollbackSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-emerald-700 font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Pointer swapped in 0.4ms across 180+ PoPs
                  </motion.div>
                ) : (
                  <div className="text-slate-400">
                    Propagates globally via Anycast BGP tables
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ========================================================
              CARD 2: EPHEMERAL BRANCH PREVIEWS (Col-Span 1)
             ======================================================== */}
          <div className="group relative rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#6D28D9]/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center border border-cyan-500/20">
                  <GitPullRequest className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F0C20] tracking-tight">
                    Ephemeral Previews
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Instant staging for every Git branch
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Push code to GitHub, GitLab, or Bitbucket. LaunchPad instantly spins up isolated edge runtimes with deterministic URLs.
              </p>

              {/* GitHub PR Mock Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-3 font-sans">
                {/* PR Title & Status */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span className="font-semibold text-xs text-slate-800">PR #142: feat/ai-embeddings</span>
                  </div>
                  <span className="text-[10px] font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                    Open
                  </span>
                </div>

                {/* LaunchPad Bot Comment */}
                <div className="bg-white rounded-lg border border-slate-200/80 p-3 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#6D28D9] text-[9px] text-white flex items-center justify-center font-mono">LP</span>
                      <span>launchpad-bot</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-mono font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  </div>

                  {/* Generated URL Box */}
                  <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                    <div className="font-mono text-xs text-slate-700 truncate select-all">
                      https://feat-ai-embeddings--lp-edge.app
                    </div>
                    <button
                      onClick={handleCopyPreview}
                      aria-label="Copy preview deployment URL"
                      title="Copy Preview URL"
                      className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                    >
                      {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* PR stats */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
                  <span>Branch: feat/ai-embeddings</span>
                  <span className="text-emerald-600">+240 / -18</span>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                Isolated KV state
              </span>
              <span className="text-slate-700 font-medium">Auto-destructs on merge</span>
            </div>
          </div>

          {/* ========================================================
              CARD 3: SUB-15MS COLD STARTS (Col-Span 1)
             ======================================================== */}
          <div className="group relative rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#6D28D9]/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F0C20] tracking-tight">
                    Sub-15ms Cold Starts
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    V8 WASM MicroVM Engine
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Containers take 1,200ms to initialize. LaunchPad runs on snapshot-restored V8 WebAssembly isolates that boot before a screen refresh.
              </p>

              {/* Boot Meter Visualization */}
              <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    MICROVM BOOT LATENCY
                  </span>
                  <button
                    onClick={handleBenchmarkRecalibrate}
                    aria-label="Re-test microVM boot latency"
                    className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer transition-colors"
                  >
                    {isCalibrating ? 'Benchmarking...' : 'Re-test'}
                  </button>
                </div>

                {/* Primary Metric Gauge */}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono tracking-tight text-white">
                    {meterValue}
                  </span>
                  <span className="text-lg font-mono font-semibold text-emerald-400">ms</span>
                  <span className="ml-auto text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    target &lt;15ms
                  </span>
                </div>

                {/* Boot Pipeline Breakdown */}
                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>V8 Isolate Init</span>
                    <span className="text-emerald-400">3.1 ms</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: '38%' }} />
                  </div>

                  <div className="flex justify-between text-slate-300 pt-1">
                    <span>Snapshot Memory Load</span>
                    <span className="text-cyan-400">4.2 ms</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '50%' }} />
                  </div>

                  <div className="flex justify-between text-slate-300 pt-1">
                    <span>First Byte Edge Dispatch</span>
                    <span className="text-purple-400">1.1 ms</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Benchmark vs Standard Containers */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="text-slate-600">Docker Containers: 1,200ms</span>
              <span className="text-emerald-600 font-bold">140x Faster</span>
            </div>
          </div>

          {/* ========================================================
              CARD 4: REAL-TIME EDGE TELEMETRY (Col-Span 2)
             ======================================================== */}
          <div className="md:col-span-2 group relative rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#6D28D9]/30 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
            {/* Top ambient highlight */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none rounded-tl-2xl" />

            <div>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F0C20] tracking-tight">
                      Real-Time Edge Telemetry
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      Live distributed HTTP request log waterfall
                    </p>
                  </div>
                </div>

                {/* Filter and Stream Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-mono" role="group" aria-label="Log status code filters">
                    {['ALL', '2XX', '3XX'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setLogFilter(filter)}
                        aria-pressed={logFilter === filter}
                        aria-label={`Filter logs by ${filter}`}
                        className={`px-2 py-1 rounded-md transition-colors ${
                          logFilter === filter
                            ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsStreaming(!isStreaming)}
                    aria-label={isStreaming ? 'Pause real-time log stream' : 'Resume real-time log stream'}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors ${
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

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Trace packets across global edge nodes in real time. Inspect TTFB, cache hit ratios, and route latencies with zero configuration tracing agents.
              </p>

              {/* Waterfall Log Table */}
              <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-200 overflow-hidden font-mono text-xs">
                {/* Table Header */}
                <div className="grid grid-cols-12 px-4 py-2.5 bg-slate-950/70 text-slate-400 border-b border-slate-800 text-[11px] font-semibold uppercase tracking-wider">
                  <span className="col-span-2">Method</span>
                  <span className="col-span-4">Path</span>
                  <span className="col-span-2 text-center">PoP</span>
                  <span className="col-span-2 text-center">Cache</span>
                  <span className="col-span-2 text-right">Waterfall</span>
                </div>

                {/* Waterfall Rows */}
                <div className="divide-y divide-slate-800/80">
                  <AnimatePresence initial={false}>
                    {filteredLogs.map((log) => {
                      const is2xx = log.status >= 200 && log.status < 300
                      return (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, y: -8 }}
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
                          <div className="col-span-4 font-mono text-slate-100 truncate pr-2">
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

                          {/* Waterfall Bar & Latency */}
                          <div className="col-span-2 flex items-center justify-end gap-2">
                            <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden flex">
                              <div
                                className="bg-gradient-to-r from-cyan-400 to-[#6D28D9] h-full rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(100, log.latency * 6)}%` }}
                              />
                            </div>
                            <span className="font-semibold text-slate-200 min-w-[32px] text-right">
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
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-4">
                <span>Global Ingress: <strong className="text-slate-900">142,840 req/s</strong></span>
                <span>•</span>
                <span>Cache Hit Ratio: <strong className="text-emerald-600 font-semibold">98.4%</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Globe2 className="w-3.5 h-3.5 text-cyan-500" />
                Aggregated from 180 Anycast PoPs
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
