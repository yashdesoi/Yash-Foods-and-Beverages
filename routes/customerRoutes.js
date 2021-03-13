const express = require('express');

const customerController =  require('../controllers/customerControllers');

const router = express.Router();

router.get('/:id', customerController.customers_customer_get);

module.exports = router;