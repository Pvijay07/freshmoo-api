const db = require('../config/db');

class Order {
    static async createOrder(customerId, productIds) {
        const [result] = await db.execute(
            'INSERT INTO orders (customer_id, status) VALUES (?, ?)',
            [customerId, 'pending']
        );
        const orderId = result.insertId;

        for (const productId of productIds) {
            await db.execute(
                'INSERT INTO order_products (order_id, product_id) VALUES (?, ?)',
                [orderId, productId]
            );
        }

        return orderId;
    }

    static async getOrdersByCustomer(customerId) {
        const [rows] = await db.execute(
            `SELECT o.id, o.status, p.name, p.price 
             FROM orders o
             JOIN order_products op ON o.id = op.order_id
             JOIN products p ON op.product_id = p.id
             WHERE o.customer_id = ?`,
            [customerId]
        );
        return rows;
    }

    static async updateOrderStatus(orderId, status) {
        await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
    }
}

module.exports = Order;