const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
    date: { type: Date, required: true }, 
    time: { type: String, required: true },
    token: { type: mongoose.Schema.Types.ObjectId, ref: "Token", required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking",bookingSchema)