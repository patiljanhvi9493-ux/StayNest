import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { X, ArrowRight, Columns } from 'lucide-react';

export default function ComparePanel() {
  const { compareList, removeFromCompare, clearCompare } = useContext(AppContext);
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-2xl py-4 px-6 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Section: Info */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400">
            <Columns className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-outfit font-bold text-sm text-slate-900 dark:text-white">Compare Accommodations</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select up to 3 listings to compare rent, distance, safety, and amenities side-by-side. ({compareList.length}/3 selected)
            </p>
          </div>
        </div>

        {/* Middle Section: Previews */}
        <div className="flex items-center space-x-2">
          {compareList.map((room) => (
            <div 
              key={room.id} 
              className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/60 pl-2 pr-1.5 py-1 rounded-xl relative group"
            >
              <img 
                src={room.images[0]} 
                alt="" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-350 truncate max-w-[80px] sm:max-w-[120px]">
                {room.title}
              </span>
              <button
                onClick={() => removeFromCompare(room.id)}
                className="p-1 rounded-md text-slate-400 hover:text-brand-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                aria-label="Remove"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Placeholders */}
          {Array.from({ length: 3 - compareList.length }).map((_, index) => (
            <div 
              key={index} 
              className="hidden sm:flex items-center justify-center w-36 py-2 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-[10px] font-medium text-slate-400"
            >
              + Add another room
            </div>
          ))}
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={clearCompare}
            className="text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white px-3 py-2 rounded-xl"
          >
            Clear All
          </button>
          
          <button
            onClick={() => navigate('/compare')}
            className="flex-grow md:flex-grow-0 flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs shadow-md shadow-primary-500/20 transition-all"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
