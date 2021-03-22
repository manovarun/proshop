const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');
const AppError = require('../utils/appError');

exports.createProduct = expressAsyncHandler(async (req, res, next) => {
  req.body.user = req.user._id;

  let product = new Product(req.body);

  if (!product) {
    return next(new AppError(`Unable to create product`, 404));
  }

  product = await product.save();

  res.status(200).json({ status: 'success', product });
});

exports.getProducts = expressAsyncHandler(async (req, res, next) => {
  const limit = 4;
  const page = Number(req.query.pageNumber) || 1;
  const skip = limit * (page - 1);

  const keyword = req.query.keyword
    ? {
        $or: [
          { name: { $regex: req.query.keyword, $options: '$i' } },
          { description: { $regex: req.query.keyword, $options: '$i' } },
        ],
      }
    : {};

  const count = await Product.countDocuments(keyword);

  const products = await Product.find(keyword).skip(skip).limit(limit);

  // const products = await Product.find();

  if (!products) {
    return next(new AppError('Unable to find products', 404));
  }

  res.status(200).json({
    status: 'success',
    results: products.length,
    products,
    page,
    pages: Math.ceil(count / limit),
  });
});

exports.getProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new AppError(`Unable to find product with id ${req.params.id}`, 404)
    );
  }

  res.status(201).json({ status: 'success', product });
});

exports.updateProduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new AppError(`Unable to find product with id ${req.params.id}`, 404)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: 'success', product });
});

exports.deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new AppError(`Unable to find product with id ${req.params.id}`, 404)
    );
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(204).json({ status: 'success' });
});

exports.createProductReview = expressAsyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new AppError(`Unable to find product with id ${req.params.id}`, 404)
    );
  }

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return next(new AppError('Product already reviewed', 400));
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: rating * 1,
    comment,
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res
    .status(201)
    .json({ status: 'success', message: 'Review Created.', review });
});

exports.getTopProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find().sort({ rating: -1 }).limit(3);

  if (!products) {
    return next(new AppError('Unable to find products', 404));
  }

  res.status(200).json({ status: 'success', products });
});
