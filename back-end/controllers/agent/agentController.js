const Agent = require("../../models/agent");
const mongoose = require('mongoose');



// Define a route to get agent data by ID
exports.getAgent =  async (req, res, next) => {
    try {
      const agentId = req.params.id;
  
      // Find the agent by ID in your Agent collection
      const agent = await Agent.findById(agentId);
  
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
  
      // Return the agent data as JSON
      res.status(200).json(agent);
    } catch (error) {
      console.error('Error fetching agent by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };