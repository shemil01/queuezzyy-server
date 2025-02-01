const express = require("express");
const controller = require("../controller/clinikController");
const router = express.Router();
const { tryCatch } = require("../middleware/TryCatch");

router.get("/clinic/search", tryCatch(controller.search));
router.get("/clinik/nearest-clinic", tryCatch(controller.getNearestClinik));
router.post('clinic/:id/add-doctor',tryCatch(controller.addDoctor))
router.get('/clinics',tryCatch(controller.allClincs))
router.get('/clinics/:id',tryCatch(controller.clinicById))
router.get('/clinics/:id/doctors',tryCatch(controller.clinicById))
router.get('/clinics/:id/doctors-in-department',tryCatch(controller.clinicById))

module.exports = router;
