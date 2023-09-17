// Create a product model for a t-shirt selling web app. For now there is no database, just with fields like name, description, price, imageURL, etc.)

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageURL: {
    type: String,
    required: true
  },
  // Add other fields if necessary (like stock quantity, categories, etc.)
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;





