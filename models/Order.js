const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    'customer-id': {
        type: String,
        required: true
    },
    'mobile-number': {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    'product-list': {
        type: Object,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;