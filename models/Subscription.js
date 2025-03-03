const db = require('../config/db');

class Subscription {
    static async createSubscription(userId, planType, startDate, endDate) {
        const [result] = await db.execute(
            'INSERT INTO subscriptions (user_id, plan_type, start_date, end_date) VALUES (?, ?, ?, ?)',
            [userId, planType, startDate, endDate]
        );
        return result.insertId;
    }

    static async getSubscription(userId) {
        const [rows] = await db.execute('SELECT * FROM subscriptions WHERE user_id = ?', [userId]);
        return rows[0];
    }
}

module.exports = Subscription;