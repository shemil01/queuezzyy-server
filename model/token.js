const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: false }, 
  day: { type: String, required: true },
  tokens: [
    {
      tokenNumber: { type: Number, required: true },
      time: { type: String, required: true },
      isBooked: { type: Boolean, default: false },
      bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Token", tokenSchema);
