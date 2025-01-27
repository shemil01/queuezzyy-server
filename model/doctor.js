const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true }, 
    clinics: [
      {
        clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" }, 
        availability: [
          {
            day: { type: String, required: true }, 
            tokens: [{type:mongoose.Schema.Types.ObjectId,ref:"Token "}],
          },
        ],
      },
    ],
    personalClinic: {
      location: { lat: Number, lon: Number }, 
      availability: [
        {
          day: { type: String, required: true },
          tokens: [
            {
              time: { type: String, required: true },
              isBooked: { type: Boolean, default: false },
            },
          ],
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
