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
    category: {
        type: String,
        required: true,
        enum: ['men', 'women', 'kid'] // Specify allowed categories
    }
   
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
