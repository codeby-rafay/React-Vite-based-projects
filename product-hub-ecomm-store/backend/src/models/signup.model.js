const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  email: {
    type: String,
    unique: [ true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    default: null, // null for Google users
  },
  googleId: {
    type: String,
    default: null, // only set for regular users
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const signupModel = mongoose.model("signup", signupSchema);

module.exports = signupModel;
