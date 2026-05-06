import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, X, Send, User, ChevronRight, Phone, 
  MapPin, Calendar, HeartPulse, ShieldCheck, Stethoscope, 
  AlertTriangle, CheckCircle2, CreditCard, Droplet, Star,
  Maximize2, Minimize2, Package, Activity, ArrowRight
} from 'lucide-react';
import { sendMessageToAI } from '../services/geminiService';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { formatCurrency, cn } from '../lib/utils';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
  type?: 'text' | 'doctor' | 'service' | 'package' | 'appointment' | 'emergency' | 'payment' | 'appointment_confirmed';
  data?: any;
}

const PackageCard = ({ data, onSelect }: { data: any, onSelect: (name: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border-2 border-brand-50 rounded-3xl p-6 my-4 shadow-xl overflow-hidden relative group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Package size={64} className="text-brand-600" />
    </div>
    <div className="relative z-10">
      <div className="bg-brand-50 text-brand-600 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
        Health Package
      </div>
      <h4 className="text-xl font-display font-bold text-slate-900 mb-2">{data.name}</h4>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-2xl font-black text-brand-600">{formatCurrency(data.price)}</span>
        {data.originalPrice && (
          <span className="text-sm text-slate-400 line-through font-medium">{formatCurrency(data.originalPrice)}</span>
        )}
      </div>
      <ul className="space-y-2.5 mb-8">
        {(data.features || []).slice(0, 4).map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={12} className="text-teal-600" />
            </div>
            {f}
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSelect(`Book ${data.name}`)}
        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs hover:bg-brand-600 transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-2 group"
      >
        Select Package <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

// Sub-components for better organization
const DoctorCard = ({ data, onSelect }: { data: any, onSelect: (name: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white border border-slate-100 rounded-3xl p-5 my-4 shadow-xl hover:shadow-2xl transition-all border-l-4 border-l-brand-600 group"
  >
    <div className="flex gap-4 mb-5">
      <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 ring-4 ring-brand-50 shadow-inner group-hover:scale-105 transition-transform duration-500">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-grow pt-1">
        <div className="flex items-center justify-between">
          <h4 className="font-display font-bold text-slate-900 text-sm">{data.name}</h4>
          <span className="bg-teal-50 text-teal-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest border border-teal-100">Verified</span>
        </div>
        <p className="text-[11px] font-bold text-brand-600 mt-0.5 uppercase tracking-wide">{data.specialization}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={10} className={cn(s <= Math.floor(data.rating || 5) ? "text-amber-400 fill-amber-400" : "text-slate-200")} />
            ))}
          </div>
          <span className="text-[10px] font-black text-slate-400">{data.rating} Rating</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-5">
      <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100 shadow-inner">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Experience</p>
        <p className="text-[11px] text-slate-800 font-black">{data.experience}</p>
      </div>
      <div className="bg-slate-50/80 p-2.5 rounded-2xl border border-slate-100 shadow-inner">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Consult Fee</p>
        <p className="text-[11px] text-brand-600 font-black">{formatCurrency(data.fee)}</p>
      </div>
    </div>
    <button 
      onClick={() => onSelect(`Book appointment with ${data.name}`)} 
      className="w-full py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-bold shadow-xl shadow-slate-100 hover:bg-brand-600 transition-all flex items-center justify-center gap-2 group-active:scale-95"
    >
      Request Appointment <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

const AppointmentCard = ({ data }: { data: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-emerald-50 border border-emerald-100 rounded-3xl p-5 my-4 shadow-xl overflow-hidden relative"
  >
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-100/50 rounded-full blur-2xl" />
    <div className="relative z-10">
      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-teal-600 mb-4 shadow-sm">
        <CheckCircle2 size={24} />
      </div>
      <h4 className="text-teal-900 font-display font-bold text-base mb-4">Appointment Confirmed!</h4>
      <div className="space-y-2.5 text-[10px] sm:text-xs font-medium mb-5 bg-white/50 p-3 rounded-2xl">
        <div className="flex justify-between">
          <span className="text-slate-500">Doctor</span>
          <span className="text-slate-900 font-bold">{data.doctor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Timeline</span>
          <span className="text-slate-900 font-bold">{data.date} @ {data.time}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-emerald-200/50">
          <span className="text-slate-500">Appointment ID</span>
          <span className="text-brand-600 font-black tracking-wide">{data.id || 'SYNCING...'}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[9px] text-teal-600 font-bold bg-white/30 p-2 rounded-xl border border-teal-200/20">
        <ShieldCheck size={14} /> Digital receipt sent to {data.email?.toLowerCase() || 'your email'}
      </div>
    </div>
  </motion.div>
);

const EmergencyCard = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-rose-50 border-2 border-rose-100 rounded-3xl p-6 my-4 shadow-xl"
  >
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-600 shadow-sm">
      <AlertTriangle size={28} className="animate-pulse" />
    </div>
    <h4 className="text-rose-950 font-display font-black text-lg text-center mb-2 uppercase tracking-tight">Emergency Alert</h4>
    <p className="text-rose-700 text-xs text-center mb-6 leading-relaxed font-medium">
      If you are experiencing severe symptoms, please call our 24/7 critical care line immediately.
    </p>
    <a 
      href="tel:+919876543210" 
      className="w-full py-4 bg-rose-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all hover:scale-[1.02] active:scale-95"
    >
      <Phone size={20} /> 24/7 Helpline: 911
    </a>
  </motion.div>
);

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Hi! I'm your MediCare AI Health Assistant. How can I facilitate your visit today? You can search for doctors or book an appointment directly here." }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({ role: msg.role, parts: msg.parts }));
      const responseText = await sendMessageToAI(input, history);
      
      const uiRegex = /<UI_COMPONENT>([\s\S]*?)<\/UI_COMPONENT>/g;
      let cleanedText = responseText;
      const uiComponents: any[] = [];
      
      let match;
      while ((match = uiRegex.exec(responseText)) !== null) {
        try {
          uiComponents.push(JSON.parse(match[1]));
          cleanedText = cleanedText.replace(match[0], '');
        } catch (e) {
          console.error("UI component parse err", e);
        }
      }

      const aiMessage: ChatMessage = { 
        role: 'model', 
        parts: [{ text: cleanedText.trim() }] 
      };

      if (uiComponents.length > 0) {
        uiComponents.forEach(comp => {
          if (comp.type === 'appointment_confirmed') saveAppointment(comp.details);
        });
      }

      setMessages(prev => [
        ...prev, 
        aiMessage, 
        ...uiComponents.map(comp => ({ 
          role: 'model' as const, 
          parts: [{ text: '' }], 
          type: comp.type, 
          data: comp[comp.type] || comp.details || comp 
        }))
      ]);

      if (input.toLowerCase().match(/consult|fee|price|book|appoint/)) {
        saveLead(input);
      }

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "System connection weak. Please call +91 98765 43210 for immediate support." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLead = async (query: string) => {
    try {
      await addDoc(collection(db, 'chat_leads'), {
        query,
        createdAt: serverTimestamp(),
        appointmentIntent: true
      });
    } catch (e) {}
  };

  const saveAppointment = async (details: any) => {
    try {
      const appointmentId = 'AID-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      await addDoc(collection(db, 'ai_appointments'), {
        ...details,
        id: appointmentId,
        bookingSource: 'AI Assistant',
        appointmentStatus: 'Confirmed',
        createdAt: serverTimestamp()
      });
    } catch (e) {}
  };

  const renderComponent = (msg: ChatMessage) => {
    if (!msg.data) return null;
    switch (msg.type) {
      case 'doctor':
        return <DoctorCard data={msg.data} onSelect={(text) => { setInput(text); handleSend(); }} />;
      case 'emergency':
        return <EmergencyCard />;
      case 'package':
        return <PackageCard data={msg.data} onSelect={(text) => { setInput(text); handleSend(); }} />;
      case 'appointment':
      case 'appointment_confirmed':
        return <AppointmentCard data={msg.data} />;
      default:
        return null;
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100000] w-14 h-14 sm:w-16 sm:h-16 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(14,140,228,0.4)] transition-all group"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className={cn(
              "fixed z-[99999] bg-white/80 backdrop-blur-xl flex flex-col border border-white/20 shadow-[0_25px_80px_rgba(15,23,42,0.15)] overflow-hidden transition-all duration-300",
              isExpanded 
                ? "left-3 right-3 top-3 bottom-3 sm:left-1/2 sm:-translate-x-1/2 sm:top-12 sm:bottom-12 sm:w-[1200px] sm:max-w-[calc(100vw-64px)] rounded-3xl" 
                : "bottom-[88px] right-3 left-3 sm:left-auto sm:right-6 sm:w-[380px] h-[82vh] sm:h-[620px] max-h-[calc(100vh-120px)] rounded-[2rem] sm:rounded-3xl shadow-2xl"
            )}
          >
            {/* Header - Fixed Height */}
            <div className="flex-shrink-0 p-4 sm:p-5 bg-gradient-to-r from-[#0e8ce4] to-teal-500 text-white flex items-center justify-between shadow-md relative z-10 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center relative flex-shrink-0 border border-white/10 shadow-inner">
                  <HeartPulse className="size-5 sm:size-6" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-teal-400 rounded-full border-2 border-brand-600 shadow-sm" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base leading-tight">MediCare AI Assistant</h3>
                  <div className="flex items-center gap-1.5 opacity-90">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-50">Live Support</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  className="hidden sm:flex w-8 h-8 items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
                  title={isExpanded ? "Collapse" : "Expand"}
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body - Scrollable */}
            <div className="flex-grow overflow-y-auto px-4 py-6 sm:px-6 space-y-6 bg-slate-50/30 scroll-smooth custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex items-start gap-2", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-brand-600 shadow-sm flex-shrink-0 mt-1">
                      <HeartPulse size={14} />
                    </div>
                  )}
                  <div className={cn("flex flex-col w-full", msg.role === 'user' ? "items-end" : "items-start")}>
                    {msg.parts[0].text && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "max-w-[88%] sm:max-w-[85%] p-3.5 sm:p-4 text-xs sm:text-[14px] leading-relaxed shadow-sm transition-all duration-300",
                          msg.role === 'user' 
                            ? "bg-[linear-gradient(135deg,#0e8ce4,#026dc3)] text-white rounded-2xl" 
                            : "bg-white/90 backdrop-blur-sm text-slate-800 rounded-2xl border border-white/50"
                        )}
                      >
                        {msg.parts[0].text}
                      </motion.div>
                    )}
                    <div className="w-full">
                      {renderComponent(msg)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/80 backdrop-blur-sm border border-white/40 flex items-center justify-center text-brand-300 shadow-sm flex-shrink-0 mt-1">
                    <HeartPulse size={12} className="animate-pulse" />
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/40 flex items-center gap-2 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">Typing...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} className="h-2" />
            </div>

            {/* Quick Actions Panel - Horizontal Scroll */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto bg-white/50 backdrop-blur-sm border-t border-white/20 no-scrollbar">
              {[
                { label: 'View Doctors', icon: Stethoscope },
                { label: 'Book Appointment', icon: Calendar },
                { label: 'Health Packages', icon: Package },
                { label: 'Our Services', icon: Activity }
              ].map((q) => (
                <motion.button 
                  key={q.label}
                  whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                  whileTap={{ scale: 0.98 }}
onClick={() => {
  setInput(q.label);
  setTimeout(() => handleSend(), 0);
}}                  className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:border-brand-600 hover:text-brand-600 whitespace-nowrap transition-all shadow-sm flex items-center gap-2 flex-shrink-0"
                >
                  <q.icon size={12} className="text-brand-400" />
                  {q.label}
                </motion.button>
              ))}
            </div>

            {/* Input Bar - Fixed Bottom */}
            <div className="flex-shrink-0 p-4 sm:p-5 bg-white/80 backdrop-blur-md border-t border-white/20">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
onKeyDown={(e) => e.key === "Enter" && handleSend()}                    placeholder="Type your message..."
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-50 rounded-2xl text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-brand-100 transition-all border border-slate-100"
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className={cn(
                      "absolute right-1.5 top-1.5 w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      input.trim() ? "bg-brand-600 text-white shadow-lg" : "bg-slate-200 text-slate-400"
                    )}
                  >
                    <Send size={18} className={cn(isLoading && "animate-pulse")} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
                <ShieldCheck size={10} className="text-teal-600" />
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.15em]">Secure Medical Consultation</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

