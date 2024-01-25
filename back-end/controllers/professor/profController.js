const Professeur = require("../../models/professeur");
const Historique = require("../../models/historique");
const sendEmail = require('../../business/emailSender');
const generateRandomPassword = require('../../business/passwordGenerator');
const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');


const yourSecretKey = "2e8b32f6d789c1fa68e540f8b2c9825f";

const encrypt = (text) => {
  const ciphertext = CryptoJS.AES.encrypt(text, yourSecretKey).toString();
  return ciphertext;
};



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

exports.getProfByEmail = async (req, res, next) => {
  try {
    const Prof = await Professeur.findOne({"email": req.body.email});
    res.status(200).json(Prof);
  } catch (error) {
    console.error('Error retrieving professeurs:', error);
    res.status(500).json({ error: 'Failed to retrieve professeurs' });
  }
};

exports.getProfsExceptFCT = async (req, res, next) => {
  try {
      const profsExceptFCT = await Professeur.find({ departement: { $nin: ['FCT', 'Rh', 'Scolarité', 'Informatique'] } });
      res.status(200).json(profsExceptFCT);
  } catch (error) {
      console.error('Error retrieving professors except FCT:', error);
      res.status(500).json({ error: 'Failed to retrieve professors except FCT' });
  }
};

// Define a route to retrieve and return professors for the department "TRI"
exports.getProfsTRI = async (req, res, next) => {
  try {
      const profsTRI = await Professeur.find({ departement: 'TRI' });
      res.status(200).json(profsTRI);
  } catch (error) {
      console.error('Error retrieving TRI professors:', error);
      res.status(500).json({ error: 'Failed to retrieve TRI professors' });
  }
};

// Define a route to retrieve and return professors for the department "FCT"
exports.getProfsFCT = async (req, res, next) => {
  try {
      const profsFCT = await Professeur.find({ departement: { $in: ['FCT', 'Rh', 'Scolarité', 'Informatique'] } });
      res.status(200).json(profsFCT);
  } catch (error) {
      console.error('Error retrieving FCT professors:', error);
      res.status(500).json({ error: 'Failed to retrieve FCT professors' });
  }
};

// Define a route to retrieve and return professors for the department "CP"
exports.getProfsCP = async (req, res, next) => {
  try {
      const profsCP = await Professeur.find({ departement: 'STIN' });
      res.status(200).json(profsCP);
  } catch (error) {
      console.error('Error retrieving STIN professors:', error);
      res.status(500).json({ error: 'Failed to retrieve STIN professors' });
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

    const emailSubject = 'Bienvenue a notre plateforme';

    const emailText = `Cher Professeur,\n\nVous avez été ajouté à notre plateforme. Votre email de connexion est : ${req.body.email}\nVotre mot de passe est : ${randomPassword}\n\nVeuillez utiliser ces identifiants pour vous connecter a notre plateforme : https://grh-ensaj-front.vercel.app/\n\nCordialement,\nVotre Équipe de Plateforme`;

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
      departement: req.body.departement
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

exports.forgotMail =  async (req, res, next) => {

  try{
  // Forgotten Password Email Subject

  const forgotPasswordSubject = 'Réinitialisation de mot de passe';
  const email = encrypt(req.body.email);

  const prof = await Professeur.find({ "email": req.body.email }).sort({ date: -1 });

  // Forgotten Password Email Body
  const forgotPasswordText = "Cher Professeur,\n\nVous avez demandé la réinitialisation de votre mot de passe sur notre plateforme. Pour procéder à la réinitialisation, veuillez suivre le lien ci-dessous :\n\nhttps://grh-ensaj-front.vercel.app/new-pass?e="+email+"\n\nSi vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.\n\nCordialement,\nVotre Équipe de Plateforme";
  sendEmail(req.body.email, forgotPasswordSubject, forgotPasswordText);
    
  } catch (error) {
    console.error('Error adding professeur:', error);
    res.status(500).json({ error: 'Failed to add professeur' });
  }
}

exports.updatePass = async (req, res, next) => {
  try {
    console.log("the professor is :")
    console.log(req.body.prof)
    console.log("now updating!")

    const professeurId = req.body.prof._id;
    console.log("the id is : "+professeurId) 
    const professeurUpdates = {
      nom: req.body.prof.nom,
      prenom: req.body.prof.prenom,
      email: req.body.prof.email,
      tel: req.body.prof.tel,
      cin: req.body.prof.cin,
      password: req.body.prof.password,
      genre: req.body.prof.genre,
      num_loyer: req.body.prof.num_loyer,
      date_entre_ecole: req.body.prof.date_entre_ecole,
      date_fct_publique: req.body.prof.date_fct_publique,
      num_ref: req.body.prof.num_ref,
      date_effective: req.body.prof.date_effective,
      anciennete: req.body.prof.anciennete,
      date_visa: req.body.prof.date_visa,
    };


    const updatedProfesseur = await Professeur.findByIdAndUpdate(professeurId, professeurUpdates, { new: true });

    if (!updatedProfesseur) {
      return res.status(404).json({ error: 'Professor not found' });
    }


    res.status(200).json(updatedProfesseur);
  } catch (error) {
    console.error('Error updating professor:', error);
    res.status(500).json({ error: 'Failed to update professor' });
  }
}

