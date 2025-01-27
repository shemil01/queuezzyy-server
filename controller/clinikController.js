const Clinic = require('../model/clinic')
const geolib = require("geolib");

// search clinic
exports.search = async (req, res) => {
    const { name } = req.query

    const clinics = await Clinic.find({ name })
    res.status(200).json(clinics)
}

// nearest clinic
exports.getNearestDoctor = async (req, res) => {
    const { lat, lon, name } = req.body;

    let doctors = await Clinic.find({ name });
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