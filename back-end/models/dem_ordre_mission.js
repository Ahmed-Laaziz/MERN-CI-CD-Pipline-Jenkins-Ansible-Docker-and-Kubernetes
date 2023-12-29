const mongoose = require('mongoose');
const Demande = require('./demande');
const Schema = mongoose.Schema;

const demandeOrdreMission = new Schema({
        
        de_date:{
            type: Date,
            required: true
        },
        a_date:{
            type: Date,
            required: true
        },
        mission_a: {
            type: String,
            required: true
        },
        moyen_transport: {
            type: String,
            required: true
        },
    }
)

const DemandeOrdreMission = Demande.discriminator('DemandeOrdreMission', demandeOrdreMission);
module.exports = DemandeOrdreMission;