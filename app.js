const express = require('express');
const morgan = require('morgan');

// Creating express app
const app = express();

// Registering view engine
app.set('view engine', 'ejs');

app.listen(3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});