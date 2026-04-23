const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const loginModel = mongoose.model("login", loginSchema);

module.exports = loginModel;
