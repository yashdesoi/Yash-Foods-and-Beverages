const Product = require('../models/Product');
const Order = require('../models/Order');

const admin_get = (req, res) => {

    Product.find()
        .sort({createdAt: -1})
        .then(docs => {
            res.locals.products = docs;
            res.render('admin');
        })
        .catch(err => console.log(err));
};

const admin_orders_get = (req, res) => {
    Order.find()
        .sort({createdAt: -1})
        .then(docs => {
            res.locals.orders = docs;
            res.render('orders');
        })
        .catch(err => console.log(err));
};

const admin_orders_post = (req, res) => {
    const customerId = req.body['customer-id'];
    Order.create(req.body)
        .then(doc => {
            console.log(doc);
            res.json({redirect: `/customers/${customerId}`});
        })
        .catch(err => console.log(err));
}

const admin_orders_order_delete = (req, res) => {
    const id = req.params.id.trim();

    Order.findByIdAndDelete(id)
        .then(() => res.json({redirect: '/admin/orders'}))
        .catch(err => console.log(err));
}

module.exports = {
    admin_get,
    admin_orders_get,
    admin_orders_post,
    admin_orders_order_delete
};