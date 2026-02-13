import React from 'react';

const steps = [
  {
    title: 'Post your need',
    description: 'Describe the task, budget, and preferred time.'
  },
  {
    title: 'Get matched fast',
    description: 'We connect you with verified professionals nearby.'
  },
  {
    title: 'Review options',
    description: 'Compare ratings, pricing, and availability in minutes.'
  },
  {
    title: 'Confirm booking',
    description: 'Select a provider and lock in your slot.'
  },
  {
    title: 'Track and finish',
    description: 'Follow arrival in real time and get it done.'
  },
  {
    title: 'Pay securely',
    description: 'Cashless payments with transparent invoices.'
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how" className="py-14 scroll-mt-28">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">How it works</h2>
        <p className="text-gray-500 mt-3">Everything you need, from request to completion.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-2xl border border-gray-200/40 bg-white/60 backdrop-blur-sm p-6 shadow-sm"
          >
            <div className="text-sm font-semibold text-gray-500">Step {index + 1}</div>
            <h3 className="text-xl font-semibold text-gray-800 mt-2">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
