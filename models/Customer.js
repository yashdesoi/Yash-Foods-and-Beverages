const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const isValidEmail = function(value) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(value);
}

const isValidMobileNumber = function(value) {
    const re = /^(\+\d{1,3}[- ]?)?\d{10}$/i;

    return re.test(value);
}

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validate: [isValidEmail, 'Please enter valid email']
    },
    'mobile-number': {
        type: String,
        required: [true, 'Please enter your mobile number'],
        validate: [isValidMobileNumber, 'Please enter valid mobile number']
    },
    address: {
        type: String,
        required: [true, 'Please enter your address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [4, 'Minimum password length is 4 characters']
    }
}, {timestamps: true});

// Mongoose middleware
customerSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;