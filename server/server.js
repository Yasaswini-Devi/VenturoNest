const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Allows parsing of JSON request bodies

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});