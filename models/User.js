const db = require("../config/db");

class User {
  static async createUser(number, otp, role) {
    const [result] = await db.execute(
      "INSERT INTO users ( number,otp, role) VALUES (?, ?,?)",
      [number, otp, role]
    );
    return result.insertId;
  }
  static async updateUser(id, otp) {
    const [rows] = await db.execute("UPDATE users SET otp = ? WHERE id = ?", [
      otp,
      id,
    ]);
    return rows;
  }
  static async findUserByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }
  static async getUserByNumber(number) {
    const [rows] = await db.execute("SELECT * FROM users WHERE number = ?", [
      number,
    ]);
    return rows[0];
  }
  static async verifyOtp(id, otp) {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE id = ? AND otp = ?",
      [id, otp]
    );
    return rows[0];
  }

  static async updateUserOtp(id) {
    const [rows] = await db.execute(
      "UPDATE users SET otp = NULL WHERE id = ?",
      [id]
    );
    return rows;
  }
}

module.exports = User;
