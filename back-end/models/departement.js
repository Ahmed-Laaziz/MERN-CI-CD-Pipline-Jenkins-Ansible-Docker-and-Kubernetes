const mongoose = require('mongoose');

const depSchema = new mongoose.Schema({
    libele: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{timestamps: true}
);

const Departement = mongoose.model('Departement', depSchema);

module.exports = Departement;