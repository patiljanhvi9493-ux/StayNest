import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search, MapPin, SlidersHorizontal, RotateCcw, SortAsc } from 'lucide-react';

export default function Rooms() {
  const { listings } = useContext(AppContext);
  const location = useLocation();

  // Loading state
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [maxBudget, setMaxBudget] = useState(20000);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('rating'); // rating, cheapest, nearest, newest

  // Check URL query parameters on mount / location change
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    
    const cityParam = params.get('city');
    if (cityParam) setCity(cityParam);

    const typeParam = params.get('type');
    if (typeParam) setType(typeParam);

    const areaParam = params.get('area');
    if (areaParam) setSearchQuery(areaParam);

    const collegeParam = params.get('college');
    if (collegeParam) setSearchQuery(collegeParam);

    const budgetParam = params.get('budget');
    if (budgetParam) setMaxBudget(parseInt(budgetParam));

    // Simulate loading for 600ms
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.search]);

  // Handle Amenity selections
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(item => item !== amenity)
        : [...prev, amenity]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setCity('');
    setType('');
    setGender('');
    setMaxBudget(20000);
    setSelectedAmenities([]);
    setSortBy('rating');
  };

  // Filter listings
  const filteredListings = listings.filter(item => {
    // Search Query match (Title, Area, College, Company)
    const matchQuery = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase());

    // City match
    const matchCity = !city || item.city === city;

    // Type match
    const matchType = !type || item.type === type;

    // Gender match
    const matchGender = !gender || item.gender === gender || item.gender === 'Unisex';

    // Budget match
    const matchBudget = item.rent <= maxBudget;

    // Amenities match
    const matchAmenities = selectedAmenities.every(amenity => item.amenities.includes(amenity));

    return matchQuery && matchCity && matchType && matchGender && matchBudget && matchAmenities;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'cheapest') return a.rent - b.rent;
    if (sortBy === 'nearest') return a.distance - b.distance;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') {
      return a.availableDate === 'Immediate' ? -1 : b.availableDate === 'Immediate' ? 1 : a.availableDate.localeCompare(b.availableDate);
    }
    return 0;
  });

  const amenitiesOptions = ['WiFi', 'AC', 'Attached Bathroom', 'Parking', 'Food Included', 'Gym access', 'CCTV'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Search Accommodations
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Compare verified single rooms, shared PGs, flats, and hostels with zero brokerage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Section: Filters Desktop Panel */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="font-outfit font-bold text-sm text-slate-850 dark:text-white flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-slate-500" /> Filters
              </span>
              <button
                onClick={handleResetFilters}
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
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            {/* Type Selection */}
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Stay Type</label>
              <div className="grid grid-cols-2 gap-1.5">
                {['PG', 'Room', 'Hostel', 'Flat'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(type === t ? '' : t)}
                    className={`py-2 rounded-xl text-center text-xs font-semibold border transition-colors ${
                      type === t
                        ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-650 dark:text-slate-400 border-slate-100 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t === 'PG' ? 'PG/Hostel' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Gender Preference</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['Boys', 'Girls', 'Unisex'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(gender === g ? '' : g)}
                    className={`py-2 rounded-xl text-center text-xs font-semibold border transition-colors ${
                      gender === g
                        ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-650 dark:text-slate-400 border-slate-100 dark:border-slate-855 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Rent Budget Slider */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <span>Max Rent</span>
                <span className="text-slate-700 dark:text-slate-200">₹{maxBudget.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min="3000"
                max="20000"
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                <span>₹3,000</span>
                <span>₹20,000</span>
              </div>
            </div>

            {/* Amenities Checkbox Group */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">Amenities</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {amenitiesOptions.map((amenity) => {
                  const checked = selectedAmenities.includes(amenity);
                  return (
                    <label 
                      key={amenity}
                      className="flex items-center space-x-2.5 text-xs text-slate-600 dark:text-slate-350 cursor-pointer hover:text-slate-800 dark:hover:text-white"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleAmenityChange(amenity)}
                        className="rounded border-slate-300 dark:border-slate-800 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer focus:ring-offset-0 bg-transparent"
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Right Section: Listing Grid & Search bar */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Search & Sort Controller */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-4 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search area, college, landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 focus:border-primary-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none transition-colors"
              />
              <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-slate-400" />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <SortAsc className="w-4 h-4 text-slate-400" />
              <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-semibold outline-none cursor-pointer focus:border-primary-500 w-full sm:w-auto"
              >
                <option value="rating">Highest Rated</option>
                <option value="cheapest">Cheapest first</option>
                <option value="nearest">Nearest to college</option>
                <option value="newest">Available Date</option>
              </select>
            </div>

          </div>

          {/* Listings count indicator */}
          <p className="text-xs text-slate-400 font-semibold px-2">
            Found {sortedListings.length} matching stays
          </p>

          {/* Grid Area */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonLoader key={i} />
              ))}
            </div>
          ) : sortedListings.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[28px] py-16 px-6 text-center shadow-sm">
              <div className="text-slate-300 dark:text-slate-700 flex justify-center mb-4">
                <MapPin className="w-16 h-16 stroke-[1]" />
              </div>
              <h3 className="font-outfit font-extrabold text-lg text-slate-850 dark:text-white">No Stays Found</h3>
              <p className="text-xs text-slate-450 dark:text-slate-450 mt-1 max-w-sm mx-auto leading-relaxed">
                We couldn't find any rooms matching your current filters. Try resetting the filters or modifying your budget limits.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedListings.map((room) => (
                <RoomCard key={room.id} listing={room} />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
