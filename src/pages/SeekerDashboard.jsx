import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import MessCard from '../components/MessCard';
import { motion } from 'framer-motion';
import { 
  User, Mail, GraduationCap, Calendar, Heart, Settings, LogOut, Search, MapPin, 
  Sparkles, DollarSign, MessageSquare, Bell, Compass, ArrowRight, ShieldCheck, 
  HelpCircle, Eye, RefreshCw, Send, CheckCircle, Flame, Activity, Wind, Dumbbell, BookOpen, Trash2
} from 'lucide-react';

export default function SeekerDashboard() {
  const { 
    user, logout, bookings, cancelBooking, wishlist, listings, messes, roommates, 
    notifications, markNotificationsAsRead, addNotification, login 
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState('dashboard'); // 'dashboard', 'wishlist', 'bookings', 'messages', 'notifications', 'settings'
  
  // Search bar input
  const [searchQuery, setSearchQuery] = useState('');

  // Budget Calculator state
  const [rentExp, setRentExp] = useState(6500);
  const [foodExp, setFoodExp] = useState(3000);
  const [utilitiesExp, setUtilitiesExp] = useState(1200);
  const [travelExp, setTravelExp] = useState(800);

  // Settings state
  const [editName, setEditName] = useState(user ? user.name : '');
  const [editCollege, setEditCollege] = useState(user ? user.college : '');
  const [editBudget, setEditBudget] = useState(user ? user.budget || 6000 : 6000);

  // AI Prompt Suggestion state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Chat window state
  const [selectedChat, setSelectedChat] = useState('c-1');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState({
    'c-1': [
      { sender: 'provider', text: "Hello Siddharth, the double sharing room at Kothrud is available from Monday. Would you like to schedule a physical visit?", time: "10:30 AM" }
    ],
    'c-2': [
      { sender: 'provider', text: "Hi, we have pure veg tiffin options starting from ₹3,000 per month. Delivery is free within 1km.", time: "Yesterday" }
    ]
  });

  if (!user) {
    return (
      <div className="py-20 text-center text-slate-450 min-h-screen flex flex-col justify-center items-center">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 mb-4">
          <User className="w-12 h-12 text-slate-350" />
        </div>
        <p className="text-sm font-semibold">Please log in to view your seeker dashboard.</p>
        <Link to="/login" className="mt-4 px-6 py-2.5 rounded-xl bg-primary-600 text-white font-bold text-xs shadow-md">
          Sign In
        </Link>
      </div>
    );
  }

  // Seeker filter matches
  const recommendedRooms = listings.filter(item => item.rent <= (user.budget || 8000) && (item.gender === 'Unisex' || item.gender === 'Boys')).slice(0, 3);
  const trendingListings = listings.filter(item => item.safetyScore >= 94).slice(0, 2);
  const nearbyMesses = messes.slice(0, 2);
  const savedStays = listings.filter(item => wishlist.includes(item.id));

  // Quick settings save
  const handleSaveSettings = (e) => {
    e.preventDefault();
    login({
      ...user,
      name: editName,
      college: editCollege,
      budget: parseInt(editBudget)
    });
    addNotification("Account settings updated successfully!");
  };

  // Run AI Recommendation
  const handleAIQuery = (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setTimeout(() => {
      // Find listings matching prompt keywords
      const promptLower = aiPrompt.toLowerCase();
      let matched = listings.filter(item => {
        return item.title.toLowerCase().includes(promptLower) ||
               item.area.toLowerCase().includes(promptLower) ||
               item.type.toLowerCase().includes(promptLower) ||
               item.amenities.some(a => promptLower.includes(a.toLowerCase())) ||
               item.rent <= parseInt(promptLower.replace(/[^0-9]/g, '')) ||
               item.rent <= 9000;
      });

      if (matched.length === 0) matched = listings.slice(0, 2);

      setAiResponse({
        text: `Based on your request "${aiPrompt}", here are the top matching stays evaluated with StayNest SafeMatch.`,
        rooms: matched.slice(0, 2).map(r => ({
          ...r,
          matchPct: Math.floor(Math.random() * 15) + 85
        }))
      });
      setAiLoading(false);
      addNotification("AI matched recommendations generated!");
    }, 1200);
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => ({
      ...prev,
      [selectedChat]: [
        ...prev[selectedChat],
        { sender: 'seeker', text: chatInput, time: "Just now" }
      ]
    }));
    setChatInput('');
    addNotification("Message sent to provider.");

    // Simulate auto reply
    setTimeout(() => {
      setChatMessages(prev => ({
        ...prev,
        [selectedChat]: [
          ...prev[selectedChat],
          { sender: 'provider', text: "Thank you for writing. I will get back to you shortly.", time: "Just now" }
        ]
      }));
    }, 2000);
  };

  const totalExpense = rentExp + foodExp + utilitiesExp + travelExp;

  const sidebarLinks = [
    { id: 'dashboard', name: 'Dashboard', icon: <Compass className="w-4 h-4" /> },
    { id: 'wishlist', name: 'Wishlist', icon: <Heart className="w-4 h-4" />, count: wishlist.length },
    { id: 'bookings', name: 'Visits & Tours', icon: <Calendar className="w-4 h-4" />, count: bookings.length },
    { id: 'messages', name: 'Chat Inbox', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell className="w-4 h-4 text-brand-rose-500" />, count: notifications.filter(n => !n.read).length },
    { id: 'settings', name: 'Profile Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all min-h-screen">
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side Dashboard Nav */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-6">
            
            {/* Quick Profile Summary */}
            <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <img 
                src={user.avatar} 
                alt="" 
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-primary-500/20"
              />
              <div className="min-w-0">
                <p className="font-outfit font-black text-xs text-slate-900 dark:text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{user.role}</p>
              </div>
            </div>

            {/* Sidebar list */}
            <nav className="space-y-1">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePanel(link.id);
                    if (link.id === 'notifications') markNotificationsAsRead();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-outfit text-xs font-semibold transition-colors ${
                    activePanel === link.id
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {link.icon}
                    <span>{link.name}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      activePanel === link.id ? 'bg-white text-primary-600' : 'bg-brand-rose-500 text-white'
                    }`}>
                      {link.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Shortcut lists for quick page routing */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">
              <span>Quick Actions</span>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button onClick={() => navigate('/rooms')} className="py-2 px-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:border-primary-500 text-[9px] text-center text-slate-600 dark:text-slate-400 hover:text-primary-500">Find Rooms</button>
                <button onClick={() => navigate('/rooms?type=PG')} className="py-2 px-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:border-primary-500 text-[9px] text-center text-slate-600 dark:text-slate-400 hover:text-primary-500">Find PG</button>
                <button onClick={() => navigate('/messes')} className="py-2 px-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:border-primary-500 text-[9px] text-center text-slate-600 dark:text-slate-400 hover:text-primary-500">Mess Plans</button>
                <button onClick={() => navigate('/roommates')} className="py-2 px-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 hover:border-primary-500 text-[9px] text-center text-slate-600 dark:text-slate-400 hover:text-primary-500">Roommate</button>
              </div>
            </div>

            <button
              onClick={() => { logout(); navigate('/'); }}
              className="w-full py-2.5 rounded-xl border border-brand-rose-500/20 bg-brand-rose-50/15 hover:bg-brand-rose-50 text-brand-rose-600 text-[10px] font-black tracking-wider uppercase transition-colors"
            >
              Sign Out
            </button>

          </div>
        </aside>

        {/* Right Dashboard Container Panels */}
        <main className="flex-grow min-w-0">
          
          {/* PANEL 1: MAIN SEEKER DASHBOARD HUB */}
          {activePanel === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-primary-600 to-indigo-900 text-white rounded-[32px] p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10 space-y-2 max-w-lg">
                  <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white">Welcome back, {user.name}! 👋</h2>
                  <p className="text-primary-100 text-xs leading-relaxed">
                    Verify staying arrangements and daily nutrition packages near <span className="font-bold underline">{user.college || 'your campus'}</span> with zero broker fees.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-bold">
                    <span className="bg-white/10 px-2.5 py-1 rounded-lg">Budget Limit: ₹{user.budget || 8000}</span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> SafeMatch Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Search bar & Quick Filters */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by area, college, landmark, PG name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigate(`/rooms?area=${searchQuery}`);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-850 dark:text-slate-200 outline-none focus:border-primary-500"
                  />
                  <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                </div>
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block pr-1.5">Quick Filters:</span>
                  {[
                    { label: 'Under ₹6,000', query: 'budget=6000' },
                    { label: 'Girls PG', query: 'gender=Girls&type=PG' },
                    { label: 'Attached Bath', query: 'amenities=Attached Bathroom' },
                    { label: 'WiFi Included', query: 'amenities=WiFi' },
                    { label: 'Veg Mess Only', query: 'food=Veg' }
                  ].map((filter, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(`/rooms?${filter.query}`)}
                      className="text-[9px] font-bold px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-850 hover:border-primary-500 text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors"
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommended Rooms */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-outfit font-black text-base text-slate-850 dark:text-white flex items-center">
                    <Flame className="w-5 h-5 text-brand-rose-500 mr-1.5" /> Recommended Rooms For You
                  </h3>
                  <Link to="/rooms" className="text-xs font-bold text-primary-500 hover:underline">See all matches</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedRooms.map((room) => (
                    <RoomCard key={room.id} listing={room} />
                  ))}
                </div>
              </div>

              {/* Saved Properties & Trending side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Trending Stays */}
                <div className="space-y-4">
                  <h3 className="font-outfit font-black text-base text-slate-850 dark:text-white">Trending High-Safety Stays</h3>
                  <div className="space-y-4">
                    {trendingListings.map((room) => (
                      <div key={room.id} className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center space-x-4">
                        <img src={room.images[0]} className="w-16 h-14 rounded-lg object-cover" alt="" />
                        <div className="min-w-0 flex-grow">
                          <p className="font-bold text-xs text-slate-850 dark:text-white truncate">{room.title}</p>
                          <p className="text-[10px] text-slate-400">{room.area} • Safety Score: <span className="font-bold text-emerald-500">{room.safetyScore}%</span></p>
                          <p className="text-[10px] font-bold text-primary-500 mt-1">₹{room.rent}/mo</p>
                        </div>
                        <Link to={`/rooms/${room.id}`} className="text-slate-400 hover:text-primary-500"><ArrowRight className="w-4 h-4" /></Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Mess list */}
                <div className="space-y-4">
                  <h3 className="font-outfit font-black text-base text-slate-850 dark:text-white">Nearby Food Mess options</h3>
                  <div className="space-y-4">
                    {nearbyMesses.map((mess) => (
                      <div key={mess.id} className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex items-center space-x-4">
                        <div className="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 rounded-xl flex items-center justify-center text-amber-500 text-xl font-bold flex-shrink-0">
                          🍱
                        </div>
                        <div className="min-w-0 flex-grow">
                          <p className="font-bold text-xs text-slate-850 dark:text-white truncate">{mess.title}</p>
                          <p className="text-[10px] text-slate-450">{mess.area} • {mess.distance} km • Daily menu preview</p>
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">₹{mess.monthlyPrice}/mo package</p>
                        </div>
                        <Link to="/messes" className="text-slate-400 hover:text-primary-500"><ArrowRight className="w-4 h-4" /></Link>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* AI Recommendation Matcher */}
              <div className="bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-950 rounded-[32px] p-6 text-white border border-indigo-900/50 shadow-xl space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400"><Sparkles className="w-5 h-5 animate-pulse" /></div>
                  <div>
                    <h3 className="font-outfit font-black text-base text-white">AI SafeMatch Recommendations</h3>
                    <p className="text-slate-400 text-[10px]">Describe your requirements for instant smart matches.</p>
                  </div>
                </div>

                <form onSubmit={handleAIQuery} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. recommend boys PG near COEP under 8000 with AC and washing machine..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex-shrink-0"
                  >
                    {aiLoading ? 'Analyzing...' : 'SafeMatch'}
                  </button>
                </form>

                {aiResponse && (
                  <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-4 animate-in fade-in duration-200">
                    <p className="text-slate-300 font-medium">{aiResponse.text}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {aiResponse.rooms.map(room => (
                        <div key={room.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2 relative">
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-outfit font-black text-[9px]">
                            {room.matchPct}% Match
                          </span>
                          <h4 className="font-bold text-white line-clamp-1">{room.title}</h4>
                          <p className="text-[10px] text-slate-400">{room.area} • Rent: ₹{room.rent}/mo</p>
                          <Link to={`/rooms/${room.id}`} className="text-[9px] font-bold text-indigo-400 hover:underline inline-flex items-center">
                            <span>Check Room details</span> <ArrowRight className="w-3 h-3 ml-0.5" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Budget Calculator & Expense Summary */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-[32px] p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-outfit font-black text-base text-slate-850 dark:text-white">Budget Planner & Expense Summary</h3>
                    <p className="text-slate-400 text-[10px] mt-0.5">Evaluate monthly rental targets against utilities and food expenses.</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 rounded-lg font-bold">
                    Total: ₹{totalExpense.toLocaleString('en-IN')}/mo
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Expense Sliders */}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Expected Rent</span>
                        <span className="text-slate-750 dark:text-slate-250">₹{rentExp}</span>
                      </div>
                      <input type="range" min="3000" max="15000" step="500" value={rentExp} onChange={(e) => setRentExp(parseInt(e.target.value))} className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Food / Mess Package</span>
                        <span className="text-slate-750 dark:text-slate-250">₹{foodExp}</span>
                      </div>
                      <input type="range" min="1500" max="6000" step="250" value={foodExp} onChange={(e) => setFoodExp(parseInt(e.target.value))} className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Electricity & Utilities</span>
                        <span className="text-slate-750 dark:text-slate-250">₹{utilitiesExp}</span>
                      </div>
                      <input type="range" min="500" max="3000" step="100" value={utilitiesExp} onChange={(e) => setUtilitiesExp(parseInt(e.target.value))} className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                        <span>Travel / Fuel</span>
                        <span className="text-slate-750 dark:text-slate-250">₹{travelExp}</span>
                      </div>
                      <input type="range" min="0" max="3000" step="100" value={travelExp} onChange={(e) => setTravelExp(parseInt(e.target.value))} className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500" />
                    </div>
                  </div>

                  {/* Dynamic Summary analysis */}
                  <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 border border-slate-100 dark:border-slate-850/60 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h4 className="font-outfit font-extrabold text-xs text-slate-850 dark:text-white uppercase tracking-wider pl-0.5">Budget Insights</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                        With a monthly allowance of ₹{user.budget ? (user.budget + 4000) : 12000}, your total projected expense of <span className="font-bold text-slate-800 dark:text-white">₹{totalExpense}</span> leaves you with a safety cushion of <span className={`font-bold ${((user.budget ? (user.budget + 4000) : 12000) - totalExpense) >= 1000 ? 'text-emerald-500' : 'text-rose-500'}`}>₹{(user.budget ? (user.budget + 4000) : 12000) - totalExpense}</span>.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex justify-between items-center text-[10px] font-bold text-slate-450 uppercase">
                      <span>Cushion Health:</span>
                      <span className={((user.budget ? (user.budget + 4000) : 12000) - totalExpense) >= 2000 ? 'text-emerald-500' : 'text-amber-500'}>
                        {((user.budget ? (user.budget + 4000) : 12000) - totalExpense) >= 2000 ? 'Healthy' : 'Tight Budget'}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* PANEL 2: WISHLIST VIEW */}
          {activePanel === 'wishlist' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">Saved Stays ({savedStays.length})</h2>
              {savedStays.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] p-16 text-center shadow-sm">
                  <p className="text-xs text-slate-400">Your wishlist is empty. Tap the heart icons on room details to save properties.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedStays.map(room => (
                    <RoomCard key={room.id} listing={room} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PANEL 3: BOOKINGS VIEW */}
          {activePanel === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">Visit Tour Bookings ({bookings.length})</h2>
              {bookings.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[32px] p-16 text-center shadow-sm">
                  <p className="text-xs text-slate-400">No scheduled visits. Book a tour from a room details page to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookings.map(book => (
                    <div key={book.id} className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            book.status === 'Confirmed' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                          }`}>{book.status}</span>
                          <span className="text-[10px] text-slate-400">ID: {book.id}</span>
                        </div>
                        <h3 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white line-clamp-1">{book.title}</h3>
                        <p className="text-[10px] text-slate-450"><span className="font-bold">Scheduled date:</span> {book.date} at {book.time}</p>
                        <p className="text-[10px] text-slate-450"><span className="font-bold">Owner Phone:</span> {book.ownerPhone}</p>
                      </div>
                      {book.status === 'Confirmed' && (
                        <button
                          onClick={() => cancelBooking(book.id)}
                          className="w-full mt-2 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-bold text-brand-rose-500 rounded-xl transition-colors"
                        >
                          Cancel Visit Tour
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PANEL 4: CHAT INBOX VIEW */}
          {activePanel === 'messages' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-sm flex h-[500px] animate-fade-in">
              {/* Chat list */}
              <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 flex flex-col">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800"><h3 className="font-outfit font-black text-xs text-slate-850 dark:text-white">Active Chats</h3></div>
                <div className="flex-grow overflow-y-auto">
                  <button 
                    onClick={() => setSelectedChat('c-1')}
                    className={`w-full p-4 text-left border-b border-slate-50 dark:border-slate-850 transition-colors flex items-center space-x-3 ${
                      selectedChat === 'c-1' ? 'bg-slate-50 dark:bg-slate-800/40' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">A</div>
                    <div className="min-w-0 flex-grow">
                      <p className="font-bold text-xs text-slate-800 dark:text-white truncate">Anil Deshmukh (PG Owner)</p>
                      <p className="text-[9px] text-slate-400 truncate">Hello Siddharth, the double sharing room...</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setSelectedChat('c-2')}
                    className={`w-full p-4 text-left border-b border-slate-50 dark:border-slate-850 transition-colors flex items-center space-x-3 ${
                      selectedChat === 'c-2' ? 'bg-slate-50 dark:bg-slate-800/40' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">S</div>
                    <div className="min-w-0 flex-grow">
                      <p className="font-bold text-xs text-slate-800 dark:text-white truncate">Savita Kadam (Mess Owner)</p>
                      <p className="text-[9px] text-slate-400 truncate">Hi, we have pure veg tiffin options...</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Chat conversation */}
              <div className="flex-grow flex flex-col h-full bg-slate-50/40 dark:bg-slate-950/20">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                  <span className="font-outfit font-black text-xs text-slate-850 dark:text-white">
                    {selectedChat === 'c-1' ? 'Anil Deshmukh (Stanza PG)' : 'Savita Kadam (Tiffin Mess)'}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold">Online</span>
                </div>

                <div className="flex-grow p-4 overflow-y-auto space-y-3.5 flex flex-col">
                  {chatMessages[selectedChat].map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`max-w-[70%] p-3 rounded-2xl text-xs ${
                        msg.sender === 'seeker' 
                          ? 'bg-primary-500 text-white rounded-br-none self-end' 
                          : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-850 rounded-bl-none self-start text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[8px] mt-1 block text-right ${msg.sender === 'seeker' ? 'text-primary-100' : 'text-slate-400'}`}>{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type message here..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary-500"
                  />
                  <button type="submit" className="p-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl shadow-sm"><Send className="w-4 h-4" /></button>
                </form>
              </div>

            </div>
          )}

          {/* PANEL 5: NOTIFICATIONS */}
          {activePanel === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">Active Notifications ({notifications.length})</h2>
              <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-5 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.map(n => (
                  <div key={n.id} className="py-4 first:pt-0 last:pb-0 flex items-start space-x-3.5">
                    <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-500 flex items-center justify-center flex-shrink-0 text-xs">🔔</div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-800 dark:text-slate-200">{n.text}</p>
                      <span className="text-[9px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PANEL 6: SETTINGS */}
          {activePanel === 'settings' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-sm max-w-2xl animate-fade-in">
              <h2 className="font-outfit font-black text-xl text-slate-850 dark:text-white mb-6">Modify Seeker Profile Details</h2>
              <form onSubmit={handleSaveSettings} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-250 outline-none focus:border-primary-500"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">College/Campus Institution</label>
                  <input
                    type="text"
                    value={editCollege}
                    onChange={(e) => setEditCollege(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-250 outline-none focus:border-primary-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Target Monthly Rent Budget (₹)</label>
                  <input
                    type="number"
                    value={editBudget}
                    onChange={(e) => setEditBudget(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-850 dark:text-slate-250 outline-none focus:border-primary-500"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Save Profile Settings
                </button>
              </form>
            </div>
          )}

        </main>

      </div>
    </div>
  );
}
