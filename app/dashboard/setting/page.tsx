"use client"
import React, { useEffect, useState, useRef } from 'react'

function page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/90">
      <div className="w-full max-w-xl p-8 rounded-2xl border border-violet-700 shadow-2xl bg-black/80 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-8 text-white tracking-tight">Settings</h1>
        <div className="mb-8 flex items-center gap-4">
          <label className="flex items-center gap-3">
            <span className="text-lg text-white font-medium">Dark Mode</span>
            <span className="text-white text-opacity-60 text-sm">(Always On)</span>
          </label>
        </div>
        <div className="relative mb-8" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="px-5 py-3 bg-gradient-to-r from-violet-800 to-violet-600 border border-violet-700 rounded-xl shadow-lg text-white font-semibold flex items-center gap-2 hover:from-violet-700 hover:to-violet-500 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <span>More Settings</span>
            <svg className={`w-4 h-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {menuOpen && (
            <div className="absolute left-0 mt-3 w-56 bg-black/90 border border-violet-700 rounded-xl shadow-2xl z-20 animate-fade-in backdrop-blur-md">
              <button className="w-full text-left px-5 py-3 hover:bg-violet-800 text-white font-medium transition-colors rounded-t-xl">Contact Us</button>
              <button className="w-full text-left px-5 py-3 hover:bg-violet-800 text-white font-medium transition-colors">Account</button>
              <button className="w-full text-left px-5 py-3 hover:bg-violet-800 text-white font-medium transition-colors">Notifications</button>
              <button className="w-full text-left px-5 py-3 hover:bg-violet-800 text-white font-medium transition-colors rounded-b-xl">Privacy</button>
            </div>
          )}
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-2 text-white">Extra Settings</h2>
          <p className="text-gray-300">More settings coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default page