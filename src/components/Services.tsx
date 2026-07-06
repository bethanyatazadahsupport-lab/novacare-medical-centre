import React, { useState } from "react";
import { SERVICES } from "../data";
import { Service } from "../types";
import { 
  Activity, Stethoscope, Heart, Baby, Sparkles, Sun, Smile, 
  FlaskConical, Radiation, Accessibility, ShieldAlert, ShoppingBag, 
  Search, ArrowRight, Check 
} from "lucide-react";

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "General" | "Specialist" | "Diagnostics" | "Support">("All");

  const categories = ["All", "General", "Specialist", "Diagnostics", "Support"];

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "stethoscope": return <Stethoscope className="h-5 w-5" />;
      case "heart": return <Heart className="h-5 w-5" />;
      case "baby": return <Baby className="h-5 w-5" />;
      case "sparkles": return <Sparkles className="h-5 w-5" />;
      case "sun": return <Sun className="h-5 w-5" />;
      case "smile": return <Smile className="h-5 w-5" />;
      case "flaskconical": return <FlaskConical className="h-5 w-5" />;
      case "radiation": return <Radiation className="h-5 w-5" />;
      case "accessibility": return <Accessibility className="h-5 w-5" />;
      case "shoppingbag": return <ShoppingBag className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const filteredServices = SERVICES.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 md:py-24 bg-white" id="services-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Expertise</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Comprehensive Medical Services
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-light">
            NovaCare Medical Centre delivers exceptional clinical expertise across modern disciplines. Our facilities are equipped with state-of-the-art diagnostic imaging, premium pharmacy resources, and 24/7 urgent rooms.
          </p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-150"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinical services..."
              className="w-full text-xs bg-white rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 focus:border-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="flex flex-col bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-slate-200 transition-all group"
            >
              {/* Category indicator & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                  service.category === "General" ? "bg-blue-50 text-blue-600" :
                  service.category === "Specialist" ? "bg-teal-50 text-teal-700" :
                  service.category === "Diagnostics" ? "bg-purple-50 text-purple-600" :
                  "bg-orange-50 text-orange-600"
                }`}>
                  {service.category}
                </span>
                
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-blue-50 ${
                  service.id === "emergency-care" ? "bg-red-50 text-red-600 group-hover:bg-red-100" : "text-blue-600"
                }`}>
                  {service.id === "emergency-care" ? <ShieldAlert className="h-5 w-5" /> : getIcon(service.icon)}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Sub procedures / Details list */}
              {service.details && (
                <ul className="mt-4 pt-4 border-t border-slate-50 space-y-2 text-[11px] text-slate-600">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                      <span className="font-light">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTAs */}
              <button
                onClick={() => onSelectService(service.id)}
                className="mt-6 w-full flex items-center justify-center space-x-2 bg-slate-50 hover:bg-blue-600 hover:text-white text-slate-600 font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <span>Book Department</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <p className="font-semibold text-sm">No services matched your query.</p>
            <p className="text-xs max-w-sm mx-auto">Try typing a different health keyword, clinical category, or reset filters to explore.</p>
          </div>
        )}

      </div>
    </section>
  );
}
