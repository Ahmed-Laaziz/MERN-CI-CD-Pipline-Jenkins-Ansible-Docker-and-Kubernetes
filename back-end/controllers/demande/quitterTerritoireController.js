const DemandeQuitterTerritoire = require("../../models/dem_quitter_territoire");
const mongoose = require('mongoose');


exports.addDemandeQuitterTerritoire = async (req, res, next) => {
    console.log(req.body);
    try {
      const newDemandeQuitterTerritoire = new DemandeQuitterTerritoire({
        professeur: req.body.professeur, 
        description: req.body.description, 
        de_date: req.body.de_date, 
        a_date: req.body.a_date,
        universite: req.body.universite,
      });
  
      const savedDemande = await newDemandeQuitterTerritoire.save();
  
      res.status(200).json(savedDemande);
    } catch (error) {
      console.error('Error adding demande:', error);
      res.status(500).json({ error: 'Failed to add demande' });
    }
  };

  exports.getEnAttenteDemandeQuitter = async (req, res) => {
    try {
      // Use Mongoose to find demands with 'statut' equal to either "En attente" or "En cours"
      const enAttenteDemands = await DemandeQuitterTerritoire.find({ statut: { $in: ['En attente'] } });
      res.json(enAttenteDemands);
    } catch (error) {
      console.error('Error fetching "En attente" demands:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };