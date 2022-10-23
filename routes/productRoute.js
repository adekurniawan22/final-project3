const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product');
const authentication = require('../middleware/authentication');
const authorizationProduct = require('../middleware/authorizationProduct');

router.use(authentication);
router.get('/products', ProductController.getAllProduct)
router.post('/products', authorizationProduct, ProductController.createProduct)

module.exports = router;