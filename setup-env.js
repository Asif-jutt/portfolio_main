#!/usr/bin/env node

/**
 * Environment Setup Script for MongoDB Atlas
 * This script helps you set up your environment variables for Atlas deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up environment for MongoDB Atlas deployment...\n');

// Environment variables for Atlas
const envContent = `# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0

# Developer Information
DEVELOPER_NAME=Asif Hussain
DEVELOPER_EMAIL=asifhussain5115@gmail.com
DEVELOPER_PHONE=+92 300 1234567
DEVELOPER_LOCATION=Lahore, Punjab, Pakistan
DEVELOPER_GITHUB=https://github.com/Asif-jutt
DEVELOPER_LINKEDIN=https://linkedin.com/in/asif-hussain-uet
DEVELOPER_TWITTER=#

# Email Configuration (Nodemailer)
EMAIL_USER=asifhussain5115@gmail.com
EMAIL_PASS=umufazevltisxktj

# JWT Secret for Admin Authentication
JWT_SECRET=portfolio-admin-secret-key-2024-production-secure

# Production Settings
NODE_ENV=development
PORT=3000
SESSION_SECRET=portfolio-session-secret-2024-production
`;

// Check if .env already exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    console.log('📝 Please manually update your .env file with the Atlas connection string:');
    console.log('\nMONGO_URI=mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0\n');
} else {
    try {
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env file created successfully!');
        console.log('📋 Environment variables configured for MongoDB Atlas');
    } catch (error) {
        console.error('❌ Error creating .env file:', error.message);
        console.log('\n📝 Please manually create a .env file with the following content:');
        console.log('\n' + envContent);
    }
}

console.log('\n🚀 Next steps:');
console.log('1. Run: npm run deploy-atlas');
console.log('2. Run: npm start');
console.log('3. Visit: http://localhost:3000');
console.log('\n🔑 Admin Login:');
console.log('Email: asifhussain5115@gmail.com');
console.log('Password: asifhussain511');
console.log('\n🌐 Your portfolio is ready for MongoDB Atlas!');
