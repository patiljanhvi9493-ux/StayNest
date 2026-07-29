import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, HelpCircle, HeartHandshake } from 'lucide-react';

export default function Contact() {
  const { addNotification } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addNotification(`Support query submitted successfully by ${name}. Ticket logged.`);
    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all min-h-screen">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h1 className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
          Get in Touch with StayNest
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Have queries about accommodations, room listing processes, or roommate finder compatibilities? Our student support desk is here 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Columns: Contact Details cards */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-500"><Phone className="w-5.5 h-5.5" /></div>
            <div>
              <h4 className="font-outfit font-bold text-sm text-slate-855 dark:text-white">Call Support</h4>
              <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">Direct student helpline support</p>
              <p className="text-xs font-bold text-slate-850 dark:text-white mt-1">+91 1800 123 4567</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <div className="p-3 rounded-2xl bg-brand-rose-50 dark:bg-brand-rose-950/40 text-brand-rose-500"><Mail className="w-5.5 h-5.5" /></div>
            <div>
              <h4 className="font-outfit font-bold text-sm text-slate-855 dark:text-white">Email Address</h4>
              <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">Queries & partnership details</p>
              <p className="text-xs font-bold text-slate-850 dark:text-white mt-1">support@staynest.com</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-start space-x-4">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500"><MapPin className="w-5.5 h-5.5" /></div>
            <div>
              <h4 className="font-outfit font-bold text-sm text-slate-855 dark:text-white">Corporate HQ</h4>
              <p className="text-xs text-slate-505 dark:text-slate-400 mt-1">Visit our local student hubs</p>
              <p className="text-xs font-bold text-slate-850 dark:text-white mt-1">Kothrud Stand Road, Pune, MH</p>
            </div>
          </div>

        </div>

        {/* Right Columns: Contact Form & maps placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] p-6 sm:p-8 shadow-sm">
            
            <h3 className="font-outfit font-extrabold text-base text-slate-850 dark:text-white mb-6">Submit Support Inquiry Ticket</h3>
            
            {submitted ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-6 rounded-2xl text-center">
                <p className="text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 mr-2" /> Support Ticket Logged Successfully!
                </p>
                <p className="text-[10px] text-slate-450 mt-1.5">Our support engineers will review your request and reply via email within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Amit"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. amit@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Verification queries or listings"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Inquiry Message</label>
                  <textarea
                    placeholder="Type details about your inquiry..."
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 mt-2 rounded-xl bg-slate-950 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry Message</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
