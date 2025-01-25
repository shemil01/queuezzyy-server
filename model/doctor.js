const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true }, 
    clinics: [
      {
        clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "Clinic" }, // Associated clinics
        availability: [
          {
            day: { type: String, required: true }, // e.g., Monday, Tuesday
            tokens: [{type:mongoose.Schema.Types.ObjectId,ref:"Token "}],
          },
        ],
      },
    ],
    personalClinic: {
      location: { type: String }, // Personal clinic address
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
