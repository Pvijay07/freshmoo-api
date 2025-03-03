const db = require('../config/db');

class Product {
    static async getAllProducts() {
        const [rows] = await db.execute('SELECT * FROM products');
        return rows;
    }

    static async getProductById(id) {
        const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Product;