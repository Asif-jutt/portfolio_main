# Render Deployment Guide

## 🌐 Deploy Your Portfolio to Render

This guide will help you deploy your portfolio website to Render with MongoDB Atlas.

## 📋 Environment Variables for Render

Add these environment variables in your Render dashboard:

### 🗄️ **Database Configuration**
```
MONGO_URI=mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
```

### 👤 **Developer Information**
```
DEVELOPER_NAME=Asif Hussain
DEVELOPER_EMAIL=asifhussain5115@gmail.com
DEVELOPER_PHONE=+92 300 1234567
DEVELOPER_LOCATION=Lahore, Punjab, Pakistan
DEVELOPER_GITHUB=https://github.com/Asif-jutt
DEVELOPER_LINKEDIN=https://linkedin.com/in/asif-hussain-uet
DEVELOPER_TWITTER=#
```

### 📧 **Email Configuration (Nodemailer)**
```
EMAIL_USER=asifhussain5115@gmail.com
EMAIL_PASS=umufazevltisxktj
```

### 🔐 **Security & Authentication**
```
JWT_SECRET=portfolio-admin-secret-key-2024-production-secure-render-deployment
SESSION_SECRET=portfolio-session-secret-2024-production-render
```

### ⚙️ **Production Settings**
```
NODE_ENV=production
PORT=10000
```

## 🚀 Step-by-Step Render Deployment

### Step 1: Prepare Your Repository
1. Push your code to GitHub
2. Ensure all files are committed
3. Make sure `package.json` has the correct start script

### Step 2: Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Choose your portfolio repository

### Step 3: Configure Build & Deploy
```
Build Command: npm install
Start Command: npm run production
```

### Step 4: Add Environment Variables
Copy and paste each environment variable from the list above into Render's environment variables section.

### Step 5: Deploy Settings
- **Region**: Choose closest to your users (e.g., Frankfurt for Europe, Oregon for US)
- **Branch**: main (or your default branch)
- **Auto-Deploy**: Yes (for automatic deployments on git push)

### Step 6: Deploy
1. Click "Create Web Service"
2. Wait for build and deployment to complete
3. Your site will be available at: `https://your-app-name.onrender.com`

## 🔧 Render-Specific Configuration

### Update package.json for Render
```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "seed": "node seed.js",
    "deploy-atlas": "node deploy-atlas.js",
    "production": "NODE_ENV=production node app.js",
    "render-postbuild": "npm run deploy-atlas"
  }
}
```

### Create render.yaml (Optional)
Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: portfolio
    env: node
    buildCommand: npm install
    startCommand: npm run production
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGO_URI
        value: mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0
      - key: JWT_SECRET
        value: portfolio-admin-secret-key-2024-production-secure-render-deployment
      - key: SESSION_SECRET
        value: portfolio-session-secret-2024-production-render
      - key: EMAIL_USER
        value: asifhussain5115@gmail.com
      - key: EMAIL_PASS
        value: umufazevltisxktj
```

## 📱 Post-Deployment Steps

### 1. Deploy Data to Atlas
After your first deployment, you may need to manually run the deployment script:
```bash
npm run deploy-atlas
```

### 2. Test Your Deployment
- ✅ Visit your Render URL
- ✅ Test admin login: `/admin/login`
- ✅ Check CV download: `/cv`
- ✅ Verify contact form
- ✅ Test all pages load correctly

### 3. Set Up Custom Domain (Optional)
1. Go to your Render service settings
2. Add your custom domain
3. Update DNS records as instructed

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in package.json
   - Ensure Node.js version is compatible

2. **Database Connection Issues**
   - Verify MONGO_URI is correct
   - Check MongoDB Atlas network access settings

3. **Environment Variables Not Working**
   - Double-check variable names (case-sensitive)
   - Ensure no extra spaces in values

4. **Static Files Not Loading**
   - Verify public folder is in repository
   - Check file paths are correct

## 💰 Render Pricing

- **Free Tier**: 750 hours/month, sleeps after 15 min inactivity
- **Starter Plan**: $7/month - Always on, custom domains
- **Standard Plan**: $25/month - Auto-scaling, better performance

## 🎉 Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Render web service created
- [ ] All environment variables added
- [ ] Build and deployment successful
- [ ] MongoDB Atlas connected
- [ ] Admin login working
- [ ] CV download functional
- [ ] Contact form sending emails
- [ ] All pages loading correctly

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Custom Domains](https://render.com/docs/custom-domains)

---

**Your portfolio will be live at:** `https://your-app-name.onrender.com`

**Admin Access:**
- Email: `asifhussain5115@gmail.com`
- Password: `asifhussain511`
