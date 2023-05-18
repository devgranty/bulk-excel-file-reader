const express = require('express');
const router = express.Router();
// const db = require('../config/db');
const Product = require('../services/productService');

// init Product
const product = new Product();

// create new product
router.post('/products', product.createProduct);

// find one product
router.get('/product/:id', product.getProductById);

// Retrieve all product
router.get('/products', product.getAllProducts);

// update product
router.patch('/product/:id', product.updateProduct);

// delete product
router.delete('/product/:id', product.deleteProduct);

module.exports = router;