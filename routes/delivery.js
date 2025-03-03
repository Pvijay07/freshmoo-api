const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// Delivery Partner Routes
router.get('/orders', deliveryController.getAssignedOrders);
router.put('/order/:id', deliveryController.updateOrderStatus);

module.exports = router;