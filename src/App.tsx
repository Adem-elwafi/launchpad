import React from 'react'
import Navbar from './components/sections/Navbar'
import HeroSection from './components/sections/HeroSection'
import LogoBar from './components/sections/LogoBar'
import FeaturesBento from './components/sections/FeaturesBento'
import DarkInterlude from './components/sections/DarkInterlude'
import EdgeNetwork from './components/sections/EdgeNetwork'
import PricingSection from './components/sections/PricingSection'
import FaqSection from './components/sections/FaqSection'
import FinalCta from './components/sections/FinalCta'
import Footer from './components/sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] selection:bg-[#6D28D9]/20 selection:text-[#6D28D9] flex flex-col font-sans antialiased overflow-x-hidden">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1 pt-20 md:pt-[88px] min-[1025px]:pt-0!">
        {/* 2. Hero Section (Desktop asymmetric split / Tablet & Mobile stacked) */}
        <HeroSection />

        {/* 3. Logo Bar */}
        <LogoBar />

        {/* 4. Features Bento (3 features max: atomic rollbacks, ephemeral previews, real-time edge telemetry) */}
        <FeaturesBento />

        {/* 5. Dark Interlude (Deploy in seconds. Zero configuration. Enter/exit via waves) */}
        <DarkInterlude />

        {/* 6. Edge Network (Anycast routing across 184+ edge locations, dotted map, glowing nodes) */}
        <EdgeNetwork />

        {/* 7. Pricing Section (Monthly/Yearly toggle, Hobby, Pro, Enterprise, Pro stacked first on mobile) */}
        <PricingSection />

        {/* 8. FAQ Section (5 questions max, accessible accordion, contact link) */}
        <FaqSection />

        {/* 9. Final CTA (Wave into sky gradient dark finale, returning rocket orbiting ringed planet) */}
        <FinalCta />
      </main>

      {/* 10. Footer (Continues dark finale with NO seam, status pill with green pulse, copyright) */}
      <Footer />
    </div>
  )
}
