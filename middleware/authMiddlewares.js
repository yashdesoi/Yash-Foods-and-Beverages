const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                console.log(null);
                next()
            } else {
                console.log(decoded)
                next()
            }
        });
    } else {
        res.redirect('/login');
    }
};

module.exports = {
    isAuthenticated
};