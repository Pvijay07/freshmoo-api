const product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.getAllProducts();
    res.json({ success: true, products: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description, image, category_id } = req.body;
  try {
    const newProduct  = await product.createProduct(
      name,
      price,
      description,
      image,
      category_id
    );
    res.json({ success: true, product: newProduct  });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await product.createCategory(name);
    res.json({ success: true, category: category });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await product.getAllCategories();
    res.json({ success: true, categories: categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};