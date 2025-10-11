const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET contact page
router.get('/', contactController.getContact);

// POST contact form
router.post('/', contactController.contactValidation, contactController.sendMessage);

module.exports = router;
