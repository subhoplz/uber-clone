import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/users/logout', (req, res) => {
    console.log('Logout request received'); // Log for debugging
    res.status(200).send({ message: 'Logged out successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
