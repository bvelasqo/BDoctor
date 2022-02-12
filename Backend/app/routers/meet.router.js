const express = require("express");

const router = express.Router();

const _meetController = require("../controllers/meets/meet.controller");

router.get('/:id', _meetController.getOneMeet)
    .post('/date', _meetController.getDates)
    .put('/:id', _meetController.editMeet)
    .post('/:id', _meetController.deleteMeet)
    .post('/', _meetController.createMeet);

module.exports = router;