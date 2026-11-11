import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Terminal as TerminalIcon,
  Play,
  RotateCw,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import WaveDivider from '../art/WaveDivider'
import { DARK_INTERLUDE_CONTENT } from '../../data/content'

export const DarkInterlude: React.FC = () => {
  const [selectedPm, setSelectedPm] = useState(DARK_INTERLUDE_CONTENT.packageManagers[0])
  const [deployState, setDeployState] = useState<'idle' | 'building' | 'complete'>('idle')
  const [buildStepIndex, setBuildStepIndex] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const timersRef = useRef<NodeJS.Timeout[]>([])
  const copyTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const buildSteps = [
    { label: '⚡ launchpad v2.8.4 linking local workspace...', delay: 200 },
    { label: `📦 Package manager: ${selectedPm.name} • Resolving optimized dependencies...`, delay: 450 },
    { label: '🔨 Bundling snapshot-restored WebAssembly isolates (34.2 kB WASM)', delay: 850 },
    { label: '🌐 Replicating zero-copy snapshots across 184+ Anycast PoPs...', delay: 1150 },
    { label: '✨ Deployed to global production in 1.42s!', delay: 1400 },
  ]

  const triggerDeploy = () => {
    if (deployState === 'building') return
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    setDeployState('building')
    setBuildStepIndex(0)

    buildSteps.forEach((step, index) => {
      const id = setTimeout(() => {
        setBuildStepIndex(index + 1)
        if (index === buildSteps.length - 1) {
          setDeployState('complete')
        }
      }, step.delay)
      timersRef.current.push(id)
    })
  }

  const handleCopyLink = () => {
    const url = `https://${selectedPm.name}-app.launchpad.dev`
    navigator.clipboard?.writeText(url)
    setCopiedLink(true)
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleSelectPm = (pm: typeof selectedPm) => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setSelectedPm(pm)
    setDeployState('idle')
    setBuildStepIndex(0)
  }

  return (
    <div id="terminal" className="relative w-full overflow-hidden">
      {/* Wave curve transition entering dark interlude from light canvas */}
      <WaveDivider variant="enter-dark" fill="#0F0C20" edgeColor="#8B5CF6" />

      {/* Main Dark Interlude Body (Vertical Sky Gradient #0F0C20 -> #1E124A -> #3B1E78) */}
      <section
        className="py-20 sm:py-28 relative text-white"
        style={{
          background: 'linear-gradient(180deg, #0F0C20 0%, #1E124A 52%, #3B1E78 100%)',
        }}
      >
        {/* Subtle ambient blur accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#6D28D9]/25 via-[#3B1E78]/20 to-[#22D3EE]/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Coordinate grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#FAFAFC 1px, transparent 1px), linear-gradient(90deg, #FAFAFC 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/25 border border-[#6D28D9]/40 text-[#22D3EE] text-xs font-mono font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" strokeWidth={1.5} />
              {DARK_INTERLUDE_CONTENT.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              Deploy in seconds. Zero configuration.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {DARK_INTERLUDE_CONTENT.subhead}
            </p>
          </div>

          {/* Package Manager Tabs (npm / pnpm / yarn / bun) */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8"
            role="tablist"
            aria-label="Package Manager Tabs"
          >
            {DARK_INTERLUDE_CONTENT.packageManagers.map((pm) => {
              const isSelected = selectedPm.name === pm.name
              return (
                <button
                  key={pm.name}
                  type="button"
                  role="tab"
                  id={`tab-${pm.name}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${pm.name}`}
                  onClick={() => handleSelectPm(pm)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-sm font-mono font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] min-h-[44px] ${
                    isSelected
                      ? 'bg-[#6D28D9] text-white shadow-[0_0_20px_rgba(109,40,217,0.5)] border border-[#8B5CF6]/50'
                      : 'bg-[#1E124A]/60 text-slate-300 hover:text-white hover:bg-[#1E124A] border border-white/10'
                  }`}
                >
                  <span className="text-base">{pm.name === 'bun' ? '🥟' : pm.name === 'yarn' ? '🧶' : '📦'}</span>
                  <span>{pm.name}</span>
                </button>
              )
            })}
          </div>

          {/* Typing Deploy Terminal Window Mockup */}
          <div
            id={`panel-${selectedPm.name}`}
            role="tabpanel"
            aria-labelledby={`tab-${selectedPm.name}`}
            className="max-w-4xl mx-auto rounded-[18px] border border-[#6D28D9]/40 bg-[#0F0C20]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Terminal Top Window Bar */}
            <div className="px-5 py-3.5 bg-[#140C2E] border-b border-[#6D28D9]/25 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
                <div className="hidden sm:flex items-center gap-2 ml-3 text-xs font-mono text-slate-400">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#22D3EE]" strokeWidth={1.5} />
                  <span>launchpad-cli — {selectedPm.name} — 80x24</span>
                </div>
              </div>

              {/* Run Deploy Button */}
              <button
                type="button"
                onClick={triggerDeploy}
                disabled={deployState === 'building'}
                aria-label={
                  deployState === 'building'
                    ? 'Compiling edge bundle'
                    : deployState === 'complete'
                    ? 'Re-deploy edge bundle'
                    : 'Run edge deploy simulation'
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-xs font-mono font-semibold transition-all duration-200 cursor-pointer min-h-[40px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] ${
                  deployState === 'building'
                    ? 'bg-[#6D28D9]/50 text-slate-300 cursor-not-allowed'
                    : 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white shadow-[0_0_15px_rgba(109,40,217,0.5)] active:scale-98'
                }`}
              >
                {deployState === 'building' ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin text-[#22D3EE]" strokeWidth={1.5} />
                    <span>Compiling 1.4s...</span>
                  </>
                ) : deployState === 'complete' ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 text-[#22D3EE]" strokeWidth={1.5} />
                    <span>Re-deploy</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" strokeWidth={1.5} />
                    <span>Run Deploy</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-7 font-mono text-xs sm:text-sm space-y-4">
              
              {/* Command Prompt Line */}
              <div className="flex flex-wrap items-center gap-2 text-slate-400">
                <span className="text-[#10B981] font-bold">developer@workstation</span>
                <span className="text-slate-500">:</span>
                <span className="text-[#22D3EE]">~/launchpad-app</span>
                <span className="text-slate-500">$</span>
                <span className="text-white font-semibold">{selectedPm.command}</span>
              </div>

              {/* Idle Prompt Hint */}
              {deployState === 'idle' && (
                <div className="text-slate-400 pl-4 border-l-2 border-slate-700 space-y-1.5 py-1">
                  <p>
                    Press <span className="text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Run Deploy</span> above to initiate automated edge isolation.
                  </p>
                  <p className="text-xs text-slate-500">
                    Propagates to 184 Anycast PoPs • Auto V8 MicroVM Snapshot • Brotli Zero-Copy
                  </p>
                </div>
              )}

              {/* Progressive Build Logs */}
              {deployState !== 'idle' && (
                <div className="space-y-2.5 pt-2">
                  {buildSteps.slice(0, buildStepIndex).map((step, idx) => {
                    const isLatest = idx === buildStepIndex - 1 && deployState === 'building'
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-start gap-2.5 ${
                          idx === buildSteps.length - 1
                            ? 'text-[#10B981] font-semibold'
                            : 'text-slate-200'
                        }`}
                      >
                        {idx === buildSteps.length - 1 ? (
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" strokeWidth={1.5} />
                        ) : isLatest ? (
                          <RotateCw className="w-4 h-4 text-[#22D3EE] animate-spin shrink-0 mt-0.5" strokeWidth={1.5} />
                        ) : (
                          <span className="text-slate-500 shrink-0">✓</span>
                        )}
                        <span>{step.label}</span>
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* Completed Deployment Card Banner */}
              <AnimatePresence>
                {deployState === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 pt-5 border-t border-[#6D28D9]/40 rounded-[14px] bg-[#1E124A]/80 p-4 border border-[#6D28D9]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                        <span className="text-xs uppercase tracking-wider font-semibold text-[#10B981]">
                          Production Live on Anycast Edge
                        </span>
                      </div>
                      <div className="text-white text-sm sm:text-base font-semibold tracking-tight">
                        https://{selectedPm.name}-app.launchpad.dev
                      </div>
                      <div className="text-xs text-slate-400">
                        SSL Active • HTTP/3 Ready • Global Latency: 11ms
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        aria-label={copiedLink ? 'Deployment URL copied to clipboard' : 'Copy deployment URL'}
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-[10px] bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium border border-white/10 transition-colors cursor-pointer min-h-[40px]"
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={1.5} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <a
                        href={`https://${selectedPm.name}-app.launchpad.dev`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-[10px] bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-mono font-medium transition-colors min-h-[40px]"
                      >
                        <span>Visit Live</span>
                        <ExternalLink className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Terminal Status Footer */}
            <div className="px-5 py-2.5 bg-[#0A0618] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  CLI v2.8.4
                </span>
                <span>Region: Global Anycast</span>
              </div>
              <div>
                Auto-TLS by Let&apos;s Encrypt • Zero Config
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Wave curve transition exiting dark interlude back to light canvas */}
      <WaveDivider variant="exit-dark" fill="#FAFAFC" backFill="#3B1E78" edgeColor="#8B5CF6" />
    </div>
  )
}

export default DarkInterlude
