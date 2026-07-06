import React from "react";
import { CLINIC_INFO, CORE_VALUES } from "../data";
import { 
  Award, Shield, Sparkles, Heart, HeartHandshake, 
  Target, Eye, CheckCircle 
} from "lucide-react";

export default function About() {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "compassion": return <Heart className="h-5 w-5 text-teal-500" />;
      case "integrity": return <Shield className="h-5 w-5 text-teal-500" />;
      case "innovation": return <Sparkles className="h-5 w-5 text-teal-500" />;
      case "excellence": return <Award className="h-5 w-5 text-teal-500" />;
      case "respect": return <HeartHandshake className="h-5 w-5 text-teal-500" />;
      case "patient safety": return <Shield className="h-5 w-5 text-teal-500" />;
      default: return <CheckCircle className="h-5 w-5 text-teal-500" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50" id="about-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Mission, Vision, Founding Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Story Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Our Story</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                About NovaCare Medical Centre
              </h2>
            </div>
            
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
              NovaCare Medical Centre was established in 2014 with a mission to provide accessible, high-quality healthcare in a modern and welcoming environment. Under the leadership of <strong>{CLINIC_INFO.ceo}</strong>, the clinic has grown into a trusted multidisciplinary medical centre known for clinical excellence, compassionate care, and innovative healthcare solutions.
            </p>
            
            <p className="text-sm md:text-base text-slate-600 leading-relaxed font-light">
              Every patient receives personalized treatment supported by advanced diagnostics, experienced specialists, and evidence-based medicine. We combine state-of-the-art technological infrastructures with human empathy to restore and optimize your long-term health.
            </p>

            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Target className="h-5.5 w-5.5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Our Mission</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  To improve lives by delivering compassionate, innovative, and affordable healthcare while placing every patient at the center of everything we do.
                </p>
              </div>

              <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                  <Eye className="h-5.5 w-5.5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Our Vision</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  To become one of the most trusted private healthcare providers recognized for clinical excellence, outstanding patient experiences, and continuous innovation.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Info & Sidebar Info */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-md">
            <h3 className="text-base font-bold text-slate-900 mb-6 uppercase tracking-wider pb-3 border-b border-slate-50">Clinic Credentials</h3>
            
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Business Name</span>
                <strong className="text-slate-800">{CLINIC_INFO.name}</strong>
              </div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Executive Officer</span>
                <strong className="text-slate-800">{CLINIC_INFO.ceo}</strong>
              </div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Founded Year</span>
                <strong className="text-slate-800">{CLINIC_INFO.founded} (12+ Years)</strong>
              </div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Address</span>
                <strong className="text-slate-800 text-right max-w-[200px] leading-snug">{CLINIC_INFO.address}</strong>
              </div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Email Records</span>
                <strong className="text-slate-800">{CLINIC_INFO.email}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">Website URL</span>
                <strong className="text-blue-600 font-bold">{CLINIC_INFO.website}</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Core Values Section */}
        <div className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Ethics & Principles</span>
            <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Clinical Values</h3>
            <p className="text-xs text-slate-400 max-w-lg mx-auto font-medium">Upholding world-class standards of integrity, safety, and compassion in every patient treatment plan.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-200"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600 mb-4">
                  {getIcon(val.name)}
                </div>
                <h4 className="font-bold text-sm text-slate-800 mb-1.5">{val.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
