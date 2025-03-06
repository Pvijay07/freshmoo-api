const { createOrder, verifyPayment } = require('../services/razorpayService');

// Create a Razorpay order
exports.createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const order = await createOrder(amount, currency, receipt);
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Handle Razorpay webhook
exports.handleWebhook = (req, res) => {
  const signature = req.headers['x-razorpay-signature'];
  const body = req.body;

  if (verifyPayment(body, signature)) {
    // Payment is successful, handle it here
    console.log('Payment successful:', body);
    res.status(200).send('OK');
  } else {
    // Invalid signature, reject the request
    res.status(400).send('Invalid signature');
  }
};