var express = require('express');
var router = express.Router();
const demandeController = require("../../../controllers/demande/admin/demandesAdminController");

router.get('/chefDemandes/:chefId', demandeController.getDemandesForProfesseur);
router.get('/allDemandes', demandeController.getDemands);
router.put('/updateStatut/:demandId', demandeController.updateStatut);
router.get('/enAttenteDemands', demandeController.getEnAttenteAndEnCoursDemands);
// router.get('/chefDemands', demandeController.getChefDemands)
// router.get('/chefDemandsCP', demandeController.getChefDemandsCP)
// router.get('/chefDemandsFCT', demandeController.getChefDemandsFCT)
router.delete('/demands/:id', demandeController.deleteDemand);

module.exports = router;