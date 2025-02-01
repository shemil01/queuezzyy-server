
const Doctor = require('../model/doctor')
const geolib = require("geolib");

// search doctor
exports.search = async (req, res) => {
    const { specialization } = req.query

    const doctors = await Doctor.find({ specialization })
    res.status(200).json(doctors)
}

//get all doctors
exports.allDoctors = async (req,res) =>{
    const doctors = await Doctor.find()
    if(!doctors){
        return res.status(404).json({
            success:false,
            message:"Doctors not found"
        })
    }
    res.status(200).json(doctors)
}

// nearest doctor
exports.getNearestDoctor = async (req, res) => {
    const { lat, lon, specialization } = req.body;

    let doctors = await Doctor.find({ specialization });
    doctors = doctors.map(doc => ({
        ...doc._doc,
        distance: geolib.getDistance(
            { latitude: lat, longitude: lon },
            { latitude: doc.location.lat, longitude: doc.location.lon }
        ),
    }));

    doctors.sort((a, b) => a.distance - b.distance);
    res.json(doctors.slice(0, 5))
}