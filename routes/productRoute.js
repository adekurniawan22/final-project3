const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product');
const authentication = require('../middleware/authentication');
const authorizationUser = require('../middleware/authorizationUser');

router.get('/products', ProductController.getAllProduct)
router.post('/products', ProductController.createProduct)

module.exports = router;