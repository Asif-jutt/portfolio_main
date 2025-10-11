const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).render('admin/login', {
                title: 'Admin Login',
                error: 'Invalid credentials'
            });
        }

        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(401).render('admin/login', {
                title: 'Admin Login',
                error: 'Access denied. Admin privileges required.'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).render('admin/login', {
                title: 'Admin Login',
                error: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'portfolio-admin-secret-key-2024',
            { expiresIn: '24h' }
        );

        // Set cookie
        res.cookie('adminToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.redirect('/admin/dashboard');

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).render('admin/login', {
            title: 'Admin Login',
            error: 'Server error occurred'
        });
    }
};

// Admin Dashboard
const adminDashboard = async (req, res) => {
    try {
        // Get statistics
        const totalProjects = await Project.countDocuments();
        const totalSkills = await Skill.countDocuments();
        const totalContacts = await Contact.countDocuments();
        const newContacts = await Contact.countDocuments({ status: 'new' });

        // Get recent projects and contacts
        const recentProjects = await Project.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const recentContacts = await Contact.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            currentYear: new Date().getFullYear(),
            user: req.user,
            stats: {
                totalProjects,
                totalSkills,
                totalContacts,
                newContacts
            },
            recentProjects,
            recentContacts
        });

    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).render('admin/error', {
            title: 'Dashboard Error',
            error: error.message
        });
    }
};

// Admin Logout
const adminLogout = (req, res) => {
    res.clearCookie('adminToken');
    res.redirect('/admin/login');
};

// Get Login Page
const getLoginPage = (req, res) => {
    res.render('admin/login', {
        title: 'Admin Login',
        error: null
    });
};

// Get Projects Management
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.render('admin/projects', {
            title: 'Manage Projects',
            currentYear: new Date().getFullYear(),
            user: req.user,
            projects
        });
    } catch (error) {
        console.error('Get projects error:', error);
        res.status(500).render('admin/error', {
            title: 'Error',
            error: error.message
        });
    }
};

// Get Skills Management
const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, order: 1 });
        res.render('admin/skills', {
            title: 'Manage Skills',
            currentYear: new Date().getFullYear(),
            user: req.user,
            skills
        });
    } catch (error) {
        console.error('Get skills error:', error);
        res.status(500).render('admin/error', {
            title: 'Error',
            error: error.message
        });
    }
};

// Get Contacts Management
const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.render('admin/contacts', {
            title: 'Manage Contacts',
            currentYear: new Date().getFullYear(),
            user: req.user,
            contacts
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).render('admin/error', {
            title: 'Error',
            error: error.message
        });
    }
};

module.exports = {
    adminLogin,
    adminDashboard,
    adminLogout,
    getLoginPage,
    getProjects,
    getSkills,
    getContacts
};
