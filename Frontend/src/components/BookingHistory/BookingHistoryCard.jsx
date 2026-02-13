import React from 'react';
import { Clock } from 'lucide-react';

const BookingHistoryCard = ({ booking }) => {
  return (
    <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-sm text-gray-500">{booking.id}</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              {booking.status}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{booking.service}</h3>
          <p className="text-gray-600 text-sm">Arrival: {booking.arrivalTime}</p>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{booking.bookedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryCard;
