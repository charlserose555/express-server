const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the React app on any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const privateKey = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'server.cert'), 'utf8');
const credentials = { key: privateKey, cert: certificate };


// Start the server
const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 8080;
httpsServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});