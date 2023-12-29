const mongoose = require('mongoose');
const Agent = require('./agent');
const Schema = mongoose.Schema;

const profSchema = new Schema({
        
        num_loyer: {
            type: Number,
            required: true
        },
        date_entre_ecole: {
            type: Date,
            required: true
        },
        date_fct_publique: {
            type: String,
            required: true
        },
        cadre: {
            type: String,
            required: true
        },
        num_ref: {
            type: Number,
            required: true
        },
        date_effective: {
            type: Date,
            required: true
        },
        anciennete: {
            type: String,
            required: true
        },
        date_visa: {
            type: Date,
            required: true
        },
        departement: {
            type: String,
            required: true
        },
    }
)

const Professeur = Agent.discriminator('Professeur', profSchema);
module.exports = Professeur;