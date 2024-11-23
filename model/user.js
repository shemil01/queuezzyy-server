const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    phone: { type: String, required: true},
    isVerified: { type: Boolean, default: false }, 
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    otp: {
      code: { type: String }, 
      expiresAt: { type: Date },
      isUsed: { type: Boolean, default: false }, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
