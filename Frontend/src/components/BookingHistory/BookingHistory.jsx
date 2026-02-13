import React from 'react';
import BookingHistoryCard from './BookingHistoryCard';

const BookingHistory = ({ bookings }) => {
  if (bookings.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Booking History</h2>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <BookingHistoryCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
