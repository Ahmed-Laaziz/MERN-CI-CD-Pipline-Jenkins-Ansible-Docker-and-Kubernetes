var express = require('express');
var router = express.Router();
const adminController = require("../../controllers/admin/adminController");


router.get('/admins', adminController.getAdmins);

router.post('/add-admin', adminController.addAdmin);

router.put('/update-admin', adminController.updateAdmin);


module.exports = router;