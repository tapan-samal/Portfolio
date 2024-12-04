import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your fullname!"],
    minlength: [3, "Name must contain at least 3 characters!"],
    maxlength: [21, "Name cannot exceed 20 characters!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email Id!"],
    unique: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please provide a valid email address!",
    ],
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number!"],
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits!"],
  },
  aboutMe: {
    type: String,
    required: [true, "Please fill about me detail!"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password!"],
    minlength: [6, "Password must contain at least 6 characters!"],
    maxlength: [12, "Password cannot exceed 12 characters!"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioUrl: {
    type: String,
    required: [true, "Please provide portfolio URL!"],
  },
  githubUrl: String,
  linkedinUrl: String,
  twitterUrl: String,
  facebookUrl: String,
  instagramUrl: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Hashing password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Compare entered password with hashed password
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//Generate json web token
userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//Reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
