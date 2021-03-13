const Product = require('../models/Product');

const products_post = (req, res) => {
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

};

const products_product_get = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(doc => res.json(doc))
        .catch(err => console.log(err));
}

const products_product_delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(() => res.json({redirect: '/admin'}))
        .catch(err => {
            console.log(err);
            res.status(400).json({redirect: '/admin'})
        });
}

const products_product_put = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body)
        .then(() => res.json({redirect: '/admin'}))
        .catch(err => console.log(err));
}

const product_update_get = (req, res) => {
    const id = req.params.id.trim();

    Product.findById(id)
        .then(doc => {
            res.locals.product = doc;
            console.log(doc);
            res.render('update');
        });
}

module.exports = {
    products_post,
    products_product_get,
    products_product_delete,
    products_product_put,
    product_update_get
};