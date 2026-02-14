import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { getCurrentUser } from '../services/authService';
import { Users, Briefcase, DollarSign, Settings, BarChart3, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/auth?redirect=/dashboard/admin');
      return;
    }
    if (currentUser.role && currentUser.role.toLowerCase() !== 'admin') {
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                <Shield className="inline-block w-10 h-10 mr-3 text-red-500" />
                Admin Portal
              </h1>
              <p className="text-gray-600">Welcome back, {user.name}</p>
            </div>
            <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition">
              <Settings className="inline-block w-5 h-5 mr-2" />
              Settings
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-blue-500" />
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Total Users</h3>
              <p className="text-sm text-gray-400 mt-2">+0 new this month</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="w-8 h-8 text-purple-500" />
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Total Bookings</h3>
              <p className="text-sm text-gray-400 mt-2">+0 today</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-green-500" />
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Active Employees</h3>
              <p className="text-sm text-gray-400 mt-2">Service providers</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">$0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Revenue</h3>
              <p className="text-sm text-gray-400 mt-2">This month</p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Users */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Users</h2>
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No users yet</p>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Bookings</h2>
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No bookings yet</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Users className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Manage Users</h3>
              <p className="text-blue-50 text-sm">View and manage all users</p>
            </div>

            <button
              onClick={() => navigate('/admin/contacts')}
              className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Briefcase className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Contact Queries</h3>
              <p className="text-purple-50 text-sm">Manage customer inquiries</p>
            </button>

            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <BarChart3 className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-green-50 text-sm">View detailed reports</p>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Settings className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">My Profile</h3>
              <p className="text-gray-300 text-sm">Account settings</p>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
