const Token = require("../model/token");

exports.generateToken = async (req, res) => {
  const { doctorId, date, slots, clinicId } = req.body;
  const existingToken = await Token.find({ doctor: doctorId, date });

  if (existingToken.length > 0) {
    res.send("Tokens already generated for this date.");

    return;
  }

  const tokens = slots.map((slot, index) => ({
    tokenNumber: index + 1,
    doctor: doctorId,
    clinic: clinicId,
    date,
    time: slot,
    isBooked: false,
  }));
  await Token.insertMany(tokens);
};

exports.getAvailableToken = async (req, res) => {
  const { doctorId, date } = req.query;

  if (!doctorId || !date) {
    return res
      .status(400)
      .json({ success: false, message: "Doctor ID and Date are required" });
  }

  const tokens = await Token.find({ doctor: doctorId, date, isBooked: false })
    .sort("tokenNumber")
    .select("tokenNumber time");
  res.status(200).json({ success: true, data: tokens });
};
