const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const loginModel = mongoose.model("login", loginSchema);

module.exports = loginModel;
