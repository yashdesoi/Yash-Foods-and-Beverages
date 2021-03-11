const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Product = require('./models/Product');
const Order = require('./models/Order');

// Creating express app
const app = express();

// Registering view engine
app.set('view engine', 'ejs');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useFindAndModify: false,
    useUnifiedTopology: true
}

// Connecting to database
mongoose.connect('mongodb+srv://yash:EUprz3uEhCZvyTSk@cluster0.xbsxy.mongodb.net/Yash-Foods-and-Beverages?retryWrites=true&w=majority', options)
    .then(() => app.listen(3000))
    .catch(err => console.log(err.message));

// Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {

    Product.find()
        .sort({createdAt: -1})
        .then(docs => {
            res.locals.products = docs;
            res.render('index');
        })
        .catch(err => console.log(err));
});

app.get('/admin', (req, res) => {

    Product.find()
        .sort({createdAt: -1})
        .then(docs => {
            res.locals.products = docs;
            res.render('admin');
        })
        .catch(err => console.log(err));
});

app.post('/admin/orders', (req, res) => {
    const customerId = req.body['customer-id'];
    Order.create(req.body)
        .then(doc => {
            console.log(doc);
            res.json({redirect: `/customers/${customerId}`});
        })
        .catch(err => console.log(err));
});

app.post('/products/add', (req, res) => {
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

app.get('/products/:id', (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(doc => res.json(doc))
        .catch(err => console.log(err));
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
        .then(() => res.json({redirect: '/admin'}))
        .catch(err => {
            console.log(err);
            res.status(400).json({redirect: '/admin'})
        });
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body)
        .then(() => res.json({redirect: '/admin'}))
        .catch(err => console.log(err));
});

app.get('/products/:id/update', (req, res) => {
    const id = req.params.id.trim();

    Product.findById(id)
        .then(doc => {
            res.locals.product = doc;
            console.log(doc);
            res.render('update');
        });
});


app.get('/customers/:id', (req, res) => {

    const customerId = req.params.id.trim();

    // We will get this data from database later when we implement it
    res.locals.customer = {
        'customer-id': customerId,
        name: 'John Doe',
        email: 'demo@demo.net',
        'mobile-number': '1234567890',
        'address': 'Keas 69 Str. 15234, Chalandri Athens, Greece.'
    };

    console.log(req.body);

    Order.find({'customer-id': customerId})
        .then(docs => {
            res.locals.products = docs;
            res.render('customer');
        })
        .catch(err => console.log(err));
});