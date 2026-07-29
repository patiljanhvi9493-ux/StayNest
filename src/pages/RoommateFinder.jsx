import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Users, Search, Check, Send, Sparkles, MessageCircle, 
  RotateCcw, SlidersHorizontal, UserPlus, Heart
} from 'lucide-react';

export default function RoommateFinder() {
  const { roommates, addNotification } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // User survey filter choices
  const [userGender, setUserGender] = useState('Boys');
  const [userBudget, setUserBudget] = useState(8000);
  const [userSleep, setUserSleep] = useState('Early Bird');
  const [userStudy, setUserStudy] = useState('Quiet Study');
  const [userSmoke, setUserSmoke] = useState('No');
  const [userDrink, setUserDrink] = useState('No');
  const [userFood, setUserFood] = useState('Veg');

  const [connectedRoommates, setConnectedRoommates] = useState([]);

  // Calculate compatibility score (out of 100)
  const calculateScore = (roommate) => {
    let score = 50; // Base score

    // Gender check: If not same gender, compatibility is very low (safety standard)
    if (roommate.gender !== userGender) {
      return 15;
    }

    // Budget check: Closer budget yields higher compatibility
    const budgetDiff = Math.abs(roommate.budget - userBudget);
    if (budgetDiff <= 1000) score += 10;
    else if (budgetDiff <= 2000) score += 5;
    else score -= 5;

    // Sleep Schedule match
    if (roommate.sleepSchedule === userSleep) score += 10;
    else score -= 5;

    // Study Habits match
    if (roommate.studyHabits === userStudy) score += 10;
    else score -= 5;

    // Smoking match
    if (roommate.smoking === userSmoke) score += 10;
    else score -= 10;

    // Drinking match
    if (roommate.drinking === userDrink) score += 5;
    else score -= 5;

    // Food preference match
    if (roommate.foodPreference === userFood) score += 5;
    else if (roommate.foodPreference === 'No Preference') score += 2;

    // Clamp score between 20 and 99 (since 100 is rare!)
    return Math.min(Math.max(score, 20), 99);
  };

  const handleConnect = (id, name) => {
    if (connectedRoommates.includes(id)) return;
    setConnectedRoommates(prev => [...prev, id]);
    addNotification(`Connection request sent to potential roommate: ${name}`);
  };

  // Compile matched roommates sorted by compatibility score
  const matchedRoommates = roommates
    .map(r => ({
      ...r,
      compatibility: calculateScore(r)
    }))
    // Sort by compatibility descending
    .sort((a, b) => b.compatibility - a.compatibility);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white flex items-center">
          <Users className="w-8 h-8 text-primary-500 mr-2" /> Roommate Compatibility Finder
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Calculate instant compatibility scores with other students based on budget, lifestyle, study habits, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Compatibility Questionnaire */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] p-6 shadow-sm space-y-6">
            <h3 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white uppercase tracking-wider flex items-center">
              <SlidersHorizontal className="w-4 h-4 mr-1.5" /> Your Lifestyle Profile
            </h3>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Your Gender</label>
              <div className="grid grid-cols-2 gap-2">
                {['Boys', 'Girls'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setUserGender(g)}
                    className={`py-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                      userGender === g
                        ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-855 hover:bg-slate-100'
                    }`}
                  >
                    {g === 'Boys' ? 'Male' : 'Female'}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                <span>Monthly Budget Limit</span>
                <span className="text-slate-700 dark:text-slate-200">₹{userBudget.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                type="range"
                min="3000"
                max="15000"
                step="500"
                value={userBudget}
                onChange={(e) => setUserBudget(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
            </div>

            {/* Sleep Schedule */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Sleep Pattern</label>
              <div className="grid grid-cols-2 gap-2">
                {['Early Bird', 'Night Owl'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setUserSleep(opt)}
                    className={`py-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                      userSleep === opt
                        ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-650 dark:text-slate-400 border-slate-100 dark:border-slate-855 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Study habits */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Study Atmosphere</label>
              <div className="grid grid-cols-2 gap-2">
                {['Quiet Study', 'Group Study'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setUserStudy(opt)}
                    className={`py-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                      userStudy === opt
                        ? 'bg-primary-500 border-primary-500 text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-650 dark:text-slate-400 border-slate-100 dark:border-slate-855 hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Habits detail */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Smoking</label>
                <select
                  value={userSmoke}
                  onChange={(e) => setUserSmoke(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-2 py-1.5 text-xs font-semibold outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Occasionally">Sometimes</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Drinking</label>
                <select
                  value={userDrink}
                  onChange={(e) => setUserDrink(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-2 py-1.5 text-xs font-semibold outline-none"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="Occasionally">Sometimes</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Food Diet</label>
                <select
                  value={userFood}
                  onChange={(e) => setUserFood(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-2 py-1.5 text-xs font-semibold outline-none"
                >
                  <option value="Veg">Veg</option>
                  <option value="Non-Veg">Non-Veg</option>
                  <option value="No Preference">Any</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Compatibility Match results */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex justify-between items-center px-1">
            <span className="text-xs text-slate-400 font-bold">Matching roommate candidates</span>
            <span className="text-xs text-primary-500 font-semibold flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Smart-sort active
            </span>
          </div>

          <div className="space-y-4">
            {matchedRoommates.map((person) => {
              const isConnected = connectedRoommates.includes(person.id);
              return (
                <div 
                  key={person.id}
                  className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 relative overflow-hidden group"
                >
                  {/* Compatibility Score Banner Badge */}
                  <div className="absolute top-0 right-0 py-1.5 px-3 rounded-bl-2xl bg-gradient-to-tr from-primary-500 to-indigo-600 text-white font-outfit font-black text-xs">
                    {person.compatibility}% Match
                  </div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left flex-grow">
                    <img 
                      src={person.avatar} 
                      alt={person.name} 
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary-500/10 flex-shrink-0"
                    />
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-outfit font-extrabold text-base text-slate-900 dark:text-white">
                          {person.name}
                        </h3>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          {person.college !== 'None' ? person.college : `Professional at ${person.company}`}
                        </p>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        "{person.bio}"
                      </p>

                      {/* Micro attributes tags */}
                      <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-slate-50 dark:bg-slate-800 border text-slate-505">
                          Budget: ₹{person.budget}/mo
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-slate-50 dark:bg-slate-800 border text-slate-505">
                          {person.sleepSchedule}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-slate-50 dark:bg-slate-800 border text-slate-505">
                          {person.studyHabits}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-bold bg-slate-50 dark:bg-slate-800 border text-slate-505">
                          Diet: {person.foodPreference}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 pt-2 sm:pt-6 flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleConnect(person.id, person.name)}
                      className={`w-full sm:w-28 py-2.5 rounded-xl text-[10px] font-bold flex items-center justify-center space-x-1 transition-all ${
                        isConnected 
                          ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/10' 
                          : 'bg-primary-600 hover:bg-primary-500 text-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Connected</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Connect</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => addNotification(`Simulating chat window opening with ${person.name}`)}
                      className="w-full sm:w-28 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 flex items-center justify-center space-x-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Message</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
