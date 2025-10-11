const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Create Project
const createProject = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const projectData = {
            name: req.body.name,
            description: req.body.description,
            technologies: req.body.technologies.split(',').map(tech => tech.trim()),
            image: req.body.image,
            github: req.body.github,
            demo: req.body.demo,
            featured: req.body.featured === 'true',
            category: req.body.category,
            order: parseInt(req.body.order) || 0
        };

        const project = new Project(projectData);
        await project.save();

        res.json({
            success: true,
            message: 'Project created successfully',
            project
        });

    } catch (error) {
        console.error('Create project error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating project',
            error: error.message
        });
    }
};

// Update Project
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const updateData = {
            name: req.body.name,
            description: req.body.description,
            technologies: req.body.technologies.split(',').map(tech => tech.trim()),
            image: req.body.image,
            github: req.body.github,
            demo: req.body.demo,
            featured: req.body.featured === 'true',
            category: req.body.category,
            order: parseInt(req.body.order) || 0
        };

        const project = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project updated successfully',
            project
        });

    } catch (error) {
        console.error('Update project error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating project',
            error: error.message
        });
    }
};

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });

    } catch (error) {
        console.error('Delete project error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting project',
            error: error.message
        });
    }
};

// Get Single Project
const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            project
        });

    } catch (error) {
        console.error('Get project error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching project',
            error: error.message
        });
    }
};

module.exports = {
    createProject,
    updateProject,
    deleteProject,
    getProject
};
