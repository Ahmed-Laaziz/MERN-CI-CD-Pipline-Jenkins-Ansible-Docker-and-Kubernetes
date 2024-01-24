var express = require('express');
var router = express.Router();
const depController = require("../../controllers/departement/departementController");

router.get('/all-departements', depController.getDeps);
router.post('/add-departement', depController.addDepartement);
router.delete('/delete-departement/:departementId', depController.deleteDepartement);
router.put('/update-departement/:departementId', depController.updateDepartement);


module.exports = router;