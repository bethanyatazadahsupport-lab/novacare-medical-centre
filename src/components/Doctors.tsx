import React, { useState } from "react";
import { DOCTORS } from "../data";
import { Doctor } from "../types";
import { 
  Search, Star, Calendar, Clock, GraduationCap, 
  User, Sparkles, Filter, ChevronRight, Activity 
} from "lucide-react";

interface DoctorsProps {
  onSelectDoctor: (doctorId: string) => void;
}

export default function Doctors({ onSelectDoctor }: DoctorsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = [
    "All",
    "Internal Medicine",
    "Cardiology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "General Consultation",
    "Women's Health",
    "Dental Care"
  ];

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <section className="py-16 md:py-24 bg-slate-50" id="doctors-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600">The Medical Council</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Meet Our Prestigious Physicians
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-light">
            NovaCare features world-class doctors holding academic and clinical distinction. Our team coordinates directly to deliver high-quality multidisciplinary health care.
          </p>
        </div>

        {/* Directory Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
          {/* Specialties Filter dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-slate-400 hidden sm:inline" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full sm:w-60 text-xs bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 font-semibold text-slate-700 focus:border-blue-500 focus:outline-none"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  Specialty: {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Physician Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by physician name..."
              className="w-full text-xs bg-slate-50 rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              {/* Premium Avatar Layout with gradient background patterns based on specialty and gender */}
              <div className="relative aspect-square w-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6 border-b border-slate-50 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-tr opacity-25 ${
                  doc.gender === "female" ? "from-pink-400 to-blue-400" : "from-teal-400 to-blue-500"
                }`}></div>
                
                {/* Visual Avatar Monogram */}
                <div className="relative h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-slate-100 font-serif font-bold text-2xl text-slate-700 select-none group-hover:scale-105 transition-all">
                  {doc.name.split(" ").slice(-2).map(n => n[0]).join("")}
                </div>

                {/* Experience Badge */}
                <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-md">
                  {doc.experience} Experience
                </span>
              </div>

              {/* Physician Info Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-[10px] uppercase font-bold text-teal-600 tracking-wider">
                    {doc.role}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    Department: <span className="text-slate-800">{doc.specialty}</span>
                  </p>
                  <p className="text-xs text-slate-400 italic line-clamp-2 leading-relaxed mt-2 font-light">
                    "{doc.bio}"
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-50 text-[11px] text-slate-600">
                  <div className="flex items-start space-x-2">
                    <GraduationCap className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-light line-clamp-2">{doc.education}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span className="font-medium text-slate-700">{doc.availability}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectDoctor(doc.id)}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Directory State */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <p className="font-semibold text-sm">No physicians found in this department.</p>
            <p className="text-xs max-w-sm mx-auto">Please select another department or clear search keywords to discover our medical council.</p>
          </div>
        )}

      </div>
    </section>
  );
}
