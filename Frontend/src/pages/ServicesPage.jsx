import React, { useEffect } from 'react';
import {
  Navigation,
  BookingModal,
  ConfirmationModal,
  ServicesSection,
  Footer
} from '../components';
import { useBooking } from '../hooks/useBooking';
import { SERVICES } from '../constants/services';

const ServicesPage = () => {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const {
    selectedService,
    showConfirmation,
    currentBooking,
    bookedServices,
    handleBookService,
    confirmBooking,
    closeConfirmation,
    closeModal
  } = useBooking();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f0] via-[#f5f5f0] to-[#d4e8d4]">
      <Navigation />

      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Services Section */}
          <ServicesSection
            services={SERVICES}
            onBook={handleBookService}
            bookedServices={bookedServices}
          />
        </div>
      </div>

      <Footer />

      {/* Modals */}
      {selectedService && (
        <BookingModal
          service={selectedService}
          onClose={closeModal}
          onConfirm={confirmBooking}
        />
      )}

      {showConfirmation && currentBooking && (
        <ConfirmationModal
          booking={currentBooking}
          onClose={closeConfirmation}
        />
      )}
    </div>
  );
};

export default ServicesPage;
