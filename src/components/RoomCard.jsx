import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Heart, Shield, MapPin, Wifi, Calendar, Check, ExternalLink, Columns } from 'lucide-react';

export default function RoomCard({ listing }) {
  const { wishlist, toggleWishlist, compareList, addToCompare, removeFromCompare } = useContext(AppContext);
  
  const isWishlisted = wishlist.includes(listing.id);
  const isCompared = compareList.some(item => item.id === listing.id);

  const handleCompareClick = (e) => {
    e.preventDefault();
    if (isCompared) {
      removeFromCompare(listing.id);
    } else {
      addToCompare(listing);
    }
  };

  // Icon selector based on amenity
  const renderAmenityMini = (amenity) => {
    if (amenity === 'WiFi') return <Wifi className="w-3.5 h-3.5 text-primary-500" key={amenity} title="WiFi" />;
    if (amenity === 'AC') return <span className="text-[10px] font-bold text-primary-500 px-1 border border-primary-500 rounded" key={amenity}>AC</span>;
    if (amenity === 'Attached Bathroom') return <span className="text-[10px] font-bold text-emerald-500 px-1 border border-emerald-500 rounded" key={amenity}>Bath</span>;
    if (amenity === 'Food Included') return <span className="text-[10px] font-bold text-amber-500 px-1 border border-amber-500 rounded" key={amenity}>Food</span>;
    return null;
  };

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[28px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-500/5 dark:hover:shadow-primary-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={listing.images[0]} 
          alt={listing.title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Rent Tag */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-xl bg-slate-900/85 dark:bg-slate-950/85 backdrop-blur-md text-white text-xs font-bold font-outfit shadow-sm">
          ₹{listing.rent.toLocaleString('en-IN')}<span className="text-[10px] text-slate-350 font-normal">/mo</span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(listing.id);
          }}
          className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 shadow-sm backdrop-blur-xs text-slate-600 dark:text-slate-300 transition-colors"
          aria-label="Wishlist"
        >
          <Heart className={`w-4.5 h-4.5 transition-colors ${isWishlisted ? 'fill-brand-rose-500 text-brand-rose-500' : ''}`} />
        </button>

        {/* Quick Badges */}
        <div className="absolute bottom-3 left-3.5 flex flex-wrap gap-1.5">
          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-sm backdrop-blur-xs ${
            listing.gender === 'Girls' 
              ? 'bg-rose-500/90 text-white' 
              : listing.gender === 'Boys' 
                ? 'bg-blue-600/90 text-white' 
                : 'bg-emerald-500/90 text-white'
          }`}>
            {listing.gender}
          </span>
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-900/80 dark:bg-slate-950/70 text-white backdrop-blur-xs shadow-sm">
            {listing.sharing} Sharing
          </span>
        </div>

        {/* Verified Badge */}
        {listing.owner.verified && (
          <div className="absolute bottom-3 right-3.5 flex items-center bg-emerald-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-sm">
            <Check className="w-3 h-3 mr-0.5 stroke-[3]" /> Verified
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Rating and Distance */}
        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
          <div className="flex items-center space-x-1">
            <span className="font-bold text-amber-500">★</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{listing.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{listing.distance} km from college</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-outfit font-bold text-base text-slate-900 dark:text-white line-clamp-1 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {listing.title}
        </h3>

        {/* Area & City */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center">
          <span className="font-medium">{listing.area}, {listing.city}</span>
        </p>

        {/* Student Special Stats (Safety & Cost) */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/40 mb-4">
          <div className="text-center border-r border-slate-200/60 dark:border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Safety Score</p>
            <div className="flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs font-bold mt-0.5">
              <Shield className="w-3 h-3 mr-1" />
              {listing.safetyScore}%
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Avg Living Cost</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-0.5">
              ₹{(listing.rent + (listing.monthlyCostBreakdown?.food || 0)).toLocaleString('en-IN')}/mo
            </p>
          </div>
        </div>

        {/* Micro Amenities */}
        <div className="flex flex-wrap gap-2 mb-4 items-center min-h-[20px]">
          {listing.amenities.slice(0, 4).map(renderAmenityMini)}
          {listing.amenities.length > 4 && (
            <span className="text-[9px] text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
              +{listing.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-2.5">
          
          {/* Add to Compare */}
          <button
            onClick={handleCompareClick}
            className={`flex items-center space-x-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border transition-all ${
              isCompared 
                ? 'bg-primary-500 border-primary-500 text-white shadow-sm shadow-primary-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>{isCompared ? 'Compared' : 'Compare'}</span>
          </button>

          {/* Details Link */}
          <Link
            to={`/rooms/${listing.id}`}
            className="flex-grow inline-flex items-center justify-center space-x-1 px-3 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-primary-600 dark:bg-slate-800 dark:hover:bg-primary-600 rounded-lg transition-colors shadow-sm"
          >
            <span>View Details</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* Available date footer note */}
        <p className="text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center">
          <Calendar className="w-3 h-3 mr-1 text-slate-400" />
          Available: {listing.availableDate}
        </p>

      </div>
    </div>
  );
}
