const Project = require('../models/Project');

const getHome = async (req, res) => {
    try {
        const featuredProjects = await Project.find({ featured: true })
            .sort({ order: 1, createdAt: -1 })
            .limit(3);
        
        res.render('home', {
            title: 'Home',
            currentYear: new Date().getFullYear(),
            featuredProjects,
            developerName: process.env.DEVELOPER_NAME || 'Asif Hussain',
            developerTitle: 'MERN Stack Developer | UET Lahore'
        });
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        res.status(500).render('error', {
            title: '500 - Server Error',
            currentYear: new Date().getFullYear(),
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

module.exports = {
    getHome
};
