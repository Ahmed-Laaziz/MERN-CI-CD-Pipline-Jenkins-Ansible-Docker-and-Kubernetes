const mongoose = require('mongoose');
const Demande = require('./demande-admin');
const Schema = mongoose.Schema;

const demandeQuitterTerritoireSchema = new Schema({
        
        de_date: {
            type: Date,
            required: true
        },
        a_date: {
            type: Date,
            required: true
        },
        universite: {
            type: String,
            required: true
        },
    }
)

const DemandeQuitterTerritoire = Demande.discriminator('DemandeQuitterTerritoire_', demandeQuitterTerritoireSchema);
module.exports = DemandeQuitterTerritoire;