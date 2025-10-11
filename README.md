# Professional Developer Portfolio

A modern, responsive portfolio website built with Node.js, Express, and EJS templating. Features a clean design, smooth animations, and a working contact form.

## 🚀 Features

- **Modern Design**: Clean and professional layout with smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Contact Form**: Working contact form with email functionality using Nodemailer
- **Project Showcase**: Dynamic project display with filtering capabilities
- **Skills Display**: Interactive skills section with progress bars
- **Dark/Light Mode**: Theme toggle functionality
- **Smooth Scrolling**: Enhanced user experience with smooth scrolling
- **SEO Optimized**: Proper meta tags and semantic HTML
- **MVC Architecture**: Clean separation of concerns with routes, controllers, and views

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS
- **Styling**: CSS3 with custom properties and animations
- **Email Service**: Nodemailer
- **Validation**: Express-validator
- **Environment**: dotenv for configuration

## 📁 Project Structure

```
Portfolio/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── README.md             # Project documentation
├── controllers/          # Route controllers
│   ├── homeController.js
│   ├── aboutController.js
│   ├── projectsController.js
│   ├── skillsController.js
│   └── contactController.js
├── routes/               # Express routes
│   ├── home.js
│   ├── about.js
│   ├── projects.js
│   ├── skills.js
│   └── contact.js
├── views/                # EJS templates
│   ├── home.ejs
│   ├── about.ejs
│   ├── projects.ejs
│   ├── skills.ejs
│   ├── contact.ejs
│   ├── 404.ejs
│   ├── error.ejs
│   └── partials/
│       ├── navbar.ejs
│       └── footer.ejs
├── public/               # Static assets
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   ├── animations.js
│   │   ├── project-filters.js
│   │   ├── contact-form.js
│   │   └── skills-animations.js
│   └── images/
└── data/                 # JSON data files
    └── projects.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- An email account for contact form functionality

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Email Configuration (for contact form)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=your-email@gmail.com

   # Your Information
   DEVELOPER_NAME=Your Name
   DEVELOPER_EMAIL=your-email@gmail.com
   DEVELOPER_PHONE=+1 (555) 123-4567
   DEVELOPER_LOCATION=Your City, Country
   DEVELOPER_GITHUB=https://github.com/yourusername
   DEVELOPER_LINKEDIN=https://linkedin.com/in/yourusername
   DEVELOPER_TWITTER=https://twitter.com/yourusername
   ```

4. **Email Setup**
   
   For Gmail users:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in `EMAIL_PASS`

5. **Customize Your Information**
   
   - Update `data/projects.json` with your projects
   - Replace placeholder images in `public/images/`
   - Modify personal information in the `.env` file

6. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev

   # Production mode
   npm start
   ```

7. **Access the website**
   
   Open your browser and navigate to `http://localhost:3000`

## 🎨 Customization

### Adding Projects

Edit `data/projects.json` to add your projects:

```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "technologies": ["React", "Node.js", "MongoDB"],
  "image": "/images/project1.jpg",
  "github": "https://github.com/yourusername/project",
  "demo": "https://your-project-demo.com",
  "featured": true
}
```

### Modifying Skills

Update the skills in `controllers/skillsController.js`:

```javascript
const skillCategories = {
  'Frontend Development': {
    skills: [
      { name: 'React', level: 95, years: '4+ years' },
      // Add more skills...
    ],
    color: '#3498db'
  }
};
```

### Styling

- Main styles: `public/css/style.css`
- Colors and themes can be customized using CSS custom properties
- Dark/light mode colors are defined in the `:root` and `[data-theme="dark"]` selectors

### Adding Pages

1. Create a new route file in `routes/`
2. Create a corresponding controller in `controllers/`
3. Create an EJS template in `views/`
4. Add the route to `app.js`

## 📱 Features in Detail

### Contact Form
- Real-time validation
- Email sending with Nodemailer
- Auto-reply functionality
- Success/error handling

### Project Filtering
- Filter by technology
- Search functionality
- Featured projects toggle
- Responsive grid layout

### Skills Display
- Animated progress bars
- Interactive hover effects
- Skill level indicators
- Categorized by technology type

### Animations
- Scroll-triggered animations
- Smooth transitions
- Loading animations
- Hover effects

## 🚀 Deployment

### Heroku Deployment

1. **Install Heroku CLI**
2. **Create Heroku app**
   ```bash
   heroku create your-portfolio-app
   ```

3. **Set environment variables**
   ```bash
   heroku config:set EMAIL_HOST=smtp.gmail.com
   heroku config:set EMAIL_PORT=587
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   # Add all other environment variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Other Platforms

The application can be deployed to:
- Vercel
- Netlify
- DigitalOcean
- AWS
- Any Node.js hosting platform

## 🔧 Scripts

- `npm start` - Start the application in production mode
- `npm run dev` - Start the application in development mode with auto-restart
- `npm test` - Run tests (when implemented)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you have any questions or need help with the setup, please:
- Open an issue on GitHub
- Contact me through the portfolio contact form

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- The open-source community for inspiration and tools

---

**Happy coding!** 🚀
