import React from "react";
import { motion } from "motion/react";
import { Calendar, User, Check, Heart, ShieldAlert, Activity, Star } from "lucide-react";

interface HeroProps {
  onBookAppointment: () => void;
  onFindDoctor: () => void;
}

export default function Hero({ onBookAppointment, onFindDoctor }: HeroProps) {
  const stats = [
    { label: "Specialist Doctors", count: "30+" },
    { label: "Patients Served", count: "20,000+" },
    { label: "Patient Satisfaction", count: "98%" },
    { label: "Emergency Care", count: "24/7" }
  ];

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-slate-900 text-white" id="clinic-hero">
      {/* Decorative background grids and blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,136,229,0.25),rgba(255,255,255,0))]"></div>
      <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"></div>
      <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-400/20 text-blue-400 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
            >
              <Activity className="h-3.5 w-3.5" />
              <span>World-Class Private Healthcare</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white"
            >
              Exceptional Healthcare <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                for Every Generation
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
            >
              NovaCare Medical Centre delivers advanced medical care through experienced physicians, modern technology, and a patient-first approach. From preventive medicine to specialized treatments, we are committed to improving lives with compassionate healthcare.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button 
                onClick={onBookAppointment}
                className="w-full sm:w-auto flex items-center justify-center space-x-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer hover:scale-103"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>Book Appointment</span>
              </button>
              <button 
                onClick={onFindDoctor}
                className="w-full sm:w-auto flex items-center justify-center space-x-2 border-2 border-slate-700 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                <User className="h-4.5 w-4.5" />
                <span>Find a Doctor</span>
              </button>
            </motion.div>

            {/* display ticks */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 pt-8 text-xs font-semibold text-slate-300 border-t border-slate-800"
            >
              <div className="flex items-center space-x-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                  <Check className="h-3 w-3" />
                </div>
                <span>30+ Specialist Doctors</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                  <Check className="h-3 w-3" />
                </div>
                <span>20,000+ Patients Served</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                  <Check className="h-3 w-3" />
                </div>
                <span>98% Patient Satisfaction</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-400">
                  <Check className="h-3 w-3" />
                </div>
                <span>24/7 Emergency Care</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image/Card area */}
          <div className="lg:col-span-5 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-6 md:p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 p-0.5 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">NovaCare Medical</h3>
                    <p className="text-[10px] text-teal-400 uppercase tracking-widest font-semibold">Clinical Diagnostics</p>
                  </div>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
                </span>
              </div>

              {/* Patient satisfaction luxury bento element */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="block text-3xl font-serif font-bold text-blue-400">98%</span>
                  <span className="block text-[10px] text-slate-400 font-medium uppercase mt-1">Satisfaction</span>
                  <div className="flex justify-center space-x-0.5 mt-1.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                  </div>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-center">
                  <span className="block text-3xl font-serif font-bold text-teal-400">20k+</span>
                  <span className="block text-[10px] text-slate-400 font-medium uppercase mt-1">Healthy Lives</span>
                  <p className="text-[9px] text-slate-500 mt-2 font-medium">Empowered Since 2014</p>
                </div>
              </div>

              {/* Dynamic Emergency Call Block */}
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start space-x-3">
                <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-red-400 uppercase tracking-wide">Trauma & Emergency Hotline</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Direct access to clinical ambulance and ICU stabilization teams standing by.</p>
                  <p className="text-sm font-extrabold text-white mt-1.5">+1 (800) 555-0199</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
