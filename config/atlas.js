// MongoDB Atlas Configuration
require('dotenv').config();

const mongoose = require('mongoose');

const connectAtlas = async () => {
    try {
        // Use Atlas connection string from environment variables
        const mongoURI = process.env.MONGO_URI || 'mongodb+srv://asifhussain:asif5115@cluster0.tyqvxzo.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB Atlas connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB Atlas disconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB Atlas connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1);
    }
};

module.exports = connectAtlas;
