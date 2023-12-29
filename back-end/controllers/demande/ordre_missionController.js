const DemandeOrdreMission = require("../../models/dem_ordre_mission");
const mongoose = require('mongoose');


exports.addDemandeOrdreMission = async (req, res, next) => {
    console.log(req.body);
    try {
      const newDemandeOrdreMission = new DemandeOrdreMission({
        professeur: req.body.professeur, 
        description:req.body.description,
        de_date: req.body.de_date, 
        a_date: req.body.a_date,
        mission_a: req.body.mission_a,
        moyen_transport:req.body.moyen_transport
      });
  
      const savedDemande = await newDemandeOrdreMission.save();
  
      res.status(200).json(savedDemande);
    } catch (error) {
      console.error('Error adding demande:', error);
      res.status(500).json({ error: 'Failed to add demande' });
    }
  };