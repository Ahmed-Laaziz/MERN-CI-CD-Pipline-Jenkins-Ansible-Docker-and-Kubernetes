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


  exports.updateDemandeConge = async (req, res, next) => {
    const demandeId = req.params.demandeId; // Supposons que vous recevez l'ID de la demande à mettre à jour dans les paramètres de la requête
  
    try {
      const updatedDemande = await DemandeConge.findByIdAndUpdate(
        demandeId,
        {
          $set: {
            description: req.body.description,
            de_date: req.body.de_date,
            a_date: req.body.a_date,
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

