const Agent = require("../../models/agent");
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const sendEmail = require('../../business/emailSender');
const yourSecretKey = "2e8b32f6d789c1fa68e540f8b2c9825f";

const encrypt = (text) => {
  const ciphertext = CryptoJS.AES.encrypt(text, yourSecretKey).toString();
  return ciphertext;
};



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

  exports.getAgentByEmail = async (req, res, next) => {
    try {
      const agent = await Agent.findOne({"email": req.body.email});
      res.status(200).json(agent);
    } catch (error) {
      console.error('Error retrieving agent:', error);
      res.status(500).json({ error: 'Failed to retrieve agent' });
    }
  };

  exports.forgotMail =  async (req, res, next) => {

    try{
    // Forgotten Password Email Subject
  
    const forgotPasswordSubject = 'Réinitialisation de mot de passe';
    const email = encrypt(req.body.email);
  
    const agent = await Agent.find({ "email": req.body.email });
  
    // Forgotten Password Email Body
    const forgotPasswordText = "Cher agent,\n\nVous avez demandé la réinitialisation de votre mot de passe sur notre plateforme. Pour procéder à la réinitialisation, veuillez suivre le lien ci-dessous :\n\nhttps://grh-ensaj-front.vercel.app/new-pass?e="+email+"\n\nSi vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.\n\nCordialement,\nVotre Équipe de Plateforme";
    sendEmail(req.body.email, forgotPasswordSubject, forgotPasswordText);
      
    } catch (error) {
      console.error('Error adding agent:', error);
      res.status(500).json({ error: 'Failed to add agent' });
    }
  }

  exports.updatePass = async (req, res, next) => {
    try {
      console.log("the agent is :")
      console.log(req.body.agent)
      console.log("now updating!")
  
      const agentId = req.body.agent._id;
      console.log("the id is : "+agentId) 
      const agentUpdates = {
        nom: req.body.agent.nom,
        prenom: req.body.agent.prenom,
        email: req.body.agent.email,
        tel: req.body.agent.tel,
        cin: req.body.agent.cin,
        password: req.body.agent.password,
        genre: req.body.agent.genre,
        num_loyer: req.body.agent.num_loyer,
        date_entre_ecole: req.body.agent.date_entre_ecole,
        date_fct_publique: req.body.agent.date_fct_publique,
        num_ref: req.body.agent.num_ref,
        date_effective: req.body.agent.date_effective,
        anciennete: req.body.agent.anciennete,
        date_visa: req.body.agent.date_visa,
      };
  
  
      const updatedagent = await Agent.findByIdAndUpdate(agentId, agentUpdates, { new: true });
  
      if (!updatedagent) {
        return res.status(404).json({ error: 'agentessor not found' });
      }
  
  
      res.status(200).json(updatedagent);
    } catch (error) {
      console.error('Error updating agentessor:', error);
      res.status(500).json({ error: 'Failed to update agentessor' });
    }
  }