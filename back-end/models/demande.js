const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeur' },
  description: String,
  statut: {
    type: String,
    default: 'En attente'
}
},
{timestamps: true}
);

const Demande = mongoose.model('Demande', demandeSchema);

module.exports = Demande;