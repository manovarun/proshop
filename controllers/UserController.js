const expressAsyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const AppError = require('../utils/appError');

exports.getUserProfile = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError('Unable to find user profile', 404));
  }

  res.status(201).json({ status: 'success', user });
});

exports.updateUserProfile = expressAsyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    if (req.body.confirmPassword)
      user.confirmPassword = req.body.confirmPassword;
  }

  user = await user.save();

  if (!user) {
    return next(
      new AppError('Unable to update details, please try again.', 400)
    );
  }

  res.status(200).json({ message: 'success', user });
});

exports.getUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new AppError('Unable to find users', 404));
  }

  res.status(200).json({ message: 'success', users });
});

exports.getUserById = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return next(new AppError('Unable to find user', 404));
  }

  res.status(200).json({ message: 'success', user });
});

exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return next(new AppError('Unable to update user', 404));
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  user = await user.save({ validateBeforeSave: false });

  res.status(200).json({ message: 'success', user });
});

exports.deleteUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('Unable to find users', 404));
  }

  await user.remove();

  res.status(204).json({ message: 'success' });
});
