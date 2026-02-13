import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email"
      ]
    },
    otp: {
      type: String,
      required: [true, "OTP is required"]
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL index - automatically delete when expired
    }
  },
  {
    timestamps: true
  }
);

// Hash OTP before saving
otpSchema.pre("save", async function () {
  if (!this.isModified("otp")) {
    return;
  }
  // bcryptjs: hash with rounds directly
  this.otp = await bcrypt.hash(this.otp, 10);
});

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
