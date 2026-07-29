import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Plus, Edit, Trash2, Home, Calendar, Users, 
  TrendingUp, Check, X, ShieldAlert, CheckCircle, RefreshCw 
} from 'lucide-react';

export default function OwnerDashboard() {
  const { listings, addListing, updateListing, deleteListing, bookings } = useContext(AppContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form fields state
  const [title, setTitle] = useState('');
  const [type, setType] = useState('PG');
  const [city, setCity] = useState('Pune');
  const [area, setArea] = useState('Kothrud');
  const [college, setCollege] = useState('COEP College');
  const [rent, setRent] = useState(6000);
  const [deposit, setDeposit] = useState(10000);
  const [gender, setGender] = useState('Unisex');
  const [sharing, setSharing] = useState('Double');
  const [safetyScore, setSafetyScore] = useState(90);
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState(['WiFi', 'Parking']);
  const [availableDate, setAvailableDate] = useState('Immediate');

  const amenitiesOptions = ['WiFi', 'AC', 'Attached Bathroom', 'Parking', 'Food Included', 'Gym access', 'CCTV'];

  const handleAmenityToggle = (name) => {
    setAmenities(prev => 
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const resetForm = () => {
    setTitle('');
    setType('PG');
    setCity('Pune');
    setArea('Kothrud');
    setCollege('COEP College');
    setRent(6000);
    setDeposit(10000);
    setGender('Unisex');
    setSharing('Double');
    setSafetyScore(90);
    setDescription('');
    setAmenities(['WiFi', 'Parking']);
    setAvailableDate('Immediate');
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleFormSubmit = (e) => {
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
      distance: 1.0, // Mock distance
      safetyScore: parseInt(safetyScore),
      monthlyCostBreakdown: {
        rent: parseInt(rent),
        food: 3000,
        travel: 500
      },
      amenities,
      images: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
      ],
      owner: {
        name: "Anil Deshmukh",
        phone: "+91 98234 56789",
        email: "anil.d@staynest.com",
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
    } else {
      addListing(listingData);
    }

    resetForm();
  };

  const handleEdit = (room) => {
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
    setSafetyScore(room.safetyScore);
    setDescription(room.description);
    setAmenities(room.amenities);
    setAvailableDate(room.availableDate);
    setShowAddForm(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl text-slate-900 dark:text-white">
            Owner Listing Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage your accommodations, inspect tour bookings, and view performance metrics.
          </p>
        </div>
        
        <button
          onClick={() => {
            if (showAddForm) resetForm();
            else setShowAddForm(true);
          }}
          className="px-5 py-3 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md shadow-primary-500/10 transition-all flex items-center justify-center space-x-1.5 self-start sm:self-center"
        >
          {showAddForm ? <X className="w-4.5 h-4.5" /> : <Plus className="w-4.5 h-4.5" />}
          <span>{showAddForm ? 'Close Form' : 'Add Property'}</span>
        </button>
      </div>

      {/* Dashboard Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-500"><Home className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Total Properties</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">{listings.length} stays</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500"><Calendar className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Scheduled Visits</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">{bookings.length} tours</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active Queries</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">12 inquiries</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-brand-rose-50 dark:bg-brand-rose-950/40 text-brand-rose-500"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Estimated Monthly Revenue</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">
              ₹{(listings.reduce((sum, item) => sum + item.rent, 0)).toLocaleString('en-IN')}
            </h3>
          </div>
        </div>
      </div>

      {/* Add / Edit Listing Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-[28px] p-6 sm:p-8 shadow-md mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-outfit font-extrabold text-lg text-slate-850 dark:text-white mb-6">
            {editingId ? 'Edit Accommodation Details' : 'Register New Accommodation Stay'}
          </h3>
          
          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Title */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Property Title</label>
                <input
                  type="text"
                  placeholder="e.g. Modern Girls Hostels near COEP"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Stay Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="PG">PG</option>
                  <option value="Room">Single Room</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Flat">Flat</option>
                </select>
              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* City */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
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
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Area / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Kothrud"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>

              {/* College */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Nearby College / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. COEP Campus"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>

              {/* Available date */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Available From</label>
                <input
                  type="text"
                  placeholder="Immediate or specific date"
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
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Monthly Rent (₹)</label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Security Deposit (₹)</label>
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
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Gender Preference</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="Boys">Boys Only</option>
                  <option value="Girls">Girls Only</option>
                  <option value="Unisex">Unisex / Any</option>
                </select>
              </div>

              {/* Sharing */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Occupancy sharing</label>
                <select
                  value={sharing}
                  onChange={(e) => setSharing(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 text-xs font-semibold outline-none cursor-pointer"
                >
                  <option value="Single">Single Occupancy</option>
                  <option value="Double">Double Occupancy</option>
                  <option value="Triple">Triple Occupancy</option>
                  <option value="1BHK">Full 1BHK Studio</option>
                </select>
              </div>

            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Description Description</label>
              <textarea
                placeholder="Give details about cleaning schedules, gate locks, house rules..."
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                required
              />
            </div>

            {/* Amenities checkbox group */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase block pl-1">Amenities Included</label>
              <div className="flex flex-wrap gap-4 px-1 py-1">
                {amenitiesOptions.map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 text-xs text-slate-650 dark:text-slate-350 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={amenities.includes(opt)}
                      onChange={() => handleAmenityToggle(opt)}
                      className="rounded border-slate-300 dark:border-slate-850 text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex space-x-2 pt-4 border-t border-slate-100 dark:border-slate-850">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors flex items-center space-x-1"
              >
                <Check className="w-4 h-4" />
                <span>{editingId ? 'Save Changes' : 'List Property'}</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-505 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold"
              >
                Cancel
              </button>
            </div>

          </form>

        </div>
      )}

      {/* Live listings listings list */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="font-outfit font-extrabold text-sm text-slate-900 dark:text-white">Active Accommodation Stays</h3>
          <span className="text-[10px] text-slate-400 font-bold">Managing {listings.length} items</span>
        </div>

        {listings.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-400">No properties listed. Click "Add Property" to begin.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold bg-slate-50/20 dark:bg-slate-950/20">
                  <th className="p-4">Property Info</th>
                  <th className="p-4">Rent / Deposit</th>
                  <th className="p-4">Tenant Preference</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-350">
                {listings.map((room) => (
                  <tr key={room.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img src={room.images[0]} alt="" className="w-12 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-850 dark:text-white line-clamp-1">{room.title}</p>
                          <p className="text-[10px] text-slate-400 font-semibold">{room.area}, {room.city} • {room.sharing} occupancy</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-850 dark:text-white">₹{room.rent}/mo</p>
                      <p className="text-[10px] text-slate-400">Deposit: ₹{room.deposit}</p>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        room.gender === 'Girls' ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/25' : room.gender === 'Boys' ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/25' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/25'
                      }`}>
                        {room.gender}
                      </span>
                    </td>
                    <td className="p-4 text-xs font-semibold">
                      <span className="flex items-center text-emerald-500">
                        <CheckCircle className="w-4 h-4 mr-1.5 fill-current text-emerald-500/10" />
                        Active
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(room)}
                          className="p-2 rounded-lg bg-slate-50 hover:bg-primary-50 hover:text-primary-500 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors"
                          title="Edit Stay"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteListing(room.id)}
                          className="p-2 rounded-lg bg-slate-50 hover:bg-brand-rose-50 hover:text-brand-rose-500 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors"
                          title="Delete Stay"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
