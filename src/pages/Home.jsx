import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import MessCard from '../components/MessCard';
import { motion } from 'framer-motion';
import { 
  Search, MapPin, Building, GraduationCap, DollarSign, ArrowRight, 
  ShieldCheck, Users, HomeIcon, Award, Star, Activity, 
  Wind, Dumbbell, BookOpen, ChevronDown, CheckCircle, HelpCircle, Utensils
} from 'lucide-react';

export default function Home() {
  const { listings, messes, toggleWishlist, wishlist } = useContext(AppContext);
  const navigate = useNavigate();

  // Search parameters state
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('');

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // How it works active tab
  const [howItWorksRole, setHowItWorksRole] = useState('seeker');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCity) params.append('city', searchCity);
    if (searchType) params.append('type', searchType);
    navigate(`/rooms?${params.toString()}`);
  };

  // Filter listings for specific categories
  const popularRooms = listings.filter(item => item.type === 'Room' || item.type === 'Flat').slice(0, 3);
  const featuredPGs = listings.filter(item => item.type === 'PG' || item.type === 'Hostel').slice(0, 3);
  const popularMesses = messes.slice(0, 3);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const services = [
    { name: 'Nearby Medical', icon: <Activity className="w-6 h-6" />, desc: '24/7 Pharmacies, clinics, and multi-specialty hospitals with student discount cards.', list: ['Noble Pharmacy (0.2 km)', 'Apollo Clinic (0.3 km)', 'Sanjeevani Hospital (1.1 km)'] },
    { name: 'Nearby Laundry', icon: <Wind className="w-6 h-6" />, desc: 'Express laundry, dry cleaning, and self-service laundromats with quick pickup/delivery.', list: ['Quick Clean Drycleaners (0.4 km)', 'Express Laundromat (0.5 km)', 'Spin & Fold Laundry (0.8 km)'] },
    { name: 'Nearby Gym', icon: <Dumbbell className="w-6 h-6" />, desc: 'Top-rated fitness centers, cardio gyms, and yoga studios open early mornings and late nights.', list: ['Star Gym & Fitness (0.5 km)', 'Gold Standard Fitness (0.7 km)', 'Iron Temple Gym (1.2 km)'] },
    { name: 'Nearby Library', icon: <BookOpen className="w-6 h-6" />, desc: 'Silent reading rooms, co-working spaces, and public libraries with high-speed WiFi facilities.', list: ['Central Student Reading Room (0.3 km)', 'Vikas Study Library (0.6 km)', 'Public Knowledge Space (1.0 km)'] }
  ];

  const testimonials = [
    { name: 'Nikhil Kadam', role: 'COEP Student', text: 'StayNest saved me from local brokers! I found an amazing room just 500m from my department, and the safety score check made my parents feel so secure.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80', rating: 5 },
    { name: 'Shruti Deshmukh', role: 'Symbiosis College', text: 'I matched with a compatible flatmate using the roommate finder in under 2 days. The compatibility scores are surprisingly accurate!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', rating: 5 },
    { name: 'Abhishek Roy', role: 'Infosys Developer', text: 'Not only is my room perfect, but finding a home-like veg mess nearby with delivery options made adjusting to Pune so much easier.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', rating: 5 }
  ];

  const faqs = [
    { q: 'Is there any brokerage fee on StayNest?', a: 'No, StayNest is a 100% direct accommodation platform. Connect directly with room owners, PG wardens, and mess owners without paying any brokerage fee.' },
    { q: 'How does the Roommate Compatibility Finder work?', a: 'You fill out a brief profile detailing your budget, sleep patterns, study habits, diet preferences, and hygiene choices. Our system calculates compatibility indexes against other active seeker profiles to help you discover the perfect roommate.' },
    { q: 'How can mess subscriptions be managed?', a: 'Providers list their daily menus (Breakfast, Lunch, Dinner) along with monthly package prices. Seekers can preview daily meal statuses (Veg/Non-veg) and contact owners directly to purchase meal vouchers or monthly tiffin subscriptions.' },
    { q: 'What is the Safety Index Score?', a: 'Every property listed on StayNest undergoes local checks. We evaluate parameters such as CCTV presence, warden availability, secure lock systems, fire safety measures, and campus distance to assign a safety score out of 100.' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 py-20 lg:py-28 overflow-hidden text-white transition-all">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent opacity-70" />
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-rose-500/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary-500/20 text-primary-400 border border-primary-500/30 mb-6 uppercase tracking-wider animate-pulse">
            <ShieldCheck className="w-3.5 h-3.5" /> <span>Unified Direct Accommodation Hub</span>
          </span>

          <h1 className="font-outfit font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tight text-white mb-6">
            Find Your Perfect Stay <br />
            <span className="bg-gradient-to-r from-primary-400 via-brand-rose-400 to-amber-300 bg-clip-text text-transparent">or List Your Property</span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            One platform for students, professionals, room owners, PG owners and mess owners.
            Discover verified stays near your campus or register listings to connect instantly.
          </p>

          {/* TWO LARGE ANIMATED CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            
            {/* Card 1: Looking for a Room? */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass p-8 rounded-[32px] border border-white/10 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
              <div className="w-16 h-16 rounded-3xl bg-primary-500/20 text-primary-400 flex items-center justify-center text-4xl mb-6">
                🏠
              </div>
              <h3 className="font-outfit font-black text-2xl mb-3 text-white">Looking for a Room?</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-8 max-w-xs">
                Explore student rooms, shared PG spaces, student hostels, studio flats, and messes with zero brokerage near your college.
              </p>
              <Link
                to="/rooms"
                className="w-full py-3.5 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-sm shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.01] text-center"
              >
                Explore Rooms
              </Link>
            </motion.div>

            {/* Card 2: Want to Rent Out Your Property? */}
            <motion.div 
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass p-8 rounded-[32px] border border-white/10 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-rose-500/10 rounded-full blur-2xl" />
              <div className="w-16 h-16 rounded-3xl bg-brand-rose-500/20 text-brand-rose-400 flex items-center justify-center text-4xl mb-6">
                🏢
              </div>
              <h3 className="font-outfit font-black text-2xl mb-3 text-white">Want to Rent Out?</h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-8 max-w-xs">
                List your vacant rooms, PG hostels, flats, or dining mess services and manage bookings using our analytics-rich dashboard.
              </p>
              <Link
                to="/login?role=Owner"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-rose-500 to-amber-500 hover:from-brand-rose-400 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-brand-rose-500/20 transition-all hover:scale-[1.01] text-center"
              >
                Start Listing
              </Link>
            </motion.div>

          </div>

          {/* Quick Search Console Overlay */}
          <div className="max-w-4xl mx-auto -mb-28 lg:-mb-36">
            <form 
              onSubmit={handleSearch}
              className="glass p-5 rounded-[28px] shadow-2xl flex flex-col space-y-4 text-slate-800 dark:text-slate-200"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                
                {/* City */}
                <div className="relative">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1 block mb-1">City</label>
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

                {/* Property Type */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1 block mb-1">Stay Type</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl px-3 py-2.5">
                    <Building className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
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

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-2xl bg-slate-950 dark:bg-primary-600 hover:bg-slate-900 dark:hover:bg-primary-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Accommodations</span>
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </section>

      {/* Spacer to absorb search bar overflow */}
      <div className="h-28 lg:h-36" />

      {/* Popular Rooms */}
      <section className="py-20 bg-slate-50 dark:bg-slate-955 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500">Curated Stays</span>
              <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mt-1">
                Popular Rooms & Flatshares
              </h2>
            </div>
            <Link to="/rooms" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center space-x-1">
              <span>View All Rooms</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularRooms.map((room) => (
              <RoomCard key={room.id} listing={room} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured PG */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-rose-500">Hostel & PG Living</span>
              <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mt-1">
                Featured Hostels & PGs
              </h2>
            </div>
            <Link to="/rooms?type=PG" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center space-x-1">
              <span>View All PGs</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPGs.map((pg) => (
              <RoomCard key={pg.id} listing={pg} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Mess */}
      <section className="py-20 bg-slate-50 dark:bg-slate-955 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Student Tiffin Services</span>
              <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mt-1">
                Popular Messes & Dining
              </h2>
            </div>
            <Link to="/messes" className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center space-x-1">
              <span>View All Messes</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularMesses.map((mess) => (
              <MessCard key={mess.id} mess={mess} />
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Services */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Student Ecosystem</span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mt-2">
              Essential Nearby Services
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Explore critical ecosystem facilities situated within walking distance of our registered accommodations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((serv, index) => (
              <div 
                key={index}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-6 rounded-[28px] shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-4">
                    {serv.icon}
                  </div>
                  <h4 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white mb-2">{serv.name}</h4>
                  <p className="text-slate-400 dark:text-slate-500 text-[11px] leading-relaxed mb-4">{serv.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-850">
                  <span className="text-[9px] font-bold text-slate-450 dark:text-slate-550 uppercase tracking-wider block mb-1">Local Spots:</span>
                  <ul className="space-y-1">
                    {serv.list.map((item, key) => (
                      <li key={key} className="text-[10px] text-slate-600 dark:text-slate-350 flex items-center">
                        <span className="w-1 h-1 bg-primary-500 rounded-full mr-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-slate-50 dark:bg-slate-955 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500">Stepping Stones</span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mt-2">
              How StayNest Works
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
              Simple direct connection framework designed for dual accommodation operations.
            </p>
          </div>

          {/* Stepper active role toggle */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-2 gap-1 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 p-1.5 rounded-2xl shadow-sm">
              <button 
                onClick={() => setHowItWorksRole('seeker')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                  howItWorksRole === 'seeker' 
                    ? 'bg-slate-950 dark:bg-primary-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-705'
                }`}
              >
                For Stay Seekers
              </button>
              <button 
                onClick={() => setHowItWorksRole('provider')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                  howItWorksRole === 'provider' 
                    ? 'bg-slate-950 dark:bg-primary-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-705'
                }`}
              >
                For Stay Providers
              </button>
            </div>
          </div>

          {/* Stepper visual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorksRole === 'seeker' ? (
              <>
                {[
                  { title: 'Create Survey Profile', desc: 'Select Seeker, adjust target budget, configure lifestyle preferences, and study timings.' },
                  { title: 'Discover Stays & Messes', desc: 'Apply advanced location filters, safety index requirements, and food diet tags.' },
                  { title: 'Compare & Match', desc: 'Compare rooms side-by-side and view compatibility indexes against potential roommates.' },
                  { title: 'Schedule Visit', desc: 'Chat directly with property owners and book physical visit slots from the calendar.' }
                ].map((step, idx) => (
                  <div key={idx} className="relative text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-[28px] shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-primary-500 text-white font-outfit font-black text-base flex items-center justify-center mx-auto mb-4 shadow-sm">
                      {idx + 1}
                    </div>
                    <h4 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  { title: 'List Accommodations', desc: 'Upload property/mess images, details, security deposits, amenities, and house rules.' },
                  { title: 'Manage Daily Menus', desc: 'If mess owner, list today\'s breakfast, lunch, and dinner plans with price packages.' },
                  { title: 'Coordinate Visits', desc: 'Inspect upcoming seeker visits on your dashboard and approve or reschedule tours.' },
                  { title: 'Track Performance', desc: 'Inspect views, clicks, inquiries, and estimated revenue inside analytics.' }
                ].map((step, idx) => (
                  <div key={idx} className="relative text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-[28px] shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-brand-rose-500 text-white font-outfit font-black text-base flex items-center justify-center mx-auto mb-4 shadow-sm">
                      {idx + 1}
                    </div>
                    <h4 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </>
            )}
          </div>

        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Student Voices</span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mt-2">
              Reviews & Testimonials
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Hear directly from the community finding comfort on StayNest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index} 
                className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[28px] shadow-sm flex flex-col h-full hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-350 text-xs leading-relaxed mb-6 flex-grow italic">
                  "{test.text}"
                </p>
                <div className="flex items-center space-x-3 mt-auto pt-4 border-t border-slate-100/50 dark:border-slate-800/40">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-outfit font-bold text-xs text-slate-800 dark:text-white">{test.name}</h4>
                    <p className="text-[10px] text-slate-400">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-955 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-500">FAQ</span>
            <h2 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-850 rounded-[22px] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center text-slate-800 dark:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-outfit font-bold text-xs sm:text-sm">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-xs leading-relaxed border-t border-slate-50 dark:border-slate-855/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
