const express = require('express')
const router = express.Router()
const controller = require('../controller/bookingController')
const  {tryCatch} = require('../middleware/TryCatch')

router.post('/book-doctor',tryCatch(controller.bookDoctor))
router.put('/cancel-booking',tryCatch(controller.cancelBooking))

module.exports = router