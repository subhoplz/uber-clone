const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
const { connect } = require('mongoose');
const userRouter = require('./routes/user.routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);

connectDB();

app.get('/', (req, res) => {
    res.send("Hello from the backend");
});
module.exports = app;
