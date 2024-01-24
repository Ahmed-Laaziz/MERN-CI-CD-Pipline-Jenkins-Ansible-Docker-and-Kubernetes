const Departement = require("../../models/departement");
const Professeur = require("../../models/professeur");
const mongoose = require('mongoose');

exports.getDeps = async (req, res, next) => {
    try {
      const allDepartements = await Departement.find({});
      res.status(200).json(allDepartements);
    } catch (error) {
      console.error('Error retrieving Departements:', error);
      res.status(500).json({ error: 'Failed to retrieve Departements' });
    }
};

exports.addDepartement =  async (req, res, next) => {
    console.log(req);
    try {
      const newDepartement = new Departement({
        libele: req.body.libele,
        description: req.body.description
      });
  
      const saveNotif = await newDepartement.save();
  
      res.status(200).json(saveNotif);
    } catch (error) {
      console.error('Error adding Departement:', error);
      res.status(500).json({ error: 'Failed to add Departement' });
    }
  };

  exports.deleteDepartement = async (req, res, next) => {
    try {
      const departementId = req.params.departementId;
  
      // Check if the department exists
      const existingDepartement = await Departement.findById(departementId);
      if (!existingDepartement) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      // Get the value of libele field in the current department
      const libeleToDelete = existingDepartement.libele;
  
      // Convert the plain object to a Mongoose document
      const departementDocument = new Departement(existingDepartement);
  
      // Delete the department and its associated professors
      await Departement.deleteOne({ _id: departementId })
  
      console.log("dep to delete is : " + libeleToDelete);
  
      // Delete all professors with the same departement value
      await Professeur.deleteMany({ departement: libeleToDelete });
  
      res.status(200).json({ message: 'Department and associated professors deleted successfully' });
    } catch (error) {
      console.error('Error deleting Departement:', error);
      res.status(500).json({ error: 'Failed to delete Departement' });
    }
  };

  exports.updateDepartement = async (req, res, next) => {
    try {
      const departementId = req.params.departementId;
      const { libele, description } = req.body;
  
      // Check if the department exists
      const existingDepartement = await Departement.findById(departementId);
      if (!existingDepartement) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      // Get the value of libele field in the current department
      const oldLibele = existingDepartement.libele;
  
      // Update the department
      await Departement.findByIdAndUpdate(departementId, { libele, description });
  
      // Update all professors with the same departement value
      await Professeur.updateMany({ departement: oldLibele }, { $set: { departement: libele } });
  
      res.status(200).json({ message: 'Department and associated professors updated successfully' });
    } catch (error) {
      console.error('Error updating Departement:', error);
      res.status(500).json({ error: 'Failed to update Departement' });
    }
  };
  
  