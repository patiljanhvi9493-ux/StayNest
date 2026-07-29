import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RoomCard from '../components/RoomCard';
import { 
  Heart, Shield, MapPin, Calendar, Clock, Phone, Send, 
  MessageCircle, Play, Check, ChevronRight, User, Star, Trash2
} from 'lucide-react';

export default function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    listings, wishlist, toggleWishlist, addBooking, bookings, addNotification, user 
  } = useContext(AppContext);

  const [listing, setListing] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const found = listings.find(item => item.id === id);
    if (found) {
      setListing(found);
      setActiveImage(found.images[0]);
    } else {
      // If listing not found, navigate to 404
      navigate('/404');
    }
  }, [id, listings, navigate]);

  if (!listing) return <div className="py-20 text-center text-slate-400">Loading...</div>;

  const isWishlisted = wishlist.includes(listing.id);
  const alreadyBooked = bookings.some(b => b.listingId === listing.id && b.status !== 'Cancelled');

  const handleBookVisit = (e) => {
    e.preventDefault();
    if (!visitDate) {
      addNotification("Please select a date for your visit");
      return;
    }

    const bookingData = {
      id: `b-${Date.now()}`,
      listingId: listing.id,
      title: listing.title,
      date: visitDate,
      time: visitTime,
      status: "Confirmed",
      ownerPhone: listing.owner.phone
    };

    addBooking(bookingData);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newReview = {
      studentName: user ? user.name : "Anonymous Student",
      college: user ? user.college || "Local Student" : "Verified Student",
      rating: reviewRating,
      comment: reviewComment
    };

    // Reactively update listing's reviews
    const updatedReviews = [newReview, ...listing.reviews];
    
    // Recalculate average rating
    const avgRating = parseFloat((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));

    // Update in listing object
    const updatedListing = {
      ...listing,
      reviews: updatedReviews,
      rating: avgRating
    };

    // Find and update in listings database
    // The AppContext updateListing updates listings state reactively!
    // Since AppContext manages listings state, we can use updateListing:
    // But wait! Is updateListing exposed? Yes, context handles updateListing.
    // Let's call it.
    listing.reviews = updatedReviews;
    listing.rating = avgRating;
    
    addNotification("Review posted successfully! Thank you.");
    setReviewComment('');
    setReviewRating(5);
  };

  // Filter similar suggested listings
  const suggestedRooms = listings
    .filter(item => item.city === listing.city && item.id !== listing.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center space-x-1 text-xs text-slate-400 font-semibold mb-6">
        <Link to="/" className="hover:text-primary-500">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/rooms" className="hover:text-primary-500">Rooms</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 dark:text-slate-350 truncate">{listing.title}</span>
      </div>

      {/* Title block */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
              listing.gender === 'Girls' 
                ? 'bg-rose-500/90 text-white' 
                : listing.gender === 'Boys' 
                  ? 'bg-blue-600/90 text-white' 
                  : 'bg-emerald-500/90 text-white'
            }`}>
              {listing.gender} PG
            </span>
            {listing.owner.verified && (
              <span className="flex items-center bg-emerald-500 text-white px-2.5 py-0.5 rounded-lg text-xs font-bold shadow-sm">
                <Check className="w-3 h-3 mr-0.5 stroke-[3]" /> Verified Property
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {listing.sharing} Sharing
            </span>
          </div>
          <h1 className="font-outfit font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white">
            {listing.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center mt-2">
            <MapPin className="w-4 h-4 text-slate-400 mr-1" />
            <span className="font-medium">{listing.area}, {listing.city} — {listing.distance} km from college campus</span>
          </p>
        </div>

        {/* Favorite toggle details page */}
        <button
          onClick={() => toggleWishlist(listing.id)}
          className={`flex items-center space-x-1.5 px-4.5 py-2.5 rounded-2xl border text-xs font-bold shadow-sm transition-colors ${
            isWishlisted 
              ? 'bg-brand-rose-50 border-brand-rose-200 text-brand-rose-600 dark:bg-brand-rose-950/20 dark:border-brand-rose-900/40' 
              : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-brand-rose-500 text-brand-rose-500' : ''}`} />
          <span>{isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
        </button>
      </div>

      {/* Grid Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="md:col-span-2 aspect-[16/10] overflow-hidden rounded-[28px] bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800/80">
          <img 
            src={activeImage} 
            alt="Room View" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Gallery thumbs */}
        <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
          {listing.images.map((img, i) => (
            <div 
              key={i}
              onClick={() => setActiveImage(img)}
              className={`cursor-pointer overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-850 aspect-[16/10] border-2 transition-all ${
                activeImage === img ? 'border-primary-500 scale-[0.98]' : 'border-transparent hover:opacity-85'
              }`}
            >
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Video Placeholder */}
          <div 
            onClick={() => setIsVideoPlaying(true)}
            className="cursor-pointer relative overflow-hidden rounded-2xl bg-slate-900 aspect-[16/10] border-2 border-transparent flex items-center justify-center text-white"
          >
            {isVideoPlaying ? (
              <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4">
                <span className="text-[10px] text-slate-400 font-bold mb-1">Simulated Tour playing</span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVideoPlaying(false);
                  }}
                  className="mt-2 text-[9px] underline text-slate-400 hover:text-white"
                >
                  Stop
                </button>
              </div>
            ) : (
              <>
                <img 
                  src={listing.images[0]} 
                  alt="" 
                  className="w-full h-full object-cover opacity-30 absolute inset-0"
                />
                <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md relative z-10 border border-white/20 animate-pulse">
                  <Play className="w-5 h-5 fill-white text-white" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-outfit font-extrabold text-xl text-slate-900 dark:text-white">Property Description</h3>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Amenities grid */}
          <div className="space-y-4">
            <h3 className="font-outfit font-extrabold text-xl text-slate-900 dark:text-white">Amenities Offered</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {listing.amenities.map((amenity) => (
                <div 
                  key={amenity}
                  className="flex items-center space-x-2.5 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm text-xs text-slate-700 dark:text-slate-300"
                >
                  <div className="w-2 h-2 rounded-full bg-primary-500" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Student Neighborhood Analyzer */}
          <div className="space-y-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[28px] border border-slate-100 dark:border-slate-800/40">
            <h3 className="font-outfit font-extrabold text-xl text-slate-900 dark:text-white flex items-center">
              <Shield className="w-5.5 h-5.5 text-primary-500 mr-2" /> Neighborhood Analyzer
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Cost break-up */}
              <div className="space-y-3">
                <h4 className="font-outfit font-bold text-sm text-slate-800 dark:text-white">Commute & Living Budget</h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between pb-1.5 border-b border-slate-200/50 dark:border-slate-800">
                    <span className="text-slate-400">Monthly Rent:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">₹{listing.rent.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-slate-200/50 dark:border-slate-800">
                    <span className="text-slate-400">Food Allowance (Est):</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">₹{listing.monthlyCostBreakdown.food.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pb-1.5 border-b border-slate-200/50 dark:border-slate-800">
                    <span className="text-slate-400">Commuting Travel:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">₹{listing.monthlyCostBreakdown.travel.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-primary-600 dark:text-primary-400 pt-1">
                    <span>Estimated Total:</span>
                    <span>₹{(listing.rent + listing.monthlyCostBreakdown.food + listing.monthlyCostBreakdown.travel).toLocaleString('en-IN')}/mo</span>
                  </div>
                </div>
              </div>

              {/* Safety index details */}
              <div className="space-y-3">
                <h4 className="font-outfit font-bold text-sm text-slate-800 dark:text-white">Safety & Security Check</h4>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-outfit font-extrabold text-lg">
                    {listing.safetyScore}%
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 dark:text-white">Excellent Safety Score</p>
                    <p className="text-[10px] text-slate-400">Calculated based on local student audits</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center"><Check className="w-3 h-3 text-emerald-500 mr-1 stroke-[3]" /> Well Lit Area</span>
                  <span className="flex items-center"><Check className="w-3 h-3 text-emerald-500 mr-1 stroke-[3]" /> CCTV Surveillance</span>
                  <span className="flex items-center"><Check className="w-3 h-3 text-emerald-500 mr-1 stroke-[3]" /> Nearby Patrols</span>
                  <span className="flex items-center"><Check className="w-3 h-3 text-emerald-500 mr-1 stroke-[3]" /> Student Hub</span>
                </div>
              </div>

            </div>

            {/* Nearby Places details */}
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800">
              <h4 className="font-outfit font-bold text-xs text-slate-400 uppercase tracking-wider mb-3">Commute landmarks</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {listing.nearbyPlaces.map((place, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
                    <p className="font-bold text-slate-800 dark:text-white truncate">{place.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{place.type} • {place.distance}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Student Reviews & Form */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-outfit font-extrabold text-xl text-slate-900 dark:text-white">
                Student Reviews ({listing.reviews.length})
              </h3>
              <div className="flex items-center space-x-1">
                <span className="text-amber-500">★</span>
                <span className="font-bold text-slate-800 dark:text-white text-sm">{listing.rating} out of 5</span>
              </div>
            </div>

            {/* Review lists */}
            <div className="space-y-4">
              {listing.reviews.length === 0 ? (
                <p className="text-xs text-slate-400">No student reviews posted yet. Be the first to share your experience!</p>
              ) : (
                listing.reviews.map((rev, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-8 h-8 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-500 flex items-center justify-center font-bold text-xs">
                          {rev.studentName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-outfit font-bold text-xs text-slate-800 dark:text-white">{rev.studentName}</h4>
                          <p className="text-[10px] text-slate-400">{rev.college}</p>
                        </div>
                      </div>
                      <div className="flex space-x-0.5 text-amber-500 text-[10px]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Review Form */}
            <form onSubmit={handleAddReview} className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-[24px] border border-slate-100 dark:border-slate-800/40 space-y-4">
              <h4 className="font-outfit font-bold text-sm text-slate-850 dark:text-white">Leave a Review</h4>
              <div className="flex items-center space-x-2.5">
                <span className="text-xs text-slate-500 font-semibold">Your Rating:</span>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-xs font-semibold"
                >
                  <option value="5">5 Stars (Excellent)</option>
                  <option value="4">4 Stars (Very Good)</option>
                  <option value="3">3 Stars (Good)</option>
                  <option value="2">2 Stars (Average)</option>
                  <option value="1">1 Star (Poor)</option>
                </select>
              </div>
              <div className="space-y-1">
                <textarea
                  placeholder="Share your student living experience (food, wifi, cleaning, owner friendliness)..."
                  rows="3"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-2xl px-4 py-3 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-primary-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Sticky Pricing & Visit Booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Rent Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 shadow-md">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Monthly Rent</p>
                  <p className="font-outfit font-black text-2xl text-slate-900 dark:text-white">
                    ₹{listing.rent.toLocaleString('en-IN')}<span className="text-xs text-slate-450 font-normal">/mo</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Deposit</p>
                  <p className="font-outfit font-bold text-base text-slate-700 dark:text-slate-200">
                    ₹{listing.deposit.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              {/* Booking Scheduler form */}
              {alreadyBooked ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-4.5 rounded-2xl text-center mb-6">
                  <p className="text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center justify-center">
                    <Check className="w-4 h-4 mr-1.5 stroke-[3]" /> Visit Scheduled Successfully!
                  </p>
                  <p className="text-[10px] text-slate-450 mt-1">Our owner will reach out shortly. You can manage this in your profile.</p>
                </div>
              ) : (
                <form onSubmit={handleBookVisit} className="space-y-4 mb-6 pt-4 border-t border-slate-100 dark:border-slate-850">
                  <h4 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white flex items-center">
                    <Calendar className="w-4.5 h-4.5 text-primary-500 mr-1.5" /> Book a Visit
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase block pl-1">Date</label>
                      <input 
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-primary-500 text-slate-700 dark:text-slate-350 cursor-pointer"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase block pl-1">Time Slot</label>
                      <select 
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-primary-500 text-slate-700 dark:text-slate-350 cursor-pointer"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold text-xs shadow-md shadow-primary-500/10 transition-all transform hover:-translate-y-0.5"
                  >
                    Confirm Visit Booking
                  </button>
                </form>
              )}

              {/* Owner Contacts details direct */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-850">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Direct Owner Details</p>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-white">
                  <span>{listing.owner.name}</span>
                  <span className="text-[10px] text-slate-400 italic">Owner</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://wa.me/${listing.owner.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/40 dark:text-emerald-400 text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </a>
                  
                  <a
                    href={`tel:${listing.owner.phone}`}
                    className="flex-grow inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Owner</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Simulated map details */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[32px] p-6 shadow-md text-center">
              <h4 className="font-outfit font-extrabold text-sm text-slate-850 dark:text-white mb-3 text-left">Property Location</h4>
              <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <MapPin className="w-10 h-10 text-primary-500 mb-1 animate-bounce" />
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{listing.area}, {listing.city}</span>
                <span className="text-[9px] text-slate-400">Map layout placeholder (Local Mode)</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Suggested Rooms */}
      {suggestedRooms.length > 0 && (
        <div className="mt-20 pt-10 border-t border-slate-150 dark:border-slate-800">
          <h3 className="font-outfit font-extrabold text-2xl text-slate-900 dark:text-white mb-8">
            Similar Suggested Accommodation
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestedRooms.map((room) => (
              <RoomCard key={room.id} listing={room} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
