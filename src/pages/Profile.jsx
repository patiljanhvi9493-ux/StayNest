import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import { 
  User, Mail, GraduationCap, Calendar, Heart, 
  Settings, LogOut, CheckCircle, ShieldAlert, XCircle, Trash2 
} from 'lucide-react';

export default function Profile() {
  const { 
    user, logout, bookings, cancelBooking, wishlist, listings, addNotification, login
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('bookings');
  
  // Settings Form State
  const [editName, setEditName] = useState(user ? user.name : '');
  const [editCollege, setEditCollege] = useState(user ? user.college : '');
  const [editBudget, setEditBudget] = useState(user ? user.budget || 6000 : 6000);

  if (!user) {
    return (
      <div className="py-20 text-center text-slate-400 min-h-screen flex flex-col justify-center items-center">
        <p className="text-sm font-semibold">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleSaveSettings = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: editName,
      college: editCollege,
      budget: editBudget
    };
    login(updatedUser); // Save back to context
    addNotification("Account settings updated successfully!");
  };

  // Get Wishlist items
  const savedRooms = listings.filter(item => wishlist.includes(item.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Profile Overview Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[32px] p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
        <img 
          src={user.avatar} 
          alt={user.name} 
          className="w-24 h-24 rounded-3xl object-cover ring-4 ring-primary-500/10 flex-shrink-0"
        />
        <div className="text-center sm:text-left space-y-2 flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="font-outfit font-extrabold text-2xl text-slate-900 dark:text-white">{user.name}</h1>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 self-center">
              Student Account
            </span>
          </div>
          <div className="space-y-1 text-xs text-slate-505 dark:text-slate-400">
            <p className="flex items-center justify-center sm:justify-start"><Mail className="w-3.5 h-3.5 mr-1.5" /> {user.email}</p>
            <p className="flex items-center justify-center sm:justify-start"><GraduationCap className="w-4 h-4 mr-1.5" /> {user.college || 'Unspecified college'}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl border border-brand-rose-500/20 bg-brand-rose-50/20 hover:bg-brand-rose-50 text-brand-rose-600 text-xs font-bold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 space-x-6 text-sm">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 font-outfit font-bold relative transition-colors ${
            activeTab === 'bookings' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-slate-400 hover:text-slate-650 dark:hover:text-white'
          }`}
        >
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-1.5" /> Visit Bookings ({bookings.length})</span>
          {activeTab === 'bookings' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 font-outfit font-bold relative transition-colors ${
            activeTab === 'saved' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-slate-400 hover:text-slate-650 dark:hover:text-white'
          }`}
        >
          <span className="flex items-center"><Heart className="w-4 h-4 mr-1.5" /> Saved Stays ({savedRooms.length})</span>
          {activeTab === 'saved' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 font-outfit font-bold relative transition-colors ${
            activeTab === 'settings' 
              ? 'text-primary-600 dark:text-primary-400' 
              : 'text-slate-400 hover:text-slate-650 dark:hover:text-white'
          }`}
        >
          <span className="flex items-center"><Settings className="w-4 h-4 mr-1.5" /> Account Settings</span>
          {activeTab === 'settings' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />}
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[28px] py-16 text-center shadow-sm">
                <p className="text-xs text-slate-450">No accommodation visits scheduled. Explore rooms to book a tour!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((book) => (
                  <div 
                    key={book.id}
                    className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${
                          book.status === 'Confirmed' 
                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' 
                            : 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-450'
                        }`}>
                          {book.status}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">Booking ID: {book.id}</span>
                      </div>
                      
                      <h3 className="font-outfit font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">{book.title}</h3>
                      <p className="text-[10px] text-slate-455 dark:text-slate-400">
                        <span className="font-bold">Scheduled visit: </span> {book.date} at {book.time}
                      </p>
                      <p className="text-[10px] text-slate-455 dark:text-slate-400">
                        <span className="font-bold">Owner Contact: </span> {book.ownerPhone}
                      </p>
                    </div>

                    {book.status === 'Confirmed' && (
                      <button
                        onClick={() => cancelBooking(book.id)}
                        className="w-full mt-3 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl text-[10px] font-bold text-brand-rose-500 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel Visit Tour</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Stays Tab */}
        {activeTab === 'saved' && (
          <div>
            {savedRooms.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[28px] py-16 text-center shadow-sm">
                <p className="text-xs text-slate-450">No saved accommodations. Click the heart icon on room cards to save properties!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedRooms.map((room) => (
                  <RoomCard key={room.id} listing={room} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] p-6 shadow-sm max-w-xl">
            <h3 className="font-outfit font-extrabold text-base text-slate-850 dark:text-white mb-6">Modify Profile Information</h3>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">College/Campus Institution</label>
                <input
                  type="text"
                  value={editCollege}
                  onChange={(e) => setEditCollege(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-1">Target Monthly Budget limit (₹)</label>
                <input
                  type="number"
                  value={editBudget}
                  onChange={(e) => setEditBudget(parseInt(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                />
              </div>
              
              <button
                type="submit"
                className="px-6 py-2.5 mt-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

      </div>

    </div>
  );
}
