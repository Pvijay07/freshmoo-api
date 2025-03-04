const User = require('../models/User');

exports.SendOtp = async (req, res) => {
  const { number } = req.body; // Fix: Extract number from request body
  const otp = Math.floor(Math.random() * 9000) + 1000; // Fix: Generate a 4-digit OTP

  try {
    const user = await User.getUserByNumber(number);
    
    if (!user) {
      await User.createUser(number);
    }

    // Send OTP to the user (this requires an external service like Twilio)
    
    res.json({ success: true, otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
