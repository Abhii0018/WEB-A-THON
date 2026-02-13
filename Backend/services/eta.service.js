/**
 * Generate random ETA between 5-15 minutes
 */
export const generateETA = () => {
  const minETA = 5;
  const maxETA = 15;
  return Math.floor(Math.random() * (maxETA - minETA + 1)) + minETA;
};
