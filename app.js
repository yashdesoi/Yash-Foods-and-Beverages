const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Product = require('./models/Product');

// Creating express app
const app = express();

// Registering view engine
app.set('view engine', 'ejs');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://yash:EUprz3uEhCZvyTSk@cluster0.xbsxy.mongodb.net/Yash-Foods-and-Beverages?retryWrites=true&w=majority', options)
    .then(() => app.listen(3000))
    .catch(err => console.log(err.message));

// Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.post('/admin/add', (req, res) => {
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