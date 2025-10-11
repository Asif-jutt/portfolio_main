# MongoDB Atlas Deployment Guide

## 🚀 Deploy Your Portfolio to MongoDB Atlas

This guide will help you deploy your portfolio website to MongoDB Atlas cloud database.

## Prerequisites

1. MongoDB Atlas account (free tier available)
2. Node.js installed on your system
3. Your portfolio project files

## Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for a free account
- Create a new cluster (free tier: M0)

### 1.2 Configure Database Access
- Go to "Database Access" in your Atlas dashboard
- Create a new database user:
  - Username: `asifhussain`
  - Password: `asif5115`
  - Database User Privileges: "Read and write to any database"

### 1.3 Configure Network Access
- Go to "Network Access" in your Atlas dashboard
- Add IP Address: `0.0.0.0/0` (allow access from anywhere)
- Or add your specific IP address for security

### 1.4 Get Connection String
- Go to "Clusters" in your Atlas dashboard
- Click "Connect" on your cluster
- Choose "Connect your application"
- Copy the connection string

## Step 2: Environment Configuration

### 2.1 Create Environment File
Create a `.env` file in your project root:

```env
# MongoDB Atlas Connection
MONGO_URI=mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0

# Developer Information
DEVELOPER_NAME=Asif Hussain
DEVELOPER_EMAIL=asifhussain5115@gmail.com
DEVELOPER_PHONE=+92 300 1234567
DEVELOPER_LOCATION=Lahore, Punjab, Pakistan
DEVELOPER_GITHUB=https://github.com/Asif-jutt
DEVELOPER_LINKEDIN=https://linkedin.com/in/asif-hussain-uet

# Email Configuration
EMAIL_USER=asifhussain5115@gmail.com
EMAIL_PASS=umufazevltisxktj

# JWT Secret
JWT_SECRET=portfolio-admin-secret-key-2024-production-secure

# Production Settings
NODE_ENV=production
PORT=3000
```

## Step 3: Deploy to Atlas

### 3.1 Install Dependencies
```bash
npm install
```

### 3.2 Deploy Data to Atlas
```bash
npm run deploy-atlas
```

This will:
- Connect to your MongoDB Atlas cluster
- Clear existing data (if any)
- Seed your database with projects, skills, and admin user
- Verify the deployment

### 3.3 Start Production Server
```bash
npm run production
```

## Step 4: Verify Deployment

1. **Check Database Connection**
   - Visit your application
   - Check console logs for "MongoDB Atlas Connected"

2. **Test Admin Login**
   - Go to `/admin/login`
   - Use credentials:
     - Email: `asifhussain5115@gmail.com`
     - Password: `asifhussain511`

3. **Verify Data**
   - Check that projects load on homepage
   - Verify skills display on skills page
   - Test contact form functionality

## Step 5: Production Deployment (Optional)

### 5.1 Deploy to Hosting Platform

#### Heroku
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-portfolio-app

# Set environment variables
heroku config:set MONGO_URI=mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=portfolio-admin-secret-key-2024-production-secure

# Deploy
git push heroku main
```

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build and deploy through Netlify dashboard
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod
```

## Step 6: Security Best Practices

### 6.1 Environment Variables
- Never commit `.env` file to version control
- Use strong, unique passwords
- Rotate JWT secrets regularly

### 6.2 Database Security
- Use IP whitelisting in Atlas
- Enable MongoDB Atlas encryption
- Regular backups

### 6.3 Application Security
- Use HTTPS in production
- Implement rate limiting
- Validate all inputs

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Check MongoDB Atlas cluster status
   - Verify network access settings
   - Ensure connection string is correct

2. **Authentication Failed**
   - Verify database user credentials
   - Check user permissions

3. **Data Not Loading**
   - Run deployment script again
   - Check console for errors
   - Verify environment variables

### Support
- MongoDB Atlas Documentation
- Node.js MongoDB Driver Docs
- Portfolio GitHub Issues

## 🎉 Success!

Your portfolio is now deployed to MongoDB Atlas and ready for production use!

### Admin Access
- URL: `your-domain.com/admin/login`
- Email: `asifhussain5115@gmail.com`
- Password: `asifhussain511`

### Features Available
- ✅ Dynamic project management
- ✅ Skills management
- ✅ Contact form with email
- ✅ Admin authentication
- ✅ CV download functionality
- ✅ Responsive design
- ✅ Dark mode support
