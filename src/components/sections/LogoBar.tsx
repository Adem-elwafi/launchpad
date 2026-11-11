import React from 'react'

export const LogoBar: React.FC = () => {
  return (
    <section
      aria-label="Trusted by engineering teams"
      className="border-t border-[#EEF0F5] bg-[#FAFAFC] py-9 sm:py-11 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-5">
        <p className="m-0 text-xs font-bold tracking-[0.12em] uppercase text-[#64748B] text-center">
          Trusted by high-growth engineering teams
        </p>

        {/* Desktop & Tablet wordmark row */}
        <div className="hidden sm:flex flex-wrap justify-center items-center gap-x-12 lg:gap-x-16 gap-y-4 text-xl sm:text-2xl font-bold tracking-[-0.03em] text-[#64748B]">
          <span className="lp-logo-word hover:text-[#0F172A] transition-colors cursor-default select-none">Vercel</span>
          <span className="lp-logo-word hover:text-[#0F172A] transition-colors cursor-default select-none">Supabase</span>
          <span className="lp-logo-word hover:text-[#0F172A] transition-colors cursor-default select-none">Linear</span>
          <span className="lp-logo-word hover:text-[#0F172A] transition-colors cursor-default select-none">Raycast</span>
          <span className="lp-logo-word hover:text-[#0F172A] transition-colors cursor-default select-none">Resend</span>
        </div>

        {/* Mobile 2-column wordmark grid */}
        <div className="sm:hidden grid grid-cols-2 gap-x-4 gap-y-3.5 text-center text-lg font-bold tracking-[-0.03em] text-[#64748B] w-full max-w-xs">
          <span>Vercel</span>
          <span>Supabase</span>
          <span>Linear</span>
          <span>Raycast</span>
          <span className="col-span-2 text-center">Resend</span>
        </div>
      </div>
    </section>
  )
}

export default LogoBar
