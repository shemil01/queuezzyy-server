const Booking = require("../model/booking");
const User = require("../model/user");
const Token = require("../model/token");
const { getIo } = require("../config/socket");

exports.bookDoctor = async (req, res) => {
  const { doctorId, clinicId, name, phone, date, time, token } = req.body;

  const new_user = await User.create({
    phone,
    name,
  });
  const userId = new_user._id;

  const isTokenAvailable = await Token.findOne({
    doctor: doctorId,
    date,
    tokenNumber,
  });

  (isTokenAvailable.isBooked = true),
    (isTokenAvailable.bookedBy = userId),
    await isTokenAvailable.save();

  if (!isTokenAvailable) {
    return res.status(400).json({ message: "token is already taken" });
  }

  const newBooking = await Booking.create({
    user: userId,
    doctor: doctorId,
    clinic: clinicId || null,
    date,
    time,
    token,
    status: "booked",
  });

  getIo.emit("tokenBooked", { doctorId, date, tokenNumber });

  res.status(201).json({
    success: true,
    message: false,
    data: newBooking,
  });
};

//cancell booking
exports.cancelBooking = async (req, res) => {
  const { appointmentId } = req.params;

  if (!appointmentId) {
    return res
      .status(400)
      .json({ success: false, message: "Appointment ID is required" });
  }

  const appointment = await Booking.findById(appointmentId);

  if (!appointment) {
    return res
      .status(404)
      .json({ successa: false, messages: "Appointment not found" });
  }
  appointment.status = "cancelled";
  await appointment.save();
      
  res.status(200).json({
    success: true,
    message: "Appointment cancelled successfully",
  });
};
