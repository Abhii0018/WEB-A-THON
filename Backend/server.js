import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { verifyMail } from "./config/mail.js";

const PORT = process.env.PORT || 5000;

/**
 * Connect to MongoDB
 */
connectDB();

/**
 * Verify email configuration
 */
verifyMail();

/**
 * Start server
 */
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
});

/**
 * Handle unhandled promise rejections
 */
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

/**
 * Handle uncaught exceptions
 */
process.on("uncaughtException", (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});
