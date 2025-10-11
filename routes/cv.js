const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

// CV Preview and Download Route
router.get('/', cvController.getCV);

module.exports = router;
