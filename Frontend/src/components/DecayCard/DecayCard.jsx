import React from 'react';

const DecayCard = ({
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  children
}) => {
  return (
    <div
      className="relative rounded-[2rem] overflow-hidden border border-gray-200/40 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-500 ease-out hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      <div className="absolute bottom-[1.2em] left-[1em] tracking-[-0.5px] font-black text-[1.4rem] leading-[1.4em] text-white drop-shadow-md">
        {children}
      </div>
    </div>
  );
};

export default DecayCard;
