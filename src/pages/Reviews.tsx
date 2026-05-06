import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data';
import { cn } from '../lib/utils';

export default function Reviews() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <section className="bg-brand-50 py-24 mb-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">Patient Testimonials</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Hear directly from the people who trust us with their health. We are honored to be a part of their wellness journey.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-12 mb-20 max-w-4xl mx-auto">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 lg:p-14 bg-slate-50 rounded-[3rem] border border-slate-100"
            >
              <Quote className="absolute top-10 right-10 text-brand-200" size={64} />
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-slate-200" />
                  ))}
                </div>
                <p className="text-xl lg:text-2xl font-display font-medium text-slate-800 italic leading-relaxed mb-10">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-sm" />
                  <div>
                    <h4 className="font-display font-bold text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-500">{review.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white">
          <h2 className="text-3xl lg:text-4xl font-display font-bold mb-6">Share Your Experience</h2>
          <p className="text-slate-400 mb-10 text-lg">Your feedback helps us provide better care for everyone.</p>
          <button className="px-10 py-4 bg-brand-600 text-white rounded-full font-bold flex items-center justify-center mx-auto hover:bg-brand-700 transition-all shadow-xl shadow-brand-900">
            <MessageSquare size={20} className="mr-2" /> Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
