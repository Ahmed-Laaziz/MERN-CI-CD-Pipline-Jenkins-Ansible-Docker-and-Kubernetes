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

  exports.updateDemandeAttestation = async (req, res, next) => {
    const demandeId = req.params.demandeId; // Supposons que vous recevez l'ID de la demande à mettre à jour dans les paramètres de la requête
  
    try {
      const updatedDemande = await DemandeAttestationTravail.findByIdAndUpdate(
        demandeId,
        {
          $set: {
            description: req.body.description
          },
        },
        { new: true } // Pour retourner le nouveau document mis à jour
      );
  
      if (!updatedDemande) {
        return res.status(404).json({ error: 'Demande not found' });
      }
  
      res.status(200).json(updatedDemande);
    } catch (error) {
      console.error('Error updating demande:', error);
      res.status(500).json({ error: 'Failed to update demande' });
    }
  };