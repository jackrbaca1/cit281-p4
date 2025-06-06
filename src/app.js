const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);

// API Documentation Route
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found. Please check the API documentation.'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please provide a valid token.'
    });
  }
  
  // Handle validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({
      status: 'error',
      message: `Invalid input data: ${errors.join('. ')}`
    });
  }
  
  // Default error handler
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong on the server.'
  });
});

module.exports = app;
