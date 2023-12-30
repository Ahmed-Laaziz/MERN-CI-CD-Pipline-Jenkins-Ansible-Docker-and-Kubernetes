const Demande = require("../../models/demande");
const mongoose = require('mongoose');



exports.getDemands = async (req, res, next) => {
  try {
    const allDemands = await Demande.find({});
    res.status(200).json(allDemands);
  } catch (error) {
    console.error('Error retrieving demand:', error);
    res.status(500).json({ error: 'Failed to retrieve demand' });
  }
};

// Define a route to get agent data by ID
exports.getDemandesForProfesseur = async (req, res) => {
  try {
    const professeurId = req.params.professeurId;

    // Use Mongoose to find all demandes with the matching professeur ID and sort them by createdAt in descending order (newest to oldest)
    const demandes = await Demande.find({ professeur: professeurId })
      .sort({ createdAt: -1 });

    res.json(demandes);
  } catch (error) {
    console.error('Error fetching demandes:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


  exports.updateStatut = async (req, res) => {
    try {
      const demandId = req.params.demandId;
      const newStatut = req.body.statut; // You can send the new statut in the request body
  
      // Use Mongoose to find the demand by ID and update its statut field
      const updatedDemand = await Demande.findByIdAndUpdate(
        demandId,
        { statut: newStatut },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedDemand) {
        return res.status(404).json({ error: 'Demand not found' });
      }
  
      res.status(200).json(updatedDemand);
    } catch (error) {
      console.error('Error updating statut:', error);
      res.status(500).json({ error: 'Failed to update statut' });
    }
  };
  exports.getEnAttenteAndEnCoursDemands = async (req, res) => {
    try {
      // Use Mongoose to find demands with 'statut' equal to either "En attente" or "En cours"
      const enAttenteAndEnCoursDemands = await Demande.find({ statut: { $in: ['En attente', 'En Cours'] } });
      res.json(enAttenteAndEnCoursDemands);
    } catch (error) {
      console.error('Error fetching "En attente" and "En cours" demands:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  exports.getChefDemands = async (req, res) => {
    try {
      // Find demands with 'statut' equal to either "En attente" or "En cours"
      // and '__t' equal to either "DemandConge" or "DemandQuitterTerritoire"
      const enAttenteAndEnCoursDemands = await Demande.find({
        statut: { $in: ['En attente'] },
        __t: { $in: ['DemandeConge', 'DemandeQuitterTerritoire', 'DemandeOrdreMission'] }
      })
        .populate({
          path: 'professeur',
          match: { departement: 'TRI' } // Filter professors by department 'TRI'
        })
        .exec();
  
      // Filter demands to keep only those associated with professors having 'TRI' department
      const filteredDemands = enAttenteAndEnCoursDemands.filter(
        demand => demand.professeur !== null // Filter out demands with non-TRI professors
      );
  
      res.json(filteredDemands);
    } catch (error) {
      console.error('Error fetching "En attente" and "En cours" demands:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };



  exports.getChefDemandsCP = async (req, res) => {
    try {
      // Find demands with 'statut' equal to either "En attente" or "En cours"
      // and '__t' equal to either "DemandConge" or "DemandQuitterTerritoire"
      const enAttenteAndEnCoursDemands = await Demande.find({
        statut: { $in: ['En attente'] },
        __t: { $in: ['DemandeConge', 'DemandeQuitterTerritoire', 'DemandeOrdreMission'] }
      })
        .populate({
          path: 'professeur',
          match: { departement: 'CP' } // Filter professors by department 'TRI'
        })
        .exec();
  
      // Filter demands to keep only those associated with professors having 'TRI' department
      const filteredDemands = enAttenteAndEnCoursDemands.filter(
        demand => demand.professeur !== null // Filter out demands with non-TRI professors
      );
  
      res.json(filteredDemands);
    } catch (error) {
      console.error('Error fetching "En attente" and "En cours" demands:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
