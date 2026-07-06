import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SERVICES, DOCTORS } from "../data";
import { Appointment } from "../types";
import { 
  Calendar, Clock, User, Heart, CheckCircle2, 
  Trash2, ArrowRight, ArrowLeft, Plus, AlertCircle 
} from "lucide-react";

interface BookingFormProps {
  initialDoctorId?: string;
  onBookingSuccess?: (appointment: Appointment) => void;
}

export default function BookingForm({ initialDoctorId, onBookingSuccess }: BookingFormProps) {
  // State for Booking Wizard
  const [step, setStep] = useState(1);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Existing Appointments List
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load Existing bookings on mount
  useEffect(() => {
    const saved = localStorage.getItem("novacare_appointments");
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved appointments:", e);
      }
    }
  }, []);

  // Sync state back to initialDoctorId if it changes
  useEffect(() => {
    if (initialDoctorId) {
      setSelectedDoctorId(initialDoctorId);
      // Automatically pre-fill the corresponding service if any matches doctor's specialty
      const doc = DOCTORS.find(d => d.id === initialDoctorId);
      if (doc) {
        const matchingService = SERVICES.find(s => s.title.toLowerCase().includes(doc.specialty.toLowerCase()));
        if (matchingService) {
          setSelectedServiceId(matchingService.id);
        }
      }
    }
  }, [initialDoctorId]);

  // Handle Save Appointment
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!patientName || !patientEmail || !patientPhone || !selectedServiceId || !selectedDoctorId || !selectedDate || !selectedTime) {
      setErrorMsg("Please complete all required fields to register your clinical slot.");
      return;
    }

    const newAppointment: Appointment = {
      id: "APT-" + Math.floor(Math.random() * 100000),
      patientName,
      patientEmail,
      patientPhone,
      serviceId: selectedServiceId,
      doctorId: selectedDoctorId,
      date: selectedDate,
      time: selectedTime,
      notes,
      status: "Scheduled",
      createdAt: new Date().toISOString()
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem("novacare_appointments", JSON.stringify(updated));

    if (onBookingSuccess) {
      onBookingSuccess(newAppointment);
    }

    // Advance to Success screen (Step 5)
    setStep(5);
  };

  const deleteAppointment = (id: string) => {
    const filtered = appointments.filter(a => a.id !== id);
    setAppointments(filtered);
    localStorage.setItem("novacare_appointments", JSON.stringify(filtered));
  };

  const getServiceName = (id: string) => {
    return SERVICES.find(s => s.id === id)?.title || "General Medicine";
  };

  const getDoctorName = (id: string) => {
    return DOCTORS.find(d => d.id === id)?.name || "Any Physician Available";
  };

  // Get doctors available for the selected service specialty
  const filteredDoctors = DOCTORS.filter(doc => {
    if (!selectedServiceId) return true;
    const service = SERVICES.find(s => s.id === selectedServiceId);
    if (!service) return true;
    return doc.specialty.toLowerCase().includes(service.title.toLowerCase()) || doc.specialty === "General Consultation";
  });

  // Today's Date String for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const resetForm = () => {
    setStep(1);
    setPatientName("");
    setPatientEmail("");
    setPatientPhone("");
    setSelectedServiceId("");
    setSelectedDoctorId("");
    setSelectedDate("");
    setSelectedTime("");
    setNotes("");
  };

  const TIME_SLOTS = [
    "08:30 AM", "09:30 AM", "10:00 AM", "11:15 AM", 
    "01:30 PM", "02:45 PM", "03:30 PM", "04:15 PM"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="booking-section">
      {/* Booking Form Card (Wizard style) */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">Book Your Appointment</h3>
        <p className="text-sm text-slate-500 mb-6">Experience personalized luxury clinical support in Westbrook.</p>

        {/* Wizard Steps indicator */}
        {step < 5 && (
          <div className="flex items-center justify-between mb-8 text-xs font-semibold text-slate-400">
            <span className={`pb-2 border-b-2 transition-all ${step >= 1 ? "border-blue-500 text-blue-600" : "border-slate-100"}`}>1. Service</span>
            <span className={`pb-2 border-b-2 transition-all ${step >= 2 ? "border-blue-500 text-blue-600" : "border-slate-100"}`}>2. Physician</span>
            <span className={`pb-2 border-b-2 transition-all ${step >= 3 ? "border-blue-500 text-blue-600" : "border-slate-100"}`}>3. Slot</span>
            <span className={`pb-2 border-b-2 transition-all ${step >= 4 ? "border-blue-500 text-blue-600" : "border-slate-100"}`}>4. Patient</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {errorMsg && (
            <div className="flex items-center space-x-2 bg-red-50 border border-red-100 rounded-lg p-3 text-xs text-red-700 mb-6 animate-pulse">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Choose Clinical Department</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {SERVICES.map((s) => (
                  <label 
                    key={s.id} 
                    className={`flex items-start p-3.5 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 ${
                      selectedServiceId === s.id 
                        ? "border-blue-600 bg-blue-50/20" 
                        : "border-slate-100"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="booking_service" 
                      value={s.id} 
                      checked={selectedServiceId === s.id}
                      onChange={() => {
                        setSelectedServiceId(s.id);
                        // Reset doctor selection if previous doesn't match specialty
                        setSelectedDoctorId("");
                      }}
                      className="mt-1 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-bold text-slate-800">{s.title}</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5 line-clamp-1">{s.description}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  disabled={!selectedServiceId}
                  onClick={() => setStep(2)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <span>Select Doctor</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Select Doctor */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Choose Specialist Physician</h4>
                <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                  {selectedServiceId ? SERVICES.find(s => s.id === selectedServiceId)?.title : "All"} Specialist Matches
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {filteredDoctors.map((doc) => (
                  <label 
                    key={doc.id} 
                    className={`flex items-start p-3.5 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50 ${
                      selectedDoctorId === doc.id 
                        ? "border-blue-600 bg-blue-50/20" 
                        : "border-slate-100"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="booking_doctor" 
                      value={doc.id} 
                      checked={selectedDoctorId === doc.id}
                      onChange={() => setSelectedDoctorId(doc.id)}
                      className="mt-1 h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" 
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-bold text-slate-800">{doc.name}</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5 font-medium">{doc.role}</span>
                      <span className="block text-[10px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded mt-1.5 inline-block">{doc.experience} exp</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs px-5 py-3 rounded-xl transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Service</span>
                </button>
                <button
                  type="button"
                  disabled={!selectedDoctorId}
                  onClick={() => setStep(3)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                >
                  <span>Pick Date & Time</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Choose Date & Time Slot</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Select Date</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      min={todayStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-2 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          selectedTime === time
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center space-x-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs px-5 py-3 rounded-xl transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Physician</span>
                </button>
                <button
                  type="button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-medium text-xs px-5 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                >
                  <span>Patient Information</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Patient Information */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Patient Records Details</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient's full name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-blue-500 focus:bg-white" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-blue-500 focus:bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Mobile Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 0123"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-blue-500 focus:bg-white" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">Clinical Notes / Symptoms (Optional)</label>
                  <textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Briefly state reason for appointment or medical symptoms..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:border-blue-500 focus:bg-white" 
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center space-x-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-medium text-xs px-5 py-3 rounded-xl transition-all"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Slot</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition-all"
                >
                  <span>Confirm Clinical Booking</span>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Success State */}
          {step === 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-500 mb-4">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 tracking-tight">Booking Request Submitted Successfully!</h4>
              <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
                Thank you for choosing NovaCare, {patientName}. Your clinical slot is reserved. A confirmation SMS and digital credentials have been sent to {patientEmail}.
              </p>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left max-w-sm mx-auto mt-6 space-y-2 text-xs">
                <p className="flex justify-between"><span className="text-slate-400">Department:</span> <strong className="text-slate-800">{getServiceName(selectedServiceId)}</strong></p>
                <p className="flex justify-between"><span className="text-slate-400">Physician:</span> <strong className="text-slate-800">{getDoctorName(selectedDoctorId)}</strong></p>
                <p className="flex justify-between"><span className="text-slate-400">Scheduled:</span> <strong className="text-slate-800">{selectedDate} at {selectedTime}</strong></p>
                <p className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-700 text-[10px] font-bold">Scheduled</span></p>
              </div>

              <div className="mt-8 flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>

      {/* Existing Appointments Panel */}
      <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-6">
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          <span>My Scheduled Bookings ({appointments.length})</span>
        </h3>

        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 space-y-3 bg-white rounded-xl border border-slate-100 p-4">
            <Clock className="h-8 w-8 text-slate-300" />
            <div>
              <p className="font-semibold text-sm">No Appointments Scheduled</p>
              <p className="text-[11px] max-w-[200px] mt-1 text-slate-400">Book your clinical slot using the booking panel on the left.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            <AnimatePresence>
              {appointments.map((apt) => (
                <motion.div 
                  key={apt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm relative group"
                >
                  <button 
                    onClick={() => deleteAppointment(apt.id)}
                    className="absolute top-3 right-3 p-1 rounded-md text-slate-300 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    title="Cancel Appointment"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center space-x-1.5 mb-1.5">
                    <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded-md uppercase">
                      {apt.id}
                    </span>
                    <span className="text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full">
                      {getServiceName(apt.serviceId)}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-800">{apt.patientName}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>Physician: {getDoctorName(apt.doctorId)}</span>
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-50 mt-3 pt-3 text-[11px] text-slate-500">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-slate-700">{apt.date}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-700">{apt.time}</span>
                    </div>
                    <span className="font-bold text-teal-600 flex items-center space-x-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500 inline-block animate-pulse"></span>
                      <span>Confirmed</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
