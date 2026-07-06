import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, X, Send, Phone, MapPin, 
  Calendar, Search, Activity, User, HelpCircle, AlertTriangle 
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onNavigateToTab: (tab: string) => void;
  onOpenDoctorSelector?: (doctorId: string) => void;
}

export default function ChatBot({ onNavigateToTab }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Hello! Welcome to NovaCare Medical Centre. I'm your virtual assistant. I can help you book appointments, find doctors, answer questions about our services, clinic hours, insurance information, and guide you to the right department.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Look for emergency keywords to show safety banners immediately
    const emergencyKeywords = ["emergency", "chest pain", "heart attack", "stroke", "bleeding", "unconscious", "breathing", "die", "suicide", "accident"];
    const containsEmergency = emergencyKeywords.some(keyword => 
      text.toLowerCase().includes(keyword)
    );

    if (containsEmergency) {
      setShowEmergencyBanner(true);
    }

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!response.ok) {
        let serverErrorMsg = "Failed to connect to the assistant server.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            serverErrorMsg = errData.error;
          }
        } catch (e) {
          // Ignore parse errors and keep default message
        }
        throw new Error(serverErrorMsg);
      }

      const data = await response.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error: any) {
      console.warn("Virtual Assistant connection note:", error);
      
      // Dynamic fallback message with precise error guidance if available
      const errMsg = error?.message || "connection difficulties";
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I apologize, but I am currently experiencing some difficulties: ${errMsg}\n\nPlease verify that your server is running and that you have added your GEMINI_API_KEY to the Secrets panel in the AI Studio sidebar.\n\nNovaCare Medical Centre reception is available at +1 (800) 555-0199 or via info@novacaremedical.com for any direct assistance.`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "book":
        onNavigateToTab("bookings");
        setIsOpen(false);
        break;
      case "doctors":
        onNavigateToTab("doctors");
        setIsOpen(false);
        break;
      case "services":
        onNavigateToTab("services");
        setIsOpen(false);
        break;
      case "call":
        handleSend("How do I contact reception?");
        break;
      case "contact":
        onNavigateToTab("about");
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="novacare-chatbot">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        id="chatbot-toggle-btn"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-18 right-0 flex h-[550px] w-92 flex-col rounded-2xl border border-slate-100 bg-white shadow-2xl overflow-hidden sm:w-104"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="bg-slate-900 px-5 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 text-white shadow">
                    <Activity className="h-5 w-5" />
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-teal-400"></span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight">Virtual Care Assistant</h4>
                    <span className="text-[11px] text-teal-400 font-medium">NovaCare Medical Centre</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 hover:bg-slate-800 transition-colors"
                >
                  <X className="h-4 w-4 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Emergency Warning Banner if active */}
            {showEmergencyBanner && (
              <div className="flex items-start space-x-2 bg-red-50 border-b border-red-100 px-4 py-2.5 text-xs text-red-700 animate-pulse">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
                <div>
                  <p className="font-bold">Urgent Emergency Notice</p>
                  <p className="text-[11px] text-red-600">
                    If you are experiencing chest pain, respiratory distress, or severe injury, please contact <strong>911</strong> or call our 24/7 hotline <strong>+1 (800) 555-0199</strong> immediately.
                  </p>
                </div>
                <button onClick={() => setShowEmergencyBanner(false)} className="text-red-500 hover:text-red-700 font-bold shrink-0">
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start max-w-[85%] space-x-2">
                    {m.role === "assistant" && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs mt-0.5">
                        NC
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs shadow-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.content}</p>
                      <span
                        className={`block text-[9px] mt-1 text-right ${
                          m.role === "user" ? "text-blue-200" : "text-slate-400"
                        }`}
                      >
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs mt-0.5">
                      NC
                    </div>
                    <div className="rounded-2xl rounded-tl-none border border-slate-100 bg-white px-4 py-3 shadow-sm">
                      <div className="flex space-x-1.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Panel */}
            <div className="border-t border-slate-100 bg-white p-2">
              <p className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</p>
              <div className="flex flex-wrap gap-1.5 p-1">
                <button
                  onClick={() => handleQuickAction("book")}
                  className="flex items-center space-x-1 rounded-full border border-blue-100 bg-blue-50/50 px-2.5 py-1 text-[11px] font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book Appointment</span>
                </button>
                <button
                  onClick={() => handleQuickAction("doctors")}
                  className="flex items-center space-x-1 rounded-full border border-teal-100 bg-teal-50/50 px-2.5 py-1 text-[11px] font-medium text-teal-600 hover:bg-teal-50 transition-colors"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Find a Doctor</span>
                </button>
                <button
                  onClick={() => handleQuickAction("services")}
                  className="flex items-center space-x-1 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Our Services</span>
                </button>
                <button
                  onClick={() => handleQuickAction("call")}
                  className="flex items-center space-x-1 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Reception</span>
                </button>
                <button
                  onClick={() => handleQuickAction("contact")}
                  className="flex items-center space-x-1 rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Contact Clinic</span>
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center border-t border-slate-100 bg-white p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Ask about clinical services, hours, doctors..."
                className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
