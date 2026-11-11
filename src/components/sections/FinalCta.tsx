import React from 'react'
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react'
import WaveDivider from '../art/WaveDivider'
import OrbitPlanetArt from '../art/OrbitPlanetArt'
import CopyCommand from '../ui/CopyCommand'
import Button from '../ui/Button'
import { FINAL_CTA_CONTENT } from '../../data/content'

export const FinalCta: React.FC = () => {
  return (
    <div id="deploy" className="relative w-full overflow-hidden bg-[#0F0C20]">
      {/* Wave curve transition entering sky gradient dark finale */}
      <WaveDivider variant="enter-finale" fill="#0F0C20" edgeColor="#8B5CF6" />

      {/* Main Final CTA Body (Sky gradient #0F0C20 -> #1E124A -> #3B1E78) */}
      <section
        className="pt-16 pb-24 sm:pt-20 sm:pb-32 relative text-white"
        style={{
          background: 'linear-gradient(180deg, #0F0C20 0%, #1E124A 40%, #3B1E78 68%, #1E124A 88%, #0F0C20 100%)',
        }}
      >
        {/* Ambient cosmic glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#6D28D9]/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#22D3EE]/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Text, Buttons, Copy Command) */}
            <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6D28D9]/30 border border-[#6D28D9]/50 text-[#22D3EE] font-mono text-xs tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" strokeWidth={1.5} />
                {FINAL_CTA_CONTENT.badge}
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Ready to ship your next idea into orbit?
              </h2>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {FINAL_CTA_CONTENT.subhead}
              </p>

              {/* Two Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  asLink
                  href="#pricing"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>{FINAL_CTA_CONTENT.primaryBtn}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Button>

                <Button
                  asLink
                  href="#docs"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <BookOpen className="w-4 h-4 text-[#22D3EE]" strokeWidth={1.5} />
                  <span>{FINAL_CTA_CONTENT.secondaryBtn}</span>
                </Button>
              </div>

              {/* Terminal Copy Command Component */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <CopyCommand command={FINAL_CTA_CONTENT.copyCommand} variant="dark" />
              </div>
            </div>

            {/* Right Artwork: Returning Rocket in orbit around ringed planet */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-[460px] aspect-[540/380] relative">
                <OrbitPlanetArt />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default FinalCta
