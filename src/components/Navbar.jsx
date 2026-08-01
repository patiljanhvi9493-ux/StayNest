import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { 
  Sun, Moon, Bell, Menu, X, User, LogOut, Shield, 
  MapPin, CheckCircle, ChevronDown, RefreshCw, Home, Search
} from 'lucide-react';

export default function Navbar() {
  const { 
    theme, toggleTheme, user, login, logout, notifications, markNotificationsAsRead 
  } = useContext(AppContext);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleChange = (role) => {
    let mockUser = {
      name: "Siddharth Shinde",
      role: role,
      email: "siddharth.s@staynest.com",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    };

    if (role === 'Owner') {
      mockUser = {
        name: "Anil Deshmukh",
        role: "Owner",
        email: "anil.d@staynest.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      };
    } else if (role === 'Mess Owner') {
      mockUser = {
        name: "Savita Kadam",
        role: "Mess Owner",
        email: "savita.k@staynest.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
      };
    } else if (role === 'Admin') {
      mockUser = {
        name: "Admin Control",
        role: "Admin",
        email: "admin@staynest.com",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
      };
    }

    login(mockUser);
    setProfileDropdownOpen(false);
    
    // Redirect to the correct page based on role
    if (role === 'Owner') navigate('/provider-dashboard');
    else if (role === 'Mess Owner') navigate('/provider-dashboard');
    else if (role === 'Admin') navigate('/admin');
    else navigate('/seeker-dashboard');
  };

  const getNavLinks = () => {
    if (user?.role === 'Student') {
      return [
        { name: 'Dashboard', path: '/seeker-dashboard' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'PGs', path: '/pgs' },
        { name: 'Messes', path: '/messes' },
        { name: 'Nearby', path: '/nearby' },
        { name: 'Roommates', path: '/roommates' },
        { name: 'Compare', path: '/compare' },
        { name: 'Community', path: '/community' },
      ];
    }
    if (user?.role === 'Owner' || user?.role === 'Mess Owner') {
      return [
        { name: 'Dashboard', path: '/provider-dashboard' },
        { name: 'Community', path: '/community' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
      ];
    }
    if (user?.role === 'Admin') {
      return [
        { name: 'Admin Panel', path: '/admin' },
        { name: 'Rooms', path: '/rooms' },
        { name: 'Messes', path: '/messes' },
        { name: 'Community', path: '/community' },
      ];
    }
    return [
      { name: 'Home', path: '/' },
      { name: 'Rooms', path: '/rooms' },
      { name: 'PGs', path: '/pgs' },
      { name: 'Messes', path: '/messes' },
      { name: 'Nearby Services', path: '/nearby' },
      { name: 'Roommate Finder', path: '/roommates' },
      { name: 'Community', path: '/community' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 border-b border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-brand-rose-500 shadow-md shadow-primary-500/20 text-white font-outfit font-bold text-2xl">
              S
            </div>
            <span className="font-outfit font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary-600 to-brand-rose-500 dark:from-primary-400 dark:to-brand-rose-400 bg-clip-text text-transparent">
              StayNest
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-lg font-outfit font-medium text-sm transition-all duration-200 ${
                    isActive 
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileDropdownOpen(false);
                  if (!notificationsOpen) markNotificationsAsRead();
                }}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-rose-500 rounded-full animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="font-outfit font-semibold text-sm">Notifications</span>
                    <span className="text-xs text-primary-500">New alerts</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs text-slate-400">No notifications</div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-b-0">
                          <p className="text-xs text-slate-600 dark:text-slate-300">{notif.text}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen);
                    setNotificationsOpen(false);
                  }}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-primary-500/20"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-outfit font-semibold text-sm truncate">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400">
                        {user.role}
                      </span>
                    </div>

                    {/* Switch role helper */}
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center mb-1">
                        <RefreshCw className="w-3 h-3 mr-1 animate-spin-slow" /> Switch Simulator Role:
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {['Student', 'Owner', 'Mess Owner', 'Admin'].map((role) => (
                          <button
                            key={role}
                            onClick={() => handleRoleChange(role)}
                            className={`text-[10px] py-1 rounded text-center font-medium border transition-colors ${
                              user.role === role
                                ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            {role}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="p-1">
                      {user.role === 'Student' && (
                        <Link 
                          to="/seeker-dashboard" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-slate-400" />
                          <span>Seeker Dashboard</span>
                        </Link>
                      )}
                      {(user.role === 'Owner' || user.role === 'Mess Owner') && (
                        <Link 
                          to="/provider-dashboard" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <Shield className="w-4 h-4 text-slate-400" />
                          <span>Provider Dashboard</span>
                        </Link>
                      )}
                      {user.role === 'Admin' && (
                        <Link 
                          to="/admin" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <Shield className="w-4 h-4 text-slate-400" />
                          <span>Admin Panel</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="flex items-center space-x-2 px-3 py-2 text-sm text-brand-rose-600 hover:bg-brand-rose-50 dark:hover:bg-brand-rose-950/20 rounded-xl transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-md shadow-primary-500/10 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-4 px-6 space-y-2 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl font-outfit text-base font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 mt-4 text-base font-semibold rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
