import React, { useEffect, useState } from "react";

export default function Navbar({ onLogin, onLogout, loggedInUser }) {
  const [searchValue, setSearchValue] = useState("");
  const [utcTime, setUtcTime] = useState("");

  useEffect(() => {
    const formatUtc = () => {
      const now = new Date();
      const hh = String(now.getUTCHours()).padStart(2, "0");
      const mm = String(now.getUTCMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    };
    setUtcTime(formatUtc());
    const intervalId = setInterval(() => setUtcTime(formatUtc()), 1000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <nav className="w-full h-16 flex items-center justify-center px-6 fixed top-0 left-0 z-50" style={{background: 'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.8))'}}>
      <div className="flex w-full max-w-7xl items-center justify-between">
        {/* Left spacer */}
        <div className="flex-1"></div>

        {/* Centered Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
            <img 
              src="/UTMS.ico" 
              alt="UTMS Logo" 
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="text-xl font-bold text-white tracking-tight">
            UAV Traffic Management
          </div>
        </div>

        {/* Right spacer with Search Bar and Login Button */}
        <div className="flex-1 flex justify-end items-center space-x-4">
          {/* UTC Clock (left of Search Bar) */}
          <div className="text-white text-xs font-mono tabular-nums select-none" aria-label="Current UTC time" title="Current UTC time">
            {utcTime} UTC
          </div>
          {/* Search Bar */}
          <div className="relative">
            <input
              id="searchBox"
              autoComplete="off"
              data-testid="search__box"
              type="text"
              placeholder="Find drones, aviation zones and more"
              className="fr24-key-nav block w-80 !rounded-md border-slate-600 px-8 py-1.5 text-sm leading-8 text-gray-900 placeholder:text-gray-600 focus:border-yellow-500 focus:ring-yellow-500 !h-8 bg-white focus:outline-none"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <svg
              className="absolute left-2 top-1.5 h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {/* Login/Logout Button */}
          {loggedInUser ? (
            <div className="flex items-center space-x-3">
              
              <button
                className="flex h-9 flex-col items-center justify-center text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
                onClick={onLogout}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="fill-current size-5">
                  <path d="M12 2.182c-2.227 0-4.34.88-5.908 2.45-1.568 1.57-2.44 3.682-2.44 5.909s.872 4.34 2.44 5.909c1.568 1.57 3.68 2.45 5.908 2.45s4.34-.88 5.908-2.45c1.568-1.57 2.44-3.682 2.44-5.909s-.872-4.34-2.44-5.909C16.34 3.062 14.227 2.182 12 2.182zm0 15.272c-1.801 0-3.51-.705-4.78-1.975s-1.965-3.008-1.965-4.781.705-3.51 1.965-4.781S10.2 4.147 12 4.147s3.51.705 4.78 1.965 1.965 3.008 1.965 4.781-.705 3.51-1.965 4.781-3.007 1.975-4.78 1.975z" />
                  <path d="M12.982 12.982h-1.964V7.09h1.964v5.892z" />
                </svg>
                <span className="whitespace-nowrap text-xs uppercase">Log out</span>
              </button>
            </div>
          ) : (
            <button
              className="flex h-9 flex-col items-center justify-center text-yellow-500 hover:text-yellow-400 transition-colors duration-200"
              onClick={onLogin}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="fill-current size-5">
                <path fillRule="evenodd" d="M23.924 22.493a13.6 13.6 0 0 0-3.74-5.395 12.55 12.55 0 0 0-5.72-2.853c1.524-.604 2.8-1.754 3.605-3.25a7.73 7.73 0 0 0 .8-4.939c-.287-1.695-1.127-3.229-2.373-4.336A6.72 6.72 0 0 0 12.05 0a6.72 6.72 0 0 0-4.456 1.694c-1.253 1.099-2.1 2.628-2.397 4.321a7.73 7.73 0 0 0 .774 4.944c.797 1.5 2.067 2.658 3.587 3.27a12.56 12.56 0 0 0-5.694 2.778A13.6 13.6 0 0 0 .083 22.3c-.108.27-.11.574-.007.845.103.272.305.489.56.603a1 1 0 0 0 .798.008 1.08 1.08 0 0 0 .57-.593c.834-2.088 2.235-3.869 4.026-5.115a10.4 10.4 0 0 1 6.033-1.888c2.143.016 4.234.703 6.007 1.976 1.774 1.273 3.152 3.074 3.96 5.175.078.203.212.377.384.5.173.122.375.188.583.188a.9.9 0 0 0 .386-.087 1.07 1.07 0 0 0 .543-.593c.1-.265.099-.562-.004-.826zM7.132 7.369c0-1.022.286-2.02.823-2.87a4.95 4.95 0 0 1 2.19-1.903 4.63 4.63 0 0 1 2.82-.294 4.8 4.8 0 0 1 2.5 1.414 5.27 5.27 0 0 1 1.336 2.645 5.45 5.45 0 0 1-.277 2.985 5.1 5.1 0 0 1-1.798 2.319 4.7 4.7 0 0 1-2.713.87c-1.294 0-2.536-.544-3.451-1.513a5.32 5.32 0 0 1-1.43-3.653" clipRule="evenodd"></path>
              </svg>
              <span className="whitespace-nowrap text-xs uppercase">Log in</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
