const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    technologies: [{
        type: String,
        required: true,
        trim: true
    }],
    image: {
        type: String,
        required: true,
        default: '/images/default-project.jpg'
    },
    github: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/github\.com\/.+/.test(v);
            },
            message: 'Please provide a valid GitHub URL'
        }
    },
    demo: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid demo URL'
        }
    },
    featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['completed', 'in-progress', 'planned'],
        default: 'completed'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'desktop', 'api', 'other'],
        default: 'web'
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Index for better query performance
projectSchema.index({ featured: 1, order: 1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({ category: 1 });

module.exports = mongoose.model('Project', projectSchema);
