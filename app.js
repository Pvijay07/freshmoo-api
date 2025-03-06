const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
const customerRoutes = require('./routes/customer');
const deliveryRoutes = require('./routes/delivery');
const paymentRoutes = require('./routes/paymentRoutes');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/customer', customerRoutes); // Customer routes
app.use('/api/delivery', deliveryRoutes); // Delivery partner routes
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;