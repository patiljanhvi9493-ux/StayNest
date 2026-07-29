import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center min-h-screen flex flex-col justify-center items-center">
      
      <div className="p-5 rounded-full bg-brand-rose-50 dark:bg-brand-rose-950/20 text-brand-rose-500 mb-6 animate-bounce-slow border border-brand-rose-100 dark:border-brand-rose-900/30">
        <ShieldAlert className="w-16 h-16 stroke-[1.5]" />
      </div>

      <h1 className="font-outfit font-black text-6xl text-slate-900 dark:text-white mb-2">404</h1>
      <h2 className="font-outfit font-extrabold text-xl text-slate-800 dark:text-slate-200 mb-4">Oops! Page Not Found</h2>
      
      <p className="text-xs text-slate-500 dark:text-slate-455 leading-relaxed mb-8 max-w-sm">
        The page you are looking for might have been moved, deleted, or is temporarily unavailable under local sandbox routing.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Link
          to="/"
          className="px-5 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Go Back Home</span>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850/50 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>
      </div>

    </div>
  );
}
