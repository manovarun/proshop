const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const AppError = require('../utils/appError');

exports.signup = expressAsyncHandler(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    isAdmin: req.body.isAdmin,
  });

  if (!user) {
    return next(new AppError('Unable to create user', 400));
  }

  const userExists = await User.findOne({ email: user.email });

  if (userExists) {
    return next(new AppError('User already exists, please login', 400));
  }

  const token = user.getSignedJwtToken();

  res.status(201).json({ status: 'success', token, user });
});

exports.login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(
      new AppError('Unable to login, please check your credentials.', 401)
    );
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new AppError('Invalid Credentials, please try again!', 401));
  }

  const token = user.getSignedJwtToken();

  res.status(201).json({ status: 'success', token, user });
});

exports.protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized, token failed', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // { id: '6045daaf64cf7c0b40189630', iat: 1615288852, exp: 1623064852 }

  const user = await User.findById(decoded.id);

  req.user = user;

  next();
});

exports.admin = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(new AppError('Not authorized as an admin', 401));
  }
});
