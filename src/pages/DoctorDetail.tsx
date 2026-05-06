import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Clock, DollarSign, Award, ThumbsUp, Calendar, ArrowLeft, Phone, Mail, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import { DOCTORS, REVIEWS, DEPARTMENTS } from '../data';
import { formatCurrency, cn } from '../lib/utils';

export default function DoctorDetail() {
  const { id } = useParams();
  const doctor = DOCTORS.find(d => d.id === id);
  const department = DEPARTMENTS.find(dept => dept.id === doctor?.departmentId);
  const reviewsCount = doctor ? DOCTORS.indexOf(doctor) : 0;
  const doctorReviews = REVIEWS.filter((_, idx) => (idx + reviewsCount) % 2 === 0); // Simulating relevant reviews

  if (!doctor) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-2xl font-display font-bold">Doctor not found</h2>
        <Link to="/doctors" className="text-brand-600 mt-4 inline-block font-bold">Back to Doctors</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8 pt-8">
          <Link to="/doctors" className="hover:text-brand-600 transition-colors">Doctors</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">{doctor.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl text-center flex flex-col items-center sticky top-32"
            >
              <div className="relative w-48 h-48 rounded-full border-4 border-slate-50 shadow-inner overflow-hidden mb-8 bg-slate-100">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>

              <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">{doctor.name}</h1>
              <p className="text-brand-600 font-bold mb-6">{doctor.specialization}</p>

              <div className="flex items-center gap-2 mb-8 bg-amber-50 px-4 py-2 rounded-2xl">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <span className="text-amber-700 font-black">{doctor.rating}</span>
                <span className="text-slate-400 font-medium">| {doctorReviews.length * 12} Verified Reviews</span>
              </div>

              <div className="w-full space-y-4 mb-10">
                <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Experience</span>
                  <span className="text-slate-900 font-bold">{doctor.experience}</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-slate-50 rounded-2xl">
                  <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Consultation Fee</span>
                  <span className="text-brand-600 font-black">{formatCurrency(doctor.fee)}</span>
                </div>
              </div>

              <Link 
                to="/book" 
                state={{ doctorId: doctor.id }}
                className="w-full py-5 bg-brand-600 text-white rounded-[1.5rem] font-bold shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all flex items-center justify-center gap-3"
              >
                <Calendar size={20} />
                Book Appointment
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Details & Reviews */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm"
            >
              <h2 className="text-2xl font-display font-bold text-slate-950 mb-6 flex items-center gap-3">
                <Award className="text-brand-600" />
                Professional Summary
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-8">
                {doctor.name} is a highly accomplished {doctor.specialization} specialist with over {doctor.experience} of dedicated clinical experience. Known for a patient-centric approach and expertise in advanced medical procedures, {doctor.name} has consistently achieved high success rates in complex cases.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-teal-50/50 border border-teal-100">
                  <h4 className="font-bold text-teal-900 mb-2">Qualifications</h4>
                  <ul className="text-teal-700 text-sm space-y-2">
                    <li>• MBBS, AIIMS (Gold Medalist)</li>
                    <li>• MD - {department?.name}</li>
                    <li>• Fellowship in Advanced Research</li>
                  </ul>
                </div>
                <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-2">Specializations</h4>
                  <ul className="text-indigo-700 text-sm space-y-2">
                    <li>• Complex Case Management</li>
                    <li>• Minimally Invasive Techniques</li>
                    <li>• Patient Wellness Education</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Availability */}
            <section className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-slate-950 mb-8 flex items-center gap-3">
                <Clock className="text-brand-600" />
                Hospital & Availability
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">MediCare Main Branch</h4>
                      <p className="text-sm text-slate-500">Arera Colony, Bhopal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">+91 98765 00000</h4>
                      <p className="text-sm text-slate-500">Ext: {doctor.id}05</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-3xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-brand-600 " /> Weekly Schedule
                  </h4>
                  <div className="space-y-3">
                    {['Mon - Wed', 'Thu - Sat'].map((days, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-slate-600 font-medium">{days}</span>
                        <span className="text-slate-900 font-bold">{doctor.availability[0]} - {doctor.availability[doctor.availability.length - 1]}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100">
                      <span className="text-slate-600 font-medium">Sunday</span>
                      <span className="text-rose-500 font-bold uppercase tracking-tighter">Emergency Only</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold text-slate-950 flex items-center gap-3">
                  <ThumbsUp className="text-brand-600" />
                  Patient Feedback
                </h2>
                <div className="text-sm font-bold text-brand-600 bg-brand-50 px-4 py-2 rounded-full">
                  Average {doctor.rating}/5.0
                </div>
              </div>

              <div className="space-y-6">
                {doctorReviews.map((review, i) => (
                  <motion.div 
                    key={review.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={12} className={cn(idx < review.rating ? "fill-amber-400" : "text-slate-100")} />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm italic leading-relaxed">
                      "{review.comment}"
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-teal-600 text-[10px] font-bold uppercase tracking-widest">
                      <CheckCircle2 size={12} /> Verified Recovery
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
