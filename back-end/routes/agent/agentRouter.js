var express = require('express');
var router = express.Router();
const agentController = require("../../controllers/agent/agentController");


router.get('/agents/:id', agentController.getAgent);


module.exports = router;