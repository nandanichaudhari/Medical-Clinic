import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="pt-24 pb-20 bg-white">
      <section className="bg-slate-50 py-24 mb-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-900 mb-6">Get In Touch</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Have questions? We’re here to help. Reach out via email, phone, or visit our clinic directly.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center text-brand-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 mb-1">Our Location</h4>
                  <p className="text-sm text-slate-500">Main Road, Arera Colony, Bhopal, MP - 462001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center text-brand-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 mb-1">Call Us</h4>
                  <p className="text-sm text-slate-500">+91 98765 43210</p>
                  <p className="text-sm text-slate-500">24/7 Helpline</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex-shrink-0 flex items-center justify-center text-brand-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900 mb-1">Email Us</h4>
                  <p className="text-sm text-slate-500">care@medicareplus.in</p>
                  <p className="text-sm text-slate-500">support@medicareplus.in</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-brand-600 text-white">
              <Clock className="mb-4 text-brand-200" size={32} />
              <h4 className="font-display font-bold text-xl mb-4">Clinic Hours</h4>
              <div className="space-y-2 text-brand-100 text-sm">
                <div className="flex justify-between"><span>Mon - Fri</span><span>9:00 AM - 8:00 PM</span></div>
                <div className="flex justify-between"><span>Saturday</span><span>9:00 AM - 6:00 PM</span></div>
                <div className="flex justify-between pt-2 border-t border-brand-500 font-bold text-white"><span>Sunday</span><span>Emergency Only</span></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 lg:p-12 rounded-[3rem] border border-slate-100 shadow-xl">
              <h2 className="text-3xl font-display font-bold text-slate-950 mb-8">Send Us A Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 font-display">Full Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 font-display">Email Address</label>
                    <input type="email" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 font-display">Subject</label>
                  <select className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all">
                    <option>General Inquiry</option>
                    <option>Appointment Issue</option>
                    <option>Feedback</option>
                    <option>Careers</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 font-display">Your Message</label>
                  <textarea rows={5} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" placeholder="How can we help you today?"></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-brand-600 text-white rounded-2xl font-bold flex items-center justify-center hover:bg-brand-700 transition-all shadow-xl shadow-brand-100">
                  <Send size={20} className="mr-2" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* WhatsApp Float Simulation */}
        <div className="fixed bottom-10 right-10 z-50">
          <a href="#" className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group relative">
            <MessageCircle size={32} />
            <span className="absolute right-20 bg-white px-4 py-2 rounded-xl text-teal-600 text-sm font-bold shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
