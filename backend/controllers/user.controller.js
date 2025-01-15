const { validationResult } = require('express-validator');
const UserModel = require('../models/user.model');
const userService = require('../services/user.service');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        const { username, email, password } = req.body;
        const hashPassword = await UserModel.hashPassword(password);

        const user = await userService.createUser({
            username,
            email,
            password: hashPassword
        });

        const token = user.generateAuthToken();
        res.status(201).json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = user.generateAuthToken();

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUserProfile = async (req, res) => {
    try {
        // The user will be available from the auth middleware
        const user = req.user;

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports.logoutUser = async (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0 });
        await blacklistTokenModel.create({ token: req.cookies.token });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};