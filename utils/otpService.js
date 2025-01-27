const twilio = require('twilio')
const Otp = require('../model/otp')

const client = twilio(process.env.Account_SID, process.env.Auth_Token)

exports.sendOtp = async(phone) =>{
    
const otp = Math.floor(100000 + Math.random() * 900000)
console.log("hiii",otp)
await Otp.create({
    phone,
    otp
})

await client.messages.create({
    body:`your otp code is ${otp}`,
    from:process.env.Twilio_number,    
    to:phone
})

return otp
}
//verify

exports.verifyOtp = async(phone,enteredOtp) => {
    const otpRecord = await Otp.findOne({phone,otp:enteredOtp})
    if(!otpRecord) return false

    await Otp.deleteMany({phone})
    return true
}