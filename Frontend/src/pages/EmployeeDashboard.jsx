import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { getCurrentUser } from '../services/authService';
import { Briefcase, DollarSign, Star, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/auth?redirect=/dashboard/employee');
      return;
    }
    if (currentUser.role && currentUser.role.toLowerCase() !== 'employee') {
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
              Employee Portal - {user.name}
            </h1>
            <p className="text-gray-600">Manage your jobs and earnings</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Briefcase className="w-8 h-8 text-purple-500" />
                <span className="text-3xl font-bold text-gray-900">0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Active Jobs</h3>
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
                <DollarSign className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-gray-900">$0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Earnings</h3>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <span className="text-3xl font-bold text-gray-900">0.0</span>
              </div>
              <h3 className="text-gray-600 font-semibold">Rating</h3>
            </div>
          </div>

          {/* Pending Jobs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pending Job Requests</h2>
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No pending job requests</p>
              <p className="text-sm text-gray-400">New job requests will appear here</p>
            </div>
          </div>

          {/* Active Jobs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Jobs</h2>
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No active jobs</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Briefcase className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">My Jobs</h3>
              <p className="text-purple-50 text-sm">View and manage your jobs</p>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <DollarSign className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Earnings</h3>
              <p className="text-green-50 text-sm">Track your income</p>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <Star className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Reviews</h3>
              <p className="text-blue-50 text-sm">View customer feedback</p>
            </div>

            <button
              onClick={() => navigate('/profile')}
              className="bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <User className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">My Profile</h3>
              <p className="text-gray-300 text-sm">Manage your account</p>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmployeeDashboard;
