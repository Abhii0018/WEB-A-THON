import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"]
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"]
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "on_the_way", "completed", "cancelled"],
        message: "Status must be pending, confirmed, on_the_way, completed, or cancelled"
      },
      default: "pending"
    },
    eta: {
      type: Number, // ETA in minutes
      default: null
    },
    address: {
      type: String,
      trim: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"]
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ employee: 1, status: 1 });
// bookingId index already created by unique: true

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
