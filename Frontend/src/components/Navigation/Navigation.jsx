import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Menu, X, LogOut, User } from 'lucide-react';
import { getCurrentUser, logOut } from '../../services/authService';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for user on mount and location change
  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log('Navigation - Current user:', currentUser);
    setUser(currentUser);
  }, [location]);

  useEffect(() => {
    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      const updatedUser = getCurrentUser();
      console.log('Navigation - Storage changed, user:', updatedUser);
      setUser(updatedUser);
    };
    
    // Listen for custom login event
    const handleLoginEvent = () => {
      const updatedUser = getCurrentUser();
      console.log('Navigation - Login event, user:', updatedUser);
      setUser(updatedUser);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedIn', handleLoginEvent);
    window.addEventListener('userLoggedOut', handleLoginEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleLoginEvent);
      window.removeEventListener('userLoggedOut', handleLoginEvent);
    };
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    await logOut();
    setUser(null);
    setShowProfileMenu(false);
    navigate('/');
  };

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
          
          .profile-avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          }
          
          .profile-avatar:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
          
          .profile-dropdown {
            position: absolute;
            top: calc(100% + 12px);
            right: 0;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            min-width: 200px;
            padding: 8px;
            z-index: 1000;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
          
          .profile-menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 10px;
            transition: all 0.2s;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
          }
          
          .profile-menu-item:hover {
            background: #f3f4f6;
          }
          
          .profile-menu-item.logout {
            color: #dc2626;
          }
          
          .profile-menu-item.logout:hover {
            background: #fee2e2;
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
            <div 
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="logo-gradient w-9 h-9 rounded-xl flex items-center justify-center transform transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                <Home className="w-5 h-5 text-white transition-transform duration-500 group-hover:scale-110" />
              </div>
              <span className="logo-text text-2xl font-bold tracking-tight transition-all duration-300 group-hover:scale-105">
                Helpzo
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <button 
                onClick={() => navigate('/categories')}
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-semibold relative group"
              >
                Categories
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => navigate('/how-it-works')}
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-semibold relative group"
              >
                How it works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="text-gray-600 hover:text-gray-900 transition-all duration-300 text-sm font-semibold relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-600 to-gray-900 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>

            {/* CTA Button / Profile - Desktop */}
            <div className="hidden md:block relative">
              {user ? (
                <div className="relative">
                  <div 
                    className="profile-avatar"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    {getInitials(user.name)}
                  </div>
                  
                  {showProfileMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowProfileMenu(false)}
                      />
                      <div className="profile-dropdown">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                        </div>
                        <div className="py-2">
                          <div className="profile-menu-item">
                            <User className="w-4 h-4" />
                            <span>Profile</span>
                          </div>
                          <div 
                            className="profile-menu-item logout"
                            onClick={handleLogout}
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 text-sm hover:shadow-xl hover:scale-105 active:scale-95 transform inline-block"
                >
                  Sign Up
                </Link>
              )}
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
            <button 
              onClick={() => {
                navigate('/categories');
                setMobileMenuOpen(false);
              }}
              className="block text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all duration-300 hover:translate-x-2 hover:scale-105"
            >
              Categories
            </button>
            <button 
              onClick={() => {
                navigate('/how-it-works');
                setMobileMenuOpen(false);
              }}
              className="block text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all duration-300 hover:translate-x-2 hover:scale-105"
            >
              How it works
            </button>
            <button 
              onClick={() => {
                navigate('/contact');
                setMobileMenuOpen(false);
              }}
              className="block text-gray-600 hover:text-gray-900 text-sm font-semibold transition-all duration-300 hover:translate-x-2 hover:scale-105"
            >
              Contact
            </button>
            
            {user ? (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="px-2 py-3">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 transform mt-2 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 transform mt-2 inline-block text-center"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
