const db = require('../config/db');

class Wallet {
    static async createWallet(userId) {
        const [result] = await db.execute(
            'INSERT INTO wallets (user_id, balance) VALUES (?, ?)',
            [userId, 0.00]
        );
        return result.insertId;
    }

    static async getWallet(userId) {
        const [rows] = await db.execute('SELECT * FROM wallets WHERE user_id = ?', [userId]);
        return rows[0];
    }

    static async updateBalance(userId, amount) {
        await db.execute('UPDATE wallets SET balance = balance + ? WHERE user_id = ?', [amount, userId]);
    }

    static async addTransaction(userId, amount, type, description) {
        await db.execute(
            'INSERT INTO transactions (user_id, amount, type, description) VALUES (?, ?, ?, ?)',
            [userId, amount, type, description]
        );
    }
}

module.exports = Wallet;