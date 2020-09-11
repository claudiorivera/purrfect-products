import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qtyInStock: {
    type: Number,
    default: 0,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
