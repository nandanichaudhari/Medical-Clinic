import { Doctor, Department, Service, HealthPackage, Review } from './types';

export const DEPARTMENTS: Department[] = [
  { id: 'gen', name: 'General Consultation', icon: 'Stethoscope', description: 'Comprehensive primary care and medical checkups.' },
  { id: 'den', name: 'Dental Care', icon: 'Smile', description: 'Advanced dental treatments and oral hygiene.' },
  { id: 'ped', name: 'Child Care', icon: 'Baby', description: 'Specialized healthcare for infants, children, and adolescents.' },
  { id: 'der', name: 'Skin Treatment', icon: 'Zap', description: 'Expert dermatological care for all skin types.' },
  { id: 'eye', name: 'Eye Checkup', icon: 'Eye', description: 'Precision eye exams and vision correction services.' },
  { id: 'car', name: 'Heart Checkup', icon: 'Activity', description: 'Cardiovascular screening and heart health management.' },
  { id: 'dia', name: 'Diabetes Care', icon: 'Droplet', description: 'Specialized management of blood sugar and diabetic health.' },
  { id: 'phy', name: 'Physiotherapy', icon: 'Dumbbell', description: 'Relieve pain and improve mobility through expert therapy.' },
  { id: 'wom', name: 'Women’s Health', icon: 'Heart', description: 'Comprehensive gynecological and obstetric services.' }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Wilson',
    specialization: 'Senior Cardiologist',
    experience: '12+ Years',
    education: 'MBBS, MD (Cardiology)',
    fee: 800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60',
    availability: ['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'],
    departmentId: 'car'
  },
  {
    id: 'd2',
    name: 'Dr. James Chen',
    specialization: 'Pediatric Specialist',
    experience: '8 Years',
    education: 'MBBS, DCH',
    fee: 600,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=60',
    availability: ['11:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'],
    departmentId: 'ped'
  },
  {
    id: 'd3',
    name: 'Dr. Elena Rodriguez',
    specialization: 'Dermatologist',
    experience: '10 Years',
    education: 'MBBS, DDVL',
    fee: 700,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&auto=format&fit=crop&q=60',
    availability: ['10:00 AM', '1:00 PM', '4:00 PM', '6:00 PM'],
    departmentId: 'der'
  },
  {
    id: 'd4',
    name: 'Dr. Michael Brown',
    specialization: 'Dentist',
    experience: '15 Years',
    education: 'BDS, MDS',
    fee: 500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&auto=format&fit=crop&q=60',
    availability: ['9:30 AM', '11:30 AM', '2:30 PM', '5:00 PM'],
    departmentId: 'den'
  },
  {
    id: 'd5',
    name: 'Dr. Priya Sharma',
    specialization: 'Gynecologist',
    experience: '14 Years',
    education: 'MBBS, MS (OBG)',
    fee: 900,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&auto=format&fit=crop&q=60',
    availability: ['10:00 AM', '12:00 PM', '3:00 PM', '4:00 PM'],
    departmentId: 'wom'
  }
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'p1',
    name: 'Basic Health Checkup',
    price: 999,
    originalPrice: 1999,
    features: ['Blood Sugar', 'CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Doctor Consultation']
  },
  {
    id: 'p2',
    name: 'Full Body Premium',
    price: 2499,
    originalPrice: 4999,
    tag: 'Popular',
    features: ['All Basic Tests', 'Vitamin D/B12', 'Thyroid Profile', 'Iron Studies', 'Urine Routine', 'ECG', 'Detailed Report']
  },
  {
    id: 'p3',
    name: 'Senior Citizen Care',
    price: 3499,
    originalPrice: 5999,
    features: ['Cardiac Markers', 'Bone Density', 'Cancer Screening', 'Diabetes Panel', 'Physiotherapy Session', 'Home Sample Collection']
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Rahul Verma',
    rating: 5,
    comment: 'Exceptional care and professional staff. Dr. Sarah was very patient with my heart condition diagnosis.',
    date: 'April 2024',
    avatar: 'https://i.pravatar.cc/150?u=rahul'
  },
  {
    id: 'r2',
    name: 'Anjali Gupta',
    rating: 4,
    comment: 'The appointment booking was seamless. Very clean environment and timely consultation.',
    date: 'May 2024',
    avatar: 'https://i.pravatar.cc/150?u=anjali'
  }
];

export const SERVICES: Service[] = [
  { id: '1', title: 'Online Consultation', description: 'Consult with our expert doctors from the comfort of your home.', icon: 'Video' },
  { id: '2', title: 'Emergency Care', description: '24/7 dedicated emergency response team for critical situations.', icon: 'Flame' },
  { id: '3', title: 'Home Visits', description: 'Personalized medical care provided right at your doorstep.', icon: 'Home' },
  { id: '4', title: 'Lab Diagnostics', description: 'State-of-the-art laboratory for accurate health screening.', icon: 'Beaker' }
];
