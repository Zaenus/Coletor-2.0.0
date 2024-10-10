const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Path to the directory containing your HTML files
const documentsPath = 'C:\\Users\\Zaenus\\Documents\\Code\\Coletor2.0';

// Serve static files from the specified directory
app.use(express.static(documentsPath));

// Handle requests for the index.html file
//app.get('/', (req, res) => {
//    res.sendFile(path.join('C:\\Users\\Zaenus\\Documents\\Code\\Coletor2.0\\index.html'));
//});

// Paths to SSL certificate and key files
const certPath = path.join(__dirname, 'server.cert');
const keyPath = path.join(__dirname, 'server.key');

// Read SSL certificate and key files
const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);

const options = {
    cert: cert,
    key: key
};

// Create an HTTPS service object with the given options
const server = https.createServer(options, app).listen(5500, '172.21.45.171', function () {
    console.log(`Server running at https://${this.address().address}:${this.address().port}/`);
});