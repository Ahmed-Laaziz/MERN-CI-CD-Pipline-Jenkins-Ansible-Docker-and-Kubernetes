var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/ordre_missionController");

router.post('/add-demande-ordre-mission', demandeController.addDemandeOrdreMission);

module.exports = router;