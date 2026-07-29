import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, UserCheck, RefreshCw } from 'lucide-react';

export default function LoginRegister() {
  const { login, user } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Check if role is pre-defined in URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam) {
      setSelectedRole(roleParam);
    }
  }, [location.search]);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.role === 'Owner') navigate('/owner-dashboard');
      else if (user.role === 'Mess Owner') navigate('/mess-dashboard');
      else if (user.role === 'Admin') navigate('/admin');
      else navigate('/profile');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    let mockAvatar = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80";
    if (selectedRole === 'Owner') {
      mockAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80";
    } else if (selectedRole === 'Mess Owner') {
      mockAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80";
    } else if (selectedRole === 'Admin') {
      mockAvatar = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80";
    }

    const userData = {
      name: isRegister ? name : name || (selectedRole === 'Admin' ? 'Admin Control' : selectedRole === 'Owner' ? 'Anil Deshmukh' : selectedRole === 'Mess Owner' ? 'Savita Kadam' : 'Siddharth Shinde'),
      role: selectedRole,
      email: email,
      avatar: mockAvatar,
      college: selectedRole === 'Student' ? "COEP College" : "None"
    };

    login(userData);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 transition-all min-h-screen flex flex-col justify-center">
      <div className="bg-white dark:bg-slate-900 border border-slate-150/40 dark:border-slate-800 rounded-[32px] p-8 shadow-xl relative overflow-hidden">
        
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-rose-500/10 rounded-full blur-2xl" />

        {/* Tab Selector */}
        <div className="grid grid-cols-2 gap-2 mb-8 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-850">
          <button
            onClick={() => setIsRegister(false)}
            className={`py-2.5 rounded-xl font-outfit text-xs font-bold text-center transition-colors ${
              !isRegister
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm border border-slate-200/40 dark:border-slate-800'
                : 'text-slate-505 dark:text-slate-450 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`py-2.5 rounded-xl font-outfit text-xs font-bold text-center transition-colors ${
              isRegister
                ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm border border-slate-200/40 dark:border-slate-800'
                : 'text-slate-550 dark:text-slate-450 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Title */}
        <div className="text-center mb-8">
          <h2 className="font-outfit font-extrabold text-2xl text-slate-900 dark:text-white">
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister ? 'Sign up to discover stays & meals' : 'Sign in to access your dashboard & details'}
          </p>
        </div>

        {/* Role Selector Badge group */}
        <div className="space-y-2 mb-6">
          <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block pl-1">
            Select Your Platform Role
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {['Student', 'Owner', 'Mess Owner', 'Admin'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`py-2 rounded-xl text-[10px] font-bold border transition-colors ${
                  selectedRole === role
                    ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-650 dark:text-slate-400 border-slate-100 dark:border-slate-855 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {role === 'Owner' ? 'Stay Owner' : role}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name Field (Register only) */}
          {isRegister && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block pl-1">Full Name</label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-primary-500 transition-colors">
                <input
                  type="text"
                  placeholder="e.g. Rahul Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent text-xs w-full font-semibold focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block pl-1">Email Address</label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-primary-500 transition-colors">
              <Mail className="w-4 h-4 text-slate-450 mr-2 flex-shrink-0" />
              <input
                type="email"
                placeholder={selectedRole === 'Admin' ? 'admin@staynest.com' : selectedRole === 'Owner' ? 'anil.d@staynest.com' : selectedRole === 'Mess Owner' ? 'savita.k@staynest.com' : 'siddharth.s@staynest.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-xs w-full font-semibold focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block pl-1">Password</label>
            <div className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-primary-500 transition-colors">
              <Lock className="w-4 h-4 text-slate-450 mr-2 flex-shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-xs w-full font-semibold focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-405 hover:text-slate-700 outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot Password */}
          {!isRegister && (
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-slate-500 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-800 text-primary-600 focus:ring-primary-500 w-3.5 h-3.5 bg-transparent"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Simulation: Reset email link has been sent to " + (email || "your address"))}
                className="font-bold text-primary-500 hover:text-primary-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 mt-6 rounded-2xl bg-gradient-to-r from-primary-600 to-brand-rose-500 hover:from-primary-500 hover:to-brand-rose-400 text-white font-bold text-sm shadow-md shadow-primary-500/10 flex items-center justify-center space-x-1.5"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
          </button>

        </form>

        {/* Demo Credentials hint bar */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-850 text-[10px] text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl">
          <p className="font-bold text-slate-550 dark:text-slate-350 flex items-center mb-1">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-primary-500" /> Simulator Sandbox Mode:
          </p>
          <p>Any email/password combination will succeed. Use the navbar switcher or role chips to test Student, Owner, Mess Owner, and Admin views.</p>
        </div>

      </div>
    </div>
  );
}
