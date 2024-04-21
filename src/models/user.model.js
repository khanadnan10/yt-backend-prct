import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "FullName is required"],
      trim: true,
    },
    avatar: {
      type: String, // storage url
      required: true,
    },
    coverImage: {
      type: String, // storage url
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

//! Middleware

// Encrypt password before registration
userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Verify Password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generating JWT tokens
userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
    email: this.email,
    fullName: this.fullName,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};
userSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
    username: this.username,
  };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
