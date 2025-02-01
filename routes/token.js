const express = require('express')
const router = express.Router()
const controller = require('../controller/tokenController')
const {tryCatch} = require('../middleware/TryCatch')

router.post('/generate-token',tryCatch(controller.generateToken))
router.get('/get-available-tokens',tryCatch(controller.getAvailableToken))

module.exports = router