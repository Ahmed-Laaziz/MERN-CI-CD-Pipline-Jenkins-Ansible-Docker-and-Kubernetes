var express = require('express');
var router = express.Router();
const histController = require("../../controllers/professor/histController");


router.get('/add-historique', histController.addHist);
router.post('/prof-hist', histController.getHist)

module.exports = router;