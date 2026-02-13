import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      unique: true,
      minlength: [3, "Service title must be at least 3 characters long"],
      maxlength: [100, "Service title cannot exceed 100 characters"]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;
