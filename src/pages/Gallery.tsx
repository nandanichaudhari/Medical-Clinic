import React from 'react';
import { motion } from 'motion/react';
import { Camera, ExternalLink } from 'lucide-react';

const images = [
  { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', title: 'Reception Area' },
  { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', title: 'Modern Laboratory' },
  { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800', title: 'Consultation Room' },
  { url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800', title: 'Dental Suite' },
  { url: 'https://images.unsplash.com/photo-1504813184591-01592fd03cfd?auto=format&fit=crop&q=80&w=800', title: 'Patient Recovery' },
  { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', title: 'Advanced MRI' },
  { url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800', title: 'Waiting Lounge' },
  { url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800', title: 'Pharmacy' },
  { url: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=800', title: 'Diagnostic Wing' }
];

export default function Gallery() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <section className="bg-white py-20 mb-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6 uppercase tracking-tight">Clinic Gallery</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Take a virtual tour of our state-of-the-art facilities designed for patient comfort and precision medical care.</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 bg-slate-200"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Hospital View</p>
                <h3 className="text-2xl font-display font-bold text-white mb-4">{img.title}</h3>
                <div className="flex items-center text-white/60 text-xs font-bold uppercase tracking-widest gap-2">
                  <div className="w-8 h-px bg-white/20"></div>
                  <Camera size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
