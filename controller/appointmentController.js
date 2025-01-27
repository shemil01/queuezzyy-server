const Appointment = require('../model/appointment')
const User = require('../model/user')
const Clinic = require("../model/clinic")


//book token
// exports.bookDoctor  = async(req,res) => {
//     let userId = req.user ? req.user.id : null; 
//     const { doctorId, clinicId, date, time, phone, name, otp } = req.body;
//     if (!doctorId || !clinicId || !date || !time) {
//         return res.status(400).json({ message: "Doctor, clinic, date, and time are required" });
//       }
//       if (!userId) {
//         if (!phone || !name || !otp) {
//           return res.status(400).json({ message: "Phone, name, and OTP are required" });
//         }
//     }
// }