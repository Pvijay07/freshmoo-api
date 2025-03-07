const db = require("../config/db");

class Product {
  static async getAllProducts() {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
  }

  static async getProductById(id) {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }
  static async createProduct(name, price, description, image, category_id) {
    // Ensure no undefined values, replace with null if needed
    const values = [
      name ?? null,
      price ?? null,
      description ?? null,
      image ?? null,
      category_id ?? null,
    ];

    const [rows] = await db.execute(
      "INSERT INTO products (name, price, description, image, category_id) VALUES (?, ?, ?, ?, ?)",
      values
    );

    return rows;
  }

  static async createCategory(name) {
    const [rows] = await db.execute(
      "INSERT INTO categories (name) VALUES (?)",
      [name]
    );
    return rows;
  }
  static async getAllCategories() {
    const [rows] = await db.execute("SELECT * FROM categories");
    return rows;
  }
}

module.exports = Product;
