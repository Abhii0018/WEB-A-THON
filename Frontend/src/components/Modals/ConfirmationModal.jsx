import React from 'react';
import { CheckCircle } from 'lucide-react';

const ConfirmationModal = ({ booking, onClose }) => {
  const bookingDetails = [
    { label: 'Booking ID:', value: booking.id },
    { label: 'Service:', value: booking.service },
    { label: 'Arrival Time:', value: booking.arrivalTime },
    { label: 'Status:', value: booking.status, valueClass: 'text-green-600' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600">Your service provider is on the way</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6 space-y-3">
          {bookingDetails.map(({ label, value, valueClass }) => (
            <div key={label} className="flex justify-between">
              <span className="text-gray-600">{label}</span>
              <span className={`font-semibold text-gray-800 ${valueClass || ''}`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-green-300 hover:bg-green-400 text-gray-800 px-6 py-3 rounded-full font-medium transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
