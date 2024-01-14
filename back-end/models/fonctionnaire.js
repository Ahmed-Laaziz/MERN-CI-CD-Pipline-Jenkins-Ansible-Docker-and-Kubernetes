const mongoose = require('mongoose');
const Agent = require('./agent');
const Schema = mongoose.Schema;

const fonctionnaireSchema = new Schema({
        
        fonction: {
            type: String,
            required: true
        },
        departement:{
            type: String,
            default: 'Département des fonctionnaires' 
        }
    }
)

const Fonctionnaire = Agent.discriminator('Fonctionnaire', fonctionnaireSchema);
module.exports = Fonctionnaire;