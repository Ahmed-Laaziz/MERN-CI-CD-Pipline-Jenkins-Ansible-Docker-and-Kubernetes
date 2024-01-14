const mongoose = require('mongoose');
const Agent = require('./agent');
const Schema = mongoose.Schema;

const profSchema = new Schema({
        
        num_loyer: {
            type: Number,
            required: false
        },
        date_entre_ecole: {
            type: Date,
            required: false
        },
        date_fct_publique: {
            type: String,
            required: false
        },
        cadre: {
            type: String,
            required: false,
            default: "fonctionnaire"
        },
        num_ref: {
            type: Number,
            required: false
        },
        date_effective: {
            type: Date,
            required: false
        },
        anciennete: {
            type: String,
            required: false
        },
        date_visa: {
            type: Date,
            required: false
        },
        departement: {
            type: String,
            required: false,
            default: "FCT"
        },
    }
)

const Professeur = Agent.discriminator('Professeur', profSchema);
module.exports = Professeur;