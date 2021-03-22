const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/OrderModel');
const AppError = require('../utils/appError');

exports.addOrderItem = expressAsyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new AppError('No Order Items'), 400);
  }

  let order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  order = await order.save();

  res.status(201).json({ status: 'success', order });
});

exports.getAllOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate('user', 'id name');

  if (!orders) {
    return next(new AppError('Order not found', 400));
  }

  res.status(200).json({ status: 'success', orders });
});

exports.getMyOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders) {
    return next(new AppError('Unable to find Order', 400));
  }

  res.status(200).json({ status: 'success', orders });
});

exports.getOrderById = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (!order) {
    return next(new AppError('Order not found', 400));
  }

  res.status(200).json({ status: 'success', order });
});

exports.updateOrderToPaid = expressAsyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 400));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  // order.paymentResult = {
  //   id: req.body.id,
  //   status: req.body.status,
  //   update_time: req.body.update_time,
  //   email_address: req.body.payer.email_address,
  // };

  order = await order.save();

  res.status(200).json({ status: 'success', order });
});

exports.updateOrderToDelivered = expressAsyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    return next(new AppError('Order not found', 400));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  order = await order.save();

  res.status(200).json({ status: 'success', order });
});
