const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { username, email, password } = req.body;
    const hashPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        username,
        email,
        password: hashPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicletype
    });
    const token = captain.generateAuthToken();
    res.status(201).json({
        captain, token
    });
}