#!/usr/bin/env node

/**
 * MongoDB Atlas Deployment Script
 * This script helps deploy your portfolio to MongoDB Atlas
 */

require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const User = require('./models/User');

// Sample data for seeding
const projects = [
    {
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration.",
        longDescription: "A comprehensive e-commerce platform built with React frontend and Node.js backend. Features include user registration/login, product catalog with search and filtering, shopping cart functionality, secure payment processing with Stripe, order management, and admin dashboard for inventory management.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        github: "https://github.com/Asif-jutt",
        demo: "https://ecommerce-demo.com",
        image: "/images/projects/ecommerce.jpg",
        featured: true,
        order: 1
    },
    {
        name: "World Explorer App",
        description: "Interactive web application for exploring countries and cultures with real-time data integration.",
        longDescription: "An educational web application that allows users to explore different countries, learn about their cultures, geography, and demographics. Features interactive maps, country comparison tools, and real-time data from various APIs.",
        technologies: ["JavaScript", "HTML5", "CSS3", "External APIs", "Chart.js"],
        github: "https://github.com/Asif-jutt",
        demo: "https://world-explorer.com",
        image: "/images/projects/world-explorer.jpg",
        featured: true,
        order: 2
    },
    {
        name: "Task Management System",
        description: "Comprehensive todo application with drag-and-drop functionality and real-time updates.",
        longDescription: "A modern task management application with drag-and-drop interface, real-time collaboration, project organization, deadline tracking, and team management features. Built with modern web technologies for optimal performance.",
        technologies: ["EJS", "Node.js", "MongoDB", "Express", "Socket.io"],
        github: "https://github.com/Asif-jutt",
        demo: "https://task-manager.com",
        image: "/images/projects/task-manager.jpg",
        featured: true,
        order: 3
    },
    {
        name: "Portfolio Website",
        description: "Professional portfolio website with admin panel, contact form, and dynamic content management.",
        longDescription: "A fully responsive portfolio website showcasing projects, skills, and professional experience. Features include admin panel for content management, contact form with email integration, dynamic project display, and modern responsive design.",
        technologies: ["Node.js", "Express", "EJS", "MongoDB", "Nodemailer"],
        github: "https://github.com/Asif-jutt",
        demo: "http://localhost:3000",
        image: "/images/projects/portfolio.jpg",
        featured: false,
        order: 4
    }
];

const skills = [
    // Frontend Skills
    { name: "JavaScript", category: "frontend", level: 85, years: "2+ years", icon: "fab fa-js-square", color: "#f7df1e", isActive: true, order: 1 },
    { name: "React", category: "frontend", level: 80, years: "2+ years", icon: "fab fa-react", color: "#61dafb", isActive: true, order: 2 },
    { name: "HTML5", category: "frontend", level: 95, years: "3+ years", icon: "fab fa-html5", color: "#e34f26", isActive: true, order: 3 },
    { name: "CSS3", category: "frontend", level: 90, years: "3+ years", icon: "fab fa-css3-alt", color: "#1572b6", isActive: true, order: 4 },
    { name: "Vue.js", category: "frontend", level: 70, years: "1+ years", icon: "fab fa-vuejs", color: "#4fc08d", isActive: true, order: 5 },
    
    // Backend Skills
    { name: "Node.js", category: "backend", level: 85, years: "2+ years", icon: "fab fa-node-js", color: "#339933", isActive: true, order: 1 },
    { name: "Express.js", category: "backend", level: 80, years: "2+ years", icon: "fas fa-server", color: "#000000", isActive: true, order: 2 },
    { name: "Python", category: "backend", level: 85, years: "2+ years", icon: "fab fa-python", color: "#3776ab", isActive: true, order: 3 },
    { name: "C#", category: "backend", level: 70, years: "1+ years", icon: "fas fa-code", color: "#239120", isActive: true, order: 4 },
    
    // Database Skills
    { name: "MongoDB", category: "database", level: 85, years: "2+ years", icon: "fas fa-database", color: "#47a248", isActive: true, order: 1 },
    { name: "PostgreSQL", category: "database", level: 70, years: "1+ years", icon: "fas fa-database", color: "#336791", isActive: true, order: 2 },
    { name: "MySQL", category: "database", level: 75, years: "1+ years", icon: "fas fa-database", color: "#4479a1", isActive: true, order: 3 },
    
    // Tools & Others
    { name: "Git", category: "tools", level: 85, years: "2+ years", icon: "fab fa-git-alt", color: "#f05032", isActive: true, order: 1 },
    { name: "Docker", category: "tools", level: 40, years: "6+ months", icon: "fab fa-docker", color: "#2496ed", isActive: true, order: 2 },
    { name: "VS Code", category: "tools", level: 95, years: "3+ years", icon: "fas fa-code", color: "#007acc", isActive: true, order: 3 },
    { name: "Figma", category: "tools", level: 70, years: "1+ years", icon: "fab fa-figma", color: "#f24e1e", isActive: true, order: 4 }
];

async function deployToAtlas() {
    try {
        console.log('🚀 Starting MongoDB Atlas deployment...');
        
        // Connect to Atlas
        const mongoURI = process.env.MONGO_URI || 'mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB Atlas');

        // Clear existing data
        await Project.deleteMany({});
        await Skill.deleteMany({});
        await User.deleteMany({});
        console.log('🧹 Cleared existing data');

        // Seed projects
        await Project.insertMany(projects);
        console.log(`✅ Seeded ${projects.length} projects`);

        // Seed skills
        await Skill.insertMany(skills);
        console.log(`✅ Seeded ${skills.length} skills`);

        // Create admin user
        const adminUser = new User({
            name: 'Asif Hussain',
            email: 'asifhussain5115@gmail.com',
            password: 'asifhussain511',
            role: 'admin',
            profile: {
                title: 'MERN Stack Developer',
                bio: 'Passionate developer with expertise in modern web technologies.',
                phone: '+92 300 1234567',
                location: 'Lahore, Punjab, Pakistan',
                social: {
                    github: 'https://github.com/Asif-jutt',
                    linkedin: 'https://linkedin.com/in/asif-hussain-uet',
                    twitter: '#',
                    website: 'http://localhost:3000'
                }
            }
        });

        await adminUser.save();
        console.log('✅ Created admin user');

        console.log('\n🎉 MongoDB Atlas deployment completed successfully!');
        console.log('\n📋 Deployment Summary:');
        console.log(`- ${projects.length} projects deployed`);
        console.log(`- ${skills.length} skills deployed`);
        console.log('- 1 admin user created');
        console.log('\n🔑 Admin credentials:');
        console.log('Email: asifhussain5115@gmail.com');
        console.log('Password: asifhussain511');
        console.log('\n🌐 Your portfolio is now ready for production!');

    } catch (error) {
        console.error('❌ Deployment failed:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\n🔌 Disconnected from MongoDB Atlas');
        process.exit(0);
    }
}

// Run deployment
deployToAtlas();
