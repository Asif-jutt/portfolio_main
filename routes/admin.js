const express = require('express');
const router = express.Router();
const { authenticateSession } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const adminProjectController = require('../controllers/adminProjectController');
const adminSkillController = require('../controllers/adminSkillController');
const { body } = require('express-validator');

// Public routes (no authentication required)
router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.adminLogin);

// Protected routes (authentication required)
router.use(authenticateSession); // All routes below require authentication

// Dashboard
router.get('/dashboard', adminController.adminDashboard);
router.get('/logout', adminController.adminLogout);

// Projects Management
router.get('/projects', adminController.getProjects);
router.post('/projects', [
    body('name').notEmpty().withMessage('Project name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('technologies').notEmpty().withMessage('Technologies are required'),
    body('github').isURL().withMessage('Valid GitHub URL is required'),
    body('demo').isURL().withMessage('Valid demo URL is required')
], adminProjectController.createProject);

router.get('/projects/:id', adminProjectController.getProject);
router.put('/projects/:id', [
    body('name').notEmpty().withMessage('Project name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('technologies').notEmpty().withMessage('Technologies are required'),
    body('github').isURL().withMessage('Valid GitHub URL is required'),
    body('demo').isURL().withMessage('Valid demo URL is required')
], adminProjectController.updateProject);

router.delete('/projects/:id', adminProjectController.deleteProject);

// Skills Management
router.get('/skills', adminController.getSkills);
router.post('/skills', [
    body('name').notEmpty().withMessage('Skill name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('level').isInt({ min: 0, max: 100 }).withMessage('Level must be between 0-100'),
    body('years').notEmpty().withMessage('Years experience is required')
], adminSkillController.createSkill);

router.get('/skills/:id', adminSkillController.getSkill);
router.put('/skills/:id', [
    body('name').notEmpty().withMessage('Skill name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('level').isInt({ min: 0, max: 100 }).withMessage('Level must be between 0-100'),
    body('years').notEmpty().withMessage('Years experience is required')
], adminSkillController.updateSkill);

router.delete('/skills/:id', adminSkillController.deleteSkill);

// Contacts Management
router.get('/contacts', adminController.getContacts);

module.exports = router;
