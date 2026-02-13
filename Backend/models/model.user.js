import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email"
      ]
    },
    password: {
      type: String,
      required: function() {
        // Password is only required if firebaseUid is not present
        return !this.firebaseUid;
      },
      minlength: [6, "Password must be at least 6 characters long"],
      select: false // Hide password by default in queries
    },
    firebaseUid: {
      type: String,
      unique: true,
      sparse: true, // Allow null values, only enforce uniqueness when present
      index: true
    },
    photoURL: {
      type: String,
      default: null
    },
    authProvider: {
      type: String,
      enum: ["email", "google", "firebase"],
      default: "email"
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user", "employee"],
        message: "Role must be admin, user, or employee"
      },
      default: "user"
    },
    resetPasswordToken: {
      type: String,
      select: false
    },
    resetPasswordExpire: {
      type: Date,
      select: false
    }
  },
  {
    timestamps: true
  }
);

// ✅ Pre-save middleware: Hash password before saving
userSchema.pre("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) {
    return;
  }
  // bcryptjs: hash with rounds directly
  this.password = await bcrypt.hash(this.password, 10);
});

// ✅ Method: Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Method: Generate JWT
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "7d"
    }
  );
};

// ✅ Method: Generate reset password token
userSchema.methods.generateResetPasswordToken = function () {
  // Generate random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expiry (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  // Return unhashed token (to send via email)
  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
