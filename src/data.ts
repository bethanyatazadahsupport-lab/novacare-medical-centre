import { Service, Doctor, Testimonial, FAQ } from "./types";

export const CLINIC_INFO = {
  name: "NovaCare Medical Centre",
  tagline: "Exceptional Healthcare. Compassionate People.",
  ceo: "Mr. Joshua",
  founded: 2014,
  hours: {
    weekday: "8:00 AM – 8:00 PM",
    saturday: "9:00 AM – 5:00 PM",
    sunday: "Emergency Services Only"
  },
  emergencyHotline: "+1 (800) 555-0199",
  email: "info@novacaremedical.com",
  website: "www.novacaremedical.com",
  address: "125 Healthcare Avenue, Westbrook Medical District, Springfield, NY 10001"
};

export const SERVICES: Service[] = [
  {
    id: "family-medicine",
    title: "Family Medicine",
    description: "Comprehensive healthcare for patients of all ages with a focus on prevention, wellness, and long-term health management.",
    category: "General",
    icon: "Activity",
    details: [
      "Preventive screenings & check-ups",
      "Chronic disease management",
      "Lifestyle & wellness counseling",
      "Immunizations & travel health"
    ]
  },
  {
    id: "general-consultation",
    title: "General Consultation",
    description: "Routine medical evaluations, diagnosis, and treatment planning by experienced physicians.",
    category: "General",
    icon: "Stethoscope",
    details: [
      "Primary health triage",
      "Prescription management",
      "Referrals to specialist physicians",
      "Acute illness management"
    ]
  },
  {
    id: "cardiology",
    title: "Cardiology",
    description: "Heart health assessments, ECG, hypertension management, and preventive cardiovascular care.",
    category: "Specialist",
    icon: "Heart",
    details: [
      "Electrocardiogram (ECG)",
      "Hypertension diagnostics & treatment",
      "Cholesterol & cardiovascular risk profiling",
      "Heart failure monitoring"
    ]
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    description: "Dedicated healthcare services for infants, children, and adolescents in a friendly environment.",
    category: "Specialist",
    icon: "Baby",
    details: [
      "Childhood developmental tracking",
      "Pediatric immunizations",
      "Acute pediatric illnesses",
      "School & sports physical check-ups"
    ]
  },
  {
    id: "womens-health",
    title: "Women's Health",
    description: "Routine gynecological care, wellness examinations, reproductive health, and preventive screenings.",
    category: "Specialist",
    icon: "Sparkles",
    details: [
      "Gynecological health exams",
      "Pap smear & cervical screenings",
      "Family planning & contraception",
      "Menopause management"
    ]
  },
  {
    id: "orthopedics",
    title: "Orthopedics",
    description: "Diagnosis and treatment of bone, joint, muscle, and sports-related conditions.",
    category: "Specialist",
    icon: "Activity",
    details: [
      "Sports injury diagnostics & rehabilitation",
      "Joint pain & osteoarthritis treatments",
      "Bone density & osteoporosis management",
      "Fractures & strain care"
    ]
  },
  {
    id: "dermatology",
    title: "Dermatology",
    description: "Professional treatment for skin conditions, acne, eczema, allergies, and cosmetic dermatology.",
    category: "Specialist",
    icon: "Sun",
    details: [
      "Acne & eczema customized treatments",
      "Skin cancer screenings",
      "Allergic skin reaction management",
      "Anti-aging & aesthetic dermatology"
    ]
  },
  {
    id: "dental-care",
    title: "Dental Care",
    description: "General dentistry, cosmetic procedures, oral hygiene, and preventive dental services.",
    category: "Specialist",
    icon: "Smile",
    details: [
      "Routine scaling & dental polishing",
      "Cavity fillings & restorative treatments",
      "Teeth whitening & aesthetic dentistry",
      "Root canal therapy & emergency dental checkups"
    ]
  },
  {
    id: "laboratory-services",
    title: "Laboratory Services",
    description: "Comprehensive diagnostic testing with fast turnaround times.",
    category: "Diagnostics",
    icon: "FlaskConical",
    details: [
      "Complete Blood Counts & chemistry profiles",
      "Unaltered blood glucose & lipid testing",
      "Thyroid & hormone evaluations",
      "Pathology and molecular test sequencing"
    ]
  },
  {
    id: "diagnostic-imaging",
    title: "Diagnostic Imaging",
    description: "Digital X-ray, ultrasound, and advanced imaging services.",
    category: "Diagnostics",
    icon: "Radiation",
    details: [
      "High-resolution digital X-Rays",
      "Diagnostic abdominal & pelvic ultrasounds",
      "Musculoskeletal ultrasound",
      "Vascular Doppler scan diagnostics"
    ]
  },
  {
    id: "physiotherapy",
    title: "Physiotherapy",
    description: "Rehabilitation programs designed to restore mobility and improve quality of life.",
    category: "Support",
    icon: "Accessibility",
    details: [
      "Post-surgical recovery therapy",
      "Spinal & posture rehabilitation",
      "Neurological physiotherapy programs",
      "Custom-tailored exercise prescription"
    ]
  },
  {
    id: "vaccination-clinic",
    title: "Vaccination Clinic",
    description: "Routine immunizations for children and adults.",
    category: "Support",
    icon: "ShieldAlert",
    details: [
      "Seasonal Influenza vaccines",
      "HPV & shingles immunization",
      "International travel vaccinations",
      "Childhood booster immunizations"
    ]
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description: "On-site pharmacy providing convenient access to prescribed medications.",
    category: "Support",
    icon: "ShoppingBag",
    details: [
      "Prescription fulfillment with clinical overview",
      "Over-the-counter medicine selection",
      "In-depth medication counseling",
      "Digital prescription storage"
    ]
  },
  {
    id: "emergency-care",
    title: "Emergency Care",
    description: "Rapid assessment and treatment for urgent medical conditions.",
    category: "Support",
    icon: "ShieldAlert",
    details: [
      "Immediate trauma triage",
      "Cardiovascular stabilization",
      "Acute allergic reaction treatments",
      "Direct lines to ambulances & inpatient facilities"
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-emily-carter",
    name: "Dr. Emily Carter",
    role: "Chief Medical Officer",
    specialty: "Internal Medicine",
    experience: "15+ Years",
    education: "MD - Harvard Medical School, Residency at Johns Hopkins Hospital",
    availability: "Mon, Wed, Fri (8:00 AM - 4:00 PM)",
    bio: "Dr. Carter leads our medical team with clinical precision. She specializes in diagnostics, preventative screenings, and holistic internal medicine programs.",
    gender: "female"
  },
  {
    id: "dr-michael-adams",
    name: "Dr. Michael Adams",
    role: "Senior Cardiologist",
    specialty: "Cardiology",
    experience: "12+ Years",
    education: "MD - Stanford University School of Medicine, Cardiology Fellowship at Cleveland Clinic",
    availability: "Tue, Thu (9:00 AM - 5:00 PM)",
    bio: "Dr. Adams has a distinguished record in preventing and managing cardiovascular diseases, incorporating state-of-the-art diagnostic technology for heart care.",
    gender: "male"
  },
  {
    id: "dr-sarah-thompson",
    name: "Dr. Sarah Thompson",
    role: "Pediatric Specialist",
    specialty: "Pediatrics",
    experience: "10+ Years",
    education: "MD - Columbia University College of Physicians and Surgeons",
    availability: "Mon, Tue, Wed (8:00 AM - 2:00 PM)",
    bio: "With a gentle touch and outstanding empathy, Dr. Thompson provides exceptional primary care for newborns, children, and young adolescents.",
    gender: "female"
  },
  {
    id: "dr-david-wilson",
    name: "Dr. David Wilson",
    role: "Orthopedic Surgeon",
    specialty: "Orthopedics",
    experience: "14+ Years",
    education: "MD - Yale School of Medicine, Orthopaedic Surgery Residency at Mayo Clinic",
    availability: "Wed, Thu, Fri (1:00 PM - 7:00 PM)",
    bio: "An expert in sports injuries and joint reconstruction, Dr. Wilson focuses on restoring full mobility and functional longevity for active patients.",
    gender: "male"
  },
  {
    id: "dr-olivia-brown",
    name: "Dr. Olivia Brown",
    role: "Dermatologist",
    specialty: "Dermatology",
    experience: "9+ Years",
    education: "MD - NYU Grossman School of Medicine, Dermatology Residency at Bellevue Hospital",
    availability: "Mon, Thu (10:00 AM - 6:00 PM)",
    bio: "Dr. Brown offers highly individualized skin solutions, spanning critical clinical dermatology for skin wellness to advanced aesthetic restoration.",
    gender: "female"
  },
  {
    id: "dr-james-anderson",
    name: "Dr. James Anderson",
    role: "General Physician",
    specialty: "General Consultation",
    experience: "8+ Years",
    education: "MD - University of Pennsylvania School of Medicine",
    availability: "Mon-Fri (8:00 AM - 4:00 PM)",
    bio: "Dr. Anderson focuses on routine wellness check-ups, urgent medical evaluations, and coordinating specialized long-term patient health journeys.",
    gender: "male"
  },
  {
    id: "dr-sophia-martinez",
    name: "Dr. Sophia Martinez",
    role: "Women's Health Specialist",
    specialty: "Women's Health",
    experience: "11+ Years",
    education: "MD - UCLA David Geffen School of Medicine",
    availability: "Tue, Fri (8:00 AM - 4:00 PM)",
    bio: "Dedicated to female health through all stages of life, Dr. Martinez offers exceptional obstetrics, gynecology, and preventive health screenings.",
    gender: "female"
  },
  {
    id: "dr-daniel-robinson",
    name: "Dr. Daniel Robinson",
    role: "Dentist",
    specialty: "Dental Care",
    experience: "7+ Years",
    education: "DDS - Boston University Henry M. Goldman School of Dental Medicine",
    availability: "Tue, Wed, Sat (9:00 AM - 5:00 PM)",
    bio: "Dr. Robinson believes in pain-free dental care. He provides a comprehensive suite of general dentistry, deep hygiene, and aesthetic restorations.",
    gender: "male"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Excellent doctors and caring staff. The online appointment process was quick and easy.",
    author: "Sarah Williams",
    role: "Local Business Owner",
    rating: 5
  },
  {
    quote: "The facilities are modern, clean, and the medical team made me feel comfortable throughout my visit.",
    author: "Robert Johnson",
    role: "Software Consultant",
    rating: 5
  },
  {
    quote: "Professional healthcare with exceptional customer service. Highly recommended.",
    author: "Emily Davis",
    role: "Teacher",
    rating: 5
  }
];

export const FAQS: FAQ[] = [
  {
    question: "Do you accept walk-in patients?",
    answer: "Yes, we accept walk-ins for general consultations, pharmacy services, and minor injuries. However, to guarantee prompt service and avoid waiting times, we highly recommend booking an appointment online or by calling reception."
  },
  {
    question: "How do I book an appointment?",
    answer: "Appointments can be booked easily online using our interactive booking scheduler, by phone at +1 (800) 555-0199, or in person at our reception desk. Our AI Medical Assistant can also guide you directly to the booker!"
  },
  {
    question: "Do you offer emergency services?",
    answer: "Yes, NovaCare Medical Centre offers rapid assessments and emergency stabilization services 24 hours a day, 7 days a week. For serious emergencies, call our dedicated line: +1 (800) 555-0199."
  },
  {
    question: "Do you provide laboratory testing?",
    answer: "Yes, our fully equipped on-site diagnostic laboratory offers comprehensive blood panels, pathology, urinalysis, hormone screening, and lipid panels. Most test results are delivered securely to your digital health record within 24 hours."
  },
  {
    question: "Can I request my medical records?",
    answer: "Yes, you can request digital or physical copies of your complete medical history, lab results, and imaging scans through our records department. This can be processed in accordance with local patient privacy and data laws."
  }
];

export const CORE_VALUES = [
  { name: "Compassion", desc: "Placing genuine care, active listening, and warmth at the core of our relationships." },
  { name: "Integrity", desc: "Upholding absolute moral and scientific honesty in every clinical program and diagnosis." },
  { name: "Innovation", desc: "Equipping our facilities with state-of-the-art diagnostic imaging and modern patient technologies." },
  { name: "Excellence", desc: "Striving for world-class standards in healthcare delivery, hygiene, and patient recovery." },
  { name: "Respect", desc: "Treating every patient's background, choices, and privacy with the highest regard." },
  { name: "Patient Safety", desc: "Rigorous protocols ensuring a highly sanitary and clinically safe environment." },
  { name: "Professionalism", desc: "Our team operates with pristine clinical courtesy, punctuality, and medical rigor." },
  { name: "Continuous Improvement", desc: "Regular clinical reviews, training, and education to offer the newest evidence-based medicine." }
];

export const WHY_CHOOSE_US = [
  { title: "Experienced Specialists", desc: "Our medical experts hail from world-leading clinical environments and academic institutions." },
  { title: "Modern Medical Equipment", desc: "Priscilla and state-of-the-art diagnostic imaging, digital X-rays, and modern surgical gear." },
  { title: "Fast Laboratory Results", desc: "Highly optimized on-site labs providing most primary results in hours instead of days." },
  { title: "Patient-Centered Care", desc: "Your comfort, choices, and clinical outcomes guide our entire practice philosophy." },
  { title: "Online Appointment Booking", desc: "Book, reschedule, or cancel slots with our beautiful client scheduling engine." },
  { title: "Advanced Diagnostic Services", desc: "Comprehensive on-site ultrasounds, pathology, molecular diagnostics, and imaging suites." },
  { title: "Comfortable Environment", desc: "Designed like an upscale clinic with clean layouts, soothing lighting, and absolute privacy." },
  { title: "Transparent Pricing", desc: "No hidden charges or surprise line-items. Comprehensive breakdowns prior to treatment." },
  { title: "Emergency Support", desc: "A rapid trauma and emergency clinical stabilization team standing by 24/7." },
  { title: "Digital Health Records", desc: "Easily access prescriptions, vaccine records, and laboratory files from any device." }
];
