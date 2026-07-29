import React from 'react';

export default function SkeletonLoader({ type = 'room' }) {
  if (type === 'mess') {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] overflow-hidden p-5 space-y-4 animate-pulse">
        <div className="aspect-[16/10] bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
          </div>
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          <div className="space-y-2 pt-2">
            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full pt-2" />
        </div>
      </div>
    );
  }

  // Default: Room Card Skeleton
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] overflow-hidden p-5 space-y-4 animate-pulse">
      <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24" />
        </div>
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
        <div className="flex space-x-2 pt-2">
          <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-lg w-20" />
          <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-lg flex-grow" />
        </div>
      </div>
    </div>
  );
}
