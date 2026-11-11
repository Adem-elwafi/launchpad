import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, ArrowRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react'

export default function Footer() {
  const productLinks = [
    { name: 'Edge Network', href: '#network' },
    { name: 'Atomic Rollbacks', href: '#features' },
    { name: 'Interactive CLI', href: '#terminal' },
    { name: 'Preview Deployments', href: '#features' },
    { name: 'Serverless Compute', href: '#features' },
    { name: 'Custom Domains & SSL', href: '#pricing' },
    { name: 'Enterprise Clusters', href: '#pricing' },
    { name: 'Changelog', href: '#changelog' },
  ]

  const developerLinks = [
    { name: 'Documentation', href: '#docs' },
    { name: 'CLI Quickstart', href: '#terminal' },
    { name: 'REST API Specs', href: '#api' },
    { name: 'SDKs (Node, Python, Go)', href: '#sdks' },
    { name: 'GitHub Action', href: '#github-action' },
    { name: 'Architecture Whitepaper', href: '#whitepaper' },
    { name: 'Telemetry & Metrics', href: '#metrics' },
    { name: 'Status Page', href: '#status' },
  ]

  const companyLinks = [
    { name: 'About LaunchPad', href: '#about' },
    { name: 'Customer Stories', href: '#customers' },
    { name: 'Orbit Engineering Blog', href: '#blog' },
    { name: 'Careers', href: '#careers', badge: 'We’re Hiring' },
    { name: 'Brand Assets & Media', href: '#brand' },
    { name: 'Security & Compliance (SOC2)', href: '#security' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Contact Flight Control', href: '#contact' },
  ]

  return (
    <footer className="bg-[#0F0C20] text-slate-300 relative overflow-hidden border-t border-[#1E124A]">
      {/* Subtle cosmic background gradient stars and meshes */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-[#6D28D9]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-[#22D3EE]/15 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* High-Converting Pre-Footer CTA Card */}
        <div className="py-16 sm:py-20">
          <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-[#6D28D9]/40 bg-gradient-to-br from-[#1E124A]/90 via-[#0F0C20]/95 to-[#3B1E78]/80 shadow-2xl shadow-[#6D28D9]/25 backdrop-blur-xl">
            {/* Ambient vector glow accent */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-bl from-[#22D3EE]/30 via-[#6D28D9]/40 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6D28D9]/30 border border-[#6D28D9]/50 text-[#22D3EE] font-mono text-xs tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                Ready for Takeoff
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to ship your next idea into orbit?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Join over 40,000 engineers deploying high-velocity applications on LaunchPad’s planetary edge network. Zero config, instant atomic rollbacks, and global acceleration out of the box.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-7 py-3.5 rounded-xl font-semibold text-white hover:text-white bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] shadow-lg shadow-[#6D28D9]/40 hover:shadow-xl hover:shadow-[#6D28D9]/50 flex items-center justify-center gap-2 text-base transition-all duration-200 cursor-pointer"
                >
                  <span className="text-white">Get Started for Free</span>
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.2} />
                </motion.a>

                <a
                  href="#terminal"
                  className="px-6 py-3.5 rounded-xl font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-slate-700/80 hover:border-slate-500 flex items-center justify-center gap-2 text-base transition-all duration-200"
                >
                  <Terminal className="w-4 h-4 text-[#22D3EE]" strokeWidth={2} />
                  <span>Explore Interactive CLI</span>
                </a>
              </div>

              {/* Trust Value Micro-proof */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Instant CLI deployment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>100 GB free monthly edge egress</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Navigation Link Grid */}
        <div className="py-12 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Description (spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6D28D9] to-[#22D3EE] flex items-center justify-center shadow-md shadow-[#6D28D9]/30">
                <Rocket className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Launch<span className="text-[#22D3EE]">Pad</span>
              </span>
            </a>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              The next-generation cloud runtime for frontend and edge architectures. Built for engineering teams who refuse to compromise on velocity, cold boot latency, or observability.
            </p>

            {/* Clean Inline SVG Social Icons (Zero-clip-art, no missing lucide imports) */}
            <div className="pt-2 flex items-center gap-3">
              {/* GitHub Clean Inline SVG */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LaunchPad GitHub Repository"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              {/* X / Twitter Clean Inline SVG */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LaunchPad on X"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Discord Clean Inline SVG */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LaunchPad Community Discord"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-100">
              Product
            </p>
            <ul className="space-y-2 text-sm">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-[#22D3EE] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-100">
              Developers
            </p>
            <ul className="space-y-2 text-sm">
              {developerLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-[#22D3EE] transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-100">
              Company
            </p>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-[#22D3EE] transition-colors inline-flex items-center gap-2"
                  >
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#6D28D9]/40 text-[#22D3EE] border border-[#6D28D9]">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Global System Status Bar */}
        <div className="py-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-3">
            {/* Live Status Beacon */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="text-slate-300">All Global Systems Operational - 184 PoPs</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <span>© 2026 LaunchPad Technologies Inc.</span>
            <a href="#privacy" className="text-slate-400 hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-slate-400 hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#security" className="text-slate-400 hover:text-slate-200 transition-colors">Security (SOC2)</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
