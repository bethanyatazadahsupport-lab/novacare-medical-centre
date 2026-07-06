import React from "react";
import { WHY_CHOOSE_US } from "../data";
import { 
  UserCheck, Shield, Sparkles, Heart, Clock, Search, 
  Smile, ShieldAlert, BadgeDollarSign, Database, Check 
} from "lucide-react";

export default function WhyChooseUs() {
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case "experienced specialists": return <UserCheck className="h-5 w-5" />;
      case "modern medical equipment": return <Shield className="h-5 w-5" />;
      case "fast laboratory results": return <Sparkles className="h-5 w-5" />;
      case "patient-centered care": return <Heart className="h-5 w-5" />;
      case "online appointment booking": return <Clock className="h-5 w-5" />;
      case "advanced diagnostic services": return <Search className="h-5 w-5" />;
      case "comfortable environment": return <Smile className="h-5 w-5" />;
      case "transparent pricing": return <BadgeDollarSign className="h-5 w-5" />;
      case "emergency support": return <ShieldAlert className="h-5 w-5" />;
      case "digital health records": return <Database className="h-5 w-5" />;
      default: return <Check className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Patient Confidence</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Why Choose NovaCare Medical
          </h2>
          <p className="text-sm text-slate-500 font-light leading-relaxed">
            We are committed to delivering premium private healthcare by pairing internationally qualified medical practitioners with advanced diagnostic tools.
          </p>
        </div>

        {/* 10 Core Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div 
              key={index}
              className="bg-slate-50 border border-slate-100 rounded-xl p-5 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all flex flex-col space-y-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shrink-0">
                {getIcon(item.title)}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-950 leading-snug">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
