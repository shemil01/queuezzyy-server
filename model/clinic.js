const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { lat: Number, lon: Number },
    contactNumber: { type: String, required: true },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }], // Doctors in this clinic
    availability: [
      {
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
        day: { type: String, required: true }, // e.g., Monday, Tuesday
        tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Token " }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clinic", clinicSchema);
