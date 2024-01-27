// File routes (fileRoutes.js)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileController = require('../../controllers/file/adminFileController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./files");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      console.log("file uploaded name" + file.originalname)
      cb(null, uniqueSuffix + file.originalname);
    },
  });

const upload = multer({ storage: storage });

router.get('/get-files', fileController.getFiles);
router.get('/chefFiles/:chefId', fileController.getFilesForChef);
router.post('/upload-files', upload.single('file'), fileController.uploadFile);

module.exports = router;
