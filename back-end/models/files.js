// File model (file.js)
const mongoose = require('mongoose');

const PdfDetailsSchema = new mongoose.Schema(
    {
      professeur: { type: mongoose.Schema.Types.ObjectId, ref: 'Professeur' },
      pdf: String,
      title: String,
      fileType: {
        type: String,
        default: "Fichier PDF" // Define the default value here
      }
    },
    {
        collection: "PdfDetails",
        timestamps: true // Place the timestamps option within the same object
      }
  );
  
const File = mongoose.model("PdfDetails", PdfDetailsSchema);

module.exports = File;
