var express = require('express');
var router = express.Router();
const fonctionnaireController = require("../../controllers/fonctionnaire/fonctionnaireController");

router.get('/fonctionnaires', fonctionnaireController.getFonctionnaires);
router.post('/add-fonctionnaire', fonctionnaireController.addFonctionnaire);
router.put('/update-fonctionnaire', fonctionnaireController.updateFonctionnaire);
router.put('/update-fonc', fonctionnaireController.updateFonc);

module.exports = router;