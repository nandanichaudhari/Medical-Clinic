import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, Calendar, CreditCard, Activity, Search, Filter, 
  MoreVertical, CheckCircle2, Clock, XCircle, ChevronRight, 
  ArrowUpRight, ArrowDownRight, Package, Stethoscope, MessageSquare, PhoneCall, Zap
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { formatCurrency, cn } from '../lib/utils';
import { Appointment } from '../types';

export default function Admin() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [aiAppointments, setAiAppointments] = useState<any[]>([]);
  const [callbacks, setCallbacks] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    // Legacy appointments from localStorage
    const saved = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(saved);

    // Real-time AI Appointments
    const qAi = query(collection(db, 'ai_appointments'), orderBy('createdAt', 'desc'));
    const unsubscribeAi = onSnapshot(qAi, (snapshot) => {
      setAiAppointments(snapshot.docs.map(doc => ({ id_fs: doc.id, ...doc.data() })));
    });

    // Real-time Callbacks
    const qCb = query(collection(db, 'callback_requests'), orderBy('createdAt', 'desc'));
    const unsubscribeCb = onSnapshot(qCb, (snapshot) => {
      setCallbacks(snapshot.docs.map(doc => ({ id_fs: doc.id, ...doc.data() })));
    });

    // Real-time Leads
    const qLeads = query(collection(db, 'chat_leads'), orderBy('createdAt', 'desc'));
    const unsubscribeLeads = onSnapshot(qLeads, (snapshot) => {
      setLeads(snapshot.docs.map(doc => ({ id_fs: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeAi();
      unsubscribeCb();
      unsubscribeLeads();
    };
  }, []);

  const totalRevenue = appointments.reduce((acc, curr) => acc + curr.consultationFee, 0) + 
                       aiAppointments.reduce((acc, curr) => acc + (curr.fee || 0), 0);

  const stats = [
    { label: 'Total Appointments', value: appointments.length + aiAppointments.length, icon: Calendar, color: 'bg-blue-100 text-blue-600', trend: '+12.5%' },
    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: CreditCard, color: 'bg-emerald-100 text-emerald-600', trend: '+8.2%' },
    { label: 'AI Leads', value: leads.length, icon: Zap, color: 'bg-amber-100 text-amber-600', trend: '+24%' },
    { label: 'Pending Callbacks', value: callbacks.filter(c => c.status === 'New').length, icon: PhoneCall, color: 'bg-rose-100 text-rose-600', trend: '-2.1%' },
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">MediCare Cloud Management System • Real-time Sync</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            {['Overview', 'AI Bookings', 'Callbacks'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab ? "bg-brand-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'Overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-3 rounded-2xl", stat.color)}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                  <div className="text-slate-500 text-sm font-medium mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent AI Leads */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-display font-bold text-lg text-slate-900 mb-6 flex items-center justify-between">
                  Chat Leads
                  <span className="px-2 py-1 bg-amber-100 text-amber-600 text-[10px] font-black uppercase rounded-lg">New</span>
                </h3>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-600 shadow-sm">
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">Patient Inquiry</p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{lead.query}</p>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-slate-300" />
                    </div>
                  ))}
                  {leads.length === 0 && <p className="text-center text-slate-400 text-sm py-10 italic">No chat leads yet</p>}
                </div>
              </div>

              {/* Appointment Summary Table (Existing Table Integrated here) */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                  <h3 className="font-display font-bold text-lg text-slate-900">Today's Appointments</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-slate-50">
                      {appointments.slice(0,6).map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-8 py-4">
                            <div className="font-bold text-slate-900 text-sm">{app.patientName}</div>
                            <div className="text-[10px] text-slate-400">{app.id}</div>
                          </td>
                          <td className="px-8 py-4 text-sm font-bold text-slate-900">{app.doctor}</td>
                          <td className="px-8 py-4">
                            <span className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase", app.appointmentStatus === 'Confirmed' ? 'bg-teal-100 text-teal-600' : 'bg-amber-100 text-amber-600')}>
                              {app.appointmentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'AI Bookings' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase">Patient Details</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase">AI Booked Doctor</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase">Payment</th>
                  <th className="px-8 py-6 text-xs font-bold text-slate-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {aiAppointments.map((app) => (
                  <tr key={app.id_fs} className="hover:bg-slate-50">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{app.patientName}</div>
                      <div className="text-xs text-slate-500">{app.phone} • {app.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{app.doctor}</div>
                      <div className="text-xs text-slate-500">{app.date} • {app.time}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900 text-sm">{app.paymentMethod}</div>
                      <div className={cn("text-[10px] font-black uppercase", app.paymentStatus === 'Paid' ? 'text-teal-600' : 'text-rose-500')}>
                        {app.paymentStatus}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-bold", app.paymentStatus === 'Paid' ? 'bg-teal-100 text-teal-600' : 'bg-amber-100 text-amber-600')}>
                        {app.appointmentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
                {aiAppointments.length === 0 && (
                  <tr><td colSpan={4} className="px-8 py-20 text-center text-slate-400 italic">No AI bookings found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Callbacks' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {callbacks.map((cb) => (
              <div key={cb.id_fs} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                    <PhoneCall size={24} />
                  </div>
                  <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase", 
                    cb.status === 'New' ? 'bg-rose-100 text-rose-600' : 'bg-teal-100 text-teal-600'
                  )}>
                    {cb.status}
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg text-slate-900 mb-1">{cb.name}</h4>
                <p className="text-slate-600 font-bold mb-4">{cb.phone}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-xs text-slate-400 font-medium">Preferred Time: <span className="text-slate-900">{cb.preferredTime}</span></p>
                  <p className="text-xs text-slate-400 font-medium italic">Reason: "{cb.reason}"</p>
                </div>
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                  Mark as Called
                </button>
              </div>
            ))}
            {callbacks.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400 italic">No pending callback requests</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
