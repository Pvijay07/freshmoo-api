const Order = require('../models/Order');

exports.getAssignedOrders = async (req, res) => {
    const { deliveryPartnerId } = req.query;
    try {
        const orders = await Order.getOrdersByDeliveryPartner(deliveryPartnerId);
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await Order.updateOrderStatus(id, status);
        res.json({ message: 'Order status updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
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