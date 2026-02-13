import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';
import { CheckCircle, Clock, Users, Shield, Zap, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Post your need',
    description: 'Describe the task, budget, and preferred time.',
    icon: 'edit'
  },
  {
    title: 'Get matched fast',
    description: 'We connect you with verified professionals nearby.',
    icon: 'users'
  },
  {
    title: 'Review options',
    description: 'Compare ratings, pricing, and availability in minutes.',
    icon: 'search'
  },
  {
    title: 'Confirm booking',
    description: 'Select a provider and lock in your slot.',
    icon: 'check'
  },
  {
    title: 'Track and finish',
    description: 'Follow arrival in real time and get it done.',
    icon: 'map'
  },
  {
    title: 'Pay securely',
    description: 'Cashless payments with transparent invoices.',
    icon: 'credit'
  }
];

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Get matched with professionals in minutes, not days.'
  },
  {
    icon: Shield,
    title: 'Peace of Mind',
    description: 'All professionals are verified and insured.'
  },
  {
    icon: Users,
    title: 'Real Ratings',
    description: 'Choose from verified reviews by real customers.'
  },
  {
    icon: Zap,
    title: 'Instant Support',
    description: '24/7 customer support for any issues or concerns.'
  }
];

const HowItWorksPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getIcon = (iconName) => {
    const iconMap = {
      edit: '📝',
      users: '👥',
      search: '🔍',
      check: '✅',
      map: '📍',
      credit: '💳'
    };
    return iconMap[iconName] || '🔹';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#ffffff] to-[#f0f9f0]">
      <Navigation />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24">
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-6">
              How It
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                Works
              </span>
            </h1>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From task to completion - a simple 6-step process that gets your work done.
            </p>
          </section>

          {/* Main How It Works Section */}
          <section className="mb-32 scroll-mt-28">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="rounded-2xl border border-gray-200/60 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full relative overflow-hidden">
                    {/* Background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Step number with background */}
                    <div className="relative flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                          Step {index + 1}
                        </span>
                      </div>
                      <div className="text-4xl">{getIcon(step.icon)}</div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 w-0 group-hover:w-full transition-all duration-300"></div>
                  </div>

                  {/* Arrow between cards (desktop only) */}
                  {index < steps.length - 1 && index % 3 !== 2 && (
                    <div className="hidden lg:flex absolute -right-6 top-1/2 transform translate-y-1/2 text-green-400 z-10">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-32">
            <h2 className="text-5xl font-bold text-gray-900 text-center mb-16">
              Why Choose Helpzo?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-6 p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Timeline Section */}
          <section className="mb-32 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Average Timeline
            </h2>

            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ⏱️
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Posting: 2 minutes</p>
                  <p className="text-gray-600">Describe your task and requirements</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ⏱️
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Matching: 3-5 minutes</p>
                  <p className="text-gray-600">Get matched with nearby professionals</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ⏱️
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Booking: 2-3 minutes</p>
                  <p className="text-gray-600">Review options and confirm your choice</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ⏱️
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Execution: Varies</p>
                  <p className="text-gray-600">Professional arrives and completes your task</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-10 text-lg">
              <strong>Total time to booking: Less than 15 minutes!</strong>
            </p>
          </section>

          {/* FAQ Preview Section */}
          <section className="mb-32">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
              Common Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg">
                <div className="flex gap-4 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">
                    What if I'm not satisfied?
                  </h3>
                </div>
                <p className="text-gray-600">
                  We offer a satisfaction guarantee. If the work isn't completed to your standards, we'll either fix it or refund you.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg">
                <div className="flex gap-4 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">
                    How are professionals verified?
                  </h3>
                </div>
                <p className="text-gray-600">
                  All professionals undergo background checks and are rated by customers. Only top-rated professionals are available.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg">
                <div className="flex gap-4 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Is payment secure?
                  </h3>
                </div>
                <p className="text-gray-600">
                  Yes, we use encrypted payment processing. You only pay after the work is completed.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-lg">
                <div className="flex gap-4 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Can I reschedule?
                  </h3>
                </div>
                <p className="text-gray-600">
                  Yes, you can reschedule up to 2 hours before the appointment without any penalty.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-10 opacity-90 max-w-xl mx-auto">
              It's easy! Follow these simple steps and get your task done today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => navigate('/services')}
                className="px-10 py-4 bg-white text-green-600 font-bold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                View Services
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/auth')}
                className="px-10 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full text-lg transition-all duration-300"
              >
                Sign Up Now
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
