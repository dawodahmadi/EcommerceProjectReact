// create server.js in the backend folder and add the following code:

// Path: backend/server.js
// Path: backend/server.js
require('dotenv').config();  // Load environment variables first
require('./config/db');     // Then establish the MongoDB connection

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => console.log('Listening on port 5000...'));
