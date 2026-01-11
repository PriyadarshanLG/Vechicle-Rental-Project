import React from 'react';
import { Link } from 'react-router-dom';

// Wonderful Modern Rentme Logo Component
const Logo = ({ className = '', isLandingPage = false }) => {
  const textColor = isLandingPage ? 'text-white' : 'text-primary-600';
  const iconColor = isLandingPage ? 'text-white' : 'text-primary-600';
  const strokeColor = isLandingPage ? 'stroke-white' : 'stroke-primary-600';
  const fillColor = isLandingPage ? 'fill-white' : 'fill-primary-600';

  return (
    <Link 
      to="/" 
      className={`inline-flex items-center gap-3 group transition-all duration-300 ${className}`}
    >
      {/* Elegant Logo Icon - Stylized Key/Circle */}
      <div className={`relative ${iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Outer Circle with Gradient Effect */}
          <circle 
            cx="24" 
            cy="24" 
            r="20" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            className="opacity-30"
          />
          {/* Inner Circle */}
          <circle 
            cx="24" 
            cy="24" 
            r="14" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="opacity-50"
          />
          {/* Key Shape - Modern Design */}
          <path 
            d="M24 10C24 10 18 14 18 20C18 24 20 26 24 28C28 26 30 24 30 20C30 14 24 10 24 10Z" 
            fill="currentColor"
            className="opacity-80"
          />
          {/* Key Handle */}
          <circle 
            cx="24" 
            cy="20" 
            r="3" 
            fill="currentColor"
            className="opacity-90"
          />
          {/* Decorative Dot */}
          <circle 
            cx="24" 
            cy="24" 
            r="2" 
            fill="currentColor"
            className="opacity-60"
          />
        </svg>
      </div>
      
      {/* Logo Text with Beautiful Gradient */}
      <div className="flex flex-col">
        <span className={`text-3xl md:text-4xl font-black leading-tight tracking-tight ${textColor} transition-all duration-300 group-hover:scale-105`}>
          <span className="bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800 bg-clip-text text-transparent drop-shadow-sm">
            Rent
          </span>
          <span className={`${textColor} font-extrabold`}>me</span>
        </span>
        <span className={`text-[11px] md:text-xs font-semibold tracking-wider uppercase ${isLandingPage ? 'text-white/80' : 'text-primary-500'} -mt-1`}>
          Premium Rentals
        </span>
      </div>
    </Link>
  );
};

export default Logo;
