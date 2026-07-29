import React, { useState } from 'react';
import { 
  MapPin, Phone, Star, Coffee, BookOpen, Activity, 
  Map, Printer, CreditCard, HeartPulse, ShieldAlert, Bus
} from 'lucide-react';

export default function Nearby() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: MapPin },
    { name: 'Laundry', icon: Activity },
    { name: 'Medical & Health', icon: HeartPulse },
    { name: 'ATM & Finance', icon: CreditCard },
    { name: 'Gym & Fitness', icon: Activity },
    { name: 'Cafes & Diner', icon: Coffee },
    { name: 'Library & Study', icon: BookOpen },
    { name: 'Xerox & Stationery', icon: Printer },
    { name: 'Transit Stops', icon: Bus }
  ];

  const services = [
    { name: 'Express Dry Cleaners', category: 'Laundry', distance: '0.4 km', rating: 4.5, phone: '+91 99001 12233', address: 'Shop 4, Kothrud Stand Road, Pune', desc: 'Wash, fold, and steam iron services. Special monthly package for student uniforms and sheets.' },
    { name: 'Apollo Pharmacy 24/7', category: 'Medical & Health', distance: '0.2 km', rating: 4.8, phone: '+91 99001 44556', address: 'Opposite COEP Main Gate, Pune', desc: 'Medicines, basic healthcare products, and first-aid kits available 24 hours. Student discount of 10% on prescription pills.' },
    { name: 'State Bank of India ATM', category: 'ATM & Finance', distance: '0.1 km', rating: 4.2, phone: 'N/A', address: 'Inside COEP Hostel Campus, Pune', desc: 'Secure cash withdrawal facility supporting all major RuPay, Visa, and Mastercard cards.' },
    { name: 'Gold\'s Gym & Fitness Center', category: 'Gym & Fitness', distance: '0.8 km', rating: 4.7, phone: '+91 99001 77889', address: '3rd Floor, Sharda Plaza, Kothrud, Pune', desc: 'Fully equipped weights section, cardio zone, and professional trainer guidance. Flat 20% discount on 6-month memberships.' },
    { name: 'The Study Cafeteria', category: 'Cafes & Diner', distance: '0.3 km', rating: 4.6, phone: '+91 99002 00112', address: 'Lane 2, Near Modern College Road, Pune', desc: 'Cozy study spaces equipped with free high-speed WiFi, power sockets on every table, and cheap coffee.' },
    { name: 'Vidyarthi Digital Library', category: 'Library & Study', distance: '0.6 km', rating: 4.9, phone: '+91 99002 33445', address: 'Rajaram Mansion, Kothrud, Pune', desc: 'Air-conditioned quiet study cabins open 24 hours with individual desk lights and charging points.' },
    { name: 'Sai Digital Printers & Xerox', category: 'Xerox & Stationery', distance: '0.1 km', rating: 4.7, phone: '+91 99002 66778', address: 'Adjacent to College Back Gate, Pune', desc: 'High-speed bulk xerox, spiral bindings, and lab journal printings at economical prices (₹1 per page).' },
    { name: 'Shivajinagar Bus Depot', category: 'Transit Stops', distance: '0.9 km', rating: 4.1, phone: 'N/A', address: 'Shivajinagar Highway, Pune', desc: 'Major bus terminal connecting Local PMPML city services and state transport MSRTC travels.' },
    { name: 'Kothrud Metro Station', category: 'Transit Stops', distance: '0.5 km', rating: 4.6, phone: 'N/A', address: 'Kothrud Metro Line, Pune', desc: 'Newly launched rapid transit rail connection spanning all major educational zones of Pune.' }
  ];

  const filteredServices = activeCategory === 'All' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  // Icon Selector
  const getCategoryIcon = (categoryName) => {
    const cat = categories.find(c => c.name === categoryName);
    if (cat) {
      const Icon = cat.icon;
      return <Icon className="w-4 h-4" />;
    }
    return <MapPin className="w-4 h-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Nearby Student Services
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Locate xerox outlets, ATMs, medical shops, transit points, and other essential facilities around you.
        </p>
      </div>

      {/* Categories Scroller */}
      <div className="flex overflow-x-auto pb-4 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 space-x-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                isActive
                  ? 'bg-primary-500 border-primary-500 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Services list */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex justify-between items-center px-1">
            <span className="text-xs text-slate-400 font-bold">Showing {filteredServices.length} facilities near you</span>
            <span className="text-xs text-emerald-500 font-semibold flex items-center">
              <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Student-discount verified
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-100 dark:border-slate-800 p-10 text-center shadow-sm">
              <p className="text-slate-400 text-xs">No local services listed in this category yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center space-x-1">
                        {getCategoryIcon(service.category)}
                        <span>{service.category}</span>
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center">
                        <MapPin className="w-3 h-3 text-slate-450 mr-0.5" /> {service.distance} away
                      </span>
                    </div>

                    <h3 className="font-outfit font-extrabold text-base text-slate-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {service.desc}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      <span className="font-bold">Address: </span> {service.address}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4 flex-shrink-0 pt-2 md:pt-0">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{service.rating}</span>
                    </div>
                    {service.phone !== 'N/A' && (
                      <a
                        href={`tel:${service.phone}`}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-250 dark:border-slate-800 text-[10px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Service</span>
                      </a>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Simulated Maps */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-5 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white">Interactive Map (Pune Index)</h4>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border text-[9px] text-slate-400 font-bold flex items-center">
                <Map className="w-3 h-3 mr-0.5" /> GPS Active
              </span>
            </div>
            
            {/* Visual map graphic representation */}
            <div className="aspect-[4/3] sm:aspect-square bg-indigo-50/50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl relative overflow-hidden flex items-center justify-center">
              
              {/* Abstract map roads visualization */}
              <div className="absolute inset-0 bg-map-mesh opacity-20 dark:opacity-10 pointer-events-none" />
              
              {/* Animated Map Pins */}
              <div className="absolute top-1/4 left-1/3 p-1 rounded-full bg-primary-500 text-white shadow animate-float">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute top-1/2 right-1/4 p-1 rounded-full bg-brand-rose-500 text-white shadow animate-float" style={{ animationDelay: '1s' }}>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute bottom-1/4 left-1/2 p-1 rounded-full bg-emerald-500 text-white shadow animate-float" style={{ animationDelay: '1.5s' }}>
                <MapPin className="w-4 h-4" />
              </div>

              {/* Map details info */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 dark:bg-slate-900/90 border border-slate-200/50 dark:border-slate-800/80 rounded-xl p-2.5 backdrop-blur-md shadow-md text-left">
                <span className="text-[8px] font-bold text-primary-500 uppercase tracking-wider">Active Search Radius</span>
                <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">COEP Campus, Kothrud Area</p>
                <p className="text-[9px] text-slate-400">Showing accommodations and matching service vendors</p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
