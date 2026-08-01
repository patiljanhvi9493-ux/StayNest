import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginRegister() {
  const { login, user } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState('role-selection'); // 'role-selection' or 'auth'
  const [roleGroup, setRoleGroup] = useState(''); // 'seeker' or 'provider'
  const [selectedRole, setSelectedRole] = useState('Student'); // Student, Owner, Mess Owner, Admin

  const [isRegister, setIsRegister] = useState(false);
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
      if (roleParam === 'Student' || roleParam === 'Seeker') {
        setRoleGroup('seeker');
        setSelectedRole('Student');
        setStep('auth');
      } else if (roleParam === 'Owner' || roleParam === 'Mess Owner' || roleParam === 'Provider') {
        setRoleGroup('provider');
        setSelectedRole(roleParam === 'Mess Owner' ? 'Mess Owner' : 'Owner');
        setStep('auth');
      } else if (roleParam === 'Admin') {
        setRoleGroup('provider');
        setSelectedRole('Admin');
        setStep('auth');
      }
    }
  }, [location.search]);

  // If already logged in, redirect
  useEffect(() => {
    if (user) {
      if (user.role === 'Owner') navigate('/provider-dashboard');
      else if (user.role === 'Mess Owner') navigate('/provider-dashboard');
      else if (user.role === 'Admin') navigate('/admin');
      else navigate('/seeker-dashboard');
    }
  }, [user, navigate]);

  const handleSelectRoleGroup = (group) => {
    setRoleGroup(group);
    if (group === 'seeker') {
      setSelectedRole('Student');
    } else {
      setSelectedRole('Owner'); // default provider role
    }
    setStep('auth');
  };

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
      college: selectedRole === 'Student' ? "COEP College" : "None",
      budget: selectedRole === 'Student' ? 7000 : 0
    };

    login(userData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 transition-all min-h-screen flex flex-col justify-center">
      
      {step === 'role-selection' ? (
        <div className="w-full max-w-2xl mx-auto text-center space-y-10">
          
          <div>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Who are you?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-md mx-auto">
              Choose your profile type to continue. StayNest configures customized tools and dashboards for each workspace role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card One: Seeker */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-[32px] p-8 text-center flex flex-col justify-between shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl" />
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-primary-500/20 text-primary-500 flex items-center justify-center text-3xl mx-auto">
                  🎓
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg text-slate-850 dark:text-white">
                    Student / Tenant / Working Professional
                  </h3>
                  <p className="text-slate-450 dark:text-slate-400 text-xs leading-relaxed mt-2.5">
                    Find rooms, PGs, hostels, flats, messes, roommates and nearby services.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleSelectRoleGroup('seeker')}
                className="mt-8 w-full py-3 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Continue as Seeker
              </button>
            </motion.div>

            {/* Card Two: Provider */}
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-[32px] p-8 text-center flex flex-col justify-between shadow-lg relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-rose-500/10 rounded-full blur-2xl" />
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-brand-rose-500/20 text-brand-rose-500 flex items-center justify-center text-3xl mx-auto">
                  🏢
                </div>
                <div>
                  <h3 className="font-outfit font-black text-lg text-slate-850 dark:text-white">
                    Property Owner / PG Owner / Mess Owner
                  </h3>
                  <p className="text-slate-455 dark:text-slate-400 text-xs leading-relaxed mt-2.5">
                    List your rooms, PGs, hostels or mess and manage bookings.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleSelectRoleGroup('provider')}
                className="mt-8 w-full py-3 rounded-2xl bg-slate-950 dark:bg-brand-rose-500 hover:bg-slate-900 dark:hover:bg-brand-rose-400 text-white font-bold text-xs shadow-md transition-all"
              >
                Continue as Provider
              </button>
            </motion.div>

          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto w-full">
          {/* Back button */}
          <button
            onClick={() => setStep('role-selection')}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white mb-6 font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> <span>Back to Roles</span>
          </button>

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
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsRegister(true)}
                className={`py-2.5 rounded-xl font-outfit text-xs font-bold text-center transition-colors ${
                  isRegister
                    ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm border border-slate-200/40 dark:border-slate-800'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
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
                {roleGroup === 'seeker' 
                  ? 'Access student stays, mess cards, and roommate matcher'
                  : 'Manage properties, list dinner menus, and inspect analytics'}
              </p>
            </div>

            {/* Role selection chips within the group */}
            <div className="space-y-2 mb-6">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block pl-1">
                Selected Role
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {roleGroup === 'seeker' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('Student')}
                      className="py-2.5 rounded-xl text-[10px] font-bold bg-primary-500 text-white border border-primary-500 shadow-sm"
                    >
                      Student Seeker
                    </button>
                    <div className="py-2.5 rounded-xl text-[10px] font-bold bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                      Tenant / Professional
                    </div>
                  </>
                ) : (
                  <>
                    {['Owner', 'Mess Owner', 'Admin'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`py-2 rounded-xl text-[10px] font-bold border transition-colors ${
                          selectedRole === role
                            ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {role === 'Owner' ? 'Stay Owner' : role}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Field (Register only) */}
              {isRegister && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block pl-1">Full Name</label>
                  <div className="flex items-center bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-primary-500 transition-colors">
                    <input
                      type="text"
                      placeholder="e.g. Siddharth Shinde"
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
                <div className="flex items-center bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-primary-500 transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder={
                      selectedRole === 'Admin' 
                        ? 'admin@staynest.com' 
                        : selectedRole === 'Owner' 
                        ? 'anil.d@staynest.com' 
                        : selectedRole === 'Mess Owner' 
                        ? 'savita.k@staynest.com' 
                        : 'siddharth.s@staynest.com'
                    }
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
                <div className="flex items-center bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-xl px-3 py-2.5 focus-within:border-primary-500 transition-colors">
                  <Lock className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
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
                    className="text-slate-400 hover:text-slate-700 outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              {!isRegister && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer text-slate-550 dark:text-slate-405">
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
                    className="font-bold text-primary-500 hover:text-primary-600 hover:underline animate-fade-in"
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

            {/* Sandbox details */}
            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-850 text-[10px] text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl">
              <p className="font-bold text-slate-500 dark:text-slate-350 flex items-center mb-1">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-primary-500" /> Simulator Sandbox Mode:
              </p>
              <p>Any email/password will succeed. Use Student to check the Seeker dashboard, or Stay Owner/Mess Owner to test Provider dashboards.</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
