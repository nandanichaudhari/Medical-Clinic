import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-brand-600 p-2 rounded-xl text-white">
                <HeartPulse size={24} />
              </div>
              <span className="text-xl font-display font-bold text-white block">MediCare<span className="text-brand-400">Plus</span></span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Providing world-class medical care with a human touch. Our mission is to make healthcare accessible, reliable, and premium for everyone.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-brand-600 hover:text-white transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Our Services', 'Meet Doctors', 'Health Packages', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-brand-400 transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              {['General Checkup', 'Cardiology', 'Dental Care', 'Pediatrics', 'Dermatology', 'Diagnostics'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="hover:text-brand-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-display font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="text-brand-400 mt-1 flex-shrink-0" size={20} />
                <span>Main Road, Bhopal, Madhya Pradesh, India - 462001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-brand-400 flex-shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-brand-400 flex-shrink-0" size={20} />
                <span>care@medicareplus.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} MediCare Plus Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
