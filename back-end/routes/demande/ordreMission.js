var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/ordre_missionController");


router.post('/add-demande-ordre-mission', demandeController.addDemandeOrdreMission);
// router.get('/enAttenteDemands', demandeController.getEnAttenteDemandeQuitter);

module.exports = router;