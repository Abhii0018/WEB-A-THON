export const generateBookingId = () => {
  return 'BK' + Math.random().toString(36).substr(2, 8).toUpperCase();
};

export const getCurrentTime = () => {
  return new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export const getArrivalTime = (minMinutes = 10, maxMinutes = 15) => {
  const now = new Date();
  const randomMinutes = minMinutes + Math.floor(Math.random() * (maxMinutes - minMinutes));
  const arrival = new Date(now.getTime() + randomMinutes * 60000);

  return arrival.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

export const createBooking = (serviceTitle) => {
  return {
    id: generateBookingId(),
    service: serviceTitle,
    arrivalTime: getArrivalTime(),
    status: 'Confirmed',
    bookedAt: getCurrentTime()
  };
};
