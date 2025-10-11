const getAbout = (req, res) => {
    const skills = {
        frontend: ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Bootstrap'],
        backend: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel', 'Java', 'Spring Boot'],
        database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
        tools: ['Git', 'Docker', 'AWS', 'Vercel', 'Netlify', 'Figma', 'Postman', 'VS Code']
    };

    const experience = [
        {
            title: 'BS Computer Science',
            company: 'University of Engineering and Technology (UET) Lahore',
            period: '2023 - 2027',
            description: 'Currently pursuing Bachelor of Science in Computer Science. Scholarship holder demonstrating academic excellence and commitment to the field.'
        },
        {
            title: 'MERN Stack Developer',
            company: 'Freelance Projects',
            period: '2023 - Present',
            description: 'Developing full-stack web applications using MongoDB, Express.js, React, and Node.js. Creating scalable solutions for various clients.'
        },
        {
            title: 'Web Development Projects',
            company: 'Personal Portfolio',
            period: '2023 - Present',
            description: 'Built multiple projects including E-Commerce platforms, Todo applications, and World Explorer apps using modern web technologies.'
        }
    ];

    res.render('about', {
        title: 'About Me',
        currentYear: new Date().getFullYear(),
        skills,
        experience,
        developerName: 'Asif Hussain',
        developerEmail: 'asifhussain5115@gmail.com',
        developerPhone: '+92 300 1234567',
        developerLocation: 'Lahore, Punjab, Pakistan'
    });
};

module.exports = {
    getAbout
};
