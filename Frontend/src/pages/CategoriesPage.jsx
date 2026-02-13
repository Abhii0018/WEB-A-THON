import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { CATEGORIES } from '../constants/services';
import { ArrowRight } from 'lucide-react';

const CategoriesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <section className="text-center mb-16 scroll-mt-28">
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-6">
              Service
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                Categories
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive range of professional services. Click on any category to see available services.
            </p>
          </section>

          {/* Categories Grid */}
          <section className="mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50"
                >
                  {/* Image Container */}
                  <div className={`relative w-full h-48 overflow-hidden bg-gradient-to-br ${category.gradient}`}>
                    {/* Show image if available, otherwise show emoji */}
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    
                    {/* Emoji - Always visible as fallback */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                      {category.emoji}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                        View Services
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Info Section */}
          <section className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-12 text-center border border-green-200/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need something different?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find exactly what you're looking for? Post a custom task and let our network of professionals help you find a solution.
            </p>
            <button
              onClick={() => navigate('/services')}
              className="group relative px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              Browse All Services
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesPage;
