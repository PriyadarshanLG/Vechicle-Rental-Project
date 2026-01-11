import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

// Modern Header component with glass morphism effect
const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check if we're on landing page (for transparent header)
  const isLandingPage = location.pathname === '/';

  // Detect scroll position to change header style
  useEffect(() => {
    if (!isLandingPage) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change header style after scrolling past hero section (approximately 600px)
      setScrolled(scrollPosition > 600);
    };

    window.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  // Use scrolled state to determine if header should be transparent or solid
  const shouldBeTransparent = isLandingPage && !scrolled;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 transition-all duration-500">
      <div className="container mx-auto px-4 max-w-7xl">
        <nav className={`rounded-2xl transition-all duration-500 ${
          shouldBeTransparent
            ? 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg' 
            : 'bg-white shadow-xl border border-gray-200'
        }`}>
          <div className="px-5 py-3 flex items-center justify-between">
          {/* Logo */}
          <Logo isLandingPage={shouldBeTransparent} />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-3">
            {!user && (
              <>
                <Link 
                  to="/" 
                  className={`group relative px-5 py-2.5 font-semibold transition-all duration-300 ${
                    shouldBeTransparent
                      ? 'text-white/90 hover:text-white'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  <span className="relative z-10">Home</span>
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    shouldBeTransparent ? 'bg-white' : 'bg-primary-600'
                  }`}></span>
                </Link>
                <Link 
                  to="/login" 
                  className={`group relative px-6 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
                    shouldBeTransparent
                      ? 'text-white border border-white/40 hover:border-white/80 bg-white/5 backdrop-blur-sm'
                      : 'text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-white/50 hover:bg-primary-50'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Login
                  </span>
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    shouldBeTransparent ? 'bg-white/10' : 'bg-primary-50'
                  }`}></div>
                </Link>
                <Link
                  to="/register"
                  className={`group relative px-8 py-2.5 rounded-full font-bold transition-all duration-300 overflow-hidden transform hover:scale-105 hover:shadow-2xl z-20 ${
                    shouldBeTransparent
                      ? 'bg-white text-primary-600 shadow-2xl hover:shadow-white/50 border-2 border-white/20'
                      : 'bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white shadow-xl hover:from-primary-700 hover:via-primary-800 hover:to-primary-900'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  {!shouldBeTransparent && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </Link>
              </>
            )}
            
            {user && (
              <>
                {isAdmin() ? (
                  <>
                    <Link 
                      to="/admin/dashboard" 
                      className={`group relative px-5 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
                        shouldBeTransparent
                          ? 'text-white border border-white/30 hover:border-white/60 bg-white/5 backdrop-blur-sm'
                          : 'text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-white/80 hover:bg-primary-50'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Admin
                      </span>
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        shouldBeTransparent ? 'bg-white/10' : 'bg-primary-50'
                      }`}></div>
                    </Link>
                    <Link 
                      to="/home" 
                      className={`group relative px-5 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
                        shouldBeTransparent
                          ? 'text-white border border-white/30 hover:border-white/60 bg-white/5 backdrop-blur-sm'
                          : 'text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-white/80 hover:bg-primary-50'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Vehicles
                      </span>
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        shouldBeTransparent ? 'bg-white/10' : 'bg-primary-50'
                      }`}></div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/dashboard" 
                      className={`group relative px-5 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
                        shouldBeTransparent
                          ? 'text-white border border-white/30 hover:border-white/60 bg-white/5 backdrop-blur-sm'
                          : 'text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-white/80 hover:bg-primary-50'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </span>
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        shouldBeTransparent ? 'bg-white/10' : 'bg-primary-50'
                      }`}></div>
                    </Link>
                    <Link 
                      to="/home" 
                      className={`group relative px-5 py-2.5 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
                        shouldBeTransparent
                          ? 'text-white border border-white/30 hover:border-white/60 bg-white/5 backdrop-blur-sm'
                          : 'text-gray-700 border border-gray-300 hover:border-primary-500 hover:text-primary-600 bg-white/80 hover:bg-primary-50'
                      }`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Vehicles
                      </span>
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        shouldBeTransparent ? 'bg-white/10' : 'bg-primary-50'
                      }`}></div>
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-300">
                  <div className={`flex items-center gap-2.5 px-4 py-2 rounded-full ${
                    shouldBeTransparent ? 'bg-white/10 backdrop-blur-sm border border-white/20' : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                      shouldBeTransparent 
                        ? 'bg-gradient-to-br from-white/30 to-white/10 text-white border border-white/30' 
                        : 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                    }`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className={`text-sm font-semibold ${
                      shouldBeTransparent ? 'text-white' : 'text-gray-700'
                    }`}>
                      {user.name.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-full font-semibold hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                shouldBeTransparent
                  ? 'text-white hover:bg-white/20'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-4 pb-4 border-t px-4 ${
            shouldBeTransparent ? 'border-white/20' : 'border-gray-200'
          }`}>
            <div className="flex flex-col space-y-2 pt-4">
              {!user ? (
                <>
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      shouldBeTransparent
                        ? 'text-white hover:bg-white/20'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className={`px-5 py-2.5 rounded-xl font-semibold border-2 text-center transition-all ${
                      shouldBeTransparent
                        ? 'text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                        : 'text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className={`px-6 py-2.5 rounded-full font-bold text-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      shouldBeTransparent
                        ? 'bg-white text-primary-600 border-2 border-white/20'
                        : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800'
                    }`}
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  {isAdmin() ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        onClick={closeMobileMenu}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          isLandingPage
                            ? 'text-white hover:bg-white/20'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/home"
                        onClick={closeMobileMenu}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          isLandingPage
                            ? 'text-white hover:bg-white/20'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Vehicles
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dashboard"
                        onClick={closeMobileMenu}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          isLandingPage
                            ? 'text-white hover:bg-white/20'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </Link>
                      <Link
                        to="/home"
                        onClick={closeMobileMenu}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          isLandingPage
                            ? 'text-white hover:bg-white/20'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        Vehicles
                      </Link>
                    </>
                  )}
                  <div className={`px-4 py-2 text-sm ${
                    shouldBeTransparent ? 'text-white' : 'text-gray-700'
                  }`}>
                    👤 {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all text-center"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
