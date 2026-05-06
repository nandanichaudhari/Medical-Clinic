import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Phone, Mail, Stethoscope, MessageSquare, AlertCircle, CheckCircle2, ArrowLeft, ArrowRight, Download, Printer, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DEPARTMENTS, DOCTORS } from '../data';
import { cn, formatCurrency, generateAppointmentId } from '../lib/utils';
import { Appointment } from '../types';

export default function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    departmentId: '',
    doctorId: '',
    date: '',
    timeSlot: '',
    symptoms: ''
  });

  const selectedDept = DEPARTMENTS.find(d => d.id === formData.departmentId);
  const filteredDoctors = DOCTORS.filter(d => d.departmentId === formData.departmentId);
  const selectedDoctor = DOCTORS.find(d => d.id === formData.doctorId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (paymentMethod: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const appointment: Appointment = {
        id: generateAppointmentId(),
        patientName: formData.name,
        phone: formData.phone,
        email: formData.email,
        age: parseInt(formData.age),
        gender: formData.gender as any,
        department: selectedDept?.name || '',
        doctor: selectedDoctor?.name || '',
        doctorId: formData.doctorId,
        date: formData.date,
        timeSlot: formData.timeSlot,
        symptoms: formData.symptoms,
        paymentStatus: paymentMethod === 'Clinic' ? 'Pending' : 'Paid',
        appointmentStatus: 'Confirmed',
        consultationFee: selectedDoctor?.fee || 0,
        createdAt: new Date().toISOString()
      };
      
      // Store in local storage for demo
      const existing = JSON.parse(localStorage.getItem('appointments') || '[]');
      localStorage.setItem('appointments', JSON.stringify([...existing, appointment]));
      
      setLoading(false);
      navigate('/success', { state: { appointment } });
    }, 2000);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Book an Appointment</h1>
          <p className="text-slate-500">Fast, secure and convenient healthcare booking.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                step >= s ? "bg-brand-600 text-white shadow-lg shadow-brand-100" : "bg-white text-slate-400 border border-slate-200"
              )}>
                {s}
              </div>
              {s < 3 && <div className={cn("w-20 h-0.5 mx-2", step > s ? "bg-brand-600" : "bg-slate-200")} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 lg:p-12">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <User className="mr-2 text-brand-600" size={24} /> Basic Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input 
                      type="text" name="name" required value={formData.name} onChange={handleInputChange}
                      placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input 
                      type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
                      placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input 
                      type="email" name="email" required value={formData.email} onChange={handleInputChange}
                      placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Age</label>
                      <input 
                        type="number" name="age" required value={formData.age} onChange={handleInputChange}
                        placeholder="25" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Gender</label>
                      <select 
                        name="gender" value={formData.gender} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <button onClick={nextStep} className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold flex items-center hover:bg-brand-700 transition-all">
                    Medical Details <ArrowRight size={20} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <Stethoscope className="mr-2 text-brand-600" size={24} /> Consultation Details
                </h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Select Department</label>
                      <select 
                        name="departmentId" required value={formData.departmentId} onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all"
                      >
                        <option value="">Choose Department</option>
                        {DEPARTMENTS.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Select Doctor</label>
                      <select 
                        name="doctorId" required value={formData.doctorId} onChange={handleInputChange}
                        disabled={!formData.departmentId}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all disabled:bg-slate-50"
                      >
                        <option value="">{formData.departmentId ? 'Choose Doctor' : 'Select Department First'}</option>
                        {filteredDoctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name} - {formatCurrency(doc.fee)}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Appointment Date</label>
                      <input 
                        type="date" name="date" required value={formData.date} onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Select Time Slot</label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDoctor?.availability.map(slot => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                            className={cn(
                              "py-2 px-3 rounded-lg text-sm font-semibold border transition-all",
                              formData.timeSlot === slot 
                                ? "bg-brand-600 border-brand-600 text-white" 
                                : "bg-white border-slate-200 text-slate-600 hover:border-brand-600"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Symptoms / Message</label>
                    <textarea 
                      name="symptoms" rows={3} value={formData.symptoms} onChange={handleInputChange}
                      placeholder="Briefly describe your health concern..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all"
                    ></textarea>
                  </div>
                </div>
                <div className="mt-10 flex justify-between">
                  <button onClick={prevStep} className="px-8 py-3 text-slate-600 font-bold flex items-center hover:bg-slate-50 rounded-xl transition-all">
                    <ArrowLeft size={20} className="mr-2" /> Back
                  </button>
                  <button onClick={nextStep} disabled={!formData.timeSlot} className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold flex items-center hover:bg-brand-700 transition-all disabled:opacity-50">
                    Payment Info <ArrowRight size={20} className="ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center">
                  <CreditCard className="mr-2 text-brand-600" size={24} /> Payment & Confirmation
                </h2>
                
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Patient:</span>
                      <span className="font-semibold text-slate-900">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Doctor:</span>
                      <span className="font-semibold text-slate-900">{selectedDoctor?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Schedule:</span>
                      <span className="font-semibold text-slate-900">{formData.date} at {formData.timeSlot}</span>
                    </div>
                    <div className="flex justify-between pt-4 text-base">
                      <span className="font-bold text-slate-900">Consultation Fee</span>
                      <span className="font-bold text-brand-600">{formatCurrency(selectedDoctor?.fee || 0)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleSubmit('Online')}
                    disabled={loading}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-brand-600 transition-all text-left bg-white group"
                  >
                    <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <CreditCard size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900">Pay Online</h4>
                    <p className="text-xs text-slate-500 mt-1">Stripe, Razorpay, or UPI</p>
                  </button>
                  <button 
                    onClick={() => handleSubmit('Clinic')}
                    disabled={loading}
                    className="p-6 rounded-2xl border-2 border-slate-100 hover:border-brand-600 transition-all text-left bg-white group"
                  >
                    <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Stethoscope size={20} />
                    </div>
                    <h4 className="font-bold text-slate-900">Pay at Clinic</h4>
                    <p className="text-xs text-slate-500 mt-1">Cash or Card on arrival</p>
                  </button>
                </div>
                
                {loading && (
                  <div className="mt-8 text-center py-4 bg-brand-50 text-brand-600 rounded-xl font-semibold flex items-center justify-center">
                    <span className="animate-pulse">Processing your appointment...</span>
                  </div>
                )}

                <div className="mt-10 flex justify-start">
                  <button onClick={prevStep} disabled={loading} className="px-8 py-3 text-slate-600 font-bold flex items-center hover:bg-slate-50 rounded-xl transition-all">
                    <ArrowLeft size={20} className="mr-2" /> Back
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
