const express = require("express");
const _patientController = require("../controllers/patients/patient.controller");

const router = express.Router();


router.get('/:id', _patientController.getPatient);
router.post('', _patientController.createPatient);

module.exports = router;