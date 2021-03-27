const bcrypt = require('bcrypt');

const Customer = require('../models/Customer');

const errorHandler = function(err) {
    const feedback = {
        name: '',
        email: '',
        'mobile-number': '',
        address: '',
        password: ''
    };

    if (err.code === 11000) {
        feedback.email = 'That email is already registered'
    }

    for (let key in err.errors) {
        const {properties} = err.errors[key];
        const {path, message} = properties;
        feedback[path] = message;
    }

    console.log(feedback);
};

const signup_get = (req, res) => {
    res.render('signup');
};

const signup_post = (req, res) => {
    Customer.create(req.body)
        .then(doc => {
            res.status(201).json(doc);
        })
        .catch(err => {
            errorHandler(err);
            res.status(400).json({success: false});
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
        res.status(400).json({success: false});
    }
};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
};