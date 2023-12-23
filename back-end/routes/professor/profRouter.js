var express = require('express');
var router = express.Router();
const profController = require("../../controllers/professor/profController");


router.get('/professeurs', profController.getProfs);

router.post('/add-professeur', profController.addProf);

router.put('/update-professeur', profController.updateProfesseur)


module.exports = router;