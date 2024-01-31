const DemandeAdmin = require("../../../models/admin/demande-admin");
const mongoose = require('mongoose');



exports.getDemands = async (req, res, next) => {
  try {
    const allDemands = await DemandeAdmin.find({}).sort({ createdAt: -1 });
    res.status(200).json(allDemands);
  } catch (error) {
    console.error('Error retrieving demand:', error);
    res.status(500).json({ error: 'Failed to retrieve demand' });
  }
};

exports.deleteDemand = async (req, res, next) => {
  const demandId = req.params.id;

  try {
    // Find the demand by ID and delete it
    const deletedDemand = await DemandeAdmin.findByIdAndDelete(demandId);

    if (!deletedDemand) {
      return res.status(404).json({ error: 'Demand not found' });
    }

    res.status(200).json({ message: 'Demand deleted successfully' });
  } catch (error) {
    console.error('Error deleting demand:', error);
    res.status(500).json({ error: 'Failed to delete demand' });
  }
};

// Define a route to get agent data by ID
exports.getDemandesForProfesseur = async (req, res) => {
  try {
    const chefId = req.params.chefId;
    console.log(chefId);
    // Use Mongoose to find all demandes with the matching professeur ID and sort them by createdAt in descending order (newest to oldest)
    const demandes = await DemandeAdmin.find({ chef: chefId })
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
      const updatedDemand = await DemandeAdmin.findByIdAndUpdate(
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
      const enAttenteAndEnCoursDemands = await DemandeAdmin.find({ statut: { $in: ['En attente', 'En Cours'] } }).sort({ createdAt: -1 });;
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
      const enAttenteAndEnCoursDemands = await DemandeAdmin.find({
        statut: { $in: ['En attente'] },
        __t: { $in: ['DemandeConge', 'DemandeQuitterTerritoire', 'DemandeOrdreMission'] }
      }).sort({ createdAt: -1 })
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
      const enAttenteAndEnCoursDemands = await DemandeAdmin.find({
        statut: { $in: ['En attente'] },
        __t: { $in: ['DemandeConge', 'DemandeQuitterTerritoire', 'DemandeOrdreMission'] }
      })
      .sort({ createdAt: -1 })
        .populate({
          path: 'professeur',
          match: { departement: 'STIN' } // Filter professors by department 'TRI'
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
  

  exports.getChefDemandsFCT = async (req, res) => {
    try {
      // Find demands with 'statut' equal to either "En attente" or "En cours"
      // and '__t' equal to either "DemandConge" or "DemandQuitterTerritoire"
      const enAttenteAndEnCoursDemands = await DemandeAdmin.find({
        statut: { $in: ['En attente'] },
        __t: { $in: ['DemandeConge', 'DemandeQuitterTerritoire', 'DemandeOrdreMission'] }
      })
      .sort({ createdAt: -1 })
        .populate({
          path: 'professeur',
          match: { departement: { $in: ['Rh', 'Scolarité', 'Informatique'] } }
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
  
