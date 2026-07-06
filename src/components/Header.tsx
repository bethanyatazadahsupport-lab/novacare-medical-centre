import React, { useState, useEffect } from "react";
import { CLINIC_INFO } from "../data";
import { 
  Phone, MapPin, Clock, Activity, Menu, X, 
  Calendar, ShieldAlert, ChevronRight 
} from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clinicStatus, setClinicStatus] = useState({ open: false, text: "Loading status..." });

  // Determine if clinic is currently open based on business hours
  useEffect(() => {
    const checkClinicStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentMinutes = hour * 60 + minute;

      // Weekday: Mon-Fri (8:00 AM - 8:00 PM) -> 480 to 1200 mins
      if (day >= 1 && day <= 5) {
        if (currentMinutes >= 8 * 60 && currentMinutes < 20 * 60) {
          setClinicStatus({ open: true, text: "Open Now • Till 8:00 PM" });
        } else {
          setClinicStatus({ open: false, text: "Closed • Reopens 8:00 AM" });
        }
      } 
      // Saturday: 9:00 AM - 5:00 PM -> 540 to 1020 mins
      else if (day === 6) {
        if (currentMinutes >= 9 * 60 && currentMinutes < 17 * 60) {
          setClinicStatus({ open: true, text: "Open Now • Till 5:00 PM" });
        } else {
          setClinicStatus({ open: false, text: "Closed • Reopens Monday" });
        }
      } 
      // Sunday: Emergency Services Only
      else {
        setClinicStatus({ open: false, text: "Sunday • Emergency Support Only" });
      }
    };

    checkClinicStatus();
    const interval = setInterval(checkClinicStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Medical Services" },
    { id: "doctors", label: "Specialists" },
    { id: "about", label: "About NovaCare" },
    { id: "bookings", label: "Patient Bookings" }
  ];

  return (
    <header className="w-full relative z-40 bg-white" id="novacare-header">
      {/* Top Contact Bar */}
      <div className="w-full bg-slate-900 text-slate-300 text-[11px] md:text-xs py-2 px-4 md:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1.5 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center space-x-1.5">
              <Phone className="h-3.5 w-3.5 text-blue-400" />
              <span>Emergency 24/7: <strong className="text-white">{CLINIC_INFO.emergencyHotline}</strong></span>
            </span>
            <span className="flex items-center space-x-1.5 hidden md:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-blue-400" />
              <span>{CLINIC_INFO.address}</span>
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end space-x-6">
            <span className="flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="font-medium text-slate-200">{clinicStatus.text}</span>
              <span className={`h-2 w-2 rounded-full inline-block ml-1 ${clinicStatus.open ? "bg-teal-400 animate-pulse" : "bg-orange-400"}`}></span>
            </span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
            <a href="mailto:info@novacaremedical.com" className="hover:text-white transition-colors">
              {CLINIC_INFO.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="w-full py-4 px-4 md:px-8 shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab("home")} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 text-white shadow-md shadow-blue-500/10 group-hover:shadow-lg group-hover:scale-105 transition-all">
              <Activity className="h-5.5 w-5.5" />
            </div>
            <div>
              <span className="block font-sans text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                NovaCare
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-teal-600 -mt-0.5">
                Medical Centre
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:text-blue-600 ${
                  activeTab === item.id ? "text-blue-600" : "text-slate-500"
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={onOpenBooking}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-100 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dynamic Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl py-4 px-4 space-y-3 z-50">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2.5 px-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeTab === item.id ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-xl shadow-md shadow-blue-500/10"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
            <div className="flex items-center justify-center space-x-2 text-xs text-red-600 bg-red-50 py-2 rounded-lg font-semibold">
              <ShieldAlert className="h-4 w-4" />
              <span>Emergency 24/7 Hotline: {CLINIC_INFO.emergencyHotline}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
