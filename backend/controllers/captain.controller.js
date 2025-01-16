const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { username, email, password, vehicle } = req.body;
    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain already exists' });
    }
    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        username,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({
        captain, token
    });
};
module.exports.loginCaptain = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain || !(await captain.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = captain.generateAuthToken();

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Send response
        return res.status(200).json({
            success: true,
            token,
            captain: {
                _id: captain._id,
                username: captain.username,
                email: captain.email
            }
        });
    } catch (error) {
        // Ensure only one response is sent
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message });
        }
    }
};
module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({
        captain: req.captain
    })
};
module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logout successful' });
};
