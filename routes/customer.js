const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customerController')
const authController = require('../controllers/authController')
const {authenticateToken} = require('../middleware/auth')

const {sendOtpValidation, verifyOtpValidation} = require('../middleware/validator')

// login Routes
router.post('/sendOtp', sendOtpValidation, authController.SendOtp)
router.post('/verifyOtp', verifyOtpValidation, authController.VerifyOtp)

// Customer Routes
router.get('/products', authenticateToken, customerController.getProducts)
router.post('/order', authenticateToken, customerController.createOrder)
router.get('/orders', authenticateToken, customerController.getOrders)

// Wallet routes
router.get(
  '/wallet/balance',
  authenticateToken,
  customerController.getWalletBalance
)
router.post(
  '/wallet/add-money',
  authenticateToken,
  customerController.addMoneyToWallet
)

// Subscription routes
router.post(
  '/subscription/create',
  authenticateToken,
  customerController.createSubscription
)

module.exports = router
