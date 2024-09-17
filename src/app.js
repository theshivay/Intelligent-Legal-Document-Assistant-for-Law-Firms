// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

const app = express();

//Auth
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

//Mongoose
const connectDB = require('./config/database');
connectDB();

// Middleware
app.use(helmet()); // Adds various HTTP headers for security
app.use(cors());
app.use(express.json());
app.use(morgan('combined')); // Logging

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;