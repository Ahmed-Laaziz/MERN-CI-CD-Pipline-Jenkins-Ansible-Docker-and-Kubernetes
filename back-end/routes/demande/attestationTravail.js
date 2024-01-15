var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/attestationTravail");


router.post('/add-demande-attestation-travail', demandeController.addDemandeAttestationTravail);
router.put('/update-demand-attestation-travail/:demandeId', demandeController.updateDemandeAttestation);

module.exports = router;