import React, { useState } from 'react'
import { Radio, Wifi, Zap, Activity, Globe2 } from 'lucide-react'
import NetworkGlobeArt from '../art/NetworkGlobeArt'
import { EDGE_POPS, EDGE_NETWORK_CONTENT, SITE_CONFIG, EdgeLocation } from '../../data/content'

export const EdgeNetwork: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<EdgeLocation>(EDGE_POPS[0]) // IAD1 default
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('ALL')

  const regions = ['ALL', 'Americas', 'Europe', 'Asia-Pacific', 'Middle East & Africa']

  const filteredNodes = selectedRegionFilter === 'ALL'
    ? EDGE_POPS
    : EDGE_POPS.filter((node) => node.region === selectedRegionFilter)

  return (
    <section id="network" className="py-24 sm:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Background Subtle Coordinate Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(#0F0C20 1px, transparent 1px), linear-gradient(90deg, #0F0C20 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (SOLID accent color, NEVER gradient text) */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/10 border border-[#6D28D9]/20 text-[#6D28D9] text-xs font-mono font-semibold tracking-wider uppercase mb-5">
            <Radio className="w-3.5 h-3.5 text-[#6D28D9] animate-pulse" strokeWidth={1.5} />
            {EDGE_NETWORK_CONTENT.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0C20] tracking-tight leading-[1.15] mb-5">
            Anycast routing across{' '}
            <span style={{ color: SITE_CONFIG.accentColor }}>{SITE_CONFIG.edgeLocationsCount}+ edge locations</span>
          </h2>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto">
            {EDGE_NETWORK_CONTENT.subhead}
          </p>

          {/* Region Filter Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Edge Regions">
            {regions.map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegionFilter(region)}
                aria-pressed={selectedRegionFilter === region}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] min-h-[40px] ${
                  selectedRegionFilter === region
                    ? 'bg-[#6D28D9] text-white shadow-xs'
                    : 'bg-white border border-[#E2E8F0] text-slate-700 hover:bg-slate-50'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Placeholder Stat Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-5xl mx-auto">
          {EDGE_NETWORK_CONTENT.stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 rounded-[18px] bg-white border border-[#EEF0F5] shadow-xs text-center"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#0F172A] tracking-tight">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-semibold text-[#64748B] uppercase tracking-wider font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Node Status Banner / Live Telemetry Card */}
        <div className="max-w-4xl mx-auto mb-10 rounded-[18px] bg-white border border-[#EEF0F5] shadow-sm p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Left: Node Info */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="relative w-12 h-12 rounded-[12px] bg-[#6D28D9]/10 border border-[#6D28D9]/30 flex items-center justify-center shrink-0">
                <Radio className="w-6 h-6 text-[#6D28D9] z-10" strokeWidth={1.5} />
                <span className="absolute inset-0 rounded-[12px] bg-[#6D28D9]/20 animate-ping opacity-75" />
              </div>

              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#0F172A]">
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
            <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Wifi className="w-3 h-3 text-[#10B981]" strokeWidth={1.5} />
                  Edge Ping
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-slate-900">
                    {selectedNode.ping}
                  </span>
                  <span className="text-xs font-mono font-semibold text-emerald-600">ms</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#6D28D9]" strokeWidth={1.5} />
                  Throughput
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-slate-900">
                    {selectedNode.throughput}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#6D28D9]">Gbps</span>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-600" strokeWidth={1.5} />
                  Load
                </div>
                <div className="text-xs sm:text-sm font-extrabold font-mono text-slate-800 mt-2 truncate">
                  {selectedNode.requests}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract Dotted World Map Viewport */}
        <div className="rounded-[24px] border border-slate-800 bg-[#0F0C20] shadow-[0_25px_60px_rgba(15,12,32,0.12)] p-4 sm:p-8 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 px-2 relative z-10">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.5} />
              <span className="text-white font-semibold">ANYCAST GLOBAL TOPOLOGY</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                184 Active PoPs
              </span>
              <span>•</span>
              <span>99.999% SLA</span>
            </div>
          </div>

          <div className="relative w-full aspect-[2/1] select-none">
            <NetworkGlobeArt
              nodes={filteredNodes}
              selectedNodeId={selectedNode.id}
              onSelectNode={setSelectedNode}
            />
          </div>

          {/* Quick Node Selector (for accessible keyboard and touch navigation) */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-2 relative z-10" role="group" aria-label="Edge Node Quick Select">
            <span className="text-xs font-mono text-slate-400 mr-2">Quick PoP Select:</span>
            {EDGE_POPS.map((pop) => (
              <button
                key={pop.id}
                type="button"
                onClick={() => setSelectedNode(pop)}
                aria-pressed={selectedNode.id === pop.id}
                aria-label={`Select ${pop.id} edge node, ${pop.ping} millisecond latency`}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-mono font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] min-h-[36px] ${
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

export default EdgeNetwork
