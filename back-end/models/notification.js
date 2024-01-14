const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
  professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeur' },
  statut: {
    type: String,
    default: 'Unviewed'
}
},
{timestamps: true}
);

const Notification = mongoose.model('Notification', notifSchema);

module.exports = Notification;