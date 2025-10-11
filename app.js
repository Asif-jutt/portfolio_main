const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/database');

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Set environment
const isProduction = process.env.NODE_ENV === 'production';

// Import routes
const homeRoutes = require('./routes/home');
const aboutRoutes = require('./routes/about');
const projectsRoutes = require('./routes/projects');
const skillsRoutes = require('./routes/skills');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const cvRoutes = require('./routes/cv');

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Security headers for production
if (isProduction) {
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        next();
    });
}

// Routes
app.use('/', homeRoutes);
app.use('/about', aboutRoutes);
app.use('/projects', projectsRoutes);
app.use('/skills', skillsRoutes);
app.use('/contact', contactRoutes);
app.use('/admin', adminRoutes);
app.use('/cv', cvRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Page Not Found',
        currentYear: new Date().getFullYear()
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: '500 - Server Error',
        currentYear: new Date().getFullYear(),
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
    console.log(`📊 Environment: ${isProduction ? 'Production' : 'Development'}`);
    console.log(`🗄️  Database: MongoDB Atlas`);
});

module.exports = app;
