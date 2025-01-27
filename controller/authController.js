const User = require('../model/user')
const { sendOtp, verifyOtp } = require('../utils/otpService')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });
    await sendOtp(phone)
    res.json({ message: "OTP sent successfully" });
}

exports.verifyOtpLogin = async (req, res) => {
    const { phone, otp, name } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP are required" });
    const isValidOtp = await verifyOtp(phone, otp);
    if (!isValidOtp) return res.status(400).json({ message: "Invalid OTP" });


    let user = await User.findOne({ phone });
    if (!user) {
        if (!name) return res.status(400).json({ message: "Name is required for registration" });
        user = await User.create({ phone, name });
    }
    const token = await jwt.sign({ id: user._id }, process.env.jwt_secret)
    res.cookie(token)
    res.json({ message: "Login successful", token, user });


}




