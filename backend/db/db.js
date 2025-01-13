const mongoose = require('mongoose');

async function connectDB() {
    try {
        if (!process.env.db_connect) {
            throw new Error('MongoDB connection string is not defined in environment variables');
        }

        await mongoose.connect(process.env.db_connect, {

        });
        console.log('✅ Connected to MongoDB Atlas successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:',
            error.message === 'connect ECONNREFUSED ::1:27017'
                ? 'Could not connect to MongoDB Atlas. Please check your internet connection and connection string.'
                : error.message
        );
        process.exit(1);
    }
}

module.exports = connectDB; 