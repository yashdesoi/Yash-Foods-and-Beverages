const express = require('express');

const adminController = require('../controllers/adminControllers');

const authMiddleware = require('../middleware/authMiddlewares');

const router = express.Router();

router.get('/', authMiddleware.isAuthenticated ,adminController.admin_get);

router.get('/add', adminController.admin_add_get);

router.get('/orders', adminController.admin_orders_get);

router.post('/orders', adminController.admin_orders_post);

router.delete('/orders/:id', adminController.admin_orders_order_delete);

module.exports = router;