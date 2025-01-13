const { validationResult } = require('express-validator');
const UserModel = require('../models/user.model');
const userService = require('../services/user.service');

module.exports.registerUser = async (req, res, next) => {
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
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.array()
            });
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        const user = await UserModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = user.generateAuthToken();
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });

    } catch (error) {
        next(error);
    }
}