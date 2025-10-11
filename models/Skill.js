const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['frontend', 'backend', 'database', 'tools', 'mobile', 'cloud', 'other']
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 50
    },
    years: {
        type: String,
        required: true,
        default: '1+ years'
    },
    description: {
        type: String,
        maxlength: 500
    },
    icon: {
        type: String,
        default: 'fas fa-code'
    },
    color: {
        type: String,
        default: '#3498db'
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for better query performance
skillSchema.index({ category: 1, order: 1 });
skillSchema.index({ isActive: 1 });

module.exports = mongoose.model('Skill', skillSchema);
