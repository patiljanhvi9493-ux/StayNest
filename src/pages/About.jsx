import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, GraduationCap, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Is there any brokerage fee when booking stays?", a: "No! StayNest operates on a direct-to-owner model. There are absolutely zero brokerage charges for students or working professionals." },
    { q: "How are the safety scores calculated for each area?", a: "We aggregate local student audits, proximity to nearest police stations, street-lighting levels, and CCTV installations to compute a reliable safety quotient out of 100%." },
    { q: "How does the roommate compatibility tool compute matches?", a: "It compares lifestyle survey profiles (budget bounds, study silence requirements, sleeping hours, food preferences, and habits) using weighted matching vectors to output percentage compatibility indexes." },
    { q: "Can I manage both accommodation listings and mess menus on one account?", a: "Property and food service operations require separate dashboard profiles. You can register as a Room Owner or Mess Owner separately via the sign-in options." },
    { q: "Are mess plans customizable on a weekly basis?", a: "Yes, mess vendors on StayNest offer daily walk-ins as well as flexible monthly packages. Contact mess owners directly via the dashboard phone buttons to arrange custom schedules." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all min-h-screen space-y-16">
      
      {/* Hero section */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border uppercase tracking-wider">About StayNest</span>
        <h1 className="font-outfit font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white leading-tight">
          Redefining Student Housing & Local Services
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          StayNest is built specifically to address the pain points of students and working professionals migrating to new educational hubs, offering a brokerage-free, verified directory of rooms, roommates, and food.
        </p>
      </div>

      {/* Grid: Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-500 w-fit"><Compass className="w-6 h-6" /></div>
          <h3 className="font-outfit font-bold text-lg text-slate-850 dark:text-white">Our Mission</h3>
          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            To provide safe, verified, and affordable student stays and meals, eliminating brokerage cartels and offering tools that help students settle down in minutes without stress.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 space-y-3 shadow-sm">
          <div className="p-3 rounded-2xl bg-brand-rose-50 dark:bg-brand-rose-950/40 text-brand-rose-500 w-fit"><ShieldCheck className="w-6 h-6" /></div>
          <h3 className="font-outfit font-bold text-lg text-slate-850 dark:text-white">Our Vision</h3>
          <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
            To become the leading digital ecosystem for university student relocation, expanding across all major academic cities in India while standardizing student living parameters.
          </p>
        </div>

      </div>

      {/* How it works workflow */}
      <div className="space-y-8 pt-6 text-center">
        <h2 className="font-outfit font-extrabold text-2xl text-slate-900 dark:text-white">How StayNest Works</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          
          <div className="space-y-2.5 p-4">
            <span className="font-outfit font-black text-2xl text-primary-500">01</span>
            <h4 className="font-outfit font-bold text-sm text-slate-850 dark:text-white">Find Stay & Meals</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Search with city, budget, and distance. Inspect daily menus and safety indicators.</p>
          </div>

          <div className="space-y-2.5 p-4 border-y sm:border-y-0 sm:border-x border-slate-200/60 dark:border-slate-800">
            <span className="font-outfit font-black text-2xl text-primary-500">02</span>
            <h4 className="font-outfit font-bold text-sm text-slate-850 dark:text-white">Match Roommate</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Submit your lifestyle survey to calculate compatibility scores and hook up with other students.</p>
          </div>

          <div className="space-y-2.5 p-4">
            <span className="font-outfit font-black text-2xl text-primary-500">03</span>
            <h4 className="font-outfit font-bold text-sm text-slate-850 dark:text-white">Coordinate & Live</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Book a visit tour calendar or call owners directly. Move in with zero brokerage overheads.</p>
          </div>

        </div>
      </div>

      {/* Accordion FAQ section */}
      <div className="space-y-6 pt-6">
        <h2 className="font-outfit font-extrabold text-2xl text-slate-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 flex justify-between items-center text-xs font-bold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors text-left"
                >
                  <span className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-slate-400" /> {faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-11 animate-in fade-in slide-in-from-top-2 duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
