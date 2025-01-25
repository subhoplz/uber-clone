const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    userController.registerUser
]);
router.post('/home ', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    userController.registerUser
]);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    userController.loginUser
]);
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/some-route', (req, res) => {
    res.json({ message: "Route is working" });
});
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;