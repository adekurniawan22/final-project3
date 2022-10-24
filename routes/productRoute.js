const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/Product');
const authentication = require('../middleware/authentication');
const authorizationRoleAdmin = require('../middleware/authorizationRoleAdmin');

router.use(authentication);
router.get('/products', ProductController.getAllProduct);
router.post('/products', authorizationRoleAdmin, ProductController.createProduct);
router.put('/products/:productId', authorizationRoleAdmin, ProductController.editProduct)
router.patch('/products/:productId', authorizationRoleAdmin, ProductController.editCategoryId)
router.delete('/products/:productId', authorizationRoleAdmin, ProductController.deleteProduct)

module.exports = router;