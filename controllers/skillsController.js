const Skill = require('../models/Skill');

const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({ isActive: true })
            .sort({ category: 1, order: 1 });

        // Group skills by category
        const skillCategories = {};
        skills.forEach(skill => {
            if (!skillCategories[skill.category]) {
                skillCategories[skill.category] = {
                    skills: [],
                    color: getCategoryColor(skill.category)
                };
            }
            skillCategories[skill.category].skills.push({
                name: skill.name,
                level: skill.level,
                years: skill.years,
                icon: skill.icon,
                color: skill.color
            });
        });

        // Add category titles
        const categoryTitles = {
            'frontend': 'Frontend Development',
            'backend': 'Backend Development',
            'database': 'Database & Cloud',
            'tools': 'Tools & Others',
            'mobile': 'Mobile Development',
            'cloud': 'Cloud & DevOps',
            'other': 'Other Skills'
        };

        // Format the data for the view
        const formattedCategories = {};
        Object.keys(skillCategories).forEach(key => {
            formattedCategories[categoryTitles[key] || key] = skillCategories[key];
        });

        // Online Learning Courses
        const onlineCourses = [
            {
                name: 'Python Programming',
                platform: 'Online Learning Platforms',
                status: 'Completed',
                description: 'Mastered Python fundamentals, data structures, and object-oriented programming'
            },
            {
                name: '.NET Development',
                platform: 'Microsoft Learn & Online Courses',
                status: 'In Progress',
                description: 'Learning C# and .NET framework for enterprise application development'
            },
            {
                name: 'Artificial Intelligence & Machine Learning',
                platform: 'Online Learning Platforms',
                status: 'Completed',
                description: 'Explored AI fundamentals, machine learning algorithms, and data science concepts'
            },
            {
                name: 'Game Development',
                platform: 'Online Learning Platforms',
                status: 'Completed',
                description: 'Learned game development principles, Unity basics, and game design concepts'
            },
            {
                name: 'MERN Stack Development',
                platform: 'Self-Learning & Online Courses',
                status: 'Completed',
                description: 'Full-stack development with MongoDB, Express.js, React, and Node.js'
            }
        ];

        // Personal Information
        const personalInfo = {
            name: 'Asif Hussain',
            education: 'BS Computer Science - UET Lahore (2023-2027)',
            scholarship: 'Scholarship Holder',
            location: 'Lahore, Punjab, Pakistan',
            github: 'https://github.com/Asif-jutt',
            learningApproach: 'Self-motivated learner with passion for continuous skill development'
        };

        res.render('skills', {
            title: 'Skills & Experience',
            currentYear: new Date().getFullYear(),
            skillCategories: formattedCategories,
            onlineCourses,
            personalInfo
        });
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).render('error', {
            title: '500 - Server Error',
            currentYear: new Date().getFullYear(),
            error: process.env.NODE_ENV === 'development' ? error : {}
        });
    }
};

// Helper function to get category colors
function getCategoryColor(category) {
    const colors = {
        'frontend': '#3498db',
        'backend': '#e74c3c',
        'database': '#2ecc71',
        'tools': '#f39c12',
        'mobile': '#9b59b6',
        'cloud': '#1abc9c',
        'other': '#95a5a6'
    };
    return colors[category] || '#3498db';
}

module.exports = {
    getSkills
};
