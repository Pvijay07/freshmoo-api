const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Create a Razorpay order
router.post('/create-order', paymentController.createOrder);

// Razorpay webhook
router.post('/razorpay-webhook', paymentController.handleWebhook);

module.exports = router;