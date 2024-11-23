const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: false },
    date: { type: Date, required: true },
    token: {
      time: { type: String, required: true }, 
      isConfirmed: { type: Boolean, default: false },
    },
    notes: { type: String }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
