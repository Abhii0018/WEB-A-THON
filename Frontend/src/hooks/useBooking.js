import { useState } from 'react';
import { createBooking } from '../utils/booking';

export const useBooking = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [bookedServices, setBookedServices] = useState(new Set());

  const handleBookService = (service) => {
    setSelectedService(service);
  };

  const confirmBooking = (service) => {
    const booking = createBooking(service.title);

    setCurrentBooking(booking);
    setBookingHistory([booking, ...bookingHistory]);
    setBookedServices(new Set([...bookedServices, service.id]));
    setSelectedService(null);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return {
    selectedService,
    showConfirmation,
    currentBooking,
    bookingHistory,
    bookedServices,
    handleBookService,
    confirmBooking,
    closeConfirmation,
    closeModal
  };
};
