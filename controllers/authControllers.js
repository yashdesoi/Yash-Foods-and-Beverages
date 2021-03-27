const bcrypt = require('bcrypt');

const Customer = require('../models/Customer');

// Error handler
const errorHandler = function(err) {
    const feedback = {
        error: true,
        name: '',
        email: '',
        'mobile-number': '',
        address: '',
        password: ''
    };
    // Login
    if (err.message.includes('Incorrect password')) {
        feedback.password = err.message;
        return feedback;
    } 
    
    if (err.message.includes('Incorrect email')) {
        feedback.email = err.message;
        return feedback;
    }

    // Signup
    if (err.code === 11000) {
        feedback.email = 'This email is already registered'
    }

    for (let key in err.errors) {
        const {properties} = err.errors[key];
        const {path, message} = properties;
        feedback[path] = message;
    }

    return feedback;
};

// Controllers
const signup_get = (req, res) => {
    res.render('signup');
};

const signup_post = (req, res) => {
    Customer.create(req.body)
        .then(doc => {
            res.status(201).json(doc);
        })
        .catch(err => {
            const feedback = errorHandler(err);
            res.status(400).json(feedback);
        });
};

const login_get = (req, res) => {
    res.render('login');
};

const login_post = async (req, res) => {
    const {password, email} = req.body;

    try {
        const doc = await Customer.findOne({email});

        if (doc) {
            const isEqual = await bcrypt.compare(password, doc.password);
            if (isEqual) {
                res.json(doc);
            } else {
                throw Error('Incorrect password');
            }
        } else {
            throw Error('Incorrect email');
        }
    } catch (err) {
        const feedback = errorHandler(err);
        res.status(400).json(feedback);
    }
};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
};