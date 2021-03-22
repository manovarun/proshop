const express = require('express');
const { protect, admin } = require('../controllers/AuthController');
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getAllOrders,
  getMyOrders,
  updateOrderToDelivered,
} = require('../controllers/OrderController');

const router = express.Router();

router.route('/').post(protect, addOrderItem).get(protect, admin, getAllOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;
