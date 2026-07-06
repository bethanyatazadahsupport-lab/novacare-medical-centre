export interface Service {
  id: string;
  title: string;
  description: string;
  category: "General" | "Specialist" | "Diagnostics" | "Support";
  icon: string;
  details?: string[];
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  education: string;
  availability: string;
  bio: string;
  gender: "male" | "female";
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  notes?: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}
