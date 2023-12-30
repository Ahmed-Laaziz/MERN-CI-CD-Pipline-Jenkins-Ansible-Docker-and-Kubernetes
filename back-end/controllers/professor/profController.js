const Professeur = require("../../models/professeur");
const Historique = require("../../models/historique");
const sendEmail = require('../../business/emailSender');
const generateRandomPassword = require('../../business/passwordGenerator');
const mongoose = require('mongoose');


// Define a route to retrieve and return data from the "professeur" collection
exports.getProfs = async (req, res, next) => {
    try {
      const allProfesseurs = await Professeur.find({});
      res.status(200).json(allProfesseurs);
    } catch (error) {
      console.error('Error retrieving professeurs:', error);
      res.status(500).json({ error: 'Failed to retrieve professeurs' });
    }
};

exports.addProf =  async (req, res, next) => {
    try {
      const randomPassword = generateRandomPassword(8);

      const userPass = 'HoQhjdslks'

      console.log(req.body);

      const newProfesseur = new Professeur({
        nom: req.body.nom, 
        prenom: req.body.prenom, 
        email: req.body.email, 
        password: randomPassword,
        tel: req.body.tel,
        cin: req.body.cin,
        genre: req.body.genre,
        num_loyer: req.body.num_loyer,
        date_entre_ecole: req.body.date_entre_ecole,
        date_fct_publique: req.body.date_fct_publique,
        cadre: req.body.cadre,
        num_ref: req.body.num_ref,
        date_effective: req.body.date_effective,
        anciennete: req.body.anciennete,
        date_visa: req.body.date_visa,
        departement: req.body.departement,
      });
  
      const savedProfesseur = await newProfesseur.save();
      

    // Create an entry in the historique
    const historiqueEntry = new Historique({
      professeur: savedProfesseur._id, // Associate the historique entry with the new professor
      grade: req.body.grade, // Set the default grade here
      classe: req.body.classe, // Set the default class here
      cadre: req.body.cadre,
      date: new Date() // Set the current date
    });

    await historiqueEntry.save();

// Send an email to the added professor with their login information
    const emailSubject = 'Welcome to Our Platform';
    const emailText = `Cher Professeur,\n\nVous avez été ajouté à notre plateforme. Votre email de connexion est : ${req.body.email}\nVotre mot de passe est : ${randomPassword}\n\nVeuillez utiliser ces identifiants pour vous connecter.\n\nCordialement,\nVotre Équipe de Plateforme`;

    sendEmail(req.body.email, emailSubject, emailText);
      res.status(200).json(savedProfesseur);
    } catch (error) {
      console.error('Error adding professeur:', error);
      res.status(500).json({ error: 'Failed to add professeur' });
    }
};

exports.updateProfesseur = async (req, res, next) => {
  try {
    const professeurId = req.body.prof.id; 
    const professeurUpdates = {
      nom: req.body.prof.nom,
      prenom: req.body.prof.prenom,
      email: req.body.prof.email,
      tel: req.body.prof.tel,
      cin: req.body.prof.cin,
      genre: req.body.prof.genre,
      num_loyer: req.body.prof.num_loyer,
      date_entre_ecole: req.body.prof.date_entre_ecole,
      date_fct_publique: req.body.prof.date_fct_publique,
      num_ref: req.body.prof.num_ref,
      date_effective: req.body.prof.date_effective,
      anciennete: req.body.prof.anciennete,
      date_visa: req.body.prof.date_visa,
    };

    const newHist = {
      grade: req.body.hist.grade,
      cadre: req.body.hist.cadre,
      classe: req.body.hist.classe,
    };

    console.log("the cadre is :"+req.body.hist.cadre)

    const hist = await Historique.find({ "professeur": professeurId }).sort({ date: -1 });

    const changesDetected = hist.length > 0 &&
      (newHist.classe != hist[0].classe || newHist.grade != hist[0].grade || newHist.cadre != hist[0].cadre);


    const updatedProfesseur = await Professeur.findByIdAndUpdate(professeurId, professeurUpdates, { new: true });

    if (changesDetected) {
      const newHistoricalRecord = new Historique({
        professeur: professeurId,
        grade: newHist.grade,
        cadre: newHist.cadre,
        classe: newHist.classe,
        date: new Date(), 
      });

      await newHistoricalRecord.save();
    }

    if (!updatedProfesseur) {
      return res.status(404).json({ error: 'Professor not found' });
    }

    res.status(200).json(updatedProfesseur);
  } catch (error) {
    console.error('Error updating professor:', error);
    res.status(500).json({ error: 'Failed to update professor' });
  }
};

