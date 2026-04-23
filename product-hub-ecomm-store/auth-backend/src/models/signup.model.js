const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const signupModel = mongoose.model("signup", signupSchema);

module.exports = signupModel;
