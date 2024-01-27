const Admin = require("../../models/admin");
const mongoose = require('mongoose');

exports.getAdmins = async (req, res, next) => {
    try {
      const allAdmins = await Admin.find({});
      res.status(200).json(allAdmins);
    } catch (error) {
      console.error('Error retrieving admin:', error);
      res.status(500).json({ error: 'Failed to retrieve admin' });
    }
};

exports.getChefs = async (req, res, next) => {
  try {
      const chefs = await Admin.find({ dep_label: { $in: ['FCT', 'STIN', 'TRI'] } });
      res.status(200).json(chefs);
  } catch (error) {
      console.error('Error retrieving Chefs:', error);
      res.status(500).json({ error: 'Failed to retrieve Chefs' });
  }
};

exports.addAdmin = async (req, res, next) => {
    console.log(req);
    try {
      const newAdmin = new Admin({
        nom: req.body.nom, 
        prenom: req.body.prenom, 
        email: req.body.email, 
        password: req.body.password,
        tel: req.body.tel,
        cin: req.body.cin,
        genre: req.body.genre,
        fonction: req.body.fonction,
      });
  
      const savedAdmin = await newAdmin.save();
  
      res.status(200).json(savedAdmin);
    } catch (error) {
      console.error('Error adding administrator:', error);
      res.status(500).json({ error: 'Failed to add administrator' });
    }
  };

  exports.updateAdmin = async (req, res, next) => {
    try {
        // Find the admin to update by ID
        const adminId = req.body.adminId; // Assuming you pass the admin ID in the URL
        const adminUpdates = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            tel: req.body.tel,
            cin: req.body.cin,
            genre: req.body.genre
        };

        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, adminUpdates, { new: true });

        if (!updatedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error updating administrator:', error);
        res.status(500).json({ error: 'Failed to update administrator' });
    }
};
