const mongoose = require('mongoose');

const PdfAdminsDetailsSchema = new mongoose.Schema(
    {
      chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
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
  
const File = mongoose.model("PdfAdminsDetails", PdfAdminsDetailsSchema);

module.exports = File;
