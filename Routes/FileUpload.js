const express = require('express');
const router = express.Router();

const { uploadFile,uploadImagefile,uploadVideofile } = require('../Controllers/fileUpload');

router.post('/upload', uploadFile);
router.post('/uploadImage', uploadImagefile);
router.post('/uploadVideo', uploadVideofile);

module.exports = router;