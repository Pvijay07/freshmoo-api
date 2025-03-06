const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
const createOrder = async (amount, currency, receipt) => {
  const options = {
    amount: amount * 100, // Amount in paise
    currency: currency,
    receipt: receipt,
    payment_capture: 1, // Auto-capture payment
  };

  try {
    const response = await razorpay.orders.create(options);
    return response;
  } catch (error) {
    throw new Error('Failed to create Razorpay order');
  }
};

// Verify payment signature
const verifyPayment = (body, signature) => {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(JSON.stringify(body))
    .digest('hex');

  return signature === expectedSignature;
};

module.exports = { createOrder, verifyPayment };