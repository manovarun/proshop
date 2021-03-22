const express = require('express');

const {
  signup,
  login,
  protect,
  admin,
} = require('../controllers/AuthController');

const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require('../controllers/UserController');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/').get(protect, admin, getUsers);

router
  .route('/:id')
  .get(protect, admin, getUserById)
  .patch(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
