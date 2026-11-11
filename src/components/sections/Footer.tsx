import React from 'react'
import { Rocket } from 'lucide-react'
import { FOOTER_CONTENT, SITE_CONFIG } from '../../data/content'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0C20] text-slate-300 relative overflow-hidden">
      {/* Background subtle cosmic depth */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-32 right-10 w-[450px] h-[450px] bg-[#6D28D9]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-5 left-10 w-[400px] h-[400px] bg-[#22D3EE]/10 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 4 Link Columns + Brand Column */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand & Description (spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-xl p-1 w-fit">
              <span className="w-9 h-9 rounded-[10px] bg-gradient-to-tr from-[#6D28D9] to-[#22D3EE] flex items-center justify-center shadow-md shadow-[#6D28D9]/30 group-hover:scale-105 transition-transform duration-200">
                <Rocket className="w-5 h-5 text-white" strokeWidth={1.5} />
              </span>
              <span className="text-xl font-extrabold tracking-[-0.03em] text-white">
                {SITE_CONFIG.name}
              </span>
            </a>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {FOOTER_CONTENT.brandDescription}
            </p>

            {/* Social wordmarks / icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Repository"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 4 Navigation Link Columns (Product, Developers, Company, Legal) */}
          {FOOTER_CONTENT.columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-100">
                {column.title}
              </p>
              <ul className="space-y-2.5 text-sm">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-[#22D3EE] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Legal & Global System Status Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          {/* Status Pill with Green Pulse */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span>{FOOTER_CONTENT.statusText}</span>
          </div>

          {/* Copyright Notice */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <span>{FOOTER_CONTENT.copyright}</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
