import React, { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Patient Helpdesk</span>
          <h2 className="font-serif text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 font-light max-w-lg mx-auto leading-relaxed">
            Quickly resolve clinical procedures, medical billing questions, laboratory test results, and records requests.
          </p>
        </div>

        {/* FAQs Accordions list */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all hover:border-slate-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none transition-colors hover:bg-slate-50/50"
                >
                  <div className="flex items-center space-x-3.5 pr-4">
                    <HelpCircle className="h-5 w-5 text-teal-500 shrink-0" />
                    <span className="font-bold text-sm md:text-base text-slate-800 leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Urgent/Support Call block */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xl shadow-blue-500/15">
          <div className="space-y-1.5">
            <h4 className="font-bold text-base md:text-lg tracking-tight">Still have questions?</h4>
            <p className="text-xs text-blue-100 font-light max-w-md">
              Our clinical receptionist and support specialists are standing by. Get instant clarity on coordinates, billing audits, or specialized care coordinates.
            </p>
          </div>
          <a 
            href="tel:+18005550199"
            className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-md shrink-0 transition-colors"
          >
            <PhoneCall className="h-4 w-4 text-teal-400" />
            <span>Call Customer Care</span>
          </a>
        </div>

      </div>
    </section>
  );
}
