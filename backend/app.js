const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const { connect } = require('mongoose');
const userRouter = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes');

app.use(cors({
    origin: 'http://localhost:5173', // or your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/users', userRouter);
app.use('/captains', captainRouter);

connectDB();

app.get('/', (req, res) => {
    res.send("Hello from the backend");
});
module.exports = app;
