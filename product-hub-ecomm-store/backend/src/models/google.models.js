const mongoose = require("mongoose");

const googleSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  googleId: String,
});

const googleModel = mongoose.model("googleuser", googleSchema);

module.exports = googleModel;

// w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50 text-gray-700 rounded-xl font-semibold text-sm transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md