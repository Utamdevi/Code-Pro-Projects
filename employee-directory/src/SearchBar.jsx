// SearchBar.js
import React, { useState, useRef, useEffect } from 'react';

export default function SearchBar({ searchTerm, onSearchChange, sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-row" ref={dropdownRef}>
      <div className="search-wrap">
        <i className="ti ti-search" aria-hidden="true"></i>
        <input
          type="text"
          placeholder="Search by name or role…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      {/* Filter Button */}
      <div className="relative">
        <button 
          className={`filter-btn ${isOpen ? 'active-btn' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="ti ti-adjustments-horizontal" aria-hidden="true"></i> Sort & Filter
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#24243e]/95 backdrop-blur-xl p-2 shadow-xl z-50 animate-fadeIn">
            <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/40">
              Sort Options
            </div>
            <button
              onClick={() => { onSortChange('default'); setIsOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${sortBy === 'default' ? 'bg-white/10 text-[#CCC9F4]' : 'text-white/70 hover:bg-white/5'}`}
            >
              Default (ID)
            </button>
            <button
              onClick={() => { onSortChange('alpha-asc'); setIsOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${sortBy === 'alpha-asc' ? 'bg-white/10 text-[#CCC9F4]' : 'text-white/70 hover:bg-white/5'}`}
            >
              Name: A to Z
            </button>
            <button
              onClick={() => { onSortChange('alpha-desc'); setIsOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${sortBy === 'alpha-desc' ? 'bg-white/10 text-[#CCC9F4]' : 'text-white/70 hover:bg-white/5'}`}
            >
              Name: Z to A
            </button>
          </div>
        )}
      </div>
    </div>
  );
}