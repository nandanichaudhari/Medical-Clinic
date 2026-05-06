import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Phone, Mail, ArrowRight, Search, Filter, Calendar, DollarSign, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DOCTORS, DEPARTMENTS } from '../data';
import { cn, formatCurrency } from '../lib/utils';

export default function Doctors() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxFee, setMaxFee] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesDept = selectedDept === 'All' || doc.departmentId === DEPARTMENTS.find(d => d.name === selectedDept)?.id;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFee = doc.fee <= maxFee;
    const matchesRating = doc.rating >= minRating;
    return matchesDept && matchesSearch && matchesFee && matchesRating;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <section className="bg-white border-b border-slate-100 py-20 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6"
          >
            Expert Doctors For You
          </motion.h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Meet our team of board-certified medical professionals dedicated to providing specialized and compassionate care.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Panel */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Name or specialty..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-100 transition-all outline-none text-sm"
                />
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Department</label>
              <select 
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-100 transition-all outline-none text-sm appearance-none"
              >
                <option value="All">All Departments</option>
                {DEPARTMENTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            {/* Fee Range */}
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Max Fee</label>
                <span className="text-xs font-bold text-brand-600">{formatCurrency(maxFee)}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="2000" 
                step="100"
                value={maxFee}
                onChange={(e) => setMaxFee(parseInt(e.target.value))}
                className="w-full accent-brand-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Available Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-100 transition-all outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-8 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Rating:</span>
              {[4, 4.5, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(minRating === r ? 0 : r)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1",
                    minRating === r ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}
                >
                  {r}+ <Star size={12} className={cn(minRating === r && "fill-white")} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
            >
              {/* Header / Image */}
              <div className="relative pt-12 pb-8 px-8 flex flex-col items-center text-center">
                <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 group-hover:bg-brand-50 transition-colors" />
                
                {/* Circular Avatar Placeholder */}
                <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mb-6 bg-slate-200">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>

                <div className="absolute top-6 right-8 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center shadow-sm z-10">
                  <Star className="text-amber-400 fill-amber-400 mr-1" size={14} />
                  <span className="text-xs font-bold text-slate-900">{doc.rating}</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-brand-600 transition-colors mb-1">
                    {doc.name}
                  </h3>
                  <p className="text-sm font-semibold text-brand-600 mb-4">{doc.specialization}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-wider">
                      {doc.experience} Exp
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
                      {doc.fee === 500 ? 'Budget' : 'Expert'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-8 pb-8 flex flex-col flex-grow">
                <div className="space-y-4 mb-8 pt-6 border-t border-slate-50 flex-grow">
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="mr-3 text-slate-400" size={18} />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Slots for {selectedDate}</span>
                      <span className="font-medium text-slate-900">
                        {doc.availability.join(', ')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm">
                    <DollarSign className="mr-3 text-slate-400" size={18} />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Consultation Fee</span>
                      <span className="font-bold text-slate-900">{formatCurrency(doc.fee)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link 
                    to={`/doctors/${doc.id}`}
                    className="flex-grow py-4 bg-slate-900 text-white rounded-2xl font-bold text-center text-sm hover:bg-slate-800 transition-all"
                  >
                    View Profile
                  </Link>
                  <Link 
                    to="/book" 
                    state={{ doctorId: doc.id, date: selectedDate }}
                    className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 transition-all shadow-xl shadow-brand-50"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mb-2">No Doctors Found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your filters or search keywords</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedDept('All');
                setMaxFee(2000);
                setMinRating(0);
              }}
              className="mt-6 text-brand-600 font-bold text-sm hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
