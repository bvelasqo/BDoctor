const express = require("express");

const router = express.Router();

const _patientController = require("../controllers/patients/patient.controller");

router.get('/:id', _patientController.getPatient)
    .post('/', _patientController.createPatient);

module.exports = router;