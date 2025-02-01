const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { lat: Number, lon: Number },
    phone: { type: String, required: true },
    password:{type:String,required:true},
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }], 
    availability: [
      {
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
        day: { type: String, required: true }, 
        tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Token " }],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clinic", clinicSchema);
