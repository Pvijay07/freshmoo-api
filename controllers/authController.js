const User = require("../models/User");
const jwt = require('jsonwebtoken');
exports.SendOtp = async (req, res) => {
  const { number, role } = req.body;
  const otp = Math.floor(Math.random() * 9000) + 1000; // Generate a 4-digit OTP

  try {
    const user = await User.getUserByNumber(number);

    if (!user) {
      await User.createUser(number, otp, role);
    }
    await User.updateUser(user.id, otp);

    // Send OTP to the user (this requires an external service like Twilio)

    res.json({ success: true, otp: otp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.VerifyOtp = async (req, res) => {
  const { number, otp } = req.body;
  const user = await User.getUserByNumber(number);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isOtpValid = await User.verifyOtp(user.id, otp);
  if (isOtpValid) {
    // If OTP is valid, update the user's status to verified
    await User.updateUserOtp(user.id);

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, number: user.number, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "7d" } // Token expiry time
    );

    res.json({
      success: true,
      message: "OTP verified successfully",
      token: token,
      user: user,
    });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};
