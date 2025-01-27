const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    clinic: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic", required: false },
    date: { type: Date, required: true },
    token:{type:mongoose.Schema.Types.ObjectId,ref:"Token"},
    status: { type: String, enum: ["booked", "completed", "cancelled"], default: "booked" }
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
