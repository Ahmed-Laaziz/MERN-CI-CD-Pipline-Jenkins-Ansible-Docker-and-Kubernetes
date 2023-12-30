var express = require('express');
var router = express.Router();
const demandeController = require("../../controllers/demande/demandesController");


// router.get('/admins', adminController.getAdmins);

router.get('/profDemandes/:professeurId', demandeController.getDemandesForProfesseur);
router.get('/allDemandes', demandeController.getDemands);
router.put('/updateStatut/:demandId', demandeController.updateStatut);
router.get('/enAttenteDemands', demandeController.getEnAttenteAndEnCoursDemands);
router.get('/chefDemands', demandeController.getChefDemands)
router.get('/chefDemandsCP', demandeController.getChefDemandsCP)
module.exports = router;