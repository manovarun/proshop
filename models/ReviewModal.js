const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Review name is required'],
    },
    rating: {
      type: Number,
      required: [true, 'A product must have a rating'],
      default: 0,
      min: [0, 'Rating must greater than or equal to 0'],
      max: [5, 'Rating must less than or equal to 5'],
    },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ReviewSchema;
