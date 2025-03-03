const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Customer Routes
router.get('/products', customerController.getProducts);
router.post('/order', customerController.createOrder);
router.get('/orders', customerController.getOrders);

// Wallet routes
router.get('/wallet/balance', customerController.getWalletBalance);
router.post('/wallet/add-money', customerController.addMoneyToWallet);

// Subscription routes
router.post('/subscription/create', customerController.createSubscription);

module.exports = router;