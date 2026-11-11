import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Menu, X, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Reveal sticky navigation when scrolled past the hero section
      setScrolled(window.scrollY > 420)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Interactive CLI', href: '#terminal' },
    { name: 'Edge Network', href: '#network' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Docs', href: '#docs' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'translate-y-0 opacity-100 bg-[#FAFAFC]/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Mark & Version Badge */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0F0C20] via-[#1E124A] to-[#6D28D9] flex items-center justify-center shadow-md shadow-[#6D28D9]/20 group-hover:shadow-lg group-hover:shadow-[#6D28D9]/30 transition-all duration-300">
                <Rocket className="w-5 h-5 text-[#22D3EE] group-hover:scale-110 transition-transform duration-300" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#0F0C20]">
                  Launch<span className="text-[#6D28D9]">Pad</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#6D28D9]/10 text-[#6D28D9] border border-[#6D28D9]/20 tracking-wide">
                  v2.0
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-600 hover:text-[#0F0C20] rounded-lg hover:bg-slate-100/70 transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-4">
            {/* System Status Indicator */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100/80 border border-slate-200 text-xs font-mono text-slate-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span>All systems nominal</span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            {/* Sign in Ghost Link */}
            <a
              href="#signin"
              className="text-sm font-medium text-slate-600 hover:text-[#0F0C20] transition-colors"
            >
              Sign in
            </a>

            {/* Deploy Free Pill Button */}
            <motion.a
              href="#pricing"
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white hover:text-white bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] shadow-sm shadow-[#6D28D9]/25 hover:shadow-md hover:shadow-[#6D28D9]/35 transition-all duration-200 cursor-pointer"
            >
              <span className="text-white">Deploy Free</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Status indicator on mobile */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-mono text-slate-600 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Nominal</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0F0C20] hover:bg-slate-100 transition-colors focus:outline-hidden"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            role="region"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden border-b border-slate-200 bg-[#FAFAFC]/95 backdrop-blur-xl overflow-hidden shadow-lg"
          >
            <div className="px-5 pt-3 pb-6 space-y-4">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-[#0F0C20] hover:bg-slate-100 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-3">
                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="text-xs font-mono text-slate-600">Edge Network Status</span>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#10B981]">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    All systems nominal
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="#signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0F0C20] bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Sign in
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white hover:text-white bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] shadow-sm shadow-[#6D28D9]/25 flex items-center justify-center gap-1.5"
                  >
                    <span className="text-white">Deploy Free</span>
                    <ArrowRight className="w-4 h-4 text-white" strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
