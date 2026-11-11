import React, { useState, useRef, useEffect } from 'react'
import { useScroll, useSpring, useReducedMotion, useMotionValue, MotionValue } from 'framer-motion'
import { Zap, CheckCircle2, Mail, ArrowRight } from 'lucide-react'
import WaveDivider from '../art/WaveDivider'
import RocketArt from '../art/RocketArt'
import TelemetryCard from '../hero/TelemetryCard'
import TerminalSnippet from '../hero/TerminalSnippet'
import { HERO_CONTENT, SITE_CONFIG } from '../../data/content'
import { useBreakpoint } from '../../lib/useBreakpoint'

export interface HeroSectionProps {
  accent?: string
  showTelemetry?: boolean
  motion?: boolean
}

/**
 * Scroll-linked progress for the desktop hero only. Mounted only when the desktop view is
 * rendered so tablet/mobile never run a scroll listener + spring for a hidden target.
 */
const HeroScroll: React.FC<{
  enabled: boolean
  children: (heroRef: React.RefObject<HTMLElement | null>, progress: MotionValue<number> | null) => React.ReactNode
}> = ({ enabled, children }) => {
  const heroRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  })
  return <>{children(heroRef, enabled ? smoothProgress : null)}</>
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  accent = SITE_CONFIG.accentColor,
  showTelemetry = true,
  motion = true,
}) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const isScrollyActive = motion && !shouldReduceMotion
  const view = useBreakpoint()

  // The tablet layout renders the rocket in its fully "launched" pose (the previous hidden-target
  // scroll progress always resolved to 1 there), so use a constant instead of a live scroll spring.
  const tabletProgress = useMotionValue(1)
  const tabletActiveProgress = isScrollyActive ? tabletProgress : null

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Pause every infinite CSS / SMIL animation in the hero while it is scrolled out of view.
  useEffect(() => {
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        root.classList.toggle('lp-offscreen', !visible)
        root.querySelectorAll('svg').forEach((svg) => {
          if (visible) svg.unpauseAnimations()
          else svg.pauseAnimations()
        })
      },
      { rootMargin: '50px' }
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [view])

  const handleSubmit = (e: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!email) return
    setSubmitted(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      // Auto-reset state after delay
    }, 6000)
  }

  return (
    <div
      ref={rootRef}
      className={`lp-root ${motion ? '' : 'lp-still'}`}
      style={{
        width: '100%',
        minWidth: '320px',
        background: '#FAFAFC',
        color: '#0F172A',
        overflow: 'hidden',
      }}
    >
      {/* =========================================================
          1. DESKTOP VIEW (>= 1025px): Asymmetric Dual-Zone Split Layout
          ========================================================= */}
      {view === 'desktop' && (
      <HeroScroll enabled={isScrollyActive}>
      {(heroRef, activeProgress) => (
      <div className="lp-desktop-view">
        <section className="lp-hero" ref={heroRef}>
          {/* LEFT: Light conversion zone */}
          <div className="lp-left">
            {/* Hero Left Content */}
            <div
              className="lp-hero-content"
              style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingTop: '40px',
                maxWidth: '600px',
              }}
            >
              {/* Pill Badge */}
              <a
                href="#pricing"
                className="lp-pill-badge"
                style={{
                  alignSelf: 'flex-start',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 14px 7px 8px',
                  borderRadius: '999px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(139,92,246,0.35)',
                  boxShadow:
                    '0 0 0 4px rgba(139,92,246,0.07), 0 6px 20px -8px rgba(124,58,237,0.45)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#3B1E78',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '22px',
                    height: '22px',
                    borderRadius: '999px',
                    background: accent,
                  }}
                >
                  <Zap className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
                </span>
                <span>LaunchPad v2.0 is Live</span>
                <span aria-hidden="true" style={{ color: '#A78BFA' }}>
                  •
                </span>
                <span style={{ color: '#475569', fontWeight: 500 }}>Zero-Config Deployments</span>
              </a>

              {/* Single Main H1 (SOLID accent color, NEVER gradient text) */}
              <h1
                className="lp-hero-headline"
                style={{
                  margin: '28px 0 0',
                  fontSize: 'clamp(38px, 4.3vw, 60px)',
                  lineHeight: 1.06,
                  fontWeight: 800,
                  letterSpacing: '-0.035em',
                  color: '#0F172A',
                }}
              >
                Ship your code to production at the{' '}
                <span style={{ color: accent }}>speed of thought.</span>
              </h1>

              {/* Subhead */}
              <p
                className="lp-hero-subhead"
                style={{
                  margin: '22px 0 0',
                  fontSize: '18px',
                  lineHeight: 1.65,
                  color: '#475569',
                  maxWidth: '540px',
                }}
              >
                Instant preview environments, serverless edge compute, and automated CI/CD pipelines.
                Connect your Git repository and launch in 42 seconds.
              </p>

              {/* Terminal Snippet with copy command */}
              <TerminalSnippet variant="desktop" />

              {/* Email Signup Form */}
              <form
                onSubmit={handleSubmit}
                className="lp-hero-form"
                style={{
                  marginTop: '16px',
                  maxWidth: '520px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <label
                  htmlFor="lp-email"
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                    clip: 'rect(0 0 0 0)',
                  }}
                >
                  Work email
                </label>
                <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 0 }}>
                  <Mail
                    className="w-4 h-4 text-slate-500"
                    strokeWidth={1.5}
                    style={{ position: 'absolute', left: '16px', top: '16px' }}
                  />
                  <input
                    id="lp-email"
                    className="lp-input"
                    type="email"
                    placeholder="you@company.dev"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setSubmitted(false)
                    }}
                    style={{
                      width: '100%',
                      height: '48px',
                      padding: '0 16px 0 44px',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      background: '#FFFFFF',
                      fontFamily: 'inherit',
                      fontSize: '15px',
                      color: '#0F172A',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="lp-btn"
                  style={{
                    flex: '0 0 auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    height: '48px',
                    padding: '0 22px',
                    border: 'none',
                    borderRadius: '12px',
                    background: accent,
                    color: '#FFFFFF',
                    fontFamily: 'inherit',
                    fontSize: '15px',
                    fontWeight: 700,
                    boxShadow:
                      '0 8px 22px -10px rgba(109,40,217,0.7), inset 0 1px 0 rgba(255,255,255,0.22)',
                  }}
                >
                  <span>{submitted ? 'Launching…' : 'Deploy Free'}</span>
                  <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.8} />
                </button>
              </form>

              {/* Microcopy */}
              <p className="lp-hero-microcopy" style={{ margin: '12px 0 0', fontSize: '13px', color: '#64748B' }}>
                {submitted
                  ? 'Check your inbox — your launch link is on its way.'
                  : 'Free tier forever • No credit card required'}
              </p>

              {/* Micro checklist with CheckCircle icons */}
              <ul
                className="lp-hero-checklist"
                style={{
                  listStyle: 'none',
                  margin: '30px 0 0',
                  padding: 0,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px 26px',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#334155',
                }}
              >
                {HERO_CONTENT.checklist.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" strokeWidth={1.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: Celestial cosmic visual zone */}
          <div className="lp-right">
            {/* Wave Divider extends the celestial sky 159px into left side following organic S-curve */}
            <WaveDivider variant="side" scrollProgress={activeProgress} />

            {/* RocketArt renders the cosmic illustration and unified billowing launch clouds */}
            <RocketArt scrollProgress={activeProgress} preserveAspectRatio="xMinYMax slice" />

            {/* Docked telemetry glass card straddling wave */}
            {showTelemetry && <TelemetryCard variant="desktop" />}

            {/* Wave fallback bottom for responsive verification */}
            <WaveDivider variant="bottom" scrollProgress={activeProgress} />
          </div>
        </section>
      </div>
      )}
      </HeroScroll>
      )}

      {/* =========================================================
          2. TABLET VIEW (768px - 1024px, 834px iPad): Stacked Layout
          ========================================================= */}
      {view === 'tablet' && (
      <div className="lp-tablet-view">
        {/* Celestial Header (640px) */}
        <header
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '640px',
            background: 'linear-gradient(180deg, #0F0C20 0%, #1E124A 52%, #3B1E78 100%)',
          }}
        >
          <RocketArt
            viewBox="-160 0 1040 900"
            preserveAspectRatio="xMidYMax slice"
            scrollProgress={tabletActiveProgress}
          />

          {/* Docked telemetry card */}
          {showTelemetry && <TelemetryCard variant="tablet" style={{ left: '32px', bottom: '64px', width: '300px' }} />}

          {/* Bottom wave into light zone */}
          <WaveDivider variant="tablet" />
        </header>

        {/* 2-Column Conversion Section (Terminal on left, Signup on right) */}
        <div style={{ padding: '40px 56px 56px' }}>
          <a
            href="#pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 14px 7px 8px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '1px solid rgba(139,92,246,0.35)',
              boxShadow: '0 0 0 4px rgba(139,92,246,0.07), 0 6px 20px -8px rgba(124,58,237,0.45)',
              fontSize: '13px',
              fontWeight: 600,
              color: '#3B1E78',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '22px',
                height: '22px',
                borderRadius: '999px',
                background: accent,
              }}
            >
              <Zap className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
            </span>
            <span>LaunchPad v2.0 is Live</span>
            <span aria-hidden="true" style={{ color: '#A78BFA' }}>•</span>
            <span style={{ color: '#475569', fontWeight: 500 }}>Zero-Config Deployments</span>
          </a>

          <h2
            style={{
              margin: '26px 0 0',
              maxWidth: '680px',
              fontSize: '52px',
              lineHeight: 1.07,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#0F172A',
            }}
          >
            {HERO_CONTENT.headlineLead}
            <span style={{ color: accent }}>{HERO_CONTENT.headlineAccent}</span>
          </h2>

          <p style={{ margin: '20px 0 0', maxWidth: '620px', fontSize: '18px', lineHeight: 1.65, color: '#475569' }}>
            {HERO_CONTENT.subhead}
          </p>

          <div
            style={{
              marginTop: '32px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '16px',
              alignItems: 'start',
            }}
          >
            {/* Col 1: Terminal */}
            <TerminalSnippet variant="tablet" style={{ marginTop: 0 }} />

            {/* Col 2: Signup form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label htmlFor="lp-email-t" style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
                Work email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  className="w-4 h-4 text-slate-500"
                  strokeWidth={1.5}
                  style={{ position: 'absolute', left: '16px', top: '16px' }}
                />
                <input
                  id="lp-email-t"
                  className="lp-input"
                  type="email"
                  placeholder="you@company.dev"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setSubmitted(false)
                  }}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px 0 44px',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    fontFamily: 'inherit',
                    fontSize: '15px',
                    color: '#0F172A',
                  }}
                />
              </div>
              <button
                type="submit"
                className="lp-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  height: '48px',
                  border: 'none',
                  borderRadius: '12px',
                  background: accent,
                  color: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '15px',
                  fontWeight: 700,
                  boxShadow: '0 8px 22px -10px rgba(109,40,217,0.7), inset 0 1px 0 rgba(255,255,255,0.22)',
                }}
              >
                <span>{submitted ? 'Launching…' : HERO_CONTENT.ctaButtonText}</span>
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.8} />
              </button>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748B' }}>
                {submitted ? 'Check your inbox — your launch link is on its way.' : HERO_CONTENT.microcopy}
              </p>
            </form>
          </div>

          <ul
            style={{
              listStyle: 'none',
              margin: '30px 0 0',
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 28px',
              fontSize: '14.5px',
              fontWeight: 600,
              color: '#334155',
            }}
          >
            {HERO_CONTENT.checklist.map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" strokeWidth={1.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      )}

      {/* =========================================================
          3. MOBILE VIEW (< 768px, 390px iPhone): Stacked Layout
          ========================================================= */}
      {view === 'mobile' && (
      <div className="lp-mobile-view">
        {/* Celestial Header (600px) */}
        <header
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '600px',
            background: 'linear-gradient(180deg, #0F0C20 0%, #1E124A 52%, #3B1E78 100%)',
          }}
        >
          <RocketArt
            viewBox="0 0 720 900"
            preserveAspectRatio="xMidYMax slice"
            scrollProgress={null}
          />

          {/* Docked telemetry card */}
          {showTelemetry && (
            <TelemetryCard
              variant="mobile"
              style={{
                left: '16px',
                bottom: '30px',
                width: 'calc(100% - 32px)',
                maxWidth: '320px',
              }}
            />
          )}

          {/* Mobile bottom wave divider */}
          <WaveDivider variant="mobile" />
        </header>

        {/* Bottom Light Section (Thumb-reach signup form FIRST, terminal snippet, checklist card) */}
        <div style={{ padding: '32px 20px 48px' }}>
          <a
            href="#pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px 6px 6px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '1px solid rgba(139,92,246,0.35)',
              boxShadow: '0 0 0 3px rgba(139,92,246,0.07)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#3B1E78',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '999px',
                background: accent,
              }}
            >
              <Zap className="w-3 h-3 text-white" strokeWidth={1.8} />
            </span>
            <span>LaunchPad v2.0 is Live</span>
          </a>

          <h2
            style={{
              margin: '20px 0 0',
              fontSize: '34px',
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#0F172A',
            }}
          >
            {HERO_CONTENT.headlineLead}
            <span style={{ color: accent }}>{HERO_CONTENT.headlineAccent}</span>
          </h2>

          <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
            {HERO_CONTENT.subhead}
          </p>

          {/* Thumb-reach signup form FIRST */}
          <form onSubmit={handleSubmit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label htmlFor="lp-email-m" style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
              Work email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                className="w-4 h-4 text-slate-500"
                strokeWidth={1.5}
                style={{ position: 'absolute', left: '16px', top: '16px' }}
              />
              <input
                id="lp-email-m"
                className="lp-input"
                type="email"
                placeholder="you@company.dev"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSubmitted(false)
                }}
                style={{
                  width: '100%',
                  height: '48px',
                  padding: '0 16px 0 44px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '15px',
                  color: '#0F172A',
                }}
              />
            </div>
            <button
              type="submit"
              className="lp-btn"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '48px',
                border: 'none',
                borderRadius: '12px',
                background: accent,
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '15px',
                fontWeight: 700,
              }}
            >
              <span>{submitted ? 'Launching…' : HERO_CONTENT.ctaButtonText}</span>
              <ArrowRight className="w-4 h-4 text-white" strokeWidth={1.8} />
            </button>
            <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
              {submitted ? 'Check your inbox — your link is on its way.' : HERO_CONTENT.microcopy}
            </p>
          </form>

          {/* Terminal Snippet */}
          <div style={{ marginTop: '20px' }}>
            <TerminalSnippet variant="mobile" />
          </div>

          {/* Checklist Card */}
          <div
            style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '14px',
              background: '#FFFFFF',
              border: '1px solid #EEF0F5',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#334155',
              }}
            >
              {HERO_CONTENT.checklist.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 className="w-4 h-4 text-[#6D28D9]" strokeWidth={1.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default HeroSection
