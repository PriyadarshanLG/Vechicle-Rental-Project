import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { videoConfig } from '../config/videoConfig';

// Professional Landing page component
const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect logged-in users to dashboard
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video Background */}
      <section className="relative text-white overflow-hidden min-h-screen flex items-center pt-16">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '100vh' }}
        >
          <source src={`/${videoConfig.localFileName}`} type="video/mp4" />
          {/* Fallback gradient if video fails to load */}
        </video>
        
        {/* Minimal dark overlay for text readability (very light) */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        <div className="relative container mx-auto px-4 py-24 md:py-32 z-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight tracking-tight">
              <span 
                className="block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0"
                style={{
                  animation: 'fadeInUpSlow 1s ease-out 0.2s forwards'
                }}
              >
                BOOK FASTER.
              </span>
              <span 
                className="block text-primary-200 drop-shadow-[0_4px_15px_rgba(0,0,0,0.4)] mt-2 opacity-0"
                style={{
                  animation: 'fadeInUpSlow 1s ease-out 0.5s forwards'
                }}
              >
                TRAVEL SMARTER.
              </span>
            </h1>

            {/* CTA Button */}
            <div 
              className="flex justify-center items-center opacity-0"
              style={{
                animation: 'fadeInScale 0.8s ease-out 0.8s forwards'
              }}
            >
              <Link
                to="/register"
                className="group relative px-10 py-4 bg-white text-primary-600 rounded-full font-bold text-lg md:text-xl shadow-2xl hover:shadow-white/40 transform hover:scale-105 transition-all duration-300 min-w-[220px] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Now
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { 
                number: '500+', 
                label: 'Vehicles Available', 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                )
              },
              { 
                number: '10K+', 
                label: 'Happy Customers', 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              { 
                number: '50+', 
                label: 'Cities Covered', 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                number: '24/7', 
                label: 'Support Available', 
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 hover:border-primary-200 transition-all duration-300"
              >
                <div className="flex justify-center mb-3 text-primary-600">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary-600">Rentme</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best vehicle rental experience with premium features and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { 
                title: 'Wide Selection', 
                desc: 'Choose from hundreds of premium cars and bikes. From economy to luxury, we have the perfect vehicle for every need and budget.',
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                title: 'Best Prices', 
                desc: 'Competitive daily rental rates with complete transparency. No hidden fees, no surprises. Get the best value for your money.',
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'from-green-500 to-emerald-500'
              },
              { 
                title: 'Easy Booking', 
                desc: 'Simple and fast booking process. Select your vehicle, choose dates, and confirm. Book your ride in just a few clicks.',
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                color: 'from-orange-500 to-amber-500'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-primary-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 text-white shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get started in 4 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { 
                step: '1', 
                title: 'Sign Up', 
                desc: 'Create your account in seconds', 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ), 
                color: 'from-blue-500 to-cyan-500' 
              },
              { 
                step: '2', 
                title: 'Browse Vehicles', 
                desc: 'Explore our wide selection', 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ), 
                color: 'from-purple-500 to-pink-500' 
              },
              { 
                step: '3', 
                title: 'Select Dates', 
                desc: 'Choose your rental period', 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ), 
                color: 'from-green-500 to-emerald-500' 
              },
              { 
                step: '4', 
                title: 'Book & Enjoy', 
                desc: 'Confirm and hit the road', 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ), 
                color: 'from-orange-500 to-red-500' 
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-primary-300 to-primary-400 z-0" style={{ width: 'calc(100% - 4rem)' }}></div>
                )}
                
                <div className="group relative bg-white p-6 rounded-xl text-center border-2 border-gray-100 hover:border-primary-300 shadow-md hover:shadow-lg transition-all duration-300">
                  <div className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10`}>
                    {item.step}
                  </div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white shadow-md`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by thousands of satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Sarah Johnson', role: 'Business Traveler', text: 'Amazing service! The booking process was so smooth and the vehicle was in perfect condition. Highly recommended!', rating: 5, avatar: 'SJ', color: 'from-blue-500 to-cyan-500' },
              { name: 'Michael Chen', role: 'Adventure Seeker', text: 'Best rental experience I\'ve ever had. Great prices and excellent customer support. Will definitely use again!', rating: 5, avatar: 'MC', color: 'from-purple-500 to-pink-500' },
              { name: 'Emily Davis', role: 'Weekend Explorer', text: 'Love how easy it is to find and book vehicles. The platform is user-friendly and the prices are unbeatable!', rating: 5, avatar: 'ED', color: 'from-green-500 to-emerald-500' }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-primary-200 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-700 mb-4 italic text-sm leading-relaxed">"{testimonial.text}"</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-base">{testimonial.name}</div>
                    <div className="text-xs text-gray-600 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative container mx-auto px-4 text-center z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the best vehicle rental service
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/register"
              className="group px-10 py-4 bg-white text-primary-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started Free
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <Link
              to="/login"
              className="px-10 py-4 bg-transparent border-2 border-white/80 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 min-w-[200px]"
            >
              Sign In
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-primary-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>Instant Booking</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
