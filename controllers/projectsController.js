const Project = require('../models/Project');

const getProjects = async (req, res) => {
    try {
        const { category, featured, search } = req.query;
        let query = {};

        // Filter by featured projects if requested
        if (featured === 'true') {
            query.featured = true;
        }

        // Filter by technology category if provided
        if (category && category !== 'all') {
            query.technologies = { $regex: category, $options: 'i' };
        }

        // Search functionality
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { technologies: { $regex: search, $options: 'i' } }
            ];
        }

        const projects = await Project.find(query)
            .sort({ order: 1, createdAt: -1 });

        // Get unique technologies for filter
        const allTechnologies = await Project.distinct('technologies');

        res.render('projects', {
            title: 'My Projects',
            currentYear: new Date().getFullYear(),
            projects,
            allTechnologies,
            currentCategory: category || 'all',
            showFeaturedOnly: featured === 'true',
            searchTerm: search || ''
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).render('error', {
            title: '500 - Server Error',
            currentYear: new Date().getFullYear(),
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).render('404', {
                title: 'Project Not Found',
                currentYear: new Date().getFullYear()
            });
        }

        res.render('project-detail', {
            title: project.name,
            currentYear: new Date().getFullYear(),
            project
        });
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).render('error', {
            title: '500 - Server Error',
            currentYear: new Date().getFullYear(),
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

module.exports = {
    getProjects,
    getProject
};
