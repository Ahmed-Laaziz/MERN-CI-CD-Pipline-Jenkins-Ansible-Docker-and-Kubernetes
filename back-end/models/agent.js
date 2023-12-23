// agent.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agentSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
}
, {timestamps: true})
;

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;