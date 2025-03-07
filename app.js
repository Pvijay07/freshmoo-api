const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { sendNotification } = require('./notificationService');

// Import routes
const customerRoutes = require('./routes/customer');
const deliveryRoutes = require('./routes/delivery');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/customer', customerRoutes); // Customer routes
app.use('/api/delivery', deliveryRoutes); // Delivery partner routes
app.use('/api/payment', paymentRoutes);

app.use('/api/admin', adminRoutes); // Admin routes


// Route to send push notifications
// app.post('/send-notification', async (req, res) => {
//     const { token, title, body } = req.body;
  
//     try {
//       const response = await sendNotification(token, title, body);
//       res.status(200).json({ message: 'Notification sent successfully', response });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;