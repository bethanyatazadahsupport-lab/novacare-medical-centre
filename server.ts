import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Medical Assistant System Instructions
const SYSTEM_INSTRUCTION = `You are a professional, polite, and compassionate AI Medical Assistant for NovaCare Medical Centre, an award-winning luxury private clinic.
Establish trust and represent the highest standard of modern clinical care.

Clinic Information:
- Business Name: NovaCare Medical Centre
- Tagline: Exceptional Healthcare. Compassionate People.
- CEO: Mr. Joshua
- Founded: 2014
- Contact Number: +1 (800) 555-0199 (Emergency Hotline)
- Email: info@novacaremedical.com
- Website: www.novacaremedical.com
- Address: 125 Healthcare Avenue, Westbrook Medical District, Springfield, NY 10001
- Business Hours:
  * Monday–Friday: 8:00 AM – 8:00 PM
  * Saturday: 9:00 AM – 5:00 PM
  * Sunday: Emergency Services Only (Call Hotline)

NovaCare Highlights:
- 30+ Specialist Doctors
- 20,000+ Patients Served
- 98% Patient Satisfaction Rating
- 24/7 Emergency Care

Services Available:
1. Family Medicine: Comprehensive healthcare for every generation.
2. General Consultation: Routine evaluations and general diagnoses.
3. Cardiology: Heart health assessments, ECG, hypertension management, preventive care.
4. Pediatrics: Dedicated infant, child, and adolescent healthcare.
5. Women's Health: Gynecological care, wellness screens, reproductive health.
6. Orthopedics: Bone, joint, and muscle conditions.
7. Dermatology: Acne, eczema, skin conditions, and cosmetic treatments.
8. Dental Care: General dentistry, cosmetic procedures, oral hygiene.
9. Laboratory Services: On-site comprehensive diagnostic testing with fast turnaround times.
10. Diagnostic Imaging: Digital X-ray, ultrasound, and advanced imaging.
11. Physiotherapy: Rehabilitation and mobility restoration.
12. Vaccination Clinic: Routine immunizations for kids and adults.
13. Pharmacy: On-site licensed pharmacy.
14. Emergency Care: Rapid assessment and 24/7 urgent medical management.

Our Prestigious Medical Team:
- Dr. Emily Carter: Chief Medical Officer (Internal Medicine)
- Dr. Michael Adams: Senior Cardiologist
- Dr. Sarah Thompson: Pediatric Specialist
- Dr. David Wilson: Orthopedic Surgeon
- Dr. Olivia Brown: Dermatologist
- Dr. James Anderson: General Physician
- Dr. Sophia Martinez: Women's Health Specialist
- Dr. Daniel Robinson: Dentist

Insurance & Pricing:
- We accept most major premium insurance providers (Aetna, Cigna, Blue Cross Blue Shield, UnitedHealthcare, Medicare).
- We maintain transparent pricing and provide patients with Digital Health Records for convenience.

CRITICAL MEDICAL DIRECTIVES:
1. NEVER diagnose illnesses, interpret diagnostic test results, or prescribe medication.
2. If a user asks about symptoms (e.g. "My head hurts, what is it?"), state politely that you cannot diagnose. Provide comforting words, explain that they should be evaluated by a healthcare professional, and guide them to find a doctor or book an appointment at NovaCare.
3. EMERGENCY RULE: If the user describes emergency symptoms (e.g., chest pain, difficulty breathing, numbness, severe bleeding, loss of consciousness, poisoning), IMMEDIATELY and urgently (yet calmly) direct them to call emergency services (such as 911) or contact our 24/7 Emergency Hotline +1 (800) 555-0199, or go to the nearest Emergency Room immediately. Do not answer other details first.

Interaction Guidelines:
- Be warm, supportive, and clinical yet extremely approachable.
- Keep answers structured and clean (using bullet points where needed).
- Guide users elegantly toward booking an appointment, finding a doctor, or viewing services when appropriate.`;

// Rule-based fallback generator for clinical assistance when API key is missing or calls fail
function getFallbackResponse(messages: any[]): string {
  const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user")?.content || "";
  const text = lastUserMsg.toLowerCase();

  if (text.includes("emergency") || text.includes("chest pain") || text.includes("heart attack") || text.includes("stroke") || text.includes("bleeding") || text.includes("unconscious") || text.includes("breathing") || text.includes("difficulty breathing")) {
    return "🚨 URGENT EMERGENCY NOTICE:\nIf you are experiencing emergency symptoms (such as chest pain, severe breathing difficulties, numbness, or heavy bleeding), please IMMEDIATELY call 911 or contact our 24/7 Emergency Hotline at +1 (800) 555-0199, or go to the nearest Emergency Room. Do not wait for an online response.";
  }

  if (text.includes("book") || text.includes("appointment") || text.includes("schedule") || text.includes("slot") || text.includes("booking")) {
    return "You can easily schedule a consultation using our online appointment booking system! Please go to the 'Bookings' tab in the navigation menu above to select your preferred doctor, clinical specialty, date, and time slot.";
  }

  if (text.includes("doctor") || text.includes("physician") || text.includes("specialist") || text.includes("emily") || text.includes("michael") || text.includes("sarah") || text.includes("david") || text.includes("olivia") || text.includes("james") || text.includes("sophia") || text.includes("daniel") || text.includes("roster") || text.includes("registry")) {
    return "NovaCare Medical Centre is proud to feature a distinguished Medical Council of world-class physicians:\n\n" +
           "• Dr. Emily Carter — Chief Medical Officer (Internal Medicine)\n" +
           "• Dr. Michael Adams — Senior Cardiologist\n" +
           "• Dr. Sarah Thompson — Pediatric Specialist\n" +
           "• Dr. David Wilson — Orthopedic Surgeon\n" +
           "• Dr. Olivia Brown — Dermatologist\n" +
           "• Dr. James Anderson — General Physician\n" +
           "• Dr. Sophia Martinez — Women's Health Specialist\n" +
           "• Dr. Daniel Robinson — General Dentist\n\n" +
           "You can view their full profiles, availability, and book a consultation directly in the 'Doctors' tab.";
  }

  if (text.includes("service") || text.includes("cardiology") || text.includes("pediatric") || text.includes("family") || text.includes("women") || text.includes("orthopedic") || text.includes("dermatology") || text.includes("dental") || text.includes("lab") || text.includes("diagnostic") || text.includes("imaging") || text.includes("physiotherapy") || text.includes("vaccine") || text.includes("pharmacy")) {
    return "Our state-of-the-art Westbrook clinic delivers outstanding medical care across these core specialties:\n\n" +
           "• Family & Internal Medicine (Routine checks, diagnostics)\n" +
           "• Cardiology Clinic (ECG, stress assessments, prevention)\n" +
           "• Pediatric Care (Dedicated infant and adolescent medicine)\n" +
           "• Women's Health (Gynecological and prenatal wellness)\n" +
           "• Orthopedic Medicine (Joint, bone, and muscle rehabilitation)\n" +
           "• Dermatology & Cosmetics (Expert skin evaluations and treatments)\n" +
           "• Dental Care & Hygiene (Comprehensive dentistry and oral care)\n" +
           "• Diagnostic Lab & Imaging (On-site X-ray, ultrasound, blood panels)\n\n" +
           "Please explore our interactive registry in the 'Services' tab to book any specific department.";
  }

  if (text.includes("hours") || text.includes("open") || text.includes("close") || text.includes("timing") || text.includes("schedule") || text.includes("weekend") || text.includes("weekday") || text.includes("monday") || text.includes("saturday") || text.includes("sunday")) {
    return "NovaCare Medical Centre regular hours of operation are:\n\n" +
           "• Monday – Friday: 8:00 AM – 8:00 PM\n" +
           "• Saturday: 9:00 AM – 5:00 PM\n" +
           "• Sunday: Emergency Services Only (Please call our Hotline)\n\n" +
           "For urgent requirements outside of regular clinical hours, our 24/7 hotline is +1 (800) 555-0199.";
  }

  if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("address") || text.includes("map") || text.includes("location") || text.includes("where") || text.includes("physical") || text.includes("coordinates")) {
    return "You can reach the NovaCare clinical helpdesk and administrative offices through:\n\n" +
           "• Phone: +1 (800) 555-0199 (Emergency Hotline / Reception)\n" +
           "• Email: info@novacaremedical.com\n" +
           "• Physical Address: 125 Healthcare Avenue, Westbrook Medical District, Springfield, NY 10001\n\n" +
           "You can also view a detailed interactive map and clinic details on our 'About' page.";
  }

  if (text.includes("insurance") || text.includes("pay") || text.includes("pricing") || text.includes("cost") || text.includes("aetna") || text.includes("cigna") || text.includes("blue cross") || text.includes("medicare") || text.includes("bill")) {
    return "At NovaCare, we believe in complete financial transparency. We accept most major premium insurance plans, including Aetna, Cigna, Blue Cross Blue Shield, UnitedHealthcare, and Medicare. All treatment records are saved securely in your HIPAA-compliant Digital Health Records. For complex billing audits, please contact our support desk.";
  }

  return "Hello! I'm your Virtual Health Assistant at NovaCare Medical Centre.\n\n" +
         "I can assist you with:\n" +
         "• Scheduling or managing appointments\n" +
         "• Recommending clinical departments or finding specialized doctors\n" +
         "• Verifying clinic operating hours, physical coordinates, and accepted insurance\n\n" +
         "What can I help you with today?";
}

// API routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' must be an array." });
    }

    // Elegant fallback if the Gemini API key is missing or not provided
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || process.env.GEMINI_API_KEY === "") {
      console.warn("Gemini API key is not configured. Falling back to local clinical response generator.");
      const reply = getFallbackResponse(messages);
      return res.json({ reply });
    }

    // Map message history to standard format for @google/genai
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    try {
      // Call Gemini API using 'gemini-3.5-flash' for basic text tasks (e.g., simple Q&A and Chat)
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.3,
        }
      });

      const reply = response.text || "I am here to assist you with booking appointments, finding doctors, and learning about our services. Please let me know how I can help.";
      res.json({ reply });
    } catch (apiError: any) {
      console.warn("Gemini API call failed. Falling back to local response generator. Error:", apiError.message);
      const reply = getFallbackResponse(messages);
      res.json({ reply });
    }
  } catch (error: any) {
    console.warn("Chat route handling error:", error.message);
    const reply = "I am here to assist you with booking appointments, finding doctors, and learning about our services. Please let me know how I can help.";
    res.json({ reply });
  }
});

// Server check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", clinic: "NovaCare Medical Centre" });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite HMR integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NovaCare Clinic Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
