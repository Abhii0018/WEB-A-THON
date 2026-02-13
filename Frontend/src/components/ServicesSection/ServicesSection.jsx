import React from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';

const ServicesSection = ({ services, onBook, bookedServices }) => {
  return (
    <section id="services" className="pt-6 pb-12 scroll-mt-28">
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">Services</h2>
        <p className="text-gray-500 mt-3">
          Choose the help you need and book instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            image={service.image}
            onBook={() => onBook(service)}
            isBooked={bookedServices.has(service.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
