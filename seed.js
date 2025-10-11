const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const User = require('./models/User');
const connectDB = require('./config/database');

// Connect to database
connectDB();

const seedData = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Clear existing data
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await User.deleteMany({});

        console.log('🗑️  Cleared existing data');

        // Seed Projects
        const projects = [
            {
                name: 'E-Commerce Platform',
                description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, payment integration, and admin dashboard.',
                technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API', 'JWT'],
                image: '/images/project1.jpg',
                github: 'https://github.com/yourusername/ecommerce-platform',
                demo: 'https://your-ecommerce-demo.com',
                featured: true,
                category: 'web',
                order: 1
            },
            {
                name: 'Task Management App',
                description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
                technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL', 'Redis'],
                image: '/images/project2.jpg',
                github: 'https://github.com/yourusername/task-manager',
                demo: 'https://your-task-manager-demo.com',
                featured: true,
                category: 'web',
                order: 2
            },
            {
                name: 'Weather Dashboard',
                description: 'A responsive weather dashboard that displays current weather and 5-day forecast for any location worldwide using weather APIs.',
                technologies: ['JavaScript', 'HTML5', 'CSS3', 'Weather API', 'Chart.js'],
                image: '/images/project3.jpg',
                github: 'https://github.com/yourusername/weather-dashboard',
                demo: 'https://your-weather-demo.com',
                featured: false,
                category: 'web',
                order: 3
            },
            {
                name: 'Blog Platform',
                description: 'A modern blog platform with markdown support, comment system, and SEO optimization built with Next.js and headless CMS.',
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Contentful', 'Vercel'],
                image: '/images/project4.jpg',
                github: 'https://github.com/yourusername/blog-platform',
                demo: 'https://your-blog-demo.com',
                featured: false,
                category: 'web',
                order: 4
            },
            {
                name: 'Social Media Analytics',
                description: 'A comprehensive social media analytics dashboard that tracks engagement, follower growth, and content performance across multiple platforms.',
                technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Social Media APIs'],
                image: '/images/project5.jpg',
                github: 'https://github.com/yourusername/social-analytics',
                demo: 'https://your-analytics-demo.com',
                featured: true,
                category: 'web',
                order: 5
            },
            {
                name: 'Recipe Finder App',
                description: 'A mobile-first recipe discovery app with advanced filtering, meal planning, and grocery list generation features.',
                technologies: ['React Native', 'Firebase', 'Redux', 'Spoonacular API'],
                image: '/images/project6.jpg',
                github: 'https://github.com/yourusername/recipe-finder',
                demo: 'https://your-recipe-demo.com',
                featured: false,
                category: 'mobile',
                order: 6
            }
        ];

        await Project.insertMany(projects);
        console.log('📁 Seeded projects');

        // Seed Skills
        const skills = [
            // Frontend Skills
            { name: 'React', category: 'frontend', level: 95, years: '4+ years', icon: 'fab fa-react', color: '#61dafb', order: 1 },
            { name: 'Vue.js', category: 'frontend', level: 85, years: '3+ years', icon: 'fab fa-vue', color: '#4fc08d', order: 2 },
            { name: 'JavaScript', category: 'frontend', level: 90, years: '5+ years', icon: 'fab fa-js-square', color: '#f7df1e', order: 3 },
            { name: 'TypeScript', category: 'frontend', level: 80, years: '2+ years', icon: 'fab fa-js-square', color: '#3178c6', order: 4 },
            { name: 'HTML5', category: 'frontend', level: 95, years: '6+ years', icon: 'fab fa-html5', color: '#e34f26', order: 5 },
            { name: 'CSS3', category: 'frontend', level: 90, years: '6+ years', icon: 'fab fa-css3-alt', color: '#1572b6', order: 6 },
            { name: 'Tailwind CSS', category: 'frontend', level: 85, years: '3+ years', icon: 'fas fa-palette', color: '#06b6d4', order: 7 },
            { name: 'Bootstrap', category: 'frontend', level: 80, years: '4+ years', icon: 'fab fa-bootstrap', color: '#7952b3', order: 8 },

            // Backend Skills
            { name: 'Node.js', category: 'backend', level: 90, years: '4+ years', icon: 'fab fa-node-js', color: '#339933', order: 1 },
            { name: 'Express', category: 'backend', level: 85, years: '4+ years', icon: 'fas fa-server', color: '#000000', order: 2 },
            { name: 'Python', category: 'backend', level: 80, years: '3+ years', icon: 'fab fa-python', color: '#3776ab', order: 3 },
            { name: 'PHP', category: 'backend', level: 75, years: '3+ years', icon: 'fab fa-php', color: '#777bb4', order: 4 },
            { name: 'Java', category: 'backend', level: 70, years: '2+ years', icon: 'fab fa-java', color: '#007396', order: 5 },
            { name: 'REST APIs', category: 'backend', level: 90, years: '4+ years', icon: 'fas fa-code', color: '#ff6b6b', order: 6 },
            { name: 'GraphQL', category: 'backend', level: 75, years: '2+ years', icon: 'fas fa-project-diagram', color: '#e10098', order: 7 },

            // Database Skills
            { name: 'MongoDB', category: 'database', level: 85, years: '3+ years', icon: 'fas fa-database', color: '#47a248', order: 1 },
            { name: 'PostgreSQL', category: 'database', level: 80, years: '3+ years', icon: 'fas fa-database', color: '#336791', order: 2 },
            { name: 'MySQL', category: 'database', level: 75, years: '4+ years', icon: 'fas fa-database', color: '#4479a1', order: 3 },
            { name: 'Redis', category: 'database', level: 70, years: '2+ years', icon: 'fas fa-database', color: '#dc382d', order: 4 },
            { name: 'Firebase', category: 'database', level: 80, years: '3+ years', icon: 'fab fa-google', color: '#ffca28', order: 5 },

            // Tools Skills
            { name: 'Git', category: 'tools', level: 90, years: '5+ years', icon: 'fab fa-git-alt', color: '#f05032', order: 1 },
            { name: 'Docker', category: 'tools', level: 70, years: '2+ years', icon: 'fab fa-docker', color: '#2496ed', order: 2 },
            { name: 'AWS', category: 'tools', level: 75, years: '2+ years', icon: 'fab fa-aws', color: '#ff9900', order: 3 },
            { name: 'Figma', category: 'tools', level: 75, years: '2+ years', icon: 'fab fa-figma', color: '#f24e1e', order: 4 },
            { name: 'VS Code', category: 'tools', level: 95, years: '4+ years', icon: 'fas fa-code', color: '#007acc', order: 5 },
            { name: 'Postman', category: 'tools', level: 85, years: '3+ years', icon: 'fas fa-paper-plane', color: '#ff6c37', order: 6 },
            { name: 'Linux', category: 'tools', level: 80, years: '3+ years', icon: 'fab fa-linux', color: '#fcc624', order: 7 }
        ];

        await Skill.insertMany(skills);
        console.log('🛠️  Seeded skills');

        // Seed Admin User
        const adminUser = new User({
            name: 'Asif Hussain',
            email: 'asifhussain5115@gmail.com',
            password: 'asifhussain511', // This will be hashed automatically
            role: 'admin',
            profile: {
                title: 'Full Stack Developer',
                bio: 'Passionate developer with expertise in modern web technologies.',
                phone: '+1 (555) 123-4567',
                location: 'Your City, Country',
                social: {
                    github: 'https://github.com/yourusername',
                    linkedin: 'https://linkedin.com/in/yourusername',
                    twitter: 'https://twitter.com/yourusername',
                    website: 'https://yourwebsite.com'
                }
            }
        });

        await adminUser.save();
        console.log('👤 Seeded admin user');

        console.log('✅ Database seeding completed successfully!');
        console.log('\n📋 Summary:');
        console.log(`- ${projects.length} projects seeded`);
        console.log(`- ${skills.length} skills seeded`);
        console.log('- 1 admin user created');
        console.log('\n🔑 Admin credentials:');
        console.log('Email: asifhussain5115@gmail.com');
        console.log('Password: asifhussain511');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 Database connection closed');
    }
};

// Run the seed function
seedData();
