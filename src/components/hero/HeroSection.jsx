import React, { useState, useRef, useEffect } from 'react';
import { useScroll, useSpring, useReducedMotion } from 'framer-motion';
import WaveDivider from './WaveDivider';
import RocketArt from './RocketArt';
import TelemetryCard from './TelemetryCard';
import TerminalSnippet from './TerminalSnippet';

/**
 * HeroSection component
 * 1:1 Pixel-perfect responsive implementation identical to the reference prototype bundle:
 * 1. DESKTOP (>= 1025px): Signature dual-zone split (.lp-hero, .lp-left, .lp-right) with seamless S-curve clouds
 * 2. TABLET (768px - 1024px, 834px iPad): Stacked celestial header (640px) + bottom light section (2-col grid)
 * 3. MOBILE (< 768px, 390px iPhone): Stacked celestial header (600px) with hamburger & sheet + bottom light section (form first)
 */
export default function HeroSection({
  accent = '#6D28D9',
  showTelemetry = true,
  motion = true,
}) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timerRef = useRef(null);
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isScrollyActive = motion && !shouldReduceMotion;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const activeProgress = isScrollyActive ? smoothProgress : null;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Auto-reset state after delay
    }, 6000);
  };

  return (
    <div
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
          1. DESKTOP VIEW (>= 1025px): Dual-Zone Split Layout
          ========================================================= */}
      <div className="lp-desktop-view">
        <section className="lp-hero" ref={heroRef}>
          {/* LEFT: Light conversion zone */}
          <div className="lp-left">
            {/* Top navigation (left) */}
            <nav
              className="lp-nav-left"
              aria-label="Primary"
              style={{ display: 'flex', alignItems: 'center', gap: '36px', height: '48px' }}
            >
              <a href="#" className="lp-nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0F172A' }}>
                <span
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#0F0C20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C4B5FD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </span>
                <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.03em' }}>
                  LaunchPad
                </span>
              </a>

              <div className="lp-nav-links" style={{ display: 'flex', gap: '26px', fontSize: '14.5px', fontWeight: 500 }}>
                <a href="#features">Product</a>
                <a href="#network">Edge Network</a>
                <a href="#pricing">Pricing</a>
                <a href="#docs">Docs</a>
                <a href="#changelog">Changelog</a>
              </div>
            </nav>

            {/* Hero Content */}
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
                href="#"
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
                  <svg
                    aria-hidden="true"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                  </svg>
                </span>
                <span>LaunchPad v2.0 is Live</span>
                <span aria-hidden="true" style={{ color: '#A78BFA' }}>
                  •
                </span>
                <span style={{ color: '#475569', fontWeight: 500 }}>Zero-Config Deployments</span>
              </a>

              {/* Headline */}
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

              {/* Terminal */}
              <TerminalSnippet variant="desktop" />

              {/* Email signup */}
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
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#64748B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ position: 'absolute', left: '15px', top: '15px' }}
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <input
                    id="lp-email"
                    className="lp-input"
                    type="email"
                    placeholder="you@company.dev"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setSubmitted(false);
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
                  <svg
                    aria-hidden="true"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>

              <p className="lp-hero-microcopy" style={{ margin: '12px 0 0', fontSize: '13px', color: '#64748B' }}>
                {submitted
                  ? 'Check your inbox — your launch link is on its way.'
                  : 'Free tier forever • No credit card required'}
              </p>

              {/* Micro checklist */}
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
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Instant Rollbacks
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Edge Caching
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  99.99% SLA
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Celestial cosmic visual zone */}
          <div className="lp-right">
            <RocketArt scrollProgress={activeProgress} preserveAspectRatio="xMinYMax slice" />
            <WaveDivider variant="side" scrollProgress={activeProgress} />

            {/* Top bar (right) */}
            <div
              className="lp-nav-right"
              style={{
                position: 'absolute',
                top: '28px',
                left: '32px',
                right: '40px',
                zIndex: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '10px',
                height: '48px',
              }}
            >
              <a
                href="#network"
                className="lp-hide-sm lp-nav-link-celestial"
                style={{
                  padding: '0 12px',
                  fontSize: '14.5px',
                  fontWeight: 500,
                  color: '#DDD6FE',
                }}
              >
                Status
              </a>

              <a
                href="#signin"
                className="lp-ghost"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '44px',
                  padding: '0 16px',
                  borderRadius: '11px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                Sign in
              </a>

              <a
                href="#pricing"
                className="lp-btn lp-btn-white lp-hide-sm"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '44px',
                  padding: '0 18px',
                  borderRadius: '11px',
                  background: '#FFFFFF',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: '#3B1E78',
                }}
              >
                Start deploying
              </a>
            </div>

            {/* Docked telemetry glass card */}
            {showTelemetry && <TelemetryCard variant="desktop" />}

            {/* Wave (fallback bottom for responsive test suite contract) */}
            <WaveDivider variant="bottom" scrollProgress={activeProgress} />
          </div>
        </section>
      </div>

      {/* =========================================================
          2. TABLET VIEW (768px - 1024px, 834px iPad): Stacked Layout
          ========================================================= */}
      <div className="lp-tablet-view">
        {/* Celestial Header */}
        <header
          style={{
            position: 'relative',
            height: '640px',
            background: 'linear-gradient(180deg, #0F0C20 0%, #1E124A 52%, #3B1E78 100%)',
          }}
        >
          <RocketArt
            viewBox="-160 0 1040 900"
            preserveAspectRatio="xMidYMax slice"
            scrollProgress={activeProgress}
          />

          {/* Header Nav */}
          <nav
            aria-label="Primary"
            style={{
              position: 'absolute',
              top: '24px',
              left: '32px',
              right: '32px',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              gap: '22px',
              height: '48px',
            }}
          >
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFFFFF' }}>
              <span
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C4B5FD"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </span>
              <span style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.03em' }}>LaunchPad</span>
            </a>

            <div style={{ display: 'flex', gap: '22px', marginLeft: '12px', fontSize: '14.5px', fontWeight: 500 }}>
              <a href="#features" style={{ color: '#DDD6FE' }}>Product</a>
              <a href="#pricing" style={{ color: '#DDD6FE' }}>Pricing</a>
              <a href="#docs" style={{ color: '#DDD6FE' }}>Docs</a>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
              <a
                href="#signin"
                className="lp-ghost"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '44px',
                  padding: '0 16px',
                  borderRadius: '11px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}
              >
                Sign in
              </a>
              <a
                href="#pricing"
                className="lp-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '44px',
                  padding: '0 18px',
                  borderRadius: '11px',
                  background: '#FFFFFF',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: '#3B1E78',
                }}
              >
                Start deploying
              </a>
            </div>
          </nav>

          {/* Docked telemetry card */}
          {showTelemetry && <TelemetryCard variant="tablet" style={{ left: '32px', bottom: '64px', width: '300px' }} />}

          {/* Bottom wave into light zone */}
          <WaveDivider variant="tablet" />
        </header>

        {/* Copy + conversion (Bottom Light Section) */}
        <main style={{ padding: '40px 56px 56px' }}>
          <a
            href="#"
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
              <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
            </span>
            <span>LaunchPad v2.0 is Live</span>
            <span aria-hidden="true" style={{ color: '#A78BFA' }}>•</span>
            <span style={{ color: '#475569', fontWeight: 500 }}>Zero-Config Deployments</span>
          </a>

          <h1
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
            Ship your code to production at the <span style={{ color: accent }}>speed of thought.</span>
          </h1>

          <p style={{ margin: '20px 0 0', maxWidth: '620px', fontSize: '18px', lineHeight: 1.65, color: '#475569' }}>
            Instant preview environments, serverless edge compute, and automated CI/CD pipelines. Connect your Git repository and launch in 42 seconds.
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
              <label htmlFor="lp-email-t" style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Work email</label>
              <div style={{ position: 'relative' }}>
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ position: 'absolute', left: '15px', top: '15px' }}
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input
                  id="lp-email-t"
                  className="lp-input"
                  type="email"
                  placeholder="you@company.dev"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSubmitted(false);
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
                <span>{submitted ? 'Launching…' : 'Deploy Free'}</span>
                <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748B' }}>
                {submitted ? 'Check your inbox — your launch link is on its way.' : 'Free tier forever • No credit card required'}
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
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Instant Rollbacks
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Edge Caching
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              99.99% SLA
            </li>
          </ul>
        </main>
      </div>

      {/* =========================================================
          3. MOBILE VIEW (< 768px, 390px iPhone): Stacked Layout
          ========================================================= */}
      <div className="lp-mobile-view">
        {/* Celestial Header */}
        <header
          style={{
            position: 'relative',
            height: '600px',
            background: 'linear-gradient(180deg, #0F0C20 0%, #1E124A 52%, #3B1E78 100%)',
          }}
        >
          <RocketArt
            viewBox="0 0 720 900"
            preserveAspectRatio="xMidYMax slice"
            scrollProgress={activeProgress}
          />

          {/* Nav */}
          <nav
            aria-label="Primary"
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              right: '16px',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '48px',
            }}
          >
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#FFFFFF' }}>
              <span
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </span>
              <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em' }}>LaunchPad</span>
            </a>

            <button
              type="button"
              className="lp-icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.06)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              {mobileMenuOpen ? (
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h10" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile Menu Sheet */}
          {mobileMenuOpen && (
            <div
              className="lp-sheet"
              style={{
                position: 'absolute',
                top: '72px',
                left: '16px',
                right: '16px',
                zIndex: 6,
                padding: '10px',
                borderRadius: '18px',
                background: 'rgba(20,14,48,0.86)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(196,181,253,0.22)',
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: '16px', fontWeight: 600 }}>
                <a href="#features" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 12px', borderRadius: '10px' }}>Product</a>
                <a href="#network" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 12px', borderRadius: '10px' }}>Edge Network</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 12px', borderRadius: '10px' }}>Pricing</a>
                <a href="#docs" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 12px', borderRadius: '10px' }}>Docs</a>
              </div>
              <div style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px solid rgba(196,181,253,0.18)', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                <a href="#signin" onClick={() => setMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', height: '46px', borderRadius: '11px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '14.5px', fontWeight: 600, color: '#FFFFFF' }}>Sign in</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="lp-btn" style={{ display: 'flex', alignItems: 'center', justifySelf: 'stretch', justifyContent: 'center', height: '46px', borderRadius: '11px', background: '#FFFFFF', fontSize: '14.5px', fontWeight: 700, color: '#3B1E78' }}>Start free</a>
              </div>
            </div>
          )}

          {/* Docked Telemetry Card */}
          {showTelemetry && <TelemetryCard variant="mobile" style={{ left: '16px', bottom: '26px', width: '262px' }} />}

          {/* Bottom Wave Divider */}
          <WaveDivider variant="mobile" />
        </header>

        {/* Copy + conversion (Bottom Light Section) */}
        <main style={{ padding: '30px 20px 48px' }}>
          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 12px 6px 6px',
              borderRadius: '999px',
              background: '#FFFFFF',
              border: '1px solid rgba(139,92,246,0.35)',
              boxShadow: '0 0 0 4px rgba(139,92,246,0.07), 0 6px 20px -8px rgba(124,58,237,0.45)',
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
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
            </span>
            <span>v2.0 is Live</span>
            <span aria-hidden="true" style={{ color: '#A78BFA' }}>•</span>
            <span style={{ color: '#475569', fontWeight: 500 }}>Zero-Config Deploys</span>
          </a>

          <h1
            style={{
              margin: '20px 0 0',
              fontSize: '38px',
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#0F172A',
            }}
          >
            Ship your code to production at the <span style={{ color: accent }}>speed of thought.</span>
          </h1>

          <p style={{ margin: '16px 0 0', fontSize: '16px', lineHeight: 1.6, color: '#475569' }}>
            Instant preview environments, serverless edge compute, and automated CI/CD pipelines. Connect your Git repository and launch in 42 seconds.
          </p>

          {/* Form FIRST on mobile */}
          <form onSubmit={handleSubmit} style={{ marginTop: '26px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label htmlFor="lp-email-m" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Work email</label>
            <div style={{ position: 'relative' }}>
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: 'absolute', left: '15px', top: '16px' }}
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                id="lp-email-m"
                className="lp-input"
                type="email"
                placeholder="you@company.dev"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubmitted(false);
                }}
                style={{
                  width: '100%',
                  height: '50px',
                  padding: '0 16px 0 44px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '16px',
                  color: '#0F172A',
                }}
              />
            </div>
            <button
              type="submit"
              className="lp-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                height: '52px',
                border: 'none',
                borderRadius: '12px',
                background: accent,
                color: '#FFFFFF',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: 700,
                boxShadow: '0 10px 24px -10px rgba(109,40,217,0.7), inset 0 1px 0 rgba(255,255,255,0.22)',
              }}
            >
              <span>{submitted ? 'Launching…' : 'Deploy Free'}</span>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
            <p style={{ margin: '2px 0 0', textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
              {submitted ? 'Check your inbox — your launch link is on its way.' : 'Free tier forever • No credit card required'}
            </p>
          </form>

          {/* Divider */}
          <div style={{ margin: '22px 0 12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
            <span style={{ flexGrow: 1, height: '1px', background: '#E2E8F0' }} />
            or ship from your terminal
            <span style={{ flexGrow: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {/* Compact terminal snippet */}
          <TerminalSnippet variant="mobile" />

          {/* Checklist in clean white card container */}
          <ul
            style={{
              listStyle: 'none',
              margin: '28px 0 0',
              padding: '18px',
              borderRadius: '16px',
              background: '#FFFFFF',
              border: '1px solid #EEF0F5',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#334155',
            }}
          >
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Instant Rollbacks
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              Edge Caching
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              99.99% SLA
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}
