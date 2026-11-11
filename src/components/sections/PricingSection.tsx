import React, { useState } from 'react'
import { Check, Zap, ArrowRight, Sparkles } from 'lucide-react'
import { PRICING_CONTENT } from '../../data/content'
import Button from '../ui/Button'

export const PricingSection: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(true)

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#FAFAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6D28D9]/10 border border-[#6D28D9]/20 text-[#6D28D9] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" strokeWidth={1.5} />
            {PRICING_CONTENT.badge}
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F0C20] tracking-tight">
            {PRICING_CONTENT.title}
          </h2>
          
          <p className="mt-4 text-lg sm:text-xl text-[#475569] font-normal leading-relaxed">
            {PRICING_CONTENT.subhead}
          </p>

          {/* Monthly / Annual Billing Toggle with -20% Pill */}
          <div
            className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-200/80 border border-slate-300/70 shadow-inner"
            role="group"
            aria-label="Billing frequency selection"
          >
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              aria-pressed={!annualBilling}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer min-h-[44px] ${
                !annualBilling
                  ? 'text-[#0F0C20] bg-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              aria-pressed={annualBilling}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer min-h-[44px] ${
                annualBilling
                  ? 'text-[#0F0C20] bg-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                {PRICING_CONTENT.discountPill}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (STACKS PRO FIRST ON MOBILE) - Tiers: Hobby ($0), Pro ($29/mo), Enterprise (Custom) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-md lg:max-w-none mx-auto">
          {PRICING_CONTENT.plans.map((plan) => {
            const isPro = plan.name === 'Pro' || plan.popular
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice

            return (
              <div
                key={plan.name}
                className={`relative rounded-[18px] p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPro
                    ? 'order-first md:order-none bg-white border-2 border-[#6D28D9] shadow-xl shadow-[#6D28D9]/15 ring-4 ring-[#6D28D9]/10 md:-translate-y-2'
                    : 'bg-white border border-[#EEF0F5] shadow-xs hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Most Popular Raised Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider ${
                        isPro
                          ? 'bg-[#6D28D9] text-white shadow-md'
                          : 'bg-[#0F0C20] text-slate-200 border border-slate-700'
                      }`}
                    >
                      <Zap className="w-3 h-3 text-[#22D3EE]" strokeWidth={1.5} />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <h3 className="text-2xl font-bold text-[#0F0C20] tracking-tight">{plan.name}</h3>
                  <p className="mt-2 text-sm text-[#64748B] min-h-[40px]">{plan.tagline}</p>

                  {/* Price */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#0F0C20] font-mono tracking-tight">
                      {price}
                    </span>
                    <span className="text-sm font-medium text-[#64748B] font-mono">
                      /{plan.priceUnit}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-mono text-[#64748B]">{plan.footnote}</p>

                  {/* CTA Button */}
                  <div className="mt-7">
                    <Button
                      asLink
                      href="#deploy"
                      variant={isPro ? 'primary' : 'outline'}
                      size="lg"
                      className="w-full justify-center"
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </Button>
                  </div>

                  <div className="my-7 border-t border-[#EEF0F5]" />

                  {/* 5-6 Features with Check icons */}
                  <div className="space-y-3.5">
                    <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#64748B]">
                      Plan Specifications
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div
                            className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                              isPro
                                ? 'bg-[#6D28D9]/10 text-[#6D28D9]'
                                : 'bg-emerald-50 text-[#10B981]'
                            }`}
                          >
                            <Check className="w-4 h-4" strokeWidth={2.5} />
                          </div>
                          <span className="text-sm text-[#475569] leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
