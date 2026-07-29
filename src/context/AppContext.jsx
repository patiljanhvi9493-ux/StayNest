import React, { createContext, useState, useEffect } from 'react';
import initialListings from '../data/listings.json';
import initialMesses from '../data/messes.json';
import initialRoommates from '../data/roommates.json';
import initialCommunity from '../data/community.json';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Safe LocalStorage Parser to prevent crash if data is corrupted or from another site
  const safeParse = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      if (!value || value === 'undefined') return fallback;
      return JSON.parse(value);
    } catch (e) {
      console.error(`Error parsing localStorage key "${key}":`, e);
      return fallback;
    }
  };

  // Theme State
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('staynest_theme');
    if (savedTheme) return savedTheme;
    return 'light';
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    return safeParse('staynest_user', {
      name: "Siddharth Shinde",
      role: "Student",
      email: "siddharth.s@staynest.com",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
      college: "COEP College",
      budget: 6000
    });
  });

  // Listings & Messes State (Local reactive database)
  const [listings, setListings] = useState(() => {
    return safeParse('staynest_listings', initialListings);
  });

  const [messes, setMesses] = useState(() => {
    return safeParse('staynest_messes', initialMesses);
  });

  // Roommate profiles
  const [roommates, setRoommates] = useState(() => {
    return safeParse('staynest_roommates', initialRoommates);
  });

  // Community Posts
  const [communityPosts, setCommunityPosts] = useState(() => {
    return safeParse('staynest_posts', initialCommunity);
  });

  // Wishlist (IDs of listing items)
  const [wishlist, setWishlist] = useState(() => {
    return safeParse('staynest_wishlist', []);
  });

  // Compare List (Full room objects)
  const [compareList, setCompareList] = useState([]);

  // Bookings state
  const [bookings, setBookings] = useState(() => {
    return safeParse('staynest_bookings', [
      {
        id: "b-1",
        listingId: "room-1",
        title: "Stanza Living Premium Unisex PG",
        date: "2026-08-03",
        time: "11:00 AM",
        status: "Confirmed",
        ownerPhone: "+91 98234 56789"
      }
    ]);
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Welcome to StayNest! Find premium accommodations with zero brokerage.", read: false, time: "Just now" }
  ]);

  // Apply Theme class to document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('staynest_theme', theme);
  }, [theme]);

  // Sync states to LocalStorage
  useEffect(() => {
    localStorage.setItem('staynest_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('staynest_messes', JSON.stringify(messes));
  }, [messes]);

  useEffect(() => {
    localStorage.setItem('staynest_roommates', JSON.stringify(roommates));
  }, [roommates]);

  useEffect(() => {
    localStorage.setItem('staynest_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('staynest_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('staynest_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('staynest_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('staynest_user');
    }
  }, [user]);

  // Context Operations
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const login = (userData) => {
    setUser(userData);
    addNotification(`Logged in successfully as ${userData.name} (${userData.role})`);
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    setWishlist([]);
    addNotification("Logged out successfully");
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const isAlreadyIn = prev.includes(id);
      if (isAlreadyIn) {
        addNotification("Removed listing from wishlist");
        return prev.filter(item => item !== id);
      } else {
        addNotification("Added listing to wishlist!");
        return [...prev, id];
      }
    });
  };

  const addToCompare = (listing) => {
    setCompareList(prev => {
      if (prev.find(item => item.id === listing.id)) {
        addNotification("Item already in comparison list");
        return prev;
      }
      if (prev.length >= 3) {
        addNotification("You can compare up to 3 listings at a time!");
        return prev;
      }
      addNotification(`Added ${listing.title} to comparison`);
      return [...prev, listing];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => prev.filter(item => item.id !== id));
    addNotification("Removed listing from comparison");
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const addBooking = (bookingData) => {
    setBookings(prev => [bookingData, ...prev]);
    addNotification(`Visit scheduled at ${bookingData.title} for ${bookingData.date}`);
  };

  const cancelBooking = (bookingId) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "Cancelled" } : b));
    addNotification("Booking visit cancelled successfully");
  };

  const addNotification = (text) => {
    setNotifications(prev => [
      { id: Date.now(), text, read: false, time: "Just now" },
      ...prev
    ]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Listings operations (for dashboard)
  const addListing = (newListing) => {
    setListings(prev => [newListing, ...prev]);
    addNotification(`Successfully added listing: ${newListing.title}`);
  };

  const updateListing = (updated) => {
    setListings(prev => prev.map(item => item.id === updated.id ? updated : item));
    addNotification(`Successfully updated listing: ${updated.title}`);
  };

  const deleteListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
    addNotification("Listing removed successfully");
  };

  // Mess operations
  const addMess = (newMess) => {
    setMesses(prev => [newMess, ...prev]);
    addNotification(`Successfully registered mess: ${newMess.title}`);
  };

  const updateMess = (updated) => {
    setMesses(prev => prev.map(item => item.id === updated.id ? updated : item));
    addNotification(`Successfully updated mess details: ${updated.title}`);
  };

  // Community operations
  const addCommunityPost = (newPost) => {
    setCommunityPosts(prev => [newPost, ...prev]);
    addNotification("Community post published!");
  };

  const upvotePost = (postId) => {
    setCommunityPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
    ));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      user,
      login,
      logout,
      listings,
      addListing,
      updateListing,
      deleteListing,
      messes,
      addMess,
      updateMess,
      roommates,
      setRoommates,
      communityPosts,
      addCommunityPost,
      upvotePost,
      wishlist,
      toggleWishlist,
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      bookings,
      addBooking,
      cancelBooking,
      notifications,
      addNotification,
      markNotificationsAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};
