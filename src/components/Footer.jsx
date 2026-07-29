import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addNotification } = useContext(AppContext);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    addNotification(`Successfully subscribed to StayNest newsletter with: ${email}`);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const cities = ['Pune', 'Mumbai', 'Kolhapur', 'Sangli', 'Bangalore', 'Hyderabad'];

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 border-t border-slate-800 pt-16 pb-8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-brand-rose-500 text-white font-outfit font-bold text-lg">
                S
              </div>
              <span className="font-outfit font-extrabold text-xl tracking-tight text-white">
                StayNest
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              StayNest is a premium portal designed specifically to help students and working professionals find verified accommodations, healthy mess facilities, compatible roommates, and local student services with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-outfit font-bold text-md mb-4 tracking-wider uppercase text-xs">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/rooms" className="hover:text-white transition-colors">Find Rooms</Link></li>
              <li><Link to="/pgs" className="hover:text-white transition-colors">Find PGs & Hostels</Link></li>
              <li><Link to="/messes" className="hover:text-white transition-colors">Explore Mess & Dining</Link></li>
              <li><Link to="/roommates" className="hover:text-white transition-colors">Roommate Finder</Link></li>
              <li><Link to="/community" className="hover:text-white transition-colors">Community Forum</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">FAQs & Support</Link></li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="text-white font-outfit font-bold text-md mb-4 tracking-wider uppercase text-xs">Explore Cities</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {cities.map((city) => (
                <Link 
                  key={city} 
                  to={`/rooms?city=${city}`} 
                  className="hover:text-white transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h3 className="text-white font-outfit font-bold text-md mb-4 tracking-wider uppercase text-xs">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Subscribe to our newsletter to receive the latest listing updates, study tips, and exclusive student rental discounts.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 dark:bg-slate-900/60 border border-slate-700/60 focus:border-primary-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-505 outline-none transition-all pr-12"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white transition-colors"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 animate-pulse">Thanks for subscribing!</p>
            )}
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} StayNest Technologies. Made for students & professionals. Zero Brokerage.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
