const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product');
const authentication = require('../middleware/authentication');
const authorizationRole = require('../middleware/authorizationRole');

router.use(authentication);
router.get('/products', ProductController.getAllProduct)
router.post('/products', authorizationRole, ProductController.createProduct)

module.exports = router;