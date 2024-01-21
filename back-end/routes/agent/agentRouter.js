var express = require('express');
var router = express.Router();
const agentController = require("../../controllers/agent/agentController");


router.get('/agents/:id', agentController.getAgent);
router.post('/send', agentController.forgotMail)
router.post('/email', agentController.getAgentByEmail)
router.put('/update-pass', agentController.updatePass)


module.exports = router;