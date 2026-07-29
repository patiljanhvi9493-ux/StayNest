import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Utensils, Calendar, Users, TrendingUp, Check, 
  Leaf, Truck, RefreshCw, Star, Edit, Save 
} from 'lucide-react';

export default function MessDashboard() {
  const { messes, updateMess, addNotification } = useContext(AppContext);
  const [activeMess, setActiveMess] = useState(null);
  
  // Menu Editor state
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');

  // Pricing State
  const [monthlyPrice, setMonthlyPrice] = useState(3000);
  const [dailyPrice, setDailyPrice] = useState(120);
  const [delivery, setDelivery] = useState(true);

  useEffect(() => {
    if (messes && messes.length > 0) {
      // Set the first mess (Savita Kadam's mess or default) as the active mess to manage
      const defaultMess = messes[0];
      setActiveMess(defaultMess);
      setBreakfast(defaultMess.todayMenu.breakfast);
      setLunch(defaultMess.todayMenu.lunch);
      setDinner(defaultMess.todayMenu.dinner);
      setMonthlyPrice(defaultMess.monthlyPrice);
      setDailyPrice(defaultMess.dailyPrice);
      setDelivery(defaultMess.deliveryAvailable);
    }
  }, [messes]);

  const handleSaveMenu = (e) => {
    e.preventDefault();
    if (!activeMess) return;

    const updatedMess = {
      ...activeMess,
      monthlyPrice: parseInt(monthlyPrice),
      dailyPrice: parseInt(dailyPrice),
      deliveryAvailable: delivery,
      todayMenu: {
        breakfast,
        lunch,
        dinner
      }
    };

    updateMess(updatedMess);
    addNotification("Mess menu and pricing saved successfully!");
  };

  if (!activeMess) return <div className="py-20 text-center text-slate-400">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-outfit font-extrabold text-3xl text-slate-900 dark:text-white flex items-center">
          <Utensils className="w-8 h-8 text-primary-500 mr-2" /> Mess Owner Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">
          Managing: <span className="text-primary-500 font-bold">{activeMess.title}</span> ({activeMess.area}, {activeMess.city})
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-500"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Subscribers</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">142 students</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Estimated Monthly Revenue</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">
              ₹{(142 * activeMess.monthlyPrice).toLocaleString('en-IN')}
            </h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500"><Star className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Average Rating</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">{activeMess.rating} / 5</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-brand-rose-50 dark:bg-brand-rose-950/40 text-brand-rose-500"><Truck className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Delivery Queries</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">28 locations</h3>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Menu Planner Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] p-6 shadow-sm">
            <h3 className="font-outfit font-extrabold text-base text-slate-850 dark:text-white mb-6 flex items-center">
              <Calendar className="w-5 h-5 mr-1.5 text-primary-500" /> Today's Meal Plan & Pricing
            </h3>
            
            <form onSubmit={handleSaveMenu} className="space-y-5">
              
              {/* Breakfast */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Breakfast Menu</label>
                <input
                  type="text"
                  value={breakfast}
                  onChange={(e) => setBreakfast(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>

              {/* Lunch */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Lunch Menu</label>
                <textarea
                  rows="2"
                  value={lunch}
                  onChange={(e) => setLunch(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>

              {/* Dinner */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Dinner Menu</label>
                <textarea
                  rows="2"
                  value={dinner}
                  onChange={(e) => setDinner(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>

              {/* Pricing breakdown */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Monthly Subscription Package (₹)</label>
                  <input
                    type="number"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-200 outline-none focus:border-primary-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Daily Plate Price (₹)</label>
                  <input
                    type="number"
                    value={dailyPrice}
                    onChange={(e) => setDailyPrice(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-200 outline-none focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              {/* Delivery checkbox */}
              <div className="pt-2">
                <label className="flex items-center space-x-2.5 text-xs text-slate-650 dark:text-slate-350 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={delivery}
                    onChange={(e) => setDelivery(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-800 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="font-bold flex items-center"><Truck className="w-4 h-4 mr-1 text-slate-400" /> Tiffin/Home delivery services enabled</span>
                </label>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save Menu Details</span>
              </button>

            </form>
          </div>
        </div>

        {/* Right Column: Menu Previews / Live stats */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] p-6 shadow-sm space-y-4">
            <h4 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white">Live Customer Board</h4>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Reviews and suggestions</span>
            
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {activeMess.reviews.map((rev, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850/60 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800 dark:text-white">{rev.studentName}</span>
                    <span className="text-amber-500">★ {rev.rating}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
