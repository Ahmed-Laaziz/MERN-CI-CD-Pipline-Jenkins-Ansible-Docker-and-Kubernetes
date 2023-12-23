const DemandeConge = require("../../models/dem_conge");
const mongoose = require('mongoose');


exports.addDemandeConge = async (req, res, next) => {
    console.log(req.body);
    try {
      const newDemandeConge = new DemandeConge({
        professeur: req.body.professeur, 
        description: req.body.description, 
        de_date: req.body.de_date, 
        a_date: req.body.a_date,
      });
  
      const savedDemande = await newDemandeConge.save();
  
      res.status(200).json(savedDemande);
    } catch (error) {
      console.error('Error adding demande:', error);
      res.status(500).json({ error: 'Failed to add demande' });
    }
  };