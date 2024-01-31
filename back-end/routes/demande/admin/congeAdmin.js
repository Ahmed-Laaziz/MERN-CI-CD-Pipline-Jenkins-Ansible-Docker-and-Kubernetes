var express = require('express');
var router = express.Router();
const demandeController = require("../../../controllers/demande/admin/congeAdmin");

router.post('/add-demande-conge', demandeController.addDemandeConge);
router.put('/update-demand-conge/:demandeId', demandeController.updateDemandeConge);

module.exports = router;


