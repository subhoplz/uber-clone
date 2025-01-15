require('dotenv').config();
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res, next) => {
    try {
        // Get the authorization header
        const authHeader = req.headers.authorization;
        let token;

        // Check if token exists in authorization header with Bearer scheme
        if (authHeader) {
            // First validate the full header format
            const bearerRegex = /^bearer\s+[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/i;
            if (!bearerRegex.test(authHeader)) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid authorization header format',
                    error: 'Authorization header must be in format: Bearer <token>'
                });
            }
            token = authHeader.split(' ')[1];
        }
        // If no valid auth header, check for token in cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        // If no token found anywhere, return error
        else {
            return res.status(401).json({
                success: false,
                message: 'No valid authentication token found',
                error: 'Missing authentication token'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
                error: 'Token verification failed'
            });
        }

        // Add user to request object
        req.user = decoded;
        next();  // Removed return as it's not needed here
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};