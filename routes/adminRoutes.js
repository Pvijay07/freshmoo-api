const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')
const { createProductValidation } = require('../middleware/validator')


router.post(
  '/createproduct',
  createProductValidation,
  adminController.createProduct
)
router.post("/createcategory", adminController.createCategory);
router.get("/categories", adminController.getAllCategories);

module.exports = router
