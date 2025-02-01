const express = require('express')
const router = express.Router()
const {tryCatch} = require('../middleware/TryCatch')
const controller = require('../controller/authController')

router.post('/sendOtp',tryCatch(controller.login))
router.post("/verify-otp", tryCatch(controller.verifyOtpLogin));
router.post('/clinik/register',tryCatch(controller.clinikRegister))


module.exports = router