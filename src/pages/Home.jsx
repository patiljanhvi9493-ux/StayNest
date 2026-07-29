import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import MessCard from '../components/MessCard';
import { Search, MapPin, Building, GraduationCap, DollarSign, ArrowRight, ShieldCheck, Users, HomeIcon, Award, Star } from 'lucide-react';

export default function Home() {
  const { listings, messes } = useContext(AppContext);
  const navigate = useNavigate();

  // Search parameters state
  const [searchCity, setSearchCity] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [searchCollege, setSearchCollege] = useState('');
  const [searchBudget, setSearchBudget] = useState('');
  const [searchType, setSearchType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.append('city', searchCity);
    if (searchArea) params.append('area', searchArea);
    if (searchCollege) params.append('college', searchCollege);
    if (searchBudget) params.append('budget', searchBudget);
    if (searchType) params.append('type', searchType);
    
    navigate(`/rooms?${params.toString()}`);
  };

  const cities = [
    { name: 'Pune', count: '4,200+ stays', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
    { name: 'Mumbai', count: '3,800+ stays', img: 'https://images.unsplash.com/photo-1570129476815-ba368ac77013?auto=format&fit=crop&w=400&q=80' },
    { name: 'Kolhapur', count: '1,200+ stays', img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sangli', count: '900+ stays', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80' },
    { name: 'Bangalore', count: '5,500+ stays', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
    { name: 'Hyderabad', count: '4,800+ stays', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80' }
  ];

  const testimonials = [
    { name: 'Nikhil Kadam', role: 'COEP Student', text: 'StayNest saved me from local brokers! I found an amazing room just 500m from my department, and the safety score check made my parents feel so secure.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80', rating: 5 },
    { name: 'Shruti Deshmukh', role: 'Symbiosis College', text: 'I matched with a compatible flatmate using the roommate finder in under 2 days. The compatibility scores are surprisingly accurate!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', rating: 5 },
    { name: 'Abhishek Roy', role: 'Infosys Developer', text: 'Not only is my room perfect, but finding a home-like veg mess nearby with delivery options made adjusting to Pune so much easier.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', rating: 5 }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 py-20 lg:py-32 overflow-hidden text-white transition-all">
        {/* Abstract shapes */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent opacity-70" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-rose-500/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-500/20 text-primary-400 border border-primary-500/30 mb-6 uppercase tracking-wider animate-pulse">
            <ShieldCheck className="w-3.5 h-3.5" /> <span>Verified student rental portal</span>
          </span>

          <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tight text-white mb-6">
            Find Your Perfect Room, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary-400 via-brand-rose-400 to-amber-300 bg-clip-text text-transparent">PG & Mess Facilities</span> Near You
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Verified Rooms • Trusted Owners • Roommate Matching • Daily Mess Subscriptions. <br />
            Explore accommodations within walking distance to your campus or workplace.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              to="/rooms"
              className="px-8 py-3.5 text-sm font-bold rounded-2xl bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Find Room
            </Link>
            <Link
              to="/messes"
              className="px-8 py-3.5 text-sm font-bold rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all transform hover:-translate-y-0.5"
            >
              Explore Mess
            </Link>
            <Link
              to="/login?role=Owner"
              className="px-8 py-3.5 text-sm font-bold rounded-2xl bg-transparent hover:bg-white/5 border border-white/10 transition-all text-slate-350 hover:text-white"
            >
              Post Property
            </Link>
          </div>

          {/* Search Console Overlay */}
          <div className="max-w-5xl mx-auto -mb-28 lg:-mb-40 transition-all">
            <form 
              onSubmit={handleSearch}
              className="glass p-5 sm:p-6 rounded-[32px] shadow-2xl flex flex-col space-y-4 text-slate-800 dark:text-slate-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left">
                
                {/* City */}
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1.5 block mb-1">City</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl px-3 py-2.5">
                    <MapPin className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <select
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="bg-transparent text-xs w-full font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="">Select City</option>
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Kolhapur">Kolhapur</option>
                      <option value="Sangli">Sangli</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>
                </div>

                {/* Area */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1.5 block mb-1">Area / Landmark</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl px-3 py-2.5">
                    <Building className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. Kothrud"
                      value={searchArea}
                      onChange={(e) => setSearchArea(e.target.value)}
                      className="bg-transparent text-xs w-full font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                {/* College */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1.5 block mb-1">College/Company</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl px-3 py-2.5">
                    <GraduationCap className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="e.g. COEP"
                      value={searchCollege}
                      onChange={(e) => setSearchCollege(e.target.value)}
                      className="bg-transparent text-xs w-full font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1.5 block mb-1">Max Budget (₹)</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl px-3 py-2.5">
                    <DollarSign className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <input
                      type="number"
                      placeholder="e.g. 8000"
                      value={searchBudget}
                      onChange={(e) => setSearchBudget(e.target.value)}
                      className="bg-transparent text-xs w-full font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1.5 block mb-1">Stay Type</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl px-3 py-2.5">
                    <HomeIcon className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="bg-transparent text-xs w-full font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="">Any Type</option>
                      <option value="PG">PG</option>
                      <option value="Room">Single Room</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Flat">Flat</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Submit search button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-brand-rose-500 hover:from-primary-500 hover:to-brand-rose-400 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/20"
              >
                <Search className="w-4.5 h-4.5" />
                <span>Search Stays</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Spacer to absorb search bar overflow */}
      <div className="h-28 lg:h-40" />

      {/* Popular Cities */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
                Popular Cities
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Explore student-friendly stays in top cities</p>
            </div>
            <Link to="/rooms" className="text-sm font-bold text-primary-500 hover:text-primary-600 flex items-center space-x-1">
              <span>View All</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {cities.map((city) => (
              <div
                key={city.name}
                onClick={() => navigate(`/rooms?city=${city.name}`)}
                className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-150/40 dark:border-slate-800/80 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={city.img}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-outfit font-bold text-sm text-slate-850 dark:text-white">{city.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{city.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
                Featured Stays Near You
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Verified properties with highest safety and review indexes</p>
            </div>
            <Link to="/rooms" className="text-sm font-bold text-primary-500 hover:text-primary-600 flex items-center space-x-1">
              <span>Explore Stays</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.slice(0, 3).map((room) => (
              <RoomCard key={room.id} listing={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Messes */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
                Top Rated Messes & Tiffin Services
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Healthy hygiene meals with student dining discounts</p>
            </div>
            <Link to="/messes" className="text-sm font-bold text-primary-500 hover:text-primary-600 flex items-center space-x-1">
              <span>View All Messes</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {messes.slice(0, 3).map((mess) => (
              <MessCard key={mess.id} mess={mess} />
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-tr from-primary-600 to-indigo-900 text-white relative overflow-hidden transition-all">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            
            <div className="space-y-2">
              <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-2">
                <HomeIcon className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="font-outfit font-black text-4xl sm:text-5xl">10,000+</h3>
              <p className="text-primary-100 font-medium text-sm">Verified Stays & PGs listed</p>
            </div>

            <div className="space-y-2 border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0">
              <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-2">
                <Users className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="font-outfit font-black text-4xl sm:text-5xl">5,000+</h3>
              <p className="text-primary-100 font-medium text-sm">Active Students accommodated</p>
            </div>

            <div className="space-y-2">
              <div className="inline-flex p-4 rounded-3xl bg-white/10 backdrop-blur-md mb-2">
                <Award className="w-8 h-8 text-primary-200" />
              </div>
              <h3 className="font-outfit font-black text-4xl sm:text-5xl">1,000+</h3>
              <p className="text-primary-100 font-medium text-sm">Verified Property & Mess Owners</p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
              What Students & Professionals Say
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Hear directly from the community finding comfort on StayNest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[28px] shadow-sm flex flex-col h-full hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-1.5 text-amber-500 mb-4">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-650 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow italic">
                  "{test.text}"
                </p>
                <div className="flex items-center space-x-3 mt-auto">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-outfit font-bold text-sm text-slate-800 dark:text-white">{test.name}</h4>
                    <p className="text-[11px] text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Owner Banner CTA */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-[32px] p-8 sm:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between text-white gap-6">
            <div className="space-y-3 max-w-lg text-center md:text-left">
              <h3 className="font-outfit font-extrabold text-2xl sm:text-3xl">Are you a property or mess owner?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Connect directly with thousands of verified students and professionals searching in your locality. Manage bookings, menu plans, and updates easily. Zero listing commissions.
              </p>
            </div>
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                to="/login?role=Owner"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-center text-xs shadow-md transition-colors"
              >
                List Accommodation
              </Link>
              <Link
                to="/login?role=Mess%20Owner"
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-center text-xs shadow-md transition-colors"
              >
                Register Mess
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
