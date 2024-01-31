var express = require('express');
var router = express.Router();
const demandeController = require("../../../controllers/demande/admin/missionAdmin");

router.post('/add-demande-ordre-mission', demandeController.addDemandeOrdreMission);

module.exports = router;