// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
    nom: {
        type: String,
        required: false
    },
    prenom: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: false
    },
    cin: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: false
    },
}
, {timestamps: true})
;

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
