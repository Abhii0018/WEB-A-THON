import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { getCurrentUser } from '../services/authService';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/auth?redirect=/dashboard/user');
      return;
    }
    if (currentUser.role && currentUser.role.toLowerCase() !== 'user') {
      navigate(`/dashboard/${currentUser.role.toLowerCase()}`);
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-600">Manage your bookings and explore services</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-blue-500" />
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Active Bookings</h3>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Completed</h3>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Pending</h3>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No bookings yet</p>
              <button
                onClick={() => navigate('/categories')}
                className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition"
              >
                Browse Services
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => navigate('/categories')}
              className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-8 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold mb-2">Book a Service</h3>
              <p className="text-green-50">Browse and book from our wide range of services</p>
            </button>

            <button
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-8 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold mb-2">My Profile</h3>
              <p className="text-purple-50">View and edit your account information</p>
            </button>

            <button
              onClick={() => navigate('/how-it-works')}
              className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-8 text-left hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold mb-2">How It Works</h3>
              <p className="text-blue-50">Learn how to get the most out of our platform</p>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
