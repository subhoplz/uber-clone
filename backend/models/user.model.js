const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketID: {
        type: String,
    },
});

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;