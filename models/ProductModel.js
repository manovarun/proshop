const mongoose = require('mongoose');
const slugify = require('slugify');
const ReviewSchema = require('./ReviewModal');

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      unique: true,
    },
    slug: String,
    image: {
      type: String,
      required: [true, 'A product must have a cover image'],
    },
    description: {
      type: String,
      trim: true,
    },
    reviews: [ReviewSchema],
    brand: {
      type: String,
      required: [true, 'A product must have a brand'],
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      required: [true, 'A product must have a rating'],
      default: 0,
      min: [0, 'Rating must greater than or equal to 0'],
      max: [5, 'Rating must less than or equal to 5'],
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
