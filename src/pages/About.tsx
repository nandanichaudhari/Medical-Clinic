import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Award, Heart, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Header */}
      <section className="bg-slate-50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">Empowering Your Health <br/> Journey Since 2010</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">MediCare Plus started with a simple vision: to bridge the gap between world-class medical facilities and personalized patient care.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission/Vision */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80" className="rounded-[3rem] shadow-2xl relative z-10" alt="Scientific lab" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          </div>
          <div>
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900">Our Mission & Vision</h2>
            </div>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We strive to provide premium, accessible, and affordable healthcare to every segment of society. Our vision is to be the most trusted healthcare partner in India, known for clinical excellence and compassionate service.
            </p>
            <ul className="space-y-4">
              {['Patient-First Approach', 'Ethics & Transparency', 'Clinical Excellence', 'Inovation in Care'].map((item) => (
                <li key={item} className="flex items-center text-slate-700 font-semibold">
                  <CheckCircle2 size={20} className="text-teal-500 mr-3" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-brand-600 rounded-[3rem] p-12 lg:p-20 text-white mb-24 relative overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {[
              { label: 'Specialist Doctors', val: '25+' },
              { label: 'Staff Members', val: '150+' },
              { label: 'Successful Regs', val: '50k+' },
              { label: 'Patient Satisfaction', val: '98%' }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl lg:text-6xl font-display font-bold mb-2">{s.val}</div>
                <div className="text-brand-100 font-semibold tracking-wide uppercase text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-16">
          <h3 className="text-3xl font-display font-bold text-slate-950 mb-4">The Values We Live By</h3>
          <div className="w-20 h-1 bg-brand-600 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: 'Empathy', desc: 'We understand and share the feelings of our patients to provide emotional support alongside medical care.' },
            { icon: Award, title: 'Integrity', desc: 'Transparent communication and ethical practices are at the heart of everything we do at MediCare Plus.' },
            { icon: Users, title: 'Collaborative', desc: 'Our multi-disciplinary teams work together to ensure the best possible outcomes for complex cases.' }
          ].map((v, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-600 mb-8 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <v.icon size={32} />
              </div>
              <h4 className="text-xl font-display font-bold text-slate-900 mb-4">{v.title}</h4>
              <p className="text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
