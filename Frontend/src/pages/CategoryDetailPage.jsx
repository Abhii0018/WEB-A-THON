import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { CATEGORIES, CATEGORY_SERVICES } from '../constants/services';
import { ArrowLeft, Clock, DollarSign, Star } from 'lucide-react';

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === parseInt(categoryId));
  const services = CATEGORY_SERVICES[categoryId] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
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
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/categories')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold mb-8 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Categories
          </button>

          {/* Category Header */}
          <section className="mb-16 rounded-3xl overflow-hidden shadow-xl">
            <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${category.gradient}`}>
              {/* Show image if available */}
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}
              
              {/* Large Emoji - visible when no image or as fallback */}
              <div className="absolute inset-0 flex items-center justify-center text-9xl" style={{opacity: category.image ? '0.1' : '0.3'}}>
                {category.emoji}
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 p-8 text-white h-full flex flex-col justify-end">
                <h1 className="text-5xl font-bold mb-3">{category.name}</h1>
                <p className="text-xl text-white/90">{category.description}</p>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section>
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Available Services in {category.name}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-200/50"
                >
                  {/* Image Background or Gradient Header */}
                  {service.image ? (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{service.name}</h3>
                        <p className="text-white/90 text-sm">{service.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                      <p className="text-white/90">{service.description}</p>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="text-2xl font-bold text-gray-900">${service.price}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="text-lg font-semibold text-gray-900">{service.duration}</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(120 reviews)</span>
                    </div>

                    {/* Book Button */}
                    <button 
                      onClick={() => navigate(`/booking/${category.id}/${service.id}`)}
                      className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {services.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No services available for this category yet.</p>
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="mt-20 bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-xl mb-8 opacity-90">Post a custom task and let our professionals help you</p>
            <button className="px-10 py-4 bg-white text-green-600 font-bold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Create Custom Task
            </button>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryDetailPage;
