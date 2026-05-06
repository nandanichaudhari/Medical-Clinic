import React from 'react';
import { motion } from 'motion/react';
import { Check, CheckCircle2, Phone, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HEALTH_PACKAGES } from '../data';
import { formatCurrency, cn } from '../lib/utils';

export default function Packages() {
  return (
    <div className="pt-24 pb-20 bg-slate-50">
      <section className="bg-slate-900 py-24 mb-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-600/10 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Preventive Health Packages</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Early detection is the first step towards a healthier life. Choose a package that fits your needs.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {HEALTH_PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative group flex flex-col items-stretch p-10 rounded-[3rem] border transition-all duration-300",
                pkg.tag ? "bg-white border-brand-600 shadow-2xl scale-105 z-10" : "bg-white border-slate-100 shadow-sm hover:shadow-xl"
              )}
            >
              {pkg.tag && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {pkg.tag}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-display font-bold text-slate-950 mb-4">{pkg.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-display font-bold text-brand-600">{formatCurrency(pkg.price)}</span>
                  <span className="text-slate-400 line-through mb-1.5 text-sm">{formatCurrency(pkg.originalPrice)}</span>
                </div>
                <p className="text-xs font-bold text-teal-600 mt-2">Save {Math.round((pkg.originalPrice - pkg.price) / pkg.originalPrice * 100)}% Today</p>
              </div>

              <div className="flex-grow space-y-4 mb-10">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start text-sm text-slate-600">
                    <CheckCircle2 size={18} className="text-teal-500 mr-3 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Link 
                to="/book" 
                className={cn(
                  "w-full py-4 rounded-2xl font-bold flex items-center justify-center transition-all",
                  pkg.tag 
                    ? "bg-brand-600 text-white shadow-xl shadow-brand-100 hover:bg-brand-700" 
                    : "bg-slate-900 text-white hover:bg-slate-800"
                )}
              >
                Book Package <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="p-10 rounded-[2.5rem] bg-brand-50 border border-brand-100 flex items-start gap-8">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex-shrink-0 flex items-center justify-center text-brand-600">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h4 className="text-xl font-display font-bold text-slate-900 mb-2">Corporate Health Plans</h4>
              <p className="text-slate-600 mb-6 font-medium">Customized wellness programs and recurring health checkups for your employees.</p>
              <button className="text-brand-600 font-bold text-sm flex items-center hover:translate-x-2 transition-transform">
                Contact Sales <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
          <div className="p-10 rounded-[2.5rem] bg-teal-50 border border-teal-100 flex items-start gap-8">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex-shrink-0 flex items-center justify-center text-teal-600">
              <CreditCard size={32} />
            </div>
            <div>
              <h4 className="text-xl font-display font-bold text-slate-900 mb-2">Insurance Support</h4>
              <p className="text-slate-600 mb-6 font-medium">We accept all major health insurance providers. Claim your cashless treatment today.</p>
              <button className="text-teal-600 font-bold text-sm flex items-center hover:translate-x-2 transition-transform">
                View Policy <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
