import React, { useState } from "react";
import { CLINIC_INFO } from "../data";
import { 
  Activity, Phone, Mail, MapPin, Clock, 
  Facebook, Instagram, Linkedin, Send, ShieldCheck, 
  CheckCircle, ShieldAlert 
} from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ setActiveTab, onOpenBooking }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-900" id="novacare-footer">
      
      {/* Top Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab("home")}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-sans text-base font-extrabold tracking-tight text-white">
                NovaCare
              </span>
              <span className="block text-[9px] uppercase font-bold tracking-widest text-teal-400 -mt-0.5">
                Medical Centre
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-light">
            NovaCare Medical Centre delivers premium clinical treatments backed by state-of-the-art diagnostic infrastructures, international experts, and empathetic medical council guidelines.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-3.5 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-slate-500">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-slate-500">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-slate-500">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => setActiveTab("home")} className="hover:text-teal-400 transition-colors cursor-pointer font-light">
                Home Portal
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("services")} className="hover:text-teal-400 transition-colors cursor-pointer font-light">
                Medical Services
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("doctors")} className="hover:text-teal-400 transition-colors cursor-pointer font-light">
                Roster Council
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("about")} className="hover:text-teal-400 transition-colors cursor-pointer font-light">
                About NovaCare
              </button>
            </li>
            <li>
              <button onClick={onOpenBooking} className="hover:text-teal-400 transition-colors cursor-pointer font-bold text-teal-400">
                Book Slot Now
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Departments */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Clinical Specialties</h4>
          <ul className="space-y-2.5 text-xs text-slate-500 font-light">
            <li>Cardiology Clinic</li>
            <li>Pediatric Medicine</li>
            <li>Women's Health & Gyn</li>
            <li>Bone & Orthopedics</li>
            <li>Dermatology & Skin care</li>
            <li>On-site Lab Diagnostics</li>
            <li>Emergency Care</li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Contact */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Newsletter Signup</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed font-light">
            Stay informed with clinical reviews, vaccination updates, and healthcare advice from NovaCare physicians.
          </p>

          {subscribed ? (
            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 text-teal-400 p-2.5 rounded-xl text-xs font-semibold">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Subscription Confirmed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full text-xs bg-transparent border-none pl-2.5 text-white placeholder-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}

          {/* Quick emergency notice */}
          <div className="flex items-start space-x-2 bg-red-950/20 border border-red-900/30 rounded-xl p-3 text-[10px] text-red-400">
            <ShieldAlert className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase tracking-wider">Emergency Line</p>
              <p className="text-[10px] text-red-500 mt-0.5">{CLINIC_INFO.emergencyHotline}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Clinic Info Strip */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-b border-slate-900 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-500">
        <div className="flex items-start space-x-3">
          <MapPin className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Physical Coordinates</h5>
            <p className="mt-1 font-light leading-relaxed">{CLINIC_INFO.address}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Clinical Hours</h5>
            <p className="mt-1 font-light leading-relaxed">Mon-Fri: {CLINIC_INFO.hours.weekday}</p>
            <p className="font-light leading-relaxed">Saturday: {CLINIC_INFO.hours.saturday}</p>
            <p className="font-semibold text-teal-400 mt-0.5">Sunday: {CLINIC_INFO.hours.sunday}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="h-4.5 w-4.5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-[10px]">Administrative Contacts</h5>
            <p className="mt-1 font-light">{CLINIC_INFO.email}</p>
            <p className="font-semibold text-white mt-0.5">Reception: +1 (800) 555-0199</p>
          </div>
        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-600 gap-4">
        <div>
          <p>Copyright © 2026 NovaCare Medical Centre. All Rights Reserved.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms & Conditions</span>
          <span>•</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Cookie Policy</span>
          <span>•</span>
          <span className="flex items-center space-x-1.5 text-teal-600 font-bold bg-slate-900 px-2 py-0.5 rounded-full">
            <ShieldCheck className="h-3 w-3" />
            <span>HIPAA Compliant</span>
          </span>
        </div>
      </div>

    </footer>
  );
}
