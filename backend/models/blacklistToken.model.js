const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

// Function to insert a token
blacklistTokenSchema.statics.insertToken = async function (token) {
    try {
        // Check if the token already exists
        const existingToken = await this.findOne({ token });
        if (existingToken) {
            console.log('Token already exists, skipping insertion.');
            return; // or handle as needed
        }

        // Insert the new token
        await this.create({ token });
        console.log('Token inserted successfully.');
    } catch (error) {
        console.error('Error inserting token:', error);
        // Handle the error as needed
    }
};

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);

