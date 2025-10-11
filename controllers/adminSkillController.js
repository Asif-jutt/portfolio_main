const Skill = require('../models/Skill');
const { validationResult } = require('express-validator');

// Create Skill
const createSkill = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const skillData = {
            name: req.body.name,
            category: req.body.category,
            level: parseInt(req.body.level),
            years: req.body.years,
            description: req.body.description,
            icon: req.body.icon,
            color: req.body.color,
            order: parseInt(req.body.order) || 0,
            isActive: req.body.isActive === 'true'
        };

        const skill = new Skill(skillData);
        await skill.save();

        res.json({
            success: true,
            message: 'Skill created successfully',
            skill
        });

    } catch (error) {
        console.error('Create skill error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating skill',
            error: error.message
        });
    }
};

// Update Skill
const updateSkill = async (req, res) => {
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
            category: req.body.category,
            level: parseInt(req.body.level),
            years: req.body.years,
            description: req.body.description,
            icon: req.body.icon,
            color: req.body.color,
            order: parseInt(req.body.order) || 0,
            isActive: req.body.isActive === 'true'
        };

        const skill = await Skill.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }

        res.json({
            success: true,
            message: 'Skill updated successfully',
            skill
        });

    } catch (error) {
        console.error('Update skill error:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating skill',
            error: error.message
        });
    }
};

// Delete Skill
const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findByIdAndDelete(id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }

        res.json({
            success: true,
            message: 'Skill deleted successfully'
        });

    } catch (error) {
        console.error('Delete skill error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting skill',
            error: error.message
        });
    }
};

// Get Single Skill
const getSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: 'Skill not found'
            });
        }

        res.json({
            success: true,
            skill
        });

    } catch (error) {
        console.error('Get skill error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching skill',
            error: error.message
        });
    }
};

module.exports = {
    createSkill,
    updateSkill,
    deleteSkill,
    getSkill
};
