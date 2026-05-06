import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Stethoscope, Baby, Smile, Zap, Eye, Activity, Droplet, Dumbbell, Heart, FlaskConical, Video, Home, ShieldCheck, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEPARTMENTS, SERVICES } from '../data';
import * as LucideIcons from 'lucide-react';

const DynamicIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => {
  const Icon = (LucideIcons as any)[name] || Stethoscope;
  return <Icon size={size} className={className} />;
};

export default function Services() {
  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* Header */}
      <section className="bg-brand-600 py-24 mb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Our Medical Specialties</h1>
          <p className="text-brand-100 text-lg max-w-2xl mx-auto opacity-90">Combining expert healthcare with advanced technology to provide you with the best possible medical outcomes.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Department Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {DEPARTMENTS.map((dept, i) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-8 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <DynamicIcon name={dept.icon} size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{dept.name}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">{dept.description}</p>
              <Link to="/book" className="px-6 py-3 bg-slate-50 text-slate-700 rounded-xl font-bold flex items-center w-fit group-hover:bg-brand-600 group-hover:text-white transition-all text-sm">
                Book Consultation <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Other Facilities */}
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">More Facilities</h2>
          <h3 className="text-3xl lg:text-4xl font-display font-bold text-slate-950">Integrated Care Services</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {SERVICES.map((service, i) => (
            <div key={i} className="p-8 rounded-3xl bg-white shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-6">
                <DynamicIcon name={service.icon} size={24} />
              </div>
              <h4 className="font-display font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-sm text-slate-500">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Banner */}
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-600/20 to-transparent pointer-events-none" />
          <div className="lg:max-w-lg relative z-10">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Need Immediate Assistance?</h2>
            <p className="text-slate-400 mb-8 text-lg">Our 24/7 emergency response team and on-call doctors are ready to assist you in critical situations.</p>
            <div className="flex gap-4">
              <a href="tel:+919876543210" className="px-8 py-4 bg-brand-600 text-white rounded-full font-bold flex items-center hover:bg-brand-700 transition-all">
                <Phone size={20} className="mr-2" /> Emergency Call
              </a>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-500/20 rounded-full blur-2xl group-hover:bg-brand-500/40 transition-all" />
            <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-slate-800 flex items-center justify-center bg-slate-900 relative z-10">
              <ShieldCheck size={64} className="text-brand-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
