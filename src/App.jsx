import React from 'react'
import Navbar from './components/layout/Navbar'
import HeroSection from './components/hero/HeroSection'
import SocialProof from './components/social/SocialProof'
import FeaturesBento from './components/features/FeaturesBento'
import InteractiveTerminal from './components/terminal/InteractiveTerminal'
import EdgeNetwork from './components/network/EdgeNetwork'
import PricingSection from './components/pricing/PricingSection'
import Footer from './components/layout/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F0C20] selection:bg-[#6D28D9]/20 selection:text-[#6D28D9] flex flex-col font-sans antialiased overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SocialProof />
        <FeaturesBento />
        <InteractiveTerminal />
        <EdgeNetwork />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
