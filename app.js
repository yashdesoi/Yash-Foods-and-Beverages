const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRouter = require('./routes/adminRoutes');
const productRouter = require('./routes/productRoutes');
const customerRouter = require('./routes/customerRoutes');
const authRouter = require('./routes/authRoutes');

const Product = require('./models/Product');

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
mongoose.connect(process.env.DATABASE_URI, options)
    .then(() => app.listen(3000))
    .catch(err => console.log(err.message));

// Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Homepage
app.get('/', (req, res) => {

    Product.find()
        .sort({createdAt: -1})
        .then(docs => {
            res.locals.products = docs;
            res.render('index');
        })
        .catch(err => console.log(err));
});

// Admin
app.use('/admin', adminRouter)

// Products
app.use('/products', productRouter);

// Customers
app.use('/customers', customerRouter);

// Auth
app.use(authRouter);