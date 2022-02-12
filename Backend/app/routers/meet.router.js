const express = require("express");
const _meetController = require("../controllers/meets/meet.controller");

const router = express.Router();
router.get('/:id', _meetController.getOneMeet);
router.post('/date', _meetController.getDates);
router.put('/:id', _meetController.editMeet);
router.post('/:id', _meetController.deleteMeet);
router.post('/', _meetController.createMeet);

module.exports = router;