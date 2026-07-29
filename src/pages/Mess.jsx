import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import MessCard from '../components/MessCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search, MapPin, SlidersHorizontal, RotateCcw, Utensils } from 'lucide-react';

export default function Mess() {
  const { messes } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');
  const [foodType, setFoodType] = useState(''); // Veg, Both, Non-Veg
  const [delivery, setDelivery] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [city, foodType, delivery, maxPrice, searchQuery]);

  const handleReset = () => {
    setSearchQuery('');
    setCity('');
    setFoodType('');
    setDelivery(false);
    setMaxPrice(5000);
  };

  const filteredMesses = messes.filter(m => {
    const matchQuery = !searchQuery || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.college.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchCity = !city || m.city === city;
    const matchType = !foodType || m.type === foodType || m.type === 'Both';
    const matchDelivery = !delivery || m.deliveryAvailable;
    const matchPrice = m.monthlyPrice <= maxPrice;

    return matchQuery && matchCity && matchType && matchDelivery && matchPrice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Title */}
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white flex items-center">
            <Utensils className="w-8 h-8 text-primary-500 mr-2" /> Explore Mess & Dining
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Healthy daily thali and tiffin services near major campuses with student budget packages.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="font-outfit font-bold text-sm text-slate-850 dark:text-white flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2" /> Food Filters
              </span>
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-400 hover:text-primary-500 transition-colors flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* City Selection */}
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">City</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none focus:border-primary-500"
              >
                <option value="">All Cities</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolhapur">Kolhapur</option>
                <option value="Sangli">Sangli</option>
              </select>
            </div>

            {/* Food Type */}
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Diet Preference</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { value: 'Veg', label: 'Pure Veg' },
                  { value: 'Non-Veg', label: 'Non-Veg' },
                  { value: 'Both', label: 'Both' }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFoodType(foodType === type.value ? '' : type.value)}
                    className={`py-2 rounded-xl text-center text-[10px] font-bold border transition-colors ${
                      foodType === type.value
                        ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-650 dark:text-slate-400 border-slate-100 dark:border-slate-855 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>Max Monthly Plan</span>
                <span className="text-slate-700 dark:text-slate-200">₹{maxPrice.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min="2000"
                max="5000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>₹2,000</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Delivery Toggle */}
            <label className="flex items-center space-x-2.5 text-xs text-slate-600 dark:text-slate-350 cursor-pointer hover:text-slate-800 dark:hover:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="checkbox"
                checked={delivery}
                onChange={(e) => setDelivery(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-850 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer focus:ring-offset-0 bg-transparent"
              />
              <span className="font-semibold">Home/Room Delivery Available</span>
            </label>

          </div>
        </div>

        {/* Mess Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Search bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-4 shadow-sm">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by mess name, college landmark, area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none transition-colors"
              />
              <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
            </div>
          </div>

          <p className="text-xs text-slate-400 font-semibold px-2">
            Found {filteredMesses.length} dining options
          </p>

          {/* Grid Area */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonLoader key={i} type="mess" />
              ))}
            </div>
          ) : filteredMesses.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[28px] py-16 px-6 text-center shadow-sm">
              <div className="text-slate-350 dark:text-slate-750 flex justify-center mb-4">
                <Utensils className="w-16 h-16 stroke-[1]" />
              </div>
              <h3 className="font-outfit font-extrabold text-lg text-slate-850 dark:text-white">No Mess Found</h3>
              <p className="text-xs text-slate-450 dark:text-slate-450 mt-1 max-w-sm mx-auto leading-relaxed">
                No local dining spaces found matching your dietary or area filters. Try expanding your search options.
              </p>
              <button
                onClick={handleReset}
                className="mt-6 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMesses.map((m) => (
                <MessCard key={m.id} mess={m} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
