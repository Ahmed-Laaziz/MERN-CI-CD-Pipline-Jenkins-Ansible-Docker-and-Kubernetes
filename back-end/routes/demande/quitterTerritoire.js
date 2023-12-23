var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/quitterTerritoireController");


router.post('/add-demande-quitter-territoire', demandeController.addDemandeQuitterTerritoire);
router.get('/enAttenteDemands', demandeController.getEnAttenteDemandeQuitter);

module.exports = router;