const express = require('express');

const Product = require('../models/Product');

const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body);

    Product.create(req.body)
        .then(doc => {
            console.log(doc);
            res.json({redirect: '/admin'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({redirect: '/admin'});
        });

});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(doc => res.json(doc))
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(() => res.json({redirect: '/admin'}))
        .catch(err => {
            console.log(err);
            res.status(400).json({redirect: '/admin'})
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body)
        .then(() => res.json({redirect: '/admin'}))
        .catch(err => console.log(err));
});

router.get('/:id/update', (req, res) => {
    const id = req.params.id.trim();

    Product.findById(id)
        .then(doc => {
            res.locals.product = doc;
            console.log(doc);
            res.render('update');
        });
});

module.exports = router;