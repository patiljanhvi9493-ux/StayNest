import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Columns, Trash2, Check, X, Shield, MapPin, ArrowLeft } from 'lucide-react';

export default function Compare() {
  const { compareList, removeFromCompare, clearCompare } = useContext(AppContext);

  if (compareList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center min-h-screen flex flex-col justify-center items-center">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-350 dark:text-slate-700 mb-4">
          <Columns className="w-16 h-16 stroke-[1]" />
        </div>
        <h2 className="font-outfit font-extrabold text-xl text-slate-900 dark:text-white">No stays selected for comparison</h2>
        <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 max-w-sm leading-relaxed">
          Go to the Rooms search page, find properties you like, and check the "Compare" checkbox to view them side-by-side.
        </p>
        <Link 
          to="/rooms" 
          className="mt-6 px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          Explore Stays
        </Link>
      </div>
    );
  }

  // Find minimum rent to highlight
  const minRent = Math.min(...compareList.map(r => r.rent));
  // Find minimum distance to highlight
  const minDistance = Math.min(...compareList.map(r => r.distance));
  // Find maximum safety score to highlight
  const maxSafety = Math.max(...compareList.map(r => r.safetyScore));

  const checkAmenity = (room, amenity) => {
    return room.amenities.includes(amenity);
  };

  const amenities = ['WiFi', 'AC', 'Attached Bathroom', 'Parking', 'Food Included'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link to="/rooms" className="text-xs font-bold text-slate-400 hover:text-primary-500 flex items-center space-x-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> <span>Back to Rooms</span>
          </Link>
          <h1 className="font-outfit font-extrabold text-3xl text-slate-900 dark:text-white">
            Compare Accommodations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Analyzing {compareList.length} properties side-by-side.
          </p>
        </div>
        
        <button
          onClick={clearCompare}
          className="text-xs font-bold text-brand-rose-500 hover:text-brand-rose-600 px-4 py-2 border border-brand-rose-100 dark:border-brand-rose-900/40 rounded-xl hover:bg-brand-rose-50/30 self-start sm:self-center"
        >
          Clear Comparison list
        </button>
      </div>

      {/* Comparison Grid Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head: Images and title card */}
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800/80">
                <th className="p-6 text-sm font-bold text-slate-400 w-1/4">Feature</th>
                {compareList.map((room) => (
                  <th key={room.id} className="p-6 w-1/4 min-w-[220px]">
                    <div className="space-y-4">
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 relative border">
                        <img 
                          src={room.images[0]} 
                          alt="" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFromCompare(room.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-500 hover:text-brand-rose-500 hover:bg-white shadow-sm"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold mb-1 ${
                          room.gender === 'Girls' ? 'bg-rose-500/90 text-white' : room.gender === 'Boys' ? 'bg-blue-600/90 text-white' : 'bg-emerald-500/90 text-white'
                        }`}>
                          {room.gender}
                        </span>
                        <h3 className="font-outfit font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">{room.title}</h3>
                        <p className="text-[10px] text-slate-400 font-semibold">{room.area}, {room.city}</p>
                      </div>
                    </div>
                  </th>
                ))}
                {/* Pad columns if less than 3 */}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => (
                  <th key={index} className="p-6 w-1/4 hidden sm:table-cell">
                    <div className="border border-dashed border-slate-350 dark:border-slate-800 rounded-3xl h-48 flex items-center justify-center text-xs font-semibold text-slate-400">
                      Empty slot
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-xs text-slate-700 dark:text-slate-300">
              
              {/* Monthly Rent */}
              <tr className="border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-5 font-bold text-slate-400">Monthly Rent</td>
                {compareList.map((room) => {
                  const isCheapest = room.rent === minRent;
                  return (
                    <td key={room.id} className="p-5">
                      <span className={`font-outfit font-extrabold text-sm ${isCheapest ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-850 dark:text-white'}`}>
                        ₹{room.rent.toLocaleString('en-IN')}/mo
                      </span>
                      {isCheapest && (
                        <span className="inline-block ml-2 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Cheapest</span>
                      )}
                    </td>
                  );
                })}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
              </tr>

              {/* Deposit */}
              <tr className="border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-5 font-bold text-slate-400">Security Deposit</td>
                {compareList.map((room) => (
                  <td key={room.id} className="p-5 font-semibold text-slate-850 dark:text-white">
                    ₹{room.deposit.toLocaleString('en-IN')}
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
              </tr>

              {/* Commute Distance */}
              <tr className="border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-5 font-bold text-slate-400">Distance to College</td>
                {compareList.map((room) => {
                  const isClosest = room.distance === minDistance;
                  return (
                    <td key={room.id} className="p-5 font-semibold">
                      <span className={isClosest ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-850 dark:text-white'}>
                        {room.distance} km
                      </span>
                      {isClosest && (
                        <span className="inline-block ml-2 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/40 text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Closest</span>
                      )}
                    </td>
                  );
                })}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
              </tr>

              {/* Safety Score */}
              <tr className="border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-5 font-bold text-slate-400">Safety Index</td>
                {compareList.map((room) => {
                  const isSafest = room.safetyScore === maxSafety;
                  return (
                    <td key={room.id} className="p-5 font-semibold">
                      <span className={isSafest ? 'text-emerald-600 dark:text-emerald-400 flex items-center' : 'text-slate-850 dark:text-white flex items-center'}>
                        <Shield className="w-3.5 h-3.5 mr-1" /> {room.safetyScore}%
                      </span>
                    </td>
                  );
                })}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
              </tr>

              {/* Sharing */}
              <tr className="border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-5 font-bold text-slate-400">Sharing Mode</td>
                {compareList.map((room) => (
                  <td key={room.id} className="p-5 font-semibold text-slate-850 dark:text-white">
                    {room.sharing} Sharing
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
              </tr>

              {/* Ratings */}
              <tr className="border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-5 font-bold text-slate-400">Student Reviews</td>
                {compareList.map((room) => (
                  <td key={room.id} className="p-5 font-semibold text-slate-850 dark:text-white flex items-center">
                    <span className="text-amber-500 mr-1">★</span> {room.rating} ({room.reviews.length} reviews)
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
              </tr>

              {/* Amenities Breakdown Rows */}
              {amenities.map((amenity) => (
                <tr key={amenity} className="border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-5 font-bold text-slate-400">{amenity}</td>
                  {compareList.map((room) => {
                    const hasAmenity = checkAmenity(room, amenity);
                    return (
                      <td key={room.id} className="p-5">
                        {hasAmenity ? (
                          <Check className="w-5 h-5 text-emerald-500 stroke-[3]" />
                        ) : (
                          <X className="w-5 h-5 text-rose-500 stroke-[3]" />
                        )}
                      </td>
                    );
                  })}
                  {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
                </tr>
              ))}

              {/* Action Actions Row */}
              <tr>
                <td className="p-5 font-bold text-slate-400">Actions</td>
                {compareList.map((room) => (
                  <td key={room.id} className="p-5">
                    <Link
                      to={`/rooms/${room.id}`}
                      className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl bg-slate-950 dark:bg-slate-800 hover:bg-primary-600 dark:hover:bg-primary-600 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      View Details
                    </Link>
                  </td>
                ))}
                {Array.from({ length: 3 - compareList.length }).map((_, index) => <td key={index} className="p-5 hidden sm:table-cell" />)}
              </tr>

            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}
