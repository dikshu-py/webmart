const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');

// Define routes
router.post('/add-products', productController.addProduct);
router.get('/products', productController.getAllProducts);
router.get('/detail/:id', productController.getProductById);
router.put('/edit/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
