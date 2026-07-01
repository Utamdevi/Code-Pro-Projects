import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, RefreshCw } from 'lucide-react';
import { ALL_ACTIVITIES } from '../data/mockActivities';
import { getMetaForActivity } from '../utilities/activityHelpers';

const PAGE_SIZE = 4;

export default function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);

  // Total pages calculation
  const totalPages = Math.ceil(ALL_ACTIVITIES.length / PAGE_SIZE);

  // Simulate API Fetching
  const fetchActivities = () => {
    setLoading(true);
    // Mimic real API network delays
    setTimeout(() => {
      setActivities(ALL_ACTIVITIES);
      setLoading(false);
      setTimeLeft(30);
    }, 600);
  };

  // Run on mount and trigger mock API fetch
  useEffect(() => {
    fetchActivities();
  }, []);

  // 30 Seconds Countdown Timer logic
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          fetchActivities(); // Refresh data when timer hits 0
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading]);

  // Pagination Window Slice
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedItems = activities.slice(startIndex, startIndex + PAGE_SIZE);

  const handleToggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setExpandedId(null);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setExpandedId(null);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-800 p-6 transition-all duration-300">
      
      {/* Header Container */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            Activity Feed
            <button 
              onClick={fetchActivities} 
              disabled={loading}
              className={`p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-transform ${loading ? 'animate-spin' : ''}`}
              title="Force Refresh Data"
            >
              <RefreshCw size={16} />
            </button>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Live updates auto-refreshing in <span className="font-semibold text-indigo-600 dark:text-indigo-400">{timeLeft}s</span>
          </p>
        </div>

        {/* Live Indicator Dot */}
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-900/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Live</span>
        </div>
      </div>

      {/* Feed List Container */}
      <div className="bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-xl overflow-hidden min-h-[360px] flex flex-col justify-between">
        
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 py-12">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">Fetching secure records...</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {paginatedItems.map((item) => {
              const meta = getMetaForActivity(item.type);
              const isExpanded = expandedId === item.id;
              const IconComponent = meta.icon;

              return (
                <div key={item.id} className="transition-colors duration-150 hover:bg-white/40 dark:hover:bg-slate-900/40">
                  {/* Row Interactive Header */}
                  <div 
                    onClick={() => handleToggleExpand(item.id)}
                    className="flex items-center gap-4 p-4 cursor-pointer select-none"
                  >
                    {/* User Avatar Initials */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shadow-sm flex-shrink-0">
                      {item.initials}
                    </div>

                    {/* Action Meta Texts */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-tight">
                        <span className="font-semibold text-slate-900 dark:text-white">{item.user}</span>{' '}
                        <span className="text-slate-500 dark:text-slate-400">{item.action}</span>
                      </p>
                      <span className="text-xs text-slate-400 dark:text-slate-500 mt-1 block font-medium">
                        {item.time}
                      </span>
                    </div>

                    {/* Styled Contextual Icon badge */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${meta.bg} ${meta.text}`}>
                      <IconComponent size={15} />
                    </div>

                    {/* Arrow Indicator Toggle */}
                    <ChevronDown 
                      size={16} 
                      className={`text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-indigo-500' : ''}`} 
                    />
                  </div>

                  {/* Expandable Meta Drawer panel */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 border-t border-slate-100 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/20' : 'max-h-0'}`}>
                    <div className="p-4 pl-18 pr-6">
                      <div className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-1">
                        Activity Payload Details
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination Actions Bar Footer */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handlePrevPage}
          disabled={page === 1 || loading}
          className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages || loading}
          className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}