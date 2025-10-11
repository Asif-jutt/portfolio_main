const getCV = (req, res) => {
    const cvData = {
        personalInfo: {
            name: 'Asif Hussain',
            title: 'MERN Stack Developer & Computer Science Student',
            email: 'asifhussain5115@gmail.com',
            phone: '+92 300 1234567',
            location: 'Lahore, Punjab, Pakistan',
            github: 'https://github.com/Asif-jutt',
            linkedin: 'https://linkedin.com/in/asif-hussain-uet',
            website: 'http://localhost:3000'
        },
        summary: {
            title: 'Professional Summary',
            content: 'Dedicated Computer Science student at UET Lahore with a passion for full-stack development. Scholarship holder demonstrating academic excellence and commitment to advancing technical expertise. Proficient in MERN stack, Python, .NET, AI/ML, and Game Development with a client-centric approach to delivering innovative solutions.'
        },
        education: {
            title: 'Education',
            items: [
                {
                    degree: 'Bachelor of Science in Computer Science',
                    institution: 'University of Engineering and Technology (UET) Lahore',
                    period: '2023 - 2027 (Expected)',
                    achievements: ['Scholarship Holder', 'Academic Excellence'],
                    gpa: '3.8/4.0'
                }
            ]
        },
        skills: {
            title: 'Technical Skills',
            categories: [
                {
                    name: 'Programming Languages',
                    skills: ['JavaScript', 'Python', 'C#', 'HTML5', 'CSS3', 'SQL']
                },
                {
                    name: 'Frontend Development',
                    skills: ['React.js', 'Vue.js', 'EJS', 'Tailwind CSS', 'Bootstrap', 'Responsive Design']
                },
                {
                    name: 'Backend Development',
                    skills: ['Node.js', 'Express.js', '.NET', 'RESTful APIs', 'GraphQL', 'Authentication']
                },
                {
                    name: 'Database & Cloud',
                    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'AWS Basics']
                },
                {
                    name: 'AI & Machine Learning',
                    skills: ['Python ML Libraries', 'Data Analysis', 'Algorithm Development', 'Neural Networks']
                },
                {
                    name: 'Game Development',
                    skills: ['Unity', 'Game Design Principles', 'C# Game Programming', '2D/3D Development']
                },
                {
                    name: 'Tools & Technologies',
                    skills: ['Git/GitHub', 'Docker', 'Postman', 'VS Code', 'Figma', 'Agile/Scrum']
                }
            ]
        },
        projects: {
            title: 'Notable Projects',
            items: [
                {
                    name: 'E-Commerce Platform',
                    description: 'Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration.',
                    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
                    github: 'https://github.com/Asif-jutt',
                    demo: 'https://ecommerce-demo.com'
                },
                {
                    name: 'World Explorer App',
                    description: 'Interactive web application for exploring countries and cultures with real-time data integration.',
                    technologies: ['JavaScript', 'HTML5', 'CSS3', 'External APIs'],
                    github: 'https://github.com/Asif-jutt',
                    demo: 'https://world-explorer.com'
                },
                {
                    name: 'Task Management System',
                    description: 'Comprehensive todo application with drag-and-drop functionality and real-time updates.',
                    technologies: ['EJS', 'Node.js', 'MongoDB', 'Express'],
                    github: 'https://github.com/Asif-jutt',
                    demo: 'https://task-manager.com'
                },
                {
                    name: 'Portfolio Website',
                    description: 'Professional portfolio website with admin panel, contact form, and dynamic content management.',
                    technologies: ['Node.js', 'Express', 'EJS', 'MongoDB', 'Nodemailer'],
                    github: 'https://github.com/Asif-jutt',
                    demo: 'http://localhost:3000'
                }
            ]
        },
        certifications: {
            title: 'Certifications & Courses',
            items: [
                {
                    name: 'Python Programming Mastery',
                    issuer: 'Online Learning Platforms',
                    date: '2023',
                    status: 'Completed'
                },
                {
                    name: 'Artificial Intelligence & Machine Learning',
                    issuer: 'Online Learning Platforms',
                    date: '2023-2024',
                    status: 'Completed'
                },
                {
                    name: 'Game Development Fundamentals',
                    issuer: 'Online Learning Platforms',
                    date: '2024',
                    status: 'Completed'
                },
                {
                    name: 'MERN Stack Development',
                    issuer: 'Self-Learning & Online Courses',
                    date: '2024',
                    status: 'Completed'
                },
                {
                    name: '.NET Development',
                    issuer: 'Microsoft Learn & Online Courses',
                    date: '2024 - Present',
                    status: 'In Progress'
                }
            ]
        },
        achievements: {
            title: 'Achievements & Highlights',
            items: [
                'Scholarship holder at UET Lahore demonstrating academic excellence',
                '10+ GitHub repositories showcasing diverse project portfolio',
                'Proficient in multiple programming languages and frameworks',
                'Strong foundation in both frontend and backend development',
                'Experience in AI/ML and Game Development domains',
                'Active contributor to open-source projects',
                'Client-focused approach with emphasis on solution quality'
            ]
        },
        languages: {
            title: 'Languages',
            items: [
                { language: 'English', proficiency: 'Fluent' },
                { language: 'Urdu', proficiency: 'Native' },
                { language: 'Punjabi', proficiency: 'Native' }
            ]
        }
    };

    res.render('cv', {
        title: 'Curriculum Vitae - Asif Hussain',
        currentYear: new Date().getFullYear(),
        cvData,
        developerName: cvData.personalInfo.name
    });
};

module.exports = {
    getCV
};
