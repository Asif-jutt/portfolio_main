// Example configuration file
// Copy this to config.js and update with your actual values

module.exports = {
    // Server Configuration
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // Email Configuration (for contact form)
    email: {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password',
        to: process.env.EMAIL_TO || 'your-email@gmail.com'
    },

    // Your Information
    developer: {
        name: process.env.DEVELOPER_NAME || 'Your Name',
        email: process.env.DEVELOPER_EMAIL || 'your-email@example.com',
        phone: process.env.DEVELOPER_PHONE || '+1 (555) 123-4567',
        location: process.env.DEVELOPER_LOCATION || 'Your City, Country',
        github: process.env.DEVELOPER_GITHUB || 'https://github.com/yourusername',
        linkedin: process.env.DEVELOPER_LINKEDIN || 'https://linkedin.com/in/yourusername',
        twitter: process.env.DEVELOPER_TWITTER || 'https://twitter.com/yourusername'
    }
};
