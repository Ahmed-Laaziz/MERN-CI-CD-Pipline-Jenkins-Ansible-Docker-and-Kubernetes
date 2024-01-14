const Fonctionnaire = require("../../models/fonctionnaire");
const mongoose = require('mongoose');
const generateRandomPassword = require('../../business/passwordGenerator');
const sendEmail = require('../../business/emailSender');
// Add a route to retrieve and display a list of Professeurs
exports.getFonctionnaires = async (req, res, next) => {
    try {
      const allFonctionnaires = await Fonctionnaire.find({});
      res.status(200).json(allFonctionnaires);
    } catch (error) {
      console.error('Error retrieving Fonctionnaire:', error);
      res.status(500).json({ error: 'Failed to retrieve fonctionnaire' });
    }
};

exports.addFonctionnaire = async (req, res, next) => {
    const randomPassword = generateRandomPassword(8);
    console.log(req);
    try {
      const newFonctionnaire = new Fonctionnaire({
        nom: req.body.nom, 
        prenom: req.body.prenom, 
        email: req.body.email, 
        password: randomPassword,
        tel: req.body.tel,
        cin: req.body.cin,
        genre: req.body.genre,
        fonction: req.body.fonction,
      });
  
      const savedFonctionnaire = await newFonctionnaire.save();
  
      
      const emailSubject = 'Bienvenue a notre plateforme';
      const emailText = `Cher Fonctionnaire,\n\nVous avez été ajouté à notre plateforme. Votre email de connexion est : ${req.body.email}\nVotre mot de passe est : ${randomPassword}\n\nVeuillez utiliser ces identifiants pour vous connecter.\n\nCordialement,\nVotre Équipe de Plateforme`;
  
      sendEmail(req.body.email, emailSubject, emailText);
      res.status(200).json(savedFonctionnaire);
      } catch (error) {
        console.error('Error adding professeur:', error);
        res.status(500).json({ error: 'Failed to add professeur' });
      }
  };

  exports.updateFonctionnaire = async (req, res, next) => {
    try {
        // Find the admin to update by ID
        const fonctionnaireId = req.body.fonctionnaireId; // Assuming you pass the admin ID in the URL
        const fonctionnaireUpdates = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            tel: req.body.tel,
            cin: req.body.cin,
            genre: req.body.genre
        };

        const updatedFonctionnaire = await Fonctionnaire.findByIdAndUpdate(fonctionnaireId, fonctionnaireUpdates, { new: true });

        if (!updatedFonctionnaire) {
            return res.status(404).json({ error: 'Fonctionnaire not found' });
        }

        res.status(200).json(updatedFonctionnaire);
    } catch (error) {
        console.error('Error updating Fonctionnaire:', error);
        res.status(500).json({ error: 'Failed to update Fonctionnaire' });
    }
};
