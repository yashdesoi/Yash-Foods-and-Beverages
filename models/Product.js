const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    'net-weight': {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    'discounted-price': {
        type: Number,
        required: true
    },
    'image-url': {
        type: String
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;