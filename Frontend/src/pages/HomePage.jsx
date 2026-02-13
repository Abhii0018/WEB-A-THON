import React, { useEffect } from 'react';
import {
  Navigation,
  BookingModal,
  ConfirmationModal,
  BookingHistory,
  Hero,
  ReviewSection,
  ServicesSection,
  HowItWorksSection,
  ContactSection,
  Footer
} from '../components';
import { useBooking } from '../hooks/useBooking';
import { SERVICES } from '../constants/services';

const HomePage = () => {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  const {
    selectedService,
    showConfirmation,
    currentBooking,
    bookingHistory,
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
          {/* Hero Section */}
          <Hero />

          {/* Reviews Section */}
          <ReviewSection />

          {/* Services Section */}
          <ServicesSection
            services={SERVICES}
            onBook={handleBookService}
            bookedServices={bookedServices}
          />

          {/* How It Works Section */}
          <HowItWorksSection />

          {/* Contact Section */}
          <ContactSection />

          {/* Booking History */}
          <BookingHistory bookings={bookingHistory} />
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

export default HomePage;
