import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import BookingForm from "./components/BookingForm";
import WhyChooseUs from "./components/WhyChooseUs";
import Leadership from "./components/Leadership";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { CLINIC_INFO } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, Activity, ShieldCheck, Heart, AlertCircle } from "lucide-react";

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>("home");

  // Selected doctor ID to prefill the Booking form
  const [prefilledDoctorId, setPrefilledDoctorId] = useState<string>("");

  // Smooth scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  // Handle booking action from Services or Doctors
  const handleSelectService = (serviceId: string) => {
    setActiveTab("bookings");
  };

  const handleSelectDoctor = (doctorId: string) => {
    setPrefilledDoctorId(doctorId);
    setActiveTab("bookings");
  };

  // Structured Data Schema.org (MedicalClinic JSON-LD)
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": CLINIC_INFO.name,
    "alternateName": "NovaCare",
    "description": "Premium multi-specialty private medical centre in Westbrook district. Advanced diagnostic imaging, expert physicians, on-site labs.",
    "url": "http://www.novacaremedical.com",
    "logo": "https://novacaremedical.com/logo.png",
    "telephone": CLINIC_INFO.emergencyHotline,
    "email": CLINIC_INFO.email,
    "foundingDate": "2014",
    "founder": {
      "@type": "Person",
      "name": CLINIC_INFO.ceo
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "125 Healthcare Avenue",
      "addressLocality": "Westbrook Medical District",
      "addressRegion": "Springfield, NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "23:59",
        "description": "Emergency Services Only"
      }
    ],
    "medicalSpecialty": [
      "Cardiology",
      "Pediatrics",
      "GynecologicMedicine",
      "Orthopedic",
      "Dermatology",
      "GeneralPractice"
    ]
  };

  // Injects JSON-LD into the head
  useEffect(() => {
    const scriptId = "novacare-jsonld-schema";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }
    scriptElement.innerHTML = JSON.stringify(schemaMarkup);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white" id="novacare-app-root">
      
      {/* Global Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBooking={() => {
          setPrefilledDoctorId("");
          setActiveTab("bookings");
        }} 
      />

      {/* Main Content Router */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Hero 
                onBookAppointment={() => {
                  setPrefilledDoctorId("");
                  setActiveTab("bookings");
                }} 
                onFindDoctor={() => setActiveTab("doctors")} 
              />
              <About />
              <WhyChooseUs />
              <Services onSelectService={handleSelectService} />
              <Leadership onBookAppointment={() => {
                setPrefilledDoctorId("");
                setActiveTab("bookings");
              }} />
              <FAQSection />
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Premium Breadcrumb banner */}
              <div className="bg-slate-900 py-12 text-white border-b border-slate-800 text-center">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-2">
                  <span className="text-[10px] bg-blue-500/15 border border-blue-400/20 px-3 py-1 rounded-full text-blue-400 uppercase tracking-widest font-bold">Departments</span>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Our Medical Specialties</h1>
                  <p className="text-xs text-slate-400 font-light max-w-lg mx-auto">Explore clinical diagnosis profiles, expert physicians, and treatment schedules at NovaCare.</p>
                </div>
              </div>
              <Services onSelectService={handleSelectService} />
              <FAQSection />
            </motion.div>
          )}

          {activeTab === "doctors" && (
            <motion.div
              key="doctors-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Premium Breadcrumb banner */}
              <div className="bg-slate-900 py-12 text-white border-b border-slate-800 text-center">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-2">
                  <span className="text-[10px] bg-teal-500/15 border border-teal-400/20 px-3 py-1 rounded-full text-teal-400 uppercase tracking-widest font-bold">Medical Council</span>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">NovaCare Clinical Registry</h1>
                  <p className="text-xs text-slate-400 font-light max-w-lg mx-auto">Discover specialist profiles, board certifications, schedules, and book clinical consultations directly.</p>
                </div>
              </div>
              <Doctors onSelectDoctor={handleSelectDoctor} />
              <FAQSection />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Premium Breadcrumb banner */}
              <div className="bg-slate-900 py-12 text-white border-b border-slate-800 text-center">
                <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-2">
                  <span className="text-[10px] bg-blue-500/15 border border-blue-400/20 px-3 py-1 rounded-full text-blue-400 uppercase tracking-widest font-bold">Clinical Foundation</span>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight">Established Since 2014</h1>
                  <p className="text-xs text-slate-400 font-light max-w-lg mx-auto">NovaCare Medical Centre is Westbrook's premier multi-specialty healthcare provider built on integrity.</p>
                </div>
              </div>
              <About />
              <WhyChooseUs />
              <Leadership onBookAppointment={() => {
                setPrefilledDoctorId("");
                setActiveTab("bookings");
              }} />
              <FAQSection />
            </motion.div>
          )}

          {activeTab === "bookings" && (
            <motion.div
              key="bookings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="py-12 bg-slate-50"
            >
              <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Visual Notice for prefilled doctor */}
                {prefilledDoctorId && (
                  <div className="flex items-center space-x-2.5 bg-blue-50 border border-blue-100 text-blue-800 px-4 py-3 rounded-xl text-xs font-semibold mb-6">
                    <Activity className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
                    <span>
                      You have pre-selected a physician slot. We have locked in the specialty records for you.
                    </span>
                    <button 
                      onClick={() => setPrefilledDoctorId("")}
                      className="ml-auto underline hover:text-blue-950 font-bold"
                    >
                      Reset Doctor Selection
                    </button>
                  </div>
                )}

                <BookingForm 
                  initialDoctorId={prefilledDoctorId} 
                  onBookingSuccess={() => setPrefilledDoctorId("")}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} onOpenBooking={() => {
        setPrefilledDoctorId("");
        setActiveTab("bookings");
      }} />

      {/* Floating AI Medical Assistant */}
      <ChatBot 
        onNavigateToTab={(tab) => {
          setPrefilledDoctorId("");
          setActiveTab(tab);
        }} 
      />

    </div>
  );
}
