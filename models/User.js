const db = require('../config/db');

class User {
    static async createUser(name, email, password, role = 'customer') {
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        return result.insertId;
    }

    static async findUserByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
}

module.exports = User;