CREATE DATABASE ecommerce;
USE ecommerce;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role ENUM('customer', 'delivery') DEFAULT 'customer'
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    description TEXT,
    image VARCHAR(255)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    delivery_partner_id INT,
    status ENUM('pending', 'shipped', 'delivered') DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES users(id),
    FOREIGN KEY (delivery_partner_id) REFERENCES users(id)
);

CREATE TABLE order_products (
    order_id INT,
    product_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE wallets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE, -- Links to users table
    balance DECIMAL(10, 2) DEFAULT 0.00, -- Wallet balance
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Links to users table
    plan_type ENUM('daily', 'weekly', 'monthly'), -- Subscription type
    start_date DATETIME, -- Subscription start date
    end_date DATETIME, -- Subscription end date
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- Links to users table
    amount DECIMAL(10, 2), -- Transaction amount
    type ENUM('credit', 'debit'), -- Credit (add money) or Debit (deduct money)
    description VARCHAR(255), -- Description of the transaction
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Transaction timestamp
    FOREIGN KEY (user_id) REFERENCES users(id)
);