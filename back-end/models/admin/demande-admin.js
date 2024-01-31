const mongoose = require('mongoose');

const demandeAdminSchema = new mongoose.Schema({
  chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  description: String,
  statut: {
    type: String,
    default: 'En Cours'
}
},
{timestamps: true}
);

const DemandeAdmin = mongoose.model('DemandeAdmin', demandeAdminSchema);

module.exports = DemandeAdmin;