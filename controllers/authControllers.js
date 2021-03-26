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

module.exports = {
    signup_get,
    signup_post,
    login_get
};