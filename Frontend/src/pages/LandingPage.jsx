import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { ArrowRight, Zap, Users, CheckCircle, Star } from 'lucide-react';
import cleanImage from '../assets/clean1.jpeg';
import electricianImage from '../assets/electrician.jpeg';
import plumberImage from '../assets/plumber.jpeg';
import cookImage from '../assets/cook.png';
import behaviorImage from '../assets/behaviour.jpeg';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-32 relative overflow-hidden rounded-3xl py-20 px-8">
            {/* Animated Background with Gradients */}
            <div className="absolute inset-0 -z-10 rounded-3xl">
              {/* Main gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl"></div>
              
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/4"></div>
              <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold mb-6">
                ✨ Your Trusted Help Marketplace
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
                Get Things Done,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                  Instantly
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Post any task, pick trusted professionals, and get it done. No hassles, just results.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
                <button
                  onClick={() => navigate('/categories')}
                  className="group relative px-10 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  Explore Categories
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* Hero Image Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl overflow-hidden shadow-2xl">
                <div className="h-48 md:h-64 overflow-hidden">
                  <img src={cleanImage} alt="Cleaning Service" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="h-48 md:h-64 overflow-hidden">
                  <img src={electricianImage} alt="Electrical Service" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="h-48 md:h-64 overflow-hidden">
                  <img src={plumberImage} alt="Plumbing Service" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="h-48 md:h-64 overflow-hidden">
                  <img src={cookImage} alt="Cooking Service" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
              <img src={cleanImage} alt="Cleaning" className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">10K+</h3>
                <p className="text-white/90">Tasks Completed</p>
              </div>
            </div>
            
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
              <img src={electricianImage} alt="Professionals" className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">500+</h3>
                <p className="text-white/90">Professional Helpers</p>
              </div>
            </div>
            
            <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
              <img src={behaviorImage} alt="Rating" className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold">4.9★</h3>
                <p className="text-white/90">Average Rating</p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-32">
            <h2 className="text-5xl font-bold text-gray-900 text-center mb-16">Why Choose Helpzo?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Side - Content */}
              <div className="space-y-8">
                <div className="flex gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/40 hover:border-green-300 hover:shadow-lg transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <Zap className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast</h3>
                    <p className="text-gray-600">Get matched with professionals within minutes and have your task started today.</p>
                  </div>
                </div>

                <div className="flex gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/40 hover:border-green-300 hover:shadow-lg transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <Users className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Professionals</h3>
                    <p className="text-gray-600">All our helpers are background checked and rated by real users.</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={plumberImage} alt="Professional Services" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
                <img src={cookImage} alt="Quality Service" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8 order-1 md:order-2">
                <div className="flex gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/40 hover:border-green-300 hover:shadow-lg transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">100% Satisfaction Guaranteed</h3>
                    <p className="text-gray-600">If you're not happy with the work, we'll make it right or refund you.</p>
                  </div>
                </div>

                <div className="flex gap-6 p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/40 hover:border-green-300 hover:shadow-lg transition-all">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <Star className="w-7 h-7 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Customer Support</h3>
                    <p className="text-gray-600">Our support team is always here to help with any questions or issues.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-10 opacity-90">Join thousands of happy users and get your tasks done today.</p>
            <button
              onClick={() => navigate('/auth')}
              className="px-12 py-4 bg-white text-green-600 font-bold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Sign Up Now
            </button>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
