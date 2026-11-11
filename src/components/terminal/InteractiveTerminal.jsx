import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Terminal as TerminalIcon, 
  Play, 
  RotateCw, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Code2
} from 'lucide-react'

const FRAMEWORKS = [
  {
    id: 'nextjs',
    name: 'Next.js',
    badge: 'App Router / SSR',
    command: 'npx launchpad deploy --prod',
    outputDir: '.next/standalone',
    size: '42.8 kB WASM',
    sampleCode: `// app/api/edge/route.ts
export const runtime = 'edge';

export async function GET(req: Request) {
  return Response.json({
    status: 'optimal',
    region: process.env.LP_REGION,
    bootLatency: '3.4ms'
  });
}`
  },
  {
    id: 'vite',
    name: 'Vite / React',
    badge: 'Single Page App',
    command: 'vite build && launchpad deploy',
    outputDir: 'dist/',
    size: '34.2 kB WASM',
    sampleCode: `// src/entry-edge.tsx
import { renderToReadableStream } from 'react-dom/server';
import App from './App';

export default async function handle(request) {
  const stream = await renderToReadableStream(<App />);
  return new Response(stream, { headers: { 'content-type': 'text/html' } });
}`
  },
  {
    id: 'astro',
    name: 'Astro',
    badge: 'Content & Hybrid',
    command: 'astro build && launchpad deploy',
    outputDir: '.astro/dist',
    size: '18.6 kB WASM',
    sampleCode: `---
// src/pages/index.astro
export const prerender = false;
const edgeTime = new Date().toISOString();
---
<html>
  <body>Edge generated at {edgeTime}</body>
</html>`
  },
  {
    id: 'remix',
    name: 'Remix',
    badge: 'Full Stack Web',
    command: 'remix build && launchpad deploy',
    outputDir: 'build/client',
    size: '38.1 kB WASM',
    sampleCode: `// app/routes/index.tsx
import { json } from "@remix-run/cloudflare";

export const loader = async () => {
  return json({ message: "Hello from LaunchPad Edge" });
};`
  }
]

export default function InteractiveTerminal() {
  const [selectedFramework, setSelectedFramework] = useState(FRAMEWORKS[0])
  const [deployState, setDeployState] = useState('idle') // 'idle' | 'building' | 'complete'
  const [buildStepIndex, setBuildStepIndex] = useState(0)
  const [copiedLink, setCopiedLink] = useState(false)
  const timersRef = useRef([])
  const copyTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    }
  }, [])

  const steps = [
    { label: '⚡ launchpad v2.8.4 linking local workspace...', delay: 200 },
    { label: `📦 Detected ${selectedFramework.name} • Compiling edge bundles...`, delay: 450 },
    { label: `🔨 Optimizing WASM microVM isolates (bundle: ${selectedFramework.size})`, delay: 850 },
    { label: '🌐 Replicating zero-copy snapshots across 180+ Anycast PoPs...', delay: 1150 },
    { label: '✨ Deployed to global production in 1.42s!', delay: 1400 }
  ]

  const triggerDeploy = () => {
    if (deployState === 'building') return
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    setDeployState('building')
    setBuildStepIndex(0)

    // Schedule progressive logs across 1.4 seconds
    steps.forEach((step, index) => {
      const id = setTimeout(() => {
        setBuildStepIndex(index + 1)
        if (index === steps.length - 1) {
          setDeployState('complete')
        }
      }, step.delay)
      timersRef.current.push(id)
    })
  }

  // Handle Copy Deploy Link
  const handleCopyLink = () => {
    const url = `https://${selectedFramework.id}-edge-demo.launchpad.dev`
    navigator.clipboard?.writeText(url)
    setCopiedLink(true)
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopiedLink(false), 2000)
  }

  const handleSelectFramework = (fw) => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setSelectedFramework(fw)
    setDeployState('idle')
    setBuildStepIndex(0)
  }

  return (
    <section className="py-24 sm:py-32 bg-[#0F0C20] relative overflow-hidden text-white">
      {/* Subtle Violet & Cyan Ambient Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#6D28D9]/25 via-[#3B1E78]/20 to-[#22D3EE]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6D28D9]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Coordinate Grid Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#FAFAFC 1px, transparent 1px), linear-gradient(90deg, #FAFAFC 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/20 border border-[#6D28D9]/40 text-[#22D3EE] text-xs font-mono font-semibold tracking-wider uppercase mb-5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            CLI & Git Integrated
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
            Deploy in seconds.{' '}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent">
              Zero configuration.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Run a single terminal command or connect your Git repo. LaunchPad automatically detects your framework, bundles WebAssembly isolates, and propagates to 180+ edge nodes.
          </p>
        </div>

        {/* Framework Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8" role="tablist" aria-label="Deployment framework selector">
          {FRAMEWORKS.map((fw) => {
            const isSelected = selectedFramework.id === fw.id
            return (
              <button
                key={fw.id}
                role="tab"
                id={`tab-${fw.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${fw.id}`}
                onClick={() => handleSelectFramework(fw)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] ${
                  isSelected
                    ? 'bg-[#6D28D9] text-white shadow-[0_0_20px_rgba(109,40,217,0.4)] border border-[#8B5CF6]/50'
                    : 'bg-[#1E124A]/60 text-slate-300 hover:text-white hover:bg-[#1E124A] border border-white/5'
                }`}
              >
                <span>{fw.name}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  {fw.badge}
                </span>
              </button>
            )
          })}
        </div>

        {/* Terminal Window Mockup */}
        <div 
          id={`panel-${selectedFramework.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${selectedFramework.id}`}
          className="max-w-4xl mx-auto rounded-2xl border border-[#6D28D9]/30 bg-[#0F0C20]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          
          {/* Terminal Title Bar */}
          <div className="px-4 py-3 bg-[#1A1238]/80 border-b border-[#6D28D9]/20 flex items-center justify-between gap-4">
            {/* Window Controls */}
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
              <div className="hidden sm:flex items-center gap-2 ml-3 text-xs font-mono text-slate-400">
                <TerminalIcon className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>launchpad-cli — {selectedFramework.name.toLowerCase()} — 80x24</span>
              </div>
            </div>

            {/* Run Deploy Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={triggerDeploy}
                disabled={deployState === 'building'}
                aria-label={
                  deployState === 'building'
                    ? 'Compiling edge bundle'
                    : deployState === 'complete'
                    ? 'Re-deploy edge bundle'
                    : 'Run edge deploy simulation'
                }
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-300 cursor-pointer ${
                  deployState === 'building'
                    ? 'bg-[#6D28D9]/50 text-slate-300 cursor-not-allowed'
                    : 'bg-[#6D28D9] hover:bg-[#7C3AED] text-white shadow-[0_0_15px_rgba(109,40,217,0.5)] active:scale-98'
                }`}
              >
                {deployState === 'building' ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin text-[#22D3EE]" />
                    <span>Compiling 1.4s...</span>
                  </>
                ) : deployState === 'complete' ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 text-[#22D3EE]" />
                    <span>Re-deploy</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Deploy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-7 font-mono text-xs sm:text-sm space-y-4">
            
            {/* Command Prompt Line */}
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-[#10B981] font-bold">user@workstation</span>
              <span className="text-slate-500">:</span>
              <span className="text-[#22D3EE]">~/launchpad-app</span>
              <span className="text-slate-500">$</span>
              <span className="text-white font-semibold">{selectedFramework.command}</span>
            </div>

            {/* Initial Idle Hint or Building Progress */}
            {deployState === 'idle' && (
              <div className="text-slate-400 pl-4 border-l-2 border-slate-700 space-y-2 py-2">
                <p>Press <span className="text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Run Deploy</span> above to initiate the sub-1.4s edge compilation pipeline.</p>
                <div className="text-slate-500 text-xs font-mono">
                  Target: 180 Anycast Edge PoPs • Auto V8 Snapshot • Brotli Compression
                </div>
              </div>
            )}

            {/* Build Simulation Logs */}
            {deployState !== 'idle' && (
              <div className="space-y-2.5 pt-2">
                {steps.slice(0, buildStepIndex).map((step, idx) => {
                  const isLatest = idx === buildStepIndex - 1 && deployState === 'building'
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start gap-2.5 ${
                        idx === steps.length - 1
                          ? 'text-[#10B981] font-semibold'
                          : 'text-slate-200'
                      }`}
                    >
                      {idx === steps.length - 1 ? (
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      ) : isLatest ? (
                        <RotateCw className="w-4 h-4 text-[#22D3EE] animate-spin shrink-0 mt-0.5" />
                      ) : (
                        <span className="text-slate-500 shrink-0">✓</span>
                      )}
                      <span>{step.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Deploy Success Banner and URL Card */}
            <AnimatePresence>
              {deployState === 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 pt-5 border-t border-[#6D28D9]/30 rounded-xl bg-[#1E124A]/70 p-4 border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#10B981]">
                        Production Live on Anycast Edge
                      </span>
                    </div>
                    <div className="text-white text-sm sm:text-base font-semibold tracking-tight">
                      https://{selectedFramework.id}-edge-demo.launchpad.dev
                    </div>
                    <div className="text-xs text-slate-400">
                      SSL Active • HTTP/3 Ready • Global Latency: 11ms
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyLink}
                      aria-label={copiedLink ? 'Deployment URL copied to clipboard' : 'Copy deployment URL'}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium border border-white/10 transition-colors cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#10B981]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://${selectedFramework.id}-edge-demo.launchpad.dev`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#6D28D9] hover:bg-[#7C3AED] text-white hover:text-white text-xs font-mono font-medium transition-colors"
                    >
                      <span className="text-white">Visit Live</span>
                      <ExternalLink className="w-3.5 h-3.5 text-white" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Embedded Source Code Snippet Preview */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#22D3EE]" />
                  Edge Entry Point ({selectedFramework.name})
                </span>
                <span className="text-slate-500 font-mono">WASM target: isolate-v8</span>
              </div>
              <pre className="p-3 rounded-lg bg-[#0A0716] border border-white/5 text-slate-300 text-xs overflow-x-auto">
                <code>{selectedFramework.sampleCode}</code>
              </pre>
            </div>

          </div>

          {/* Terminal Footer Status Bar */}
          <div className="px-5 py-2.5 bg-[#0D0A1C] border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
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
  )
}
