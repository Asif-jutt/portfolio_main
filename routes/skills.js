const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

// GET skills page
router.get('/', skillsController.getSkills);

module.exports = router;
