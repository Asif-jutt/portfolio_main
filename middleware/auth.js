const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'portfolio-admin-secret-key-2024');
        const user = await User.findById(decoded.userId);

        if (!user || !user.isActive) {
            return res.status(401).json({ message: 'Invalid or inactive user' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// Session-based authentication for web pages
const authenticateSession = async (req, res, next) => {
    try {
        const token = req.cookies.adminToken;

        if (!token) {
            return res.redirect('/admin/login');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'portfolio-admin-secret-key-2024');
        const user = await User.findById(decoded.userId);

        if (!user || !user.isActive || user.role !== 'admin') {
            res.clearCookie('adminToken');
            return res.redirect('/admin/login');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Session auth error:', error);
        res.clearCookie('adminToken');
        return res.redirect('/admin/login');
    }
};

module.exports = {
    authenticateToken,
    requireAdmin,
    authenticateSession
};
