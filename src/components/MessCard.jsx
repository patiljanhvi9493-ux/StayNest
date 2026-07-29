import React, { useState } from 'react';
import { Phone, MapPin, Truck, Leaf, Coffee, Sun, Moon } from 'lucide-react';

export default function MessCard({ mess }) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      
      {/* Thumbnail/Image Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-150">
        <img 
          src={mess.images[0]} 
          alt={mess.title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Price tag */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-slate-900/85 dark:bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold font-outfit shadow-sm">
          ₹{mess.monthlyPrice.toLocaleString('en-IN')}<span className="text-[10px] text-slate-350 font-normal">/mo</span>
        </div>

        {/* Veg/Non-Veg Badges */}
        <div className="absolute bottom-3 left-3.5 flex space-x-1.5">
          {mess.type === 'Veg' || mess.type === 'Both' ? (
            <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/90 text-white shadow-sm backdrop-blur-xs">
              <Leaf className="w-3 h-3" />
              <span>Veg</span>
            </span>
          ) : null}
          {mess.type === 'Both' || mess.type === 'Non-Veg' ? (
            <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-rose-600/90 text-white shadow-sm backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-white block" />
              <span>Non-Veg</span>
            </span>
          ) : null}
        </div>

        {/* Delivery Tag */}
        {mess.deliveryAvailable && (
          <div className="absolute top-3.5 right-3.5 flex items-center bg-primary-600/95 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm backdrop-blur-xs">
            <Truck className="w-3 h-3 mr-1" /> Delivery
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Rating and Distance */}
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-amber-500">★</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{mess.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{mess.distance} km away</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-outfit font-bold text-base text-slate-900 dark:text-white mb-2 line-clamp-1">
          {mess.title}
        </h3>

        {/* Location area */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">
          {mess.area}, {mess.city}
        </p>

        {/* Today's Menu Section (Aesthetic details) */}
        <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/40 mb-4 flex-grow">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Today's Menu</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-start">
              <Coffee className="w-3.5 h-3.5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-350">Breakfast: </span>
                <span className="text-slate-500 dark:text-slate-400">{mess.todayMenu.breakfast}</span>
              </div>
            </div>
            <div className="flex items-start">
              <Sun className="w-3.5 h-3.5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-350">Lunch: </span>
                <span className="text-slate-500 dark:text-slate-400 line-clamp-1">{mess.todayMenu.lunch}</span>
              </div>
            </div>
            <div className="flex items-start">
              <Moon className="w-3.5 h-3.5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-700 dark:text-slate-350">Dinner: </span>
                <span className="text-slate-500 dark:text-slate-400 line-clamp-1">{mess.todayMenu.dinner}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing information */}
        <div className="flex justify-between items-center mb-5 text-xs text-slate-500 dark:text-slate-400 border-t border-b border-slate-100 dark:border-slate-800/60 py-3">
          <div>
            <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Monthly Plan</p>
            <p className="font-outfit font-extrabold text-sm text-slate-800 dark:text-white">₹{mess.monthlyPrice}/mo</p>
          </div>
          <div className="text-right border-l border-slate-200 dark:border-slate-800 pl-4">
            <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Daily Walk-In</p>
            <p className="font-outfit font-bold text-sm text-slate-800 dark:text-white">₹{mess.dailyPrice}/plate</p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-auto">
          {showContact ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white dark:bg-slate-800 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400">Owner: {mess.owner.name}</span>
                <span>{mess.owner.phone}</span>
              </div>
              <a 
                href={`tel:${mess.owner.phone}`}
                className="bg-primary-600 px-3 py-1.5 rounded-lg text-[10px] hover:bg-primary-500"
              >
                Call
              </a>
            </div>
          ) : (
            <button
              onClick={() => setShowContact(true)}
              className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-primary-600 dark:bg-slate-800 dark:hover:bg-primary-600 rounded-xl transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Mess Owner</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
