var express = require('express');
var router = express.Router();
const notifController = require("../../controllers/notification/notification");


router.get('/all-notification', notifController.getAllNotifs);
router.post('/add-notification', notifController.addNotif);
router.post('/prof-notif', notifController.getNotification);
router.put('/update-notif', notifController.updateNotifs);

module.exports = router;