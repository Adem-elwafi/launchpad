import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react'
import { FAQ_CONTENT } from '../../data/content'

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAFAFC] relative overflow-hidden border-t border-[#EEF0F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D28D9]/10 border border-[#6D28D9]/20 text-[#6D28D9] text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#6D28D9]" strokeWidth={1.5} />
            {FAQ_CONTENT.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F0C20] tracking-tight">
            {FAQ_CONTENT.title}
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            {FAQ_CONTENT.subhead}
          </p>
        </div>

        {/* 5 Questions Max Accessible Accordion */}
        <div className="space-y-3.5">
          {FAQ_CONTENT.items.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={faq.id}
                className="rounded-[18px] border border-[#EEF0F5] bg-white overflow-hidden transition-all duration-200 hover:border-slate-300 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-btn-${index}`}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] min-h-[56px]"
                >
                  <span className="font-semibold text-[#0F172A] text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 p-1.5 rounded-full bg-slate-100 text-[#64748B]"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
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
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-[#475569] text-sm sm:text-base leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* "Still have questions?" Contact Box */}
        <div className="mt-12 text-center p-6 sm:p-7 rounded-[18px] bg-slate-100/70 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6D28D9]/10 text-[#6D28D9] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold text-[#0F0C20] text-base">Still have questions?</h3>
              <p className="text-sm text-[#64748B]">Can’t find what you need? Our engineers are on standby 24/7.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-5 py-2.5 rounded-[12px] text-sm font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-[#0F172A] transition-colors shadow-2xs min-h-[44px] flex items-center justify-center"
          >
            Contact Flight Control
          </a>
        </div>

      </div>
    </section>
  )
}

export default FaqSection
