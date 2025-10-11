const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please provide a valid email address'
        }
    },
    subject: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
    repliedAt: {
        type: Date
    },
    replyMessage: {
        type: String
    }
}, {
    timestamps: true
});

// Index for better query performance
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', contactSchema);
