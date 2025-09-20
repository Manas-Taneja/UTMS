import React from "react";

export default function Navbar({ onLogin }) {
  return (
    <nav className="w-full bg-white shadow-lg border-b border-gray-200 h-16 flex items-center justify-center px-6 fixed top-0 left-0 z-[9999] backdrop-blur-sm bg-white/95">
      <div className="flex w-full max-w-7xl items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="/UTMS.ico" 
              alt="UTMS Logo" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="text-xl font-bold text-gray-800 tracking-tight">
            UAV Traffic Management
          </div>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Flights
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
            Analytics
          </a>
        </div>

        {/* Login Button */}
        <div className="flex items-center space-x-4">
          <button
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}
