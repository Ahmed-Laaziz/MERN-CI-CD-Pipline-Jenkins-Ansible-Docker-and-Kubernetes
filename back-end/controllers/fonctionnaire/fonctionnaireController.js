const Fonctionnaire = require("../../models/fonctionnaire");
const Professeur = require("../../models/professeur");
const Historique = require("../../models/historique");
const mongoose = require('mongoose');
const generateRandomPassword = require('../../business/passwordGenerator');
const sendEmail = require('../../business/emailSender');
// Add a route to retrieve and display a list of foncesseurs
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
      const emailText = `Cher Fonctionnaire,\n\nVous avez été ajouté à notre plateforme. Votre email de connexion est : ${req.body.email}\nVotre mot de passe est : ${randomPassword}\n\nVeuillez utiliser ces identifiants pour vous connecter a notre plateforme : http://localhost:3000\n\nCordialement,\nVotre Équipe de Plateforme`;
  
      sendEmail(req.body.email, emailSubject, emailText);
      res.status(200).json(savedFonctionnaire);
      } catch (error) {
        console.error('Error adding foncesseur:', error);
        res.status(500).json({ error: 'Failed to add foncesseur' });
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

exports.updateFonc = async (req, res, next) => {
  try {
    const foncId = req.body.fonc.id; 
    const foncUpdates = {
      nom: req.body.fonc.nom,
      prenom: req.body.fonc.prenom,
      email: req.body.fonc.email,
      tel: req.body.fonc.tel,
      cin: req.body.fonc.cin,
      genre: req.body.fonc.genre,
      departement: req.body.fonc.departement,
      cadre: req.body.hist.cadre
    };

    const newHist = {
      grade: req.body.hist.grade,
      cadre: req.body.hist.cadre,
      classe: req.body.hist.classe,
    };

    console.log("the cadre is :"+req.body.hist.cadre)

    const hist = await Historique.find({ "professeur": foncId }).sort({ date: -1 });

    const changesDetected = hist.length > 0 &&
      (newHist.classe != hist[0].classe || newHist.grade != hist[0].grade || newHist.cadre != hist[0].cadre);


    const updatedfonc = await Professeur.findByIdAndUpdate(foncId, foncUpdates, { new: true });

    if (changesDetected) {
      const newHistoricalRecord = new Historique({
        professeur: foncId,
        grade: newHist.grade,
        cadre: newHist.cadre,
        classe: newHist.classe,
        date: new Date(), 
      });

      await newHistoricalRecord.save();
    }

    if (!updatedfonc) {
      return res.status(404).json({ error: 'foncessor not found' });
    }

    res.status(200).json(updatedfonc);
  } catch (error) {
    console.error('Error updating foncessor:', error);
    res.status(500).json({ error: 'Failed to update foncessor' });
  }
};
