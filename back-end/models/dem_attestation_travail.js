const mongoose = require('mongoose');
const Demande = require('./demande');
const Schema = mongoose.Schema;

const demandeAttestationTravail = new Schema({
    description: {
        type: String,
    },
    }
)

const DemandeAttestationTravail = Demande.discriminator('DemandeAttestationTravail', demandeAttestationTravail);
module.exports = DemandeAttestationTravail;