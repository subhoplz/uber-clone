const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { route } = require('./user.routes');


router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('Vehicle must be at least 3 characters long'),
    body('vehicle.vehicleType').isIn(['motorcycle', 'car', 'auto']).withMessage('Invalid vehicle type'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Vehicle number must be at least 3 characters long'),


],
    captainController.registerCaptain
)
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    captainController.loginCaptain
)
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;