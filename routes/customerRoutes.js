const express = require('express');

const Order = require('../models/Order');

const router = express.Router();

router.get('/:id', (req, res) => {

    const customerId = req.params.id.trim();

    // We will get this data from database later when we implement it
    res.locals.customer = {
        'customer-id': customerId,
        name: 'John Doe',
        email: 'demo@demo.net',
        'mobile-number': '1234567890',
        'address': 'Keas 69 Str. 15234, Chalandri Athens, Greece.'
    };

    Order.find({'customer-id': customerId})
        .sort({createdAt: -1})
        .then(docs => {
            res.locals.orders = docs;
            console.log(docs)
            res.render('customer');
        })
        .catch(err => console.log(err));
});

module.exports = router;