const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  location: { type: { lat: Number, lon: Number } }, 
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
