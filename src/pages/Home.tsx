import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, MessageCircle, HeartPulse, ShieldCheck, Award, Timer, Stethoscope, Navigation, ChevronDown, Check, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEPARTMENTS, DOCTORS, HEALTH_PACKAGES, REVIEWS } from '../data';
import { cn, formatCurrency } from '../lib/utils';
import * as LucideIcons from 'lucide-react';

const DynamicIcon = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon {...props} /> : <Stethoscope {...props} />;
};

export function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: "What are your opening hours?", a: "We are open Monday to Saturday from 9:00 AM to 8:00 PM. Sundays are reserved for emergencies only." },
    { q: "Do you offer online consultations?", a: "Yes, we offer premium video consultations with our specialist doctors. You can book an 'Online Consultation' through our booking form." },
    { q: "What documents should I bring?", a: "Please bring your ID proof, any previous medical records, and insurance card if applicable." },
    { q: "How can I reschedule my appointment?", a: "You can reschedule by calling our helpdesk at least 4 hours before your scheduled time slot." }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-gradient-to-br from-brand-50 via-white to-teal-50">
        <div className="absolute top-40 -left-20 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-brand-600 mr-2" />
                Trusted Healthcare for Your Family
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-950 leading-[1.1] mb-6">
                Your Health Is Our <span className="text-brand-600">Top Priority</span> Ever.
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
                Experience world-class healthcare with state-of-the-art facilities and compassionate doctors dedicated to your well-being.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/book" className="px-8 py-4 bg-brand-600 text-white rounded-full font-bold shadow-xl shadow-brand-200 hover:bg-brand-700 transition-all flex items-center">
                  Book Appointment <ArrowRight size={20} className="ml-2" />
                </Link>
                <a href="tel:+919876543210" className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center">
                  <Phone size={20} className="mr-2 text-brand-600" /> +91 98765 43210
                </a>
              </div>

              <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
                <div>
                  <div className="text-2xl font-bold text-brand-600">15+</div>
                  <div className="text-sm text-slate-500 font-medium">Years Experience</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <div className="text-2xl font-bold text-brand-600">24/7</div>
                  <div className="text-sm text-slate-500 font-medium">Emergency Care</div>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div>
                  <div className="text-2xl font-bold text-brand-600">10k+</div>
                  <div className="text-sm text-slate-500 font-medium">Happy Patients</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl shadow-brand-100 border-8 border-white aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80" 
                  alt="Doctor with patient" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-10 z-20 glass p-4 rounded-2xl shadow-xl flex items-center space-x-4 max-w-[200px]"
              >
                <div className="bg-teal-100 p-2 rounded-xl text-teal-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Certified</div>
                  <div className="text-sm font-display font-bold text-slate-900">Expert Doctors</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">Our Specialty</h2>
            <h3 className="text-4xl lg:text-5xl font-display font-bold text-slate-950">Specialized Medical Services</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.slice(0, 6).map((dept) => (
              <div key={dept.id} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:bg-white hover:shadow-xl group">
                <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <DynamicIcon name={dept.icon} size={28} />
                </div>
                <h4 className="text-xl font-display font-bold text-slate-900 mb-3">{dept.name}</h4>
                <p className="text-slate-500 mb-6">{dept.description}</p>
                <Link to="/services" className="text-brand-600 font-bold text-sm flex items-center group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-600/10 skew-x-12 transform translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-brand-400 font-bold uppercase tracking-widest text-sm mb-4">Why Choose MediCare</h2>
              <h3 className="text-4xl lg:text-5xl font-display font-bold mb-8">World-Class Medical Care Since 2010</h3>
              <div className="space-y-8">
                {[
                  { icon: Award, title: 'Professional Medical Staff', desc: 'Expert doctors with years of clinical experience.' },
                  { icon: HeartPulse, title: 'Advanced Technology', desc: 'Modern equipment for accurate diagnosis.' },
                  { icon: Stethoscope, title: 'Compassionate Care', desc: 'Dedicated to your comfort and health.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-400">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80" className="rounded-3xl h-full w-full object-cover" alt="Clinic interior" />
              <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80" className="rounded-3xl h-full w-full object-cover" alt="Medical lab" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">Expert Doctors</h2>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-slate-950">Meet Our Specialists</h3>
            </div>
            <Link to="/doctors" className="px-6 py-3 bg-white text-brand-600 border border-brand-100 rounded-xl font-bold flex items-center hover:bg-brand-50 transition-all text-sm">
              View All Doctors <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DOCTORS.slice(0, 4).map((doc) => (
              <Link key={doc.id} to="/book" className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="h-64 overflow-hidden">
                  <img src={doc.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={doc.name} />
                </div>
                <div className="p-6">
                  <h4 className="font-display font-bold text-slate-900 group-hover:text-brand-600 transition-colors uppercase text-sm tracking-tight">{doc.name}</h4>
                  <p className="text-xs font-bold text-brand-500 mt-1">{doc.specialization}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Health Packages */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">Health Packages</h2>
            <h3 className="text-3xl lg:text-4xl font-display font-bold text-slate-950">Affordable Checkup Plans</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HEALTH_PACKAGES.map((pkg) => (
              <div key={pkg.id} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
                <h4 className="font-display font-bold text-slate-900 mb-2">{pkg.name}</h4>
                <div className="text-2xl font-bold text-brand-600 mb-6 font-display">Starting at {formatCurrency(pkg.price)}</div>
                <ul className="space-y-3 mb-8 text-slate-500 text-sm">
                  {pkg.features.slice(0, 4).map((f, idx) => <li key={idx} className="flex items-center"><Check size={14} className="text-teal-500 mr-2" /> {f}</li>)}
                </ul>
                <Link to="/book" className="w-full py-3 bg-white border border-slate-200 text-slate-900 rounded-xl font-bold hover:bg-brand-600 hover:text-white transition-all text-sm">Book Package</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">Testimonials</h2>
            <h3 className="text-3xl lg:text-4xl font-display font-bold text-slate-950">What Our Patients Say</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
                <Quote className="absolute top-8 right-8 text-brand-100" size={40} />
                <p className="text-slate-600 italic mb-6 leading-relaxed">"{review.comment}"</p>
                <div className="flex items-center gap-4">
                  <img src={review.avatar} className="w-12 h-12 rounded-full border-2 border-brand-50" alt={review.name} />
                  <div>
                    <div className="font-bold text-slate-900">{review.name}</div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-amber-400" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">We Accept All Major Health Insurance</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all">
            {['HDFC ERGO', 'ICICI Lombard', 'Star Health', 'Niva Bupa', 'Care Health'].map((brand) => (
              <span key={brand} className="text-2xl font-display font-black text-slate-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">Common Inquires</h2>
            <h3 className="text-3xl lg:text-4xl font-display font-bold text-slate-950 mb-8">Frequently Asked Questions</h3>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 bg-slate-50 text-left">
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  <ChevronDown className={cn("text-slate-400 transition-transform", activeFaq === i ? "rotate-180" : "")} size={20} />
                </button>
                {activeFaq === i && <div className="p-6 text-slate-600 bg-white border-t border-slate-100">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
