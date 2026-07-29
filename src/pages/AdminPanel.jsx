import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Shield, Users, Home, Activity, Check, CheckCircle, 
  Trash2, AlertTriangle, MessageSquare, Award 
} from 'lucide-react';

export default function AdminPanel() {
  const { listings, deleteListing, addNotification } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('listings');

  const [usersList, setUsersList] = useState([
    { name: 'Siddharth Shinde', role: 'Student', email: 'siddharth.s@staynest.com', verified: true, joined: '2026-07-01' },
    { name: 'Anil Deshmukh', role: 'Owner', email: 'anil.d@staynest.com', verified: true, joined: '2026-06-15' },
    { name: 'Savita Kadam', role: 'Mess Owner', email: 'savita.k@staynest.com', verified: true, joined: '2026-06-20' },
    { name: 'Rahul Roy', role: 'Student', email: 'rahul.r@gmail.com', verified: false, joined: '2026-07-25' }
  ]);

  const handleToggleVerifyUser = (email) => {
    setUsersList(prev => prev.map(u => 
      u.email === email ? { ...u, verified: !u.verified } : u
    ));
    addNotification("User verification status modified");
  };

  const handleVerifyProperty = (id) => {
    // Proactively verify listing reactively
    const room = listings.find(item => item.id === id);
    if (room) {
      room.owner.verified = !room.owner.verified;
      addNotification(`Property verified tag toggled for: ${room.title}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-outfit font-extrabold text-3xl text-slate-900 dark:text-white flex items-center">
          <Shield className="w-8 h-8 text-primary-500 mr-2" /> Admin Control Panel
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Perform property listing audits, manage user roles, check database logs, and view platform metrics.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-primary-50 dark:bg-primary-950/40 text-primary-500"><Users className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Platform Users</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">6,420 accounts</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500"><Home className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Listed Accommodations</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">{listings.length} stays</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500"><Activity className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Average Safety Index</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">93.8% Safe</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-brand-rose-50 dark:bg-brand-rose-950/40 text-brand-rose-500"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Unresolved Reports</p>
            <h3 className="font-outfit font-black text-xl text-slate-900 dark:text-white">0 reports</h3>
          </div>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 space-x-6 text-sm">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 font-outfit font-bold relative transition-colors ${
            activeTab === 'listings' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <span>Stays Moderation ({listings.length})</span>
          {activeTab === 'listings' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 font-outfit font-bold relative transition-colors ${
            activeTab === 'users' ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 hover:text-slate-650'
          }`}
        >
          <span>Users Moderation ({usersList.length})</span>
          {activeTab === 'users' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />}
        </button>
      </div>

      {/* Content */}
      <div>
        
        {/* Listings Moderation */}
        {activeTab === 'listings' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold bg-slate-50/20 dark:bg-slate-950/20">
                    <th className="p-4">Stay details</th>
                    <th className="p-4">Owner Name</th>
                    <th className="p-4">Verification State</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-350">
                  {listings.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <td className="p-4">
                        <p className="font-bold text-slate-850 dark:text-white">{room.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{room.area}, {room.city} • Rent: ₹{room.rent}/mo</p>
                      </td>
                      <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">
                        {room.owner.name}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          room.owner.verified 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/25' 
                            : 'bg-amber-100 text-amber-600 dark:bg-amber-950/25'
                        }`}>
                          {room.owner.verified ? 'Verified Partner' : 'Pending Verification'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleVerifyProperty(room.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 dark:bg-slate-950 dark:hover:bg-emerald-950 transition-colors flex items-center space-x-1"
                          >
                            <Award className="w-3.5 h-3.5" />
                            <span>Toggle Verify</span>
                          </button>
                          
                          <button
                            onClick={() => deleteListing(room.id)}
                            className="p-1.5 rounded-lg text-slate-405 hover:text-brand-rose-500 hover:bg-brand-rose-50/20 transition-colors"
                            title="Delete listing"
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
          </div>
        )}

        {/* Users Moderation */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[28px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold bg-slate-50/20 dark:bg-slate-950/20">
                    <th className="p-4">User Details</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Account Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-700 dark:text-slate-350">
                  {usersList.map((usr) => (
                    <tr key={usr.email} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                      <td className="p-4 font-bold text-slate-850 dark:text-white">
                        {usr.name}
                        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Joined: {usr.joined}</p>
                      </td>
                      <td className="p-4 text-slate-550 dark:text-slate-400">
                        {usr.email}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-850 font-bold text-[10px]">
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          usr.verified 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/25' 
                            : 'bg-amber-100 text-amber-600 dark:bg-amber-950/25'
                        }`}>
                          {usr.verified ? 'Active verified' : 'Unverified'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleToggleVerifyUser(usr.email)}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-primary-50 hover:text-primary-500 dark:bg-slate-950 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Toggle Verify</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
