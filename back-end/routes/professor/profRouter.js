var express = require('express');
var router = express.Router();
const profController = require("../../controllers/professor/profController");

router.get('/professeurs', profController.getProfs);
router.get('/all-professeurs', profController.getProfsExceptFCT);
router.get('/professeurs-TRI', profController.getProfsTRI);
router.get('/professeurs-CP', profController.getProfsCP);
router.get('/professeurs-FCT', profController.getProfsFCT);
router.post('/add-professeur', profController.addProf);
router.put('/update-professeur', profController.updateProfesseur)
router.put('/update-pass', profController.updatePass)
router.post('/send', profController.forgotMail)
router.post('/email', profController.getProfByEmail)

module.exports = router;