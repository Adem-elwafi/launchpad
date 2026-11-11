import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, HelpCircle, ChevronDown, ArrowRight, Sparkles } from 'lucide-react'

export default function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(true)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index)
  }

  const plans = [
    {
      name: 'Hobby',
      tagline: 'Ideal for side projects, prototypes, and open source developers.',
      price: '$0',
      period: 'forever',
      badge: null,
      popular: false,
      ctaText: 'Deploy Free Now',
      ctaStyle: 'bg-white text-slate-800 hover:text-[#0F0C20] border border-slate-300 hover:bg-slate-50 hover:border-slate-400',
      features: [
        'Unlimited instantaneous deploys',
        'Automatic wildcard HTTPS & SSL',
        '100 GB global edge bandwidth',
        '3 preview environments per branch',
        'Community Discord & Forum support',
        'Automated GitHub & GitLab CI webhooks',
      ],
      footnote: 'Zero credit card required at sign up.',
    },
    {
      name: 'Pro',
      tagline: 'For fast-shipping product teams demanding real-time velocity and reliability.',
      price: annualBilling ? '$24' : '$29',
      period: 'per seat / month',
      badge: 'MOST POPULAR',
      popular: true,
      ctaText: 'Start 14-Day Pro Trial',
      ctaStyle: 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] hover:from-[#5B21B6] hover:to-[#7C3AED] text-white hover:text-white shadow-lg shadow-[#6D28D9]/30 hover:shadow-xl hover:shadow-[#6D28D9]/40',
      features: [
        'Everything in Hobby, plus:',
        '1 TB global edge bandwidth included',
        '150ms atomic instant rollbacks',
        'Unlimited custom domains & apex routing',
        '99.99% uptime SLA guaranteed',
        'Granular team RBAC (up to 20 seats)',
        '30-day real-time telemetry & log retention',
        'Automated preview comments on Pull Requests',
      ],
      footnote: annualBilling ? 'Billed annually ($288/yr). Save 20%.' : 'Billed monthly. Cancel anytime.',
    },
    {
      name: 'Enterprise',
      tagline: 'Dedicated cloud runtime with bespoke compliance and mission-critical SLAs.',
      price: 'Custom',
      period: 'tailored cluster pricing',
      badge: 'MISSION CRITICAL',
      popular: false,
      ctaText: 'Talk to Flight Control',
      ctaStyle: 'bg-[#0F0C20] text-white hover:text-white hover:bg-[#1E124A] border border-[#0F0C20]',
      features: [
        'Everything in Pro, plus:',
        'Dedicated isolated compute clusters',
        '99.999% SLA uptime guarantee',
        'SOC2 Type II, ISO 27001 & HIPAA compliance',
        '24/7 dedicated Slack bridge & solutions engineer',
        'Custom edge caching rules & programmable WAF',
        'Single Sign-On (SAML/Okta/Azure AD)',
        'Private VPC peering & custom data residency',
      ],
      footnote: 'Custom contracts, invoicing, and wire transfers.',
    },
  ]

  const faqs = [
    {
      question: 'How do custom domains and automated SSL certificates work?',
      answer:
        'Every single deployment on LaunchPad automatically receives an instant wildcard SSL certificate provisioned through Let’s Encrypt with zero configuration and automated auto-renewals. Connecting custom domains takes under 60 seconds: add a CNAME or ALIAS record pointing to our edge anycast network, and our global routing mesh propagates your domain within seconds.',
    },
    {
      question: 'What happens if our application experiences a viral traffic spike?',
      answer:
        'LaunchPad’s serverless compute and CDN nodes automatically autoscale across our 184 PoP worldwide edge mesh in single-digit milliseconds. We never throttle or drop incoming legitimate traffic during sudden traffic surges. Real-time telemetry notifies your team immediately while our edge shield absorbs volumetric spikes seamlessly.',
    },
    {
      question: 'Are there hard billing limits to protect against unexpected surprise charges?',
      answer:
        'Yes, absolutely. We believe in transparent developer ergonomics. You can set strict spend caps, automated alert thresholds (e.g. at 50%, 80%, and 100% of your chosen budget), and emergency circuit breakers directly in your project dashboard. You will never be hit with unexpected egress surprises.',
    },
    {
      question: 'How does LaunchPad’s atomic rollback architecture work under 150ms?',
      answer:
        'All deployments are immutable artifacts distributed across the LaunchPad global edge storage tier. When you trigger a rollback—via the interactive CLI, GitHub bot, or console—our edge control plane flips the pointer in the anycast routing layer worldwide in less than 150ms. No redeploying, rebuilding, or cold container boot times.',
    },
  ]

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#FAFAFC] relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#6D28D9]/5 via-[#22D3EE]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D28D9]/10 border border-[#6D28D9]/20 text-[#6D28D9] text-xs font-mono font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
            Predictable Infrastructure
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F0C20] tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-slate-600 font-normal">
            Predictable plans for teams of every scale. Zero egress surprises, transparent limits, and instant scaling.
          </p>

          {/* Monthly / Annual Billing Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-200/70 border border-slate-300/60 shadow-inner" role="group" aria-label="Billing frequency selection">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              aria-pressed={!annualBilling}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
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
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                annualBilling
                  ? 'text-[#0F0C20] bg-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-white border-2 border-[#6D28D9] shadow-2xl shadow-[#6D28D9]/15 ring-4 ring-[#6D28D9]/10 lg:-translate-y-2'
                  : 'bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white shadow-sm'
                        : 'bg-[#0F0C20] text-slate-200 border border-slate-700'
                    }`}
                  >
                    <Zap className="w-3 h-3 text-[#22D3EE]" fill="currentColor" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-[#0F0C20] tracking-tight">{plan.name}</h3>
                </div>
                <p className="mt-2 text-sm text-slate-500 min-h-[40px]">{plan.tagline}</p>

                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#0F0C20] font-mono tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-slate-500 font-mono">
                    /{plan.period}
                  </span>
                </div>
                <p className="mt-1 text-xs font-mono text-slate-400">{plan.footnote}</p>

                {/* CTA Button */}
                <div className="mt-7">
                  <motion.a
                    href="#deploy"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${plan.ctaStyle}`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={2} />
                  </motion.a>
                </div>

                <div className="my-7 border-t border-slate-100" />

                {/* Feature List */}
                <div className="space-y-3.5">
                  <p className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400">
                    Plan Specifications
                  </p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            plan.popular
                              ? 'bg-[#6D28D9]/10 text-[#6D28D9]'
                              : 'bg-emerald-50 text-[#10B981]'
                          }`}
                        >
                          <Check className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        <span className="text-sm text-slate-700 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive FAQ Section */}
        <div className="mt-28 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-600 mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#6D28D9]" />
              Got Questions?
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F0C20] tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Everything you need to know about LaunchPad's edge infrastructure and billing logic.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 bg-white/80 backdrop-blur-md overflow-hidden transition-all duration-200 hover:border-slate-300 shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-btn-${index}`}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <span className="font-semibold text-slate-900 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 p-1 rounded-full bg-slate-100 text-slate-600"
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4" strokeWidth={2.2} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Under-FAQ CTA Assist */}
          <div className="mt-10 text-center p-6 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-semibold text-[#0F0C20]">Need a custom enterprise SLA or on-prem setup?</h4>
              <p className="text-sm text-slate-500">Our solutions engineering team can craft bespoke topology for your fleet.</p>
            </div>
            <a
              href="#contact"
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 hover:text-[#0F0C20] transition-colors shadow-2xs"
            >
              Contact Solutions Team
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
