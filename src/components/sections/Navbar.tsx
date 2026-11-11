import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Menu, X, ArrowRight } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '../../data/content'
import Button from '../ui/Button'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? 'bg-[#FAFAFC]/95 backdrop-blur-md border-[#EEF0F5] shadow-xs py-3'
          : 'bg-[#FAFAFC]/95 backdrop-blur-md border-[#EEF0F5] py-4 min-[1025px]:bg-transparent min-[1025px]:backdrop-blur-none min-[1025px]:border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-[1025px]:max-w-none min-[1025px]:pl-20 min-[1025px]:pr-10">
        <div className="flex items-center justify-between h-12 md:h-14">
          
          {/* Brand Mark: rocket in rounded square + "LaunchPad" */}
          <a href="#" className="flex items-center gap-2.5 min-[1025px]:mr-9 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-xl p-1">
            <span
              className="w-[34px] h-[34px] rounded-[10px] bg-[#0F0C20] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200"
            >
              <Rocket className="w-4 h-4 text-[#C4B5FD]" strokeWidth={1.5} />
            </span>
            <span className="text-[19px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
              {SITE_CONFIG.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden min-[1025px]:flex min-[1025px]:mr-auto items-center gap-6 text-[14.5px] font-medium" aria-label="Primary Navigation">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[#475569] hover:text-[#0F172A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-md px-1 py-0.5 ${
                  i === 3 ? 'hidden min-[1280px]:inline' : i >= 4 ? 'hidden min-[1440px]:inline' : ''
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Desktop Actions */}
          <div className="hidden min-[1025px]:flex items-center gap-3">
            {scrolled ? (
              <>
                <a
                  href="#signin"
                  className="inline-flex items-center justify-center h-11 px-4 rounded-[11px] text-[14.5px] font-semibold text-[#0F172A] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                >
                  Sign in
                </a>
                <Button
                  asLink
                  href="#pricing"
                  variant="primary"
                  size="md"
                  className="!h-11 !px-5 !rounded-[11px] text-[14.5px]"
                >
                  <span>Start deploying</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>
              </>
            ) : (
              <>
                {/* Over the dark celestial zone of the hero */}
                <a
                  href="#network"
                  className="px-3 text-[14.5px] font-medium text-[#DDD6FE] hover:text-white transition-colors"
                >
                  Status
                </a>
                <a
                  href="#signin"
                  className="inline-flex items-center h-11 px-4 rounded-[11px] border border-white/20 text-[14.5px] font-semibold !text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                >
                  Sign in
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center h-11 px-[18px] rounded-[11px] bg-white text-[14.5px] font-bold !text-[#3B1E78] hover:bg-[#F5F3FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                >
                  Start deploying
                </a>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 min-[1025px]:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2.5 rounded-xl text-slate-700 hover:text-[#0F0C20] hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={1.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Animated Glass Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            role="region"
            aria-label="Mobile Navigation Drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="min-[1025px]:hidden border-b border-[#EEF0F5] bg-white/95 backdrop-blur-xl overflow-hidden shadow-lg"
          >
            <div className="px-5 pt-3 pb-6 space-y-4">
              <nav className="flex flex-col space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-[#0F0C20] hover:bg-slate-100 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>

              <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2.5">
                <a
                  href="#signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-700 hover:text-[#0F0C20] bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  Sign in
                </a>
                <Button
                  asLink
                  href="#pricing"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  <span>Start deploying</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
