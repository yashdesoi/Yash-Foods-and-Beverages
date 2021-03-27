const bcrypt = require('bcrypt');

const Customer = require('../models/Customer');

const signup_get = (req, res) => {
    res.render('signup');
};

const signup_post = (req, res) => {
    Customer.create(req.body)
        .then(doc => {
            res.status(201).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({success: false});
        });
};

const login_get = (req, res) => {
    res.render('login');
};

const login_post = (req, res) => {
    const {password, email} = req.body;
    Customer.findOne({email})
        .then(doc => {
            if (doc) {
                return bcrypt.compare(password, doc.password);
            } else {
                res.status(400).json({success: false});
            }
        })
        .then(result => {
            if (result) {
                res.json({success: true});
            } else {
                res.status(400).json({success: false});
            }
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
};