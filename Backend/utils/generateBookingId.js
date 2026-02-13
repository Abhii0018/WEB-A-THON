/**
 * Generate unique booking ID
 * Format: BK{YYYYMMDD}{6-digit-random}
 * Example: BK202602131A2B3C
 */
export const generateBookingId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  
  // Generate 6 character alphanumeric random string
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomStr = "";
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `BK${year}${month}${day}${randomStr}`;
};
