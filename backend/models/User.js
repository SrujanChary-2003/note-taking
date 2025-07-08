const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  email: { type: String, unique: true },
  otp: String,
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);