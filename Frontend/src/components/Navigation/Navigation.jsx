import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          
          .helpzo-nav * {
            font-family: 'Poppins', sans-serif;
          }
          
          .logo-gradient {
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          .logo-text {
            background: linear-gradient(135deg, #1f2937 0%, #4b5563 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>
      
      <div className="helpzo-nav w-full pt-6 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <nav 
          className={`max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-full px-8 py-4 shadow-lg border border-gray-200/60 transition-all duration-500 ease-out ${
            isScrolled ? 'shadow-xl scale-[0.98]' : 'shadow-lg scale-100'
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="logo-gradient w-9 h-9 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                <Home className="w-5 h-5 text-white transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="logo-text text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105">
                Helpzo
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <a 
                href="#categories" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-semibold relative group"
              >
                Categories
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#services" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-semibold relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#how" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-semibold relative group"
              >
                How it works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="#contact" 
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-semibold relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Link
                to="/auth"
                className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm hover:shadow-xl hover:scale-105 active:scale-95 transform inline-block"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 transition-all duration-300 hover:scale-110 active:scale-95 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden mt-3 max-w-6xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl px-6 py-5 shadow-lg border border-gray-200/60 transition-all duration-500 origin-top ${
            mobileMenuOpen 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="space-y-4">
            <a 
              href="#categories" 
              className="block text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all duration-300 hover:translate-x-2 hover:scale-105"
            >
              Categories
            </a>
            <a 
              href="#services" 
              className="block text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all duration-300 hover:translate-x-2 hover:scale-105"
            >
              Services
            </a>
            <a 
              href="#how" 
              className="block text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all duration-300 hover:translate-x-2 hover:scale-105"
            >
              How it works
            </a>
            <a 
              href="#contact" 
              className="block text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all duration-300 hover:translate-x-2 hover:scale-105"
            >
              Contact
            </a>
            <Link
              to="/auth"
              className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 transform mt-2 inline-block text-center"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
