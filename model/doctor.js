const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    clinics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" }],

    // personalClinic: {
    //   location: { latitude: Number, longitude: Number },
    //   availability: [
    //     {
    //       day: { type: String, required: true },
    //       token: [{ type: mongoose.Schema.Types.ObjectId, ref: Token }],
    //     },
    //   ],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
