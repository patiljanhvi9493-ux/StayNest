import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Home, Calendar, Users, TrendingUp, Plus, Edit, Trash2, CheckCircle, XCircle, 
  Settings, LogOut, FileText, ChevronRight, BarChart2, DollarSign, MessageSquare, 
  Star, ChevronDown, Check, X, ShieldAlert, Image, Video, Utensils, Award, BookOpen, Clock, Activity
} from 'lucide-react';

export default function ProviderDashboard() {
  const { 
    user, logout, listings, addListing, updateListing, deleteListing, 
    messes, updateMess, bookings, addNotification 
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [activePanel, setActivePanel] = useState('dashboard'); // dashboard, listings, add-property, mess-management, bookings, messages, analytics, payments

  // Form fields state for Add Property
  const [title, setTitle] = useState('');
  const [type, setType] = useState('PG');
  const [city, setCity] = useState('Pune');
  const [area, setArea] = useState('Kothrud');
  const [college, setCollege] = useState('COEP College');
  const [rent, setRent] = useState(6500);
  const [deposit, setDeposit] = useState(12000);
  const [gender, setGender] = useState('Unisex');
  const [sharing, setSharing] = useState('Double');
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState(['WiFi', 'Parking']);
  const [availableDate, setAvailableDate] = useState('Immediate');
  const [editingId, setEditingId] = useState(null);

  // Mess Management fields
  const [activeMess, setActiveMess] = useState(null);
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(3200);
  const [dailyPrice, setDailyPrice] = useState(130);
  const [delivery, setDelivery] = useState(true);

  // Booking management status modifications
  const [localBookings, setLocalBookings] = useState([]);

  // Inbox Quick reply state
  const [activeChat, setActiveChat] = useState('c-1');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState({
    'c-1': [
      { sender: 'student', text: "Hello! Is the double occupancy room still available near COEP? Can I visit this Sunday?", time: "10:15 AM" }
    ],
    'c-2': [
      { sender: 'student', text: "Hi, I would like to subscribe to the daily tiffin plan. Do you deliver to Karve Nagar?", time: "Yesterday" }
    ]
  });

  const amenitiesOptions = ['WiFi', 'AC', 'Attached Bathroom', 'Parking', 'Food Included', 'Gym access', 'CCTV', 'Balcony', 'Kitchen', 'Laundry'];

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    if (messes && messes.length > 0) {
      const defaultMess = messes[0];
      setActiveMess(defaultMess);
      setBreakfast(defaultMess.todayMenu?.breakfast || 'Poha / Tea');
      setLunch(defaultMess.todayMenu?.lunch || 'Chapati, 2 Sabji, Rice, Dal, Pickle');
      setDinner(defaultMess.todayMenu?.dinner || 'Chapati, Veg Kurma, Rice, Dal');
      setMonthlyPrice(defaultMess.monthlyPrice || 3000);
      setDailyPrice(defaultMess.dailyPrice || 120);
      setDelivery(defaultMess.deliveryAvailable);
    }
  }, [messes]);

  if (!user) return null;

  // Toggle amenity list
  const handleAmenityToggle = (name) => {
    setSelectedAmenities(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  // Clean form
  const resetForm = () => {
    setTitle('');
    setType('PG');
    setCity('Pune');
    setArea('Kothrud');
    setCollege('COEP College');
    setRent(6500);
    setDeposit(12000);
    setGender('Unisex');
    setSharing('Double');
    setDescription('');
    setSelectedAmenities(['WiFi', 'Parking']);
    setAvailableDate('Immediate');
    setEditingId(null);
  };

  // Submit property listing
  const handlePropertySubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const listingData = {
      id: editingId || `room-${Date.now()}`,
      title,
      type,
      city,
      area,
      college,
      rent: parseInt(rent),
      deposit: parseInt(deposit),
      gender,
      sharing,
      rating: editingId ? (listings.find(item => item.id === editingId)?.rating || 4.5) : 4.5,
      distance: 1.0,
      safetyScore: editingId ? (listings.find(item => item.id === editingId)?.safetyScore || 92) : 92,
      amenities: selectedAmenities,
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
      ],
      owner: {
        name: user.name,
        phone: "+91 98234 56789",
        email: user.email,
        verified: true
      },
      availableDate,
      description,
      reviews: editingId ? (listings.find(item => item.id === editingId)?.reviews || []) : [],
      nearbyPlaces: [
        { name: `${college} Campus`, type: "College", distance: "1.0 km" }
      ]
    };

    if (editingId) {
      updateListing(listingData);
      addNotification(`Stay updated successfully: ${title}`);
    } else {
      addListing(listingData);
      addNotification(`New property listed: ${title}`);
    }

    resetForm();
    setActivePanel('listings');
  };

  // Edit stay
  const handleEditStay = (room) => {
    setEditingId(room.id);
    setTitle(room.title);
    setType(room.type);
    setCity(room.city);
    setArea(room.area);
    setCollege(room.college);
    setRent(room.rent);
    setDeposit(room.deposit);
    setGender(room.gender);
    setSharing(room.sharing);
    setDescription(room.description);
    setSelectedAmenities(room.amenities);
    setAvailableDate(room.availableDate);
    setActivePanel('add-property');
  };

  // Submit mess modifications
  const handleSaveMessMenu = (e) => {
    e.preventDefault();
    if (!activeMess) return;

    const updated = {
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

    updateMess(updated);
    addNotification("Mess menu and subscription details updated!");
  };

  // Manage visits
  const handleBookingAction = (id, newStatus) => {
    setLocalBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    addNotification(`Booking visit ${newStatus.toLowerCase()} successfully.`);
  };

  // Send message
  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [
        ...prev[activeChat],
        { sender: 'provider', text: chatInput, time: "Just now" }
      ]
    }));
    setChatInput('');
    addNotification("Reply sent to student.");
  };

  const handleQuickReply = (text) => {
    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [
        ...prev[activeChat],
        { sender: 'provider', text: text, time: "Just now" }
      ]
    }));
    addNotification("Quick reply sent.");
  };

  // Calculated Stats
  const activeBookingsCount = localBookings.filter(b => b.status === 'Confirmed').length;
  const pendingRequestsCount = localBookings.filter(b => b.status === 'Pending' || !b.status).length;
  const totalViews = listings.reduce((sum, item) => sum + (item.safetyScore * 2 + 120), 0) + (activeMess ? 1420 : 0);
  const totalRevenue = (listings.reduce((sum, item) => sum + item.rent, 0)) + (activeMess ? 142 * activeMess.monthlyPrice : 0);

  const sidebarLinks = [
    { id: 'dashboard', name: 'Dashboard Summary', icon: <Home className="w-4 h-4" /> },
    { id: 'listings', name: 'Manage Listings', icon: <FileText className="w-4 h-4" />, count: listings.length },
    { id: 'add-property', name: 'Add Property Stay', icon: <Plus className="w-4 h-4" /> },
    { id: 'mess-management', name: 'Mess & Dining Plan', icon: <Utensils className="w-4 h-4" /> },
    { id: 'bookings', name: 'Booking visits', icon: <Calendar className="w-4 h-4" />, count: localBookings.length },
    { id: 'messages', name: 'Student Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'analytics', name: 'Analytics Board', icon: <BarChart2 className="w-4 h-4 text-emerald-500" /> },
    { id: 'payments', name: 'Premium Payments', icon: <DollarSign className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-6">
            
            <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <img src={user.avatar} className="w-11 h-11 rounded-2xl object-cover ring-2 ring-primary-500/25" alt="" />
              <div className="min-w-0">
                <p className="font-outfit font-black text-xs text-slate-850 dark:text-white truncate">{user.name}</p>
                <p className="text-[9px] text-primary-500 font-bold uppercase tracking-wider">{user.role} workspace</p>
              </div>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => setActivePanel(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-outfit text-xs font-semibold transition-colors ${
                    activePanel === link.id
                      ? 'bg-slate-950 dark:bg-primary-600 text-white shadow-sm'
                      : 'text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {link.icon}
                    <span>{link.name}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      activePanel === link.id ? 'bg-white text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {link.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            <button
              onClick={() => { logout(); navigate('/'); }}
              className="w-full py-2.5 rounded-xl border border-brand-rose-500/20 bg-brand-rose-50/15 hover:bg-brand-rose-50 text-brand-rose-600 text-[10px] font-black tracking-wider uppercase transition-colors"
            >
              Sign Out
            </button>

          </div>
        </aside>

        {/* Content Panels */}
        <main className="flex-grow min-w-0">
          
          {/* PANEL 1: DASHBOARD HUB */}
          {activePanel === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-[32px] p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl" />
                <h2 className="font-outfit font-black text-2xl text-white">Provider Console Summary</h2>
                <p className="text-slate-400 text-xs mt-1.5 max-w-lg leading-relaxed">
                  Manage your stays, PG accommodations, tiffin boxes, and coordinate physical check-in visit requests scheduled by students.
                </p>
                <div className="flex flex-wrap gap-2 pt-4 text-[10px] font-bold">
                  <span className="bg-white/10 px-2.5 py-1 rounded-lg">Verification Badge: Active</span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg">Zero Listing Commission</span>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Listings', value: `${listings.length + (activeMess ? 1 : 0)}`, icon: <Home className="w-5 h-5" />, color: 'bg-primary-50 dark:bg-primary-950/40 text-primary-500' },
                  { label: 'Total Views', value: totalViews.toLocaleString(), icon: <Activity className="w-5 h-5" />, color: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500' },
                  { label: 'Active / Pending Visits', value: `${activeBookingsCount} / ${pendingRequestsCount}`, icon: <Calendar className="w-5 h-5" />, color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-500' },
                  { label: 'Est. Monthly Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 border border-slate-150/45 dark:border-slate-800 rounded-2xl p-4.5 shadow-sm flex items-center space-x-3.5">
                    <div className={`p-2.5 rounded-xl ${stat.color} flex-shrink-0`}>{stat.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
                      <h4 className="font-outfit font-black text-sm text-slate-850 dark:text-white mt-0.5">{stat.value}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* performance chart & reviews side by side */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* SVG Performance Graph */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-150/45 dark:border-slate-800 rounded-[32px] p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center pb-2">
                    <div>
                      <h3 className="font-outfit font-black text-xs uppercase tracking-wider text-slate-450 dark:text-slate-500">Monthly Click-Through & Growth</h3>
                      <p className="text-slate-850 dark:text-white text-base font-bold font-outfit mt-0.5">Performance Analytics</p>
                    </div>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-lg">+14.2% Growth</span>
                  </div>

                  {/* SVG Chart Layout */}
                  <div className="h-44 w-full flex items-end justify-between pt-4 relative px-2">
                    {/* Grid Lines */}
                    <div className="absolute inset-x-0 bottom-4 border-b border-dashed border-slate-100 dark:border-slate-800" />
                    <div className="absolute inset-x-0 bottom-16 border-b border-dashed border-slate-100 dark:border-slate-800" />
                    <div className="absolute inset-x-0 bottom-28 border-b border-dashed border-slate-100 dark:border-slate-800" />

                    {[
                      { m: 'Mar', val: 32 }, { m: 'Apr', val: 45 }, { m: 'May', val: 38 },
                      { m: 'Jun', val: 65 }, { m: 'Jul', val: 78 }, { m: 'Aug', val: 94 }
                    ].map((data, idx) => (
                      <div key={idx} className="flex flex-col items-center space-y-2 z-10 w-1/6">
                        <div className="w-full flex justify-center">
                          <div 
                            className="w-4 sm:w-6 bg-gradient-to-t from-primary-600 to-indigo-500 rounded-t-lg transition-all duration-1000 shadow-sm relative group"
                            style={{ height: `${data.val * 1.2}px` }}
                          >
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[8px] font-bold py-0.5 px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              {data.val}%
                            </span>
                          </div>
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase">{data.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Reviews list */}
                <div className="bg-white dark:bg-slate-900 border border-slate-150/45 dark:border-slate-800 rounded-[32px] p-6 shadow-sm space-y-4">
                  <h3 className="font-outfit font-black text-xs uppercase tracking-wider text-slate-450 dark:text-slate-500">Student Reviews</h3>
                  <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                    {listings.slice(0, 2).map((item) => (
                      item.reviews.slice(0, 1).map((rev, key) => (
                        <div key={key} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850/60 rounded-xl text-[10px]">
                          <div className="flex justify-between items-center mb-1 font-bold">
                            <span className="text-slate-800 dark:text-white">{rev.studentName}</span>
                            <span className="text-amber-500">★ {rev.rating}</span>
                          </div>
                          <p className="text-slate-450 italic line-clamp-2">"{rev.comment}"</p>
                        </div>
                      ))
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* PANEL 2: MANAGE LISTINGS TABLE */}
          {activePanel === 'listings' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">Active Accommodation Stays</h2>
                <button
                  onClick={() => { resetForm(); setActivePanel('add-property'); }}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" /> <span>Add Property</span>
                </button>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 font-bold bg-slate-50/20 dark:bg-slate-950/20 text-slate-400">
                        <th className="p-4">Property info</th>
                        <th className="p-4">Rent / Deposit</th>
                        <th className="p-4">Tenant Pref</th>
                        <th className="p-4">Availability</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {listings.map(room => (
                        <tr key={room.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <img src={room.images[0]} className="w-12 h-10 rounded-lg object-cover" alt="" />
                              <div>
                                <p className="font-bold text-slate-850 dark:text-white line-clamp-1">{room.title}</p>
                                <p className="text-[10px] text-slate-400">{room.area}, {room.city} • {room.sharing} share</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-bold text-slate-850 dark:text-white">₹{room.rent}/mo</p>
                            <p className="text-[10px] text-slate-400">Deposit: ₹{room.deposit}</p>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/45 text-indigo-600 dark:text-indigo-400 font-bold text-[9px]">{room.gender}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-emerald-500 font-semibold flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1 stroke-[2]" /> Live / Available
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              <button onClick={() => handleEditStay(room)} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-primary-50 hover:text-primary-500 transition-colors" title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                              <button onClick={() => { deleteListing(room.id); addNotification("Listing deleted."); }} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 hover:bg-brand-rose-50 hover:text-brand-rose-500 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PANEL 3: ADD PROPERTY MULTIPART FORM */}
          {activePanel === 'add-property' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-sm animate-fade-in">
              <h2 className="font-outfit font-black text-xl text-slate-850 dark:text-white mb-6">
                {editingId ? 'Edit Property Details' : 'Register New Accommodation Stay'}
              </h2>
              
              <form onSubmit={handlePropertySubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Title */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Property Listing Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Modern Girls PG near Symbiosis College"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Type */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Property type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
                    >
                      <option value="PG">PG / Hostel</option>
                      <option value="Room">Single Room</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Flat">Flat Studio</option>
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
                    >
                      <option value="Pune">Pune</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Kolhapur">Kolhapur</option>
                      <option value="Sangli">Sangli</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </div>

                  {/* Area */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Locality Area</label>
                    <input
                      type="text"
                      placeholder="e.g. Viman Nagar"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Near College */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Near College / Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Symbiosis Campus"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Available Date */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Availability date</label>
                    <input
                      type="text"
                      placeholder="e.g. Immediate or date"
                      value={availableDate}
                      onChange={(e) => setAvailableDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {/* Rent */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Rent Cost (₹ / month)</label>
                    <input
                      type="number"
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Deposit */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Security Deposit (₹)</label>
                    <input
                      type="number"
                      value={deposit}
                      onChange={(e) => setDeposit(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Gender preference</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
                    >
                      <option value="Boys">Boys only</option>
                      <option value="Girls">Girls only</option>
                      <option value="Unisex">Unisex / Any</option>
                    </select>
                  </div>

                  {/* Sharing */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Occupancy sharing</label>
                    <select
                      value={sharing}
                      onChange={(e) => setSharing(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
                    >
                      <option value="Single">Single Room</option>
                      <option value="Double">Double Share</option>
                      <option value="Triple">Triple Share</option>
                      <option value="1BHK">Full flat studio</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Description</label>
                  <textarea
                    placeholder="Provide rules, cleaning times, gates schedules..."
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                    required
                  />
                </div>

                {/* Amenities checklist */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Amenities Included</label>
                  <div className="flex flex-wrap gap-4 px-1 py-1">
                    {amenitiesOptions.map((opt) => (
                      <label key={opt} className="flex items-center space-x-2 text-xs text-slate-655 dark:text-slate-350 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(opt)}
                          onChange={() => handleAmenityToggle(opt)}
                          className="rounded border-slate-300 dark:border-slate-800 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mock image & video uploaders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-105 dark:border-slate-850">
                  <div className="border border-dashed border-slate-250 dark:border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <Image className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-405">Upload Property Images</span>
                    <span className="text-[8px] text-slate-400 mt-0.5">Supports PNG, JPG (Max 5 images)</span>
                  </div>

                  <div className="border border-dashed border-slate-250 dark:border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                    <Video className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-405">Upload Video Tour</span>
                    <span className="text-[8px] text-slate-400 mt-0.5">Supports MP4 format (Max 15MB)</span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4 border-t border-slate-100 dark:border-slate-850">
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md">
                    {editingId ? 'Save Changes' : 'Publish Property Listing'}
                  </button>
                  <button type="button" onClick={() => { resetForm(); setActivePanel('listings'); }} className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* PANEL 4: MESS MANAGEMENT */}
          {activePanel === 'mess-management' && activeMess && (
            <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-sm animate-fade-in">
              <h2 className="font-outfit font-black text-xl text-slate-850 dark:text-white mb-1">Mess & Dining Management</h2>
              <p className="text-slate-400 text-xs mb-6">Managing menu card and price plans for: <span className="font-bold text-primary-500">{activeMess.title}</span></p>
              
              <form onSubmit={handleSaveMessMenu} className="space-y-6">
                
                {/* Daily Meals Menu */}
                <div className="space-y-4">
                  <h3 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white">Daily Menu Details</h3>
                  <div className="space-y-4">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Breakfast (Served 8 AM - 10 AM)</label>
                      <input
                        type="text"
                        value={breakfast}
                        onChange={(e) => setBreakfast(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Lunch (Served 12 PM - 3 PM)</label>
                      <textarea
                        rows="2"
                        value={lunch}
                        onChange={(e) => setLunch(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary-500"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Dinner (Served 7 PM - 10 PM)</label>
                      <textarea
                        rows="2"
                        value={dinner}
                        onChange={(e) => setDinner(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary-500"
                        required
                      />
                    </div>

                  </div>
                </div>

                {/* Subscriptions */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                  <h3 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white">Subscription Packages</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Monthly package price (₹)</label>
                      <input
                        type="number"
                        value={monthlyPrice}
                        onChange={(e) => setMonthlyPrice(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pl-1">Daily plate cost (₹)</label>
                      <input
                        type="number"
                        value={dailyPrice}
                        onChange={(e) => setDailyPrice(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="pt-2">
                  <label className="flex items-center space-x-2 text-xs text-slate-655 dark:text-slate-350 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={delivery}
                      onChange={(e) => setDelivery(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-800 text-primary-600 focus:ring-primary-500 w-4 h-4"
                    />
                    <span>Home/Tiffin box delivery service enabled near campus (Free delivery under 1km)</span>
                  </label>
                </div>

                <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md">
                  Update Mess details
                </button>

              </form>
            </div>
          )}

          {/* PANEL 5: BOOKINGS MANAGEMENT */}
          {activePanel === 'bookings' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="font-outfit font-black text-2xl text-slate-900 dark:text-white">Coordinate Visit Tours</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {localBookings.map(book => (
                  <div key={book.id} className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold ${
                          book.status === 'Confirmed' 
                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' 
                            : book.status === 'Cancelled' 
                            ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                            : 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                        }`}>{book.status || 'Pending Request'}</span>
                        <span className="text-[10px] text-slate-400">ID: {book.id}</span>
                      </div>
                      
                      <h3 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white line-clamp-1">{book.title}</h3>
                      <p className="text-[10px] text-slate-450"><span className="font-bold">Scheduled visit:</span> {book.date} at {book.time}</p>
                      <p className="text-[10px] text-slate-450"><span className="font-bold">Student Email:</span> siddharth.s@staynest.com</p>
                    </div>

                    {(book.status === 'Pending' || !book.status || book.status === 'Confirmed') && (
                      <div className="flex space-x-2 pt-2">
                        {book.status !== 'Confirmed' && (
                          <button
                            onClick={() => handleBookingAction(book.id, 'Confirmed')}
                            className="flex-grow py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-1"
                          >
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Approve Visit</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleBookingAction(book.id, 'Cancelled')}
                          className="flex-grow py-2 border border-slate-250 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-bold text-brand-rose-500 rounded-xl transition-colors flex items-center justify-center space-x-1"
                        >
                          <X className="w-3 h-3 stroke-[3]" />
                          <span>Reject / Cancel</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PANEL 6: INBOX MESSAGES */}
          {activePanel === 'messages' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-sm flex h-[500px] animate-fade-in">
              {/* Chat list */}
              <div className="w-1/3 border-r border-slate-100 dark:border-slate-800 flex flex-col">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800"><h3 className="font-outfit font-black text-xs text-slate-850 dark:text-white">Student inquiries</h3></div>
                <div className="flex-grow overflow-y-auto">
                  <button 
                    onClick={() => setActiveChat('c-1')}
                    className={`w-full p-4 text-left border-b border-slate-50 dark:border-slate-855 transition-colors flex items-center space-x-3 ${
                      activeChat === 'c-1' ? 'bg-slate-50 dark:bg-slate-800/40' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-650 flex items-center justify-center font-bold text-sm">S</div>
                    <div className="min-w-0 flex-grow">
                      <p className="font-bold text-xs text-slate-800 dark:text-white truncate">Siddharth Shinde (Student)</p>
                      <p className="text-[9px] text-slate-400 truncate">Hello! Is the double occupancy room still available...</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveChat('c-2')}
                    className={`w-full p-4 text-left border-b border-slate-50 dark:border-slate-855 transition-colors flex items-center space-x-3 ${
                      activeChat === 'c-2' ? 'bg-slate-50 dark:bg-slate-800/40' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-650 flex items-center justify-center font-bold text-sm">R</div>
                    <div className="min-w-0 flex-grow">
                      <p className="font-bold text-xs text-slate-800 dark:text-white truncate">Rohan Patil (Student)</p>
                      <p className="text-[9px] text-slate-400 truncate">Hi, I would like to subscribe to the daily...</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Chat screen */}
              <div className="flex-grow flex flex-col h-full bg-slate-50/40 dark:bg-slate-950/20">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                  <span className="font-outfit font-black text-xs text-slate-850 dark:text-white">
                    {activeChat === 'c-1' ? 'Siddharth Shinde' : 'Rohan Patil'}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold">Online</span>
                </div>

                {/* Quick replies */}
                <div className="p-2 border-b border-slate-50 dark:border-slate-850/60 bg-white dark:bg-slate-900 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[8px] font-bold text-slate-400 uppercase pl-1 block">Quick Replies:</span>
                  {[
                    "Yes, it is available! When would you like to visit?",
                    "Sorry, that room is currently occupied.",
                    "Sure, tiffin box delivery is available at your locality."
                  ].map((rep, k) => (
                    <button
                      key={k}
                      onClick={() => handleQuickReply(rep)}
                      className="text-[9px] px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-950 border border-slate-150/40 dark:border-slate-800 hover:border-primary-500 text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors"
                    >
                      {rep}
                    </button>
                  ))}
                </div>

                <div className="flex-grow p-4 overflow-y-auto space-y-3.5 flex flex-col">
                  {chatMessages[activeChat].map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`max-w-[70%] p-3 rounded-2xl text-xs ${
                        msg.sender === 'provider' 
                          ? 'bg-slate-950 dark:bg-primary-600 text-white rounded-br-none self-end' 
                          : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-850 rounded-bl-none self-start text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-[8px] mt-1 block text-right ${msg.sender === 'provider' ? 'text-slate-350' : 'text-slate-400'}`}>{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendChat} className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type reply..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-primary-500"
                  />
                  <button type="submit" className="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl text-xs font-bold">Send</button>
                </form>
              </div>
            </div>
          )}

          {/* PANEL 7: ANALYTICS */}
          {activePanel === 'analytics' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-150/45 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-sm space-y-8 animate-fade-in">
              <div>
                <h2 className="font-outfit font-black text-xl text-slate-850 dark:text-white">Provider Performance Analytics</h2>
                <p className="text-slate-400 text-xs mt-0.5">Click tracking, subscription ratios, and monthly progress evaluations.</p>
              </div>

              {/* Progress rings mockups */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: 'Room Inquiry Conversion', rate: 74, color: 'text-primary-500 border-primary-500' },
                  { title: 'Mess Subscription Renewal', rate: 88, color: 'text-emerald-500 border-emerald-500' },
                  { title: 'Ad Click-Through Rate', rate: 12, color: 'text-amber-500 border-amber-500' }
                ].map((ring, idx) => (
                  <div key={idx} className="p-5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl text-center space-y-4">
                    <h4 className="font-bold text-xs text-slate-600 dark:text-slate-405 leading-snug">{ring.title}</h4>
                    <div className="w-20 h-20 rounded-full border-4 border-slate-205 dark:border-slate-800 flex items-center justify-center mx-auto text-sm font-black relative">
                      <span className="text-slate-850 dark:text-white">{ring.rate}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail list table */}
              <div className="pt-4 space-y-3">
                <h3 className="font-outfit font-black text-xs uppercase tracking-wider text-slate-450 dark:text-slate-500">Monthly Traffic Growth Summary</h3>
                <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden text-xs font-semibold">
                  <div className="grid grid-cols-4 p-3 bg-slate-50 dark:bg-slate-950 text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                    <div>Month</div>
                    <div>Listing Impressions</div>
                    <div>Tours Scheduled</div>
                    <div>Est. Revenue</div>
                  </div>
                  {[
                    { m: 'August 2026', imp: '12,420 views', tours: '24 visits', rev: '₹95,200' },
                    { m: 'July 2026', imp: '10,900 views', tours: '18 visits', rev: '₹84,000' },
                    { m: 'June 2026', imp: '8,400 views', tours: '11 visits', rev: '₹55,000' }
                  ].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 p-3 border-b border-slate-50 dark:border-slate-850 last:border-b-0 text-slate-655 dark:text-slate-350">
                      <div className="font-bold text-slate-850 dark:text-white">{row.m}</div>
                      <div>{row.imp}</div>
                      <div>{row.tours}</div>
                      <div className="text-emerald-500 font-bold">{row.rev}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PANEL 8: PREMIUM PAYMENTS */}
          {activePanel === 'payments' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Promotion Header */}
              <div className="bg-white dark:bg-slate-900 border border-slate-150/45 dark:border-slate-850 rounded-[32px] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-md">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center"><Award className="w-4 h-4 mr-1 animate-pulse" /> Boost Your Listings</span>
                  <h3 className="font-outfit font-black text-xl text-slate-850 dark:text-white">Featured Stay & Tiffin Advertisements</h3>
                  <p className="text-slate-450 dark:text-slate-400 text-xs leading-relaxed">
                    Get 5x more clicks and instant seeker connection inquiries by featuring your rooms or food messes at the top of search result suggestions.
                  </p>
                </div>
                <button onClick={() => addNotification("Simulation: Payment gateway setup initiated.")} className="px-6 py-3 bg-gradient-to-r from-amber-500 to-brand-rose-500 hover:from-amber-400 hover:to-brand-rose-400 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex-shrink-0">
                  Buy Ad Package
                </button>
              </div>

              {/* Plans Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Plan 1 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="px-2.5 py-0.5 rounded-lg text-[9px] bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Stay Package</span>
                    <h4 className="font-outfit font-black text-base text-slate-850 dark:text-white">Premium Listing Tier</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Features up to 2 active stay listings at the top of search results. Comes with safety badge acceleration checks.
                    </p>
                    <div className="font-outfit font-black text-2xl text-slate-855 dark:text-white">
                      ₹499 <span className="text-xs text-slate-400 font-semibold font-sans">/ month</span>
                    </div>
                  </div>
                  <button onClick={() => addNotification("Stay Premium Tier subscription simulation.")} className="w-full py-2.5 rounded-xl bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-sm transition-colors">
                    Activate Plan
                  </button>
                </div>

                {/* Plan 2 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="px-2.5 py-0.5 rounded-lg text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold uppercase tracking-wider">Mess Special</span>
                    <h4 className="font-outfit font-black text-base text-slate-855 dark:text-white">Featured Mess Tier</h4>
                    <p className="text-slate-405 text-xs leading-relaxed">
                      Features your tiffin dining cards inside local food feeds. Delivers dynamic today menu previews inside Seeker dashboards.
                    </p>
                    <div className="font-outfit font-black text-2xl text-slate-855 dark:text-white">
                      ₹299 <span className="text-xs text-slate-405 font-semibold font-sans">/ month</span>
                    </div>
                  </div>
                  <button onClick={() => addNotification("Featured Mess Tier subscription simulation.")} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-450 text-white font-bold text-xs shadow-sm transition-colors">
                    Activate Plan
                  </button>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
