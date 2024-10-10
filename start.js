const express = require('express');
const path = require('path');

const app = express();

// Define the directory containing your HTML files
const documentsPath = 'C:\\Users\\Zaenus\\Documents\\Code\\Coletor2.0.0';

// Serve static files from the specified directory
app.use(express.static(documentsPath));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});