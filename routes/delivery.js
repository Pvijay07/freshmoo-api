const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const authController = require("../controllers/authController");

// login Routes
router.post("/sendOtp", authController.SendOtp);
router.post("/verifyOtp", authController.VerifyOtp);

// Wallet routes
router.get("/wallet/balance", deliveryController.getWalletBalance);

// Delivery Partner Routes
router.get("/orders", deliveryController.getAssignedOrders);
router.put("/order/:id", deliveryController.updateOrderStatus);

module.exports = router;
