const User = require("../model/user");
const Clinic = require("../model/clinic");
const { sendOtp, verifyOtp } = require("../utils/otpService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//user login
exports.login = async (req, res) => {
  const { phone } = req.body;
  if (!phone)
    return res.status(400).json({ message: "Phone number is required" });
  await sendOtp(phone);
  res.json({ message: "OTP sent successfully" });
};

exports.verifyOtpLogin = async (req, res) => {
  const { phone, otp, name } = req.body;
  if (!phone || !otp)
    return res.status(400).json({ message: "Phone and OTP are required" });
  const isValidOtp = await verifyOtp(phone, otp);
  if (!isValidOtp) return res.status(400).json({ message: "Invalid OTP" });

  let user = await User.findOne({ phone });
  if (!user) {
    if (!name)
      return res
        .status(400)
        .json({ message: "Name is required for registration" });
    user = await User.create({ phone, name });
  }
  const token = await jwt.sign({ id: user._id }, process.env.jwt_secret);
  res.cookie(token);
  res.json({ message: "Login successful", token, user });
};

//clinik
exports.clinikRegister = async (req, res) => {
  const { name, location, phone, password } = req.body;
  if (!name || !location || !phone || !password) {
    return res.status(400).send(" all field is required");
  }

  const isExist = await Clinic.findOne({ name });
  if (isExist) {
    return res.send("clinik with name all ready registered");
  }

  const hashPassword = await bcrypt.hash(String(password), 10);
  const newClinik = await Clinic.create({
    name,
    location,
    password: hashPassword,
    phone,
  });
  const acces_token = await jwt.sign(
    { id: newClinik._id },
    process.env.jwt_secret
  );
  res.cookie(acces_token);
  res.status(201).json({
    message: "Registration compleated",
  });
};
