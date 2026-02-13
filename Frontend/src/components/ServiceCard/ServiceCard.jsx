import React from 'react';

const ServiceCard = ({ title, image, onBook, isBooked }) => {
  return (
    <div className="relative rounded-[2rem] overflow-hidden min-h-[340px] border border-gray-200/40 shadow-sm hover:shadow-md transition-shadow">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      <div className="relative z-10 flex flex-col items-center justify-between min-h-[340px] p-6 text-white">
        <div className="flex flex-col items-center gap-3 pt-2">
          <h3 className="text-2xl font-semibold text-white text-center leading-tight">
            {title}
          </h3>
        </div>

        <button
          onClick={onBook}
          disabled={isBooked}
          className={`${
            isBooked
              ? 'bg-white/30 text-white/80'
              : 'bg-white/80 hover:bg-green-400 text-gray-800'
          } px-6 py-2 rounded-full font-medium transition-all text-sm shadow-sm disabled:cursor-not-allowed`}
        >
          {isBooked ? 'Booked' : 'Try now'}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
