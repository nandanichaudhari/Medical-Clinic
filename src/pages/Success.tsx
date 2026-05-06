import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Clock, User, Download, Printer, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../lib/utils';

export default function Success() {
  const { state } = useLocation();
  const appointment = state?.appointment;

  if (!appointment) return <Navigate to="/book" replace />;

  const handlePrint = () => window.print();

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
        >
          <div className="bg-brand-600 p-10 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30"
            >
              <CheckCircle2 size={40} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-brand-100 opacity-90">Thank you for choosing MediCare Plus. Your health journey starts here.</p>
          </div>

          <div className="p-8 lg:p-12">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Appointment ID</span>
                <span className="text-xl font-mono font-bold text-slate-900">{appointment.id}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-600 text-xs font-bold">Confirmed</span>
              </div>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-brand-600">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{appointment.patientName}</h3>
                  <p className="text-sm text-slate-500">Patient Details: {appointment.age} yrs, {appointment.gender}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-brand-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{appointment.doctor}</h3>
                  <p className="text-sm text-slate-500">{appointment.department} - {appointment.date} at {appointment.timeSlot}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-500 block">Payment Method</span>
                    <span className="font-bold text-slate-800">{appointment.paymentStatus === 'Paid' ? 'Paid Online' : 'Pay at Clinic'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Consultation Fee</span>
                    <span className="text-xl font-bold text-brand-600">{formatCurrency(appointment.consultationFee)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button 
                onClick={handlePrint}
                className="flex items-center justify-center px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                <Printer size={18} className="mr-2" /> Print Receipt
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all">
                <Download size={18} className="mr-2" /> Download SMS
              </button>
            </div>

            <div className="space-y-3">
              <Link to="/" className="w-full h-14 bg-brand-600 text-white rounded-xl font-bold flex items-center justify-center hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 group">
                Back to Home <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-xs font-bold text-slate-400 hover:text-brand-600 flex items-center">
                  <Phone size={14} className="mr-1" /> Need Help?
                </a>
                <a href="#" className="text-xs font-bold text-teal-500 hover:text-teal-600 flex items-center">
                  <MessageCircle size={14} className="mr-1" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
