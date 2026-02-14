import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { CATEGORIES, CATEGORY_SERVICES } from '../constants/services';
import { ArrowLeft, Calendar, Clock, DollarSign, User, Mail, Phone, MapPin } from 'lucide-react';

const BookingPage = () => {
  const { serviceId, categoryId } = useParams();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [service, setService] = useState(null);
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is logged in
    const firebaseToken = localStorage.getItem('firebaseToken');
    if (!firebaseToken) {
      // Redirect to auth page with booking intent
      navigate(`/auth?redirect=/booking/${categoryId}/${serviceId}`);
      return;
    }
    
    setIsLoggedIn(true);

    // Find the service and category
    if (categoryId && serviceId) {
      const services = CATEGORY_SERVICES[categoryId];
      const foundService = services?.find(s => s.id === parseInt(serviceId));
      const foundCategory = CATEGORIES.find(c => c.id === parseInt(categoryId));
      
      setService(foundService);
      setCategory(foundCategory);
    }
  }, [categoryId, serviceId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address || !formData.date || !formData.time) {
      alert('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      // TODO: Send booking to backend
      console.log('Booking submitted:', {
        ...formData,
        serviceId: parseInt(serviceId),
        categoryId: parseInt(categoryId),
        serviceName: service?.name,
        price: service?.price,
        duration: service?.duration
      });

      alert('Booking confirmed! We will contact you shortly.');
      // Stay on current page - don't redirect
    } catch (error) {
      alert('Error submitting booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl text-gray-600 mb-8">Redirecting to login...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service || !category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
            <button
              onClick={() => navigate('/categories')}
              className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition"
            >
              Back to Categories
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/category/${categoryId}`)}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-8 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h3>
                
                <div className="space-y-4">
                  {/* Price */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Price</p>
                      <p className="text-2xl font-bold text-gray-900">${service.price}</p>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="text-lg font-semibold text-gray-900">{service.duration}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                    <span className="text-xl">{category.emoji}</span>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="text-lg font-semibold text-gray-900">{category.name}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Description</p>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                </div>

                {/* Summary Box */}
                <div className="mt-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                  <p className="text-sm text-gray-600 mb-2">Total Amount</p>
                  <p className="text-3xl font-bold text-green-600">${service.price}</p>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h2>
                <p className="text-gray-600 mb-8">Please provide your details to confirm the booking</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Service Location
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address, apartment/unit number, city, state, zip code"
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Booking Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>

                      {/* Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Time *
                        </label>
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests or Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special requests or additional information..."
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    </button>
                    <p className="text-sm text-gray-600 text-center mt-4">
                      By booking, you agree to our terms and conditions
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;
