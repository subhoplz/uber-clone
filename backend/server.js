const PORT = process.env.PORT || 4000;
const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server running on http://localhost:4000');
});
