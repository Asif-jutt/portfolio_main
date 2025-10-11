const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

// GET projects page
router.get('/', projectsController.getProjects);

// GET individual project page
router.get('/:id', projectsController.getProject);

module.exports = router;
