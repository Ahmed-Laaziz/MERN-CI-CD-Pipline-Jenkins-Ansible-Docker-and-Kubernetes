const Departement = require("../../models/departement");
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