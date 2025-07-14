const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());
// MongoDB connection
const connectMongodb = require('./connectDb/urlConnection.cjs');
connectMongodb('mongodb://127.0.0.1:27017/url-Shortner')

// Routes
const urlRoute = require('./routes/url.cjs');
app.use('/', urlRoute);

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Handle unknown routes (for refreshing in frontend)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
