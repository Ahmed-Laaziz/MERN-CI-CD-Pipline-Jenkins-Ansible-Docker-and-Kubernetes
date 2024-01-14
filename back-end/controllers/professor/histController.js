const Historique = require("../../models/historique");
const mongoose = require('mongoose');

exports.addHist =  async (req, res, next) => {
    console.log(req);
    try {
      const newHistorique = new Historique({
        professeur: '6521b25c2f79d1a580123c5b', // Replace with the actual ObjectId of the related Professeur
        grade: 'Associate Professor', // Replace with the actual grade
        annee: 2023, // Replace with the actual year
      });
  
      const saveHistorique = await newHistorique.save();
  
      res.status(200).json(saveHistorique);
    } catch (error) {
      console.error('Error adding Historiique:', error);
      res.status(500).json({ error: 'Failed to add Historiique' });
    }
  };

  exports.getHist = async (req, res, next) => {
    try {
      const profId = req.body.prof;
  
      // Find the agent by ID in your Agent collection
      const hist = await Historique.find({ "professeur": profId }).sort({ date: -1 });
  
      if (!hist) {
        return res.status(404).json({ error: 'Hist not found' });
      }
  
      // Return the sorted hist data as JSON
      res.status(200).json(hist);
    } catch (error) {
      console.error('Error fetching hist by prof ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

