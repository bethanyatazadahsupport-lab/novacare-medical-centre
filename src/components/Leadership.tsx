import React from "react";
import { CLINIC_INFO } from "../data";
import { Quote, Award, ShieldAlert, Heart, Calendar } from "lucide-react";

interface LeadershipProps {
  onBookAppointment: () => void;
}

export default function Leadership({ onBookAppointment }: LeadershipProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden" id="leadership">
      {/* Background blurs */}
      <div className="absolute top-1/2 left-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Executive portrait representation area */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-6 md:p-8 space-y-6 shadow-2xl max-w-sm w-full">
              {/* Monogram or representation card */}
              <div className="aspect-square bg-gradient-to-tr from-slate-900 to-slate-800 rounded-xl flex items-center justify-center p-6 border border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-500/5"></div>
                <div className="h-28 w-28 rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-800 text-4xl font-serif font-extrabold text-blue-400">
                  MJ
                </div>
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-serif text-lg font-bold text-white">{CLINIC_INFO.ceo}</h3>
                <p className="text-[10px] text-teal-400 uppercase tracking-widest font-semibold">Chief Executive Officer</p>
                <p className="text-xs text-slate-500">NovaCare Medical Centre • Established 2014</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center border-t border-slate-800 pt-4">
                <div className="space-y-0.5">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">Clinical Staff</span>
                  <span className="text-sm font-bold text-white">120+ Professionals</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">Accreditation</span>
                  <span className="text-xs font-semibold text-teal-400">Joint Commission Int.</span>
                </div>
              </div>
            </div>
          </div>

          {/* CEO Message Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Clinic Leadership</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Message from the CEO
              </h2>
            </div>

            {/* Quote block */}
            <div className="relative bg-slate-850 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-inner">
              <Quote className="absolute top-4 right-6 h-10 w-10 text-slate-800 shrink-0" />
              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-light italic relative z-10">
                "At NovaCare Medical Centre, we believe healthcare should combine medical excellence with genuine compassion. Our mission is to provide every patient with personalized care supported by experienced professionals and modern technology. We are committed to building healthier communities through integrity, innovation, and exceptional service."
              </p>
              <div className="mt-4 flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-teal-400"></div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">{CLINIC_INFO.ceo}, CEO</span>
              </div>
            </div>

            {/* Strategic highlights under leadership */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-blue-500/10 text-blue-400">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Clinical Integrity</h4>
                  <p className="text-slate-400 mt-0.5 leading-relaxed font-light">Strict peer-review policies ensuring that all diagnosis charts align with advanced medical evidence.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-teal-500/10 text-teal-400">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Patient Compassion</h4>
                  <p className="text-slate-400 mt-0.5 leading-relaxed font-light">Dedicated patient relationship program to optimize patient safety, comfort, and care transparency.</p>
                </div>
              </div>
            </div>

            {/* Booking call-to-action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onBookAppointment}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Clinical Appointment</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
