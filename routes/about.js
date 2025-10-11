const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// GET about page
router.get('/', aboutController.getAbout);

module.exports = router;
