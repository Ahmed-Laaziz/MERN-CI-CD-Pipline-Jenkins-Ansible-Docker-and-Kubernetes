var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/attestationTravail");


router.post('/add-demande-attestation-travail', demandeController.addDemandeAttestationTravail);


module.exports = router;