// Simple test script to verify the application structure

const express = require('express');
const path = require('path');

// Test if all required files exist
const requiredFiles = [
    'app.js',
    'package.json',
    'controllers/homeController.js',
    'controllers/aboutController.js',
    'controllers/projectsController.js',
    'controllers/skillsController.js',
    'controllers/contactController.js',
    'routes/home.js',
    'routes/about.js',
    'routes/projects.js',
    'routes/skills.js',
    'routes/contact.js',
    'views/home.ejs',
    'views/about.ejs',
    'views/projects.ejs',
    'views/skills.ejs',
    'views/contact.ejs',
    'views/404.ejs',
    'views/error.ejs',
    'views/partials/navbar.ejs',
    'views/partials/footer.ejs',
    'public/css/style.css',
    'public/js/main.js',
    'public/js/animations.js',
    'public/js/project-filters.js',
    'public/js/contact-form.js',
    'public/js/skills-animations.js',
    'data/projects.json'
];

console.log('🔍 Checking required files...\n');

const fs = require('fs');
let allFilesExist = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
    console.log('🎉 All required files are present!');
    console.log('📁 Project structure is complete.');
    console.log('\n📋 Next steps:');
    console.log('1. Create a .env file with your configuration');
    console.log('2. Update data/projects.json with your projects');
    console.log('3. Add your images to public/images/');
    console.log('4. Run: npm start');
    console.log('5. Visit: http://localhost:3000');
} else {
    console.log('❌ Some files are missing. Please check the errors above.');
}

console.log('\n🚀 Your portfolio is ready to customize!');
