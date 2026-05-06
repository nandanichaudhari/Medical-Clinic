export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  education: string;
  fee: number;
  rating: number;
  image: string;
  availability: string[];
  departmentId: string;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  features: string[];
  tag?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  department: string;
  doctor: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  symptoms: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  appointmentStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  consultationFee: number;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}
