const DemandeAttestationTravail = require("../../models/dem_attestation_travail");
const mongoose = require('mongoose');


exports.addDemandeAttestationTravail = async (req, res, next) => {
    console.log(req.body);
    try {
      const newDemandeAttestationTravail = new DemandeAttestationTravail({
        professeur: req.body.professeur, 
        description:req.body.description,
      });
  
      const savedDemande = await newDemandeAttestationTravail.save();
  
      res.status(200).json(savedDemande);
    } catch (error) {
      console.error('Error adding demande:', error);
      res.status(500).json({ error: 'Failed to add demande' });
    }
  };