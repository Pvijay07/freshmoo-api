const Product = require("../models/Product");
const Order = require("../models/Order");
const Wallet = require("../models/Wallet");
const Subscription = require("../models/Subscription");
// const { sendNotification } = require("./notificationService");
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const { customerId, productIds,fcmToken } = req.body;
  try {
    const orderId = await Order.createOrder(customerId, productIds);
    // Send push notification
    // await sendNotification(
    //   fcmToken,
    //   "Order Created",
    //   `Your order with ID ${orderId} has been successfully created.`
    // );
    res.status(201).json({ orderId });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  const { customerId } = req.query;
  try {
    const orders = await Order.getOrdersByCustomer(customerId);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get wallet balance
exports.getWalletBalance = async (req, res) => {
  const { userId } = req.query;
  try {
    const wallet = await Wallet.getWallet(userId);
    res.json({ balance: wallet.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add money to wallet
exports.addMoneyToWallet = async (req, res) => {
  const { userId, amount } = req.body;
  try {
    await Wallet.updateBalance(userId, amount);
    await Wallet.addTransaction(
      userId,
      amount,
      "credit",
      "Added money to wallet"
    );
    res.json({ message: "Money added to wallet successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create subscription
exports.createSubscription = async (req, res) => {
  const { userId, planType } = req.body;
  try {
    const startDate = new Date();
    let endDate;
    switch (planType) {
      case "daily":
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));
        break;
      case "weekly":
        endDate = new Date(startDate.setDate(startDate.getDate() + 7));
        break;
      case "monthly":
        endDate = new Date(startDate.setMonth(startDate.getMonth() + 1));
        break;
      default:
        throw new Error("Invalid plan type");
    }

    await Subscription.createSubscription(userId, planType, startDate, endDate);
    res.json({ message: "Subscription created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
