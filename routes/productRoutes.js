const express = require('express');

const productController = require('../controllers/productControllers');

const router = express.Router();

router.post('/', productController.products_post);

router.get('/:id', productController.products_product_get);

router.delete('/:id', productController.products_product_delete);

router.put('/:id', productController.products_product_put);

router.get('/:id/update', productController.product_update_get);

module.exports = router;