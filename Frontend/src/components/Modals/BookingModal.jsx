import React from 'react';
import { Clock } from 'lucide-react';

const BookingModal = ({ service, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Confirm Booking</h3>
        <p className="text-gray-600 mb-6">
          You're about to book <span className="font-semibold text-gray-800">{service.title}</span> service.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center space-x-2 text-green-700">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Estimated arrival: 10-15 minutes</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(service)}
            className="flex-1 bg-green-300 hover:bg-green-400 text-gray-800 px-6 py-3 rounded-full font-medium transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
