require('dotenv').config();
const app = require('./app');  // Import the app configuration
const connectDB = require('./db/db');
const net = require('net');

// Add basic error handling for uncaught errors
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});

function findAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(startPort, () => {
            const { port } = server.address();
            server.close(() => resolve(port));
        });
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(startPort + 1).then(resolve, reject);
            } else {
                reject(err);
            }
        });
    });
}

const startServer = async () => {
    try {
        // Connect to MongoDB first
        console.log('🔄 Attempting to connect to MongoDB...');
        await connectDB();

        // Only start the server if database connection is successful
        const port = await findAvailablePort(3000);
        app.listen(port, () => {  // Use the imported app instance
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
