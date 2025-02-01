const Clinic = require("../model/clinic");
const geolib = require("geolib");
const Doctor = require("../model/doctor");





//add doctor

exports.addDoctor = async (req, res) => {
  const { clinicId } = req.params;
  const { name, phone, specialization } = req.body;

  if (!name || !phone || !specialization) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const clinic = await Clinic.findById(clinicId);
  if (!clinic) {
    return res
      .status(404)
      .json({ success: false, message: "Clinic not found" });
  }

  const doctor = await Doctor.create({
    name,
    phone,
    specialization,
    clinics: clinicId,
  });

  clinic.doctors.push(doctor._id);
  await clinic.save();

  res.status(201).json({
    success: true,
    message: "Doctor added successfully",
    data: doctor,
  });
};



// search clinic
exports.search = async (req, res) => {
  const { name } = req.query;

  const clinics = await Clinic.find({ name: { $regex: name, $options: i } });
  if (clinics.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No clinics found" });
  }

  res.status(200).json({ success: true, data: clinics });
};

//get all clinics
exports.allClincs = async (req, res) => {
  const clinics = await Clinic.find();
  if (!clinics) {
    return res.status(404).json({
      success: false,
      message: "clinics not found",
    });
  }
  res.status(200).json(clinics);
};

//get clinic by id

exports.clinicById = async (req, res) => {
  const { clinicId } = req.params;

  const clinic = await Clinic.findById({ clinicId });
  if (!clinic) {
    return res.status(404).json({
      success: false,
      message: "clinic not found",
    });
  }
  res.status(200).json(clinic);
};

// nearest clinic
exports.getNearestClinik = async (req, res) => {
  const { lat, lon, name } = req.body;

  let clinics = await Clinic.find({ name });

  clinics = clinics.map((clinic) => ({
    ...clinic._doc,
    distance: geolib.getDistance(
      { latitude: lat, longitude: lon },
      { latitude: clinic.location.lat, longitude: clinic.location.lon }
    ),
  }));

  clinics.sort((a, b) => a.distance - b.distance);
  res.json(clinics.slice(0, 5));
  res.status(200).json({
    success: true,
    data: clinics.slice(0, 5),
  });
};

// all doctors avalible in clinic

exports.doctorsInClinic = async (req, res) => {
  const { clinicId } = req.params;

  const doctors = await Clinic.findById(clinicId).populate("doctors");

  if (!doctors) {
    return res.status(404).json({
      success: false,
      message: "Doctors not found",
    });
  }

  res.status(200).json(doctors);
};

// find doctors each department
exports.getDoctorsBySpecialization = async (req, res) => {
  const { clinicId } = req.params;

  const doctorInDepartment = await Doctor.aggregate([
    { $match: { clinics: clinicId } },
    {
      $group: {
        _id: "$specialization",
        doctors: {
          $push: {
            _id: "$_id",
            name: "$phone",
            phone: "$phone",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        specialization: "$_id",
        doctors: 1,
      },
    },
  ]);
  if (doctorsInClinic.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No doctors found in this clinic",
    });
  }

  res.status(200).json({
    success: true,
    clinicId,
    specializations: doctorsInClinic,
  });
};







