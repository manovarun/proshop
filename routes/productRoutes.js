const express = require('express');
const { protect, admin } = require('../controllers/AuthController');

const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require('../controllers/ProductController');

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProducts);

router
  .route('/:id')
  .get(getProduct)
  .patch(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);

module.exports = router;
