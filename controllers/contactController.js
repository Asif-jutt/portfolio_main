const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Email validation rules
const contactValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces'),
    
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),
    
    body('subject')
        .trim()
        .isLength({ min: 5, max: 100 })
        .withMessage('Subject must be between 5 and 100 characters'),
    
    body('message')
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage('Message must be between 10 and 1000 characters')
];

const getContact = (req, res) => {
    res.render('contact', {
        title: 'Contact Me',
        currentYear: new Date().getFullYear(),
        developerName: 'Asif Hussain',
        developerEmail: 'asifhussain.develop@gmail.com',
        developerPhone: '+92 3228407660',
        developerLocation: 'Lahore, Punjab Pakistan',
        developerGithub: 'https://github.com/Asif-jutt',
        developerLinkedin: '#',
        developerTwitter: '#',
        success: null,
        errors: null
    });
};

const sendMessage = async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('contact', {
                title: 'Contact Me',
                currentYear: new Date().getFullYear(),
                developerName: process.env.DEVELOPER_NAME || 'Your Name',
                developerEmail: process.env.DEVELOPER_EMAIL || 'your-email@example.com',
                developerPhone: process.env.DEVELOPER_PHONE || '+1 (555) 123-4567',
                developerLocation: process.env.DEVELOPER_LOCATION || 'Your City, Country',
                developerGithub: process.env.DEVELOPER_GITHUB || '#',
                developerLinkedin: process.env.DEVELOPER_LINKEDIN || '#',
                developerTwitter: process.env.DEVELOPER_TWITTER || '#',
                success: null,
                errors: errors.array(),
                formData: req.body
            });
        }

        const { name, email, subject, message } = req.body;

        // Save contact message to MongoDB
        const contactMessage = new Contact({
            name,
            email,
            subject,
            message,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        });

        await contactMessage.save();

        // Create transporter (using environment variables)
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_TO || process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background-color: white; padding: 15px; border-left: 4px solid #3498db; margin-top: 10px;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    <p style="color: #666; font-size: 14px;">
                        This message was sent from your portfolio contact form.
                    </p>
                </div>
            `,
            replyTo: email
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send auto-reply to user
        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting me!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Thank you for reaching out!</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for contacting me through my portfolio website. I've received your message about "${subject}" and will get back to you as soon as possible.</p>
                    <p>I typically respond within 24 hours during business days.</p>
                    <p>Best regards,<br>Your Name</p>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                    <p style="color: #666; font-size: 12px;">
                        This is an automated response. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(autoReplyOptions);

        res.render('contact', {
            title: 'Contact Me',
            currentYear: new Date().getFullYear(),
            developerName: process.env.DEVELOPER_NAME || 'Asif Hussain',
            developerEmail: process.env.DEVELOPER_EMAIL || 'asifhussain5115@gmail.com',
            developerPhone: process.env.DEVELOPER_PHONE || '+92 300 1234567',
            developerLocation: process.env.DEVELOPER_LOCATION || 'Lahore, Punjab, Pakistan',
            developerGithub: process.env.DEVELOPER_GITHUB || '#',
            developerLinkedin: process.env.DEVELOPER_LINKEDIN || '#',
            developerTwitter: process.env.DEVELOPER_TWITTER || '#',
            success: 'Thank you for your message! I will get back to you soon.',
            errors: null
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.render('contact', {
            title: 'Contact Me',
            currentYear: new Date().getFullYear(),
            developerName: process.env.DEVELOPER_NAME || 'Asif Hussain',
            developerEmail: process.env.DEVELOPER_EMAIL || 'asifhussain5115@gmail.com',
            developerPhone: process.env.DEVELOPER_PHONE || '+92 300 1234567',
            developerLocation: process.env.DEVELOPER_LOCATION || 'Lahore, Punjab, Pakistan',
            developerGithub: process.env.DEVELOPER_GITHUB || '#',
            developerLinkedin: process.env.DEVELOPER_LINKEDIN || '#',
            developerTwitter: process.env.DEVELOPER_TWITTER || '#',
            success: null,
            errors: [{ msg: 'Sorry, there was an error sending your message. Please try again later.' }]
        });
    }
};

module.exports = {
    getContact,
    sendMessage,
    contactValidation
};
