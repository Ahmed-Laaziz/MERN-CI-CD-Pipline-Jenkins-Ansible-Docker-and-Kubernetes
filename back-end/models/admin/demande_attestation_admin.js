const mongoose = require('mongoose');
const Demande = require('./demande-admin');
const Schema = mongoose.Schema;

const demandeAttestationTravailAdmin = new Schema({
    description: {
        type: String,
    },
    }
)

const DemandeAttestationTravail = Demande.discriminator('DemandeAttestationTravail_', demandeAttestationTravailAdmin);
module.exports = DemandeAttestationTravail;