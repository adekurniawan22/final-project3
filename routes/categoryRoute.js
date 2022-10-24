const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/Categories');
const authentication = require('../middleware/authentication');
const authorizationRoleAdmin = require('../middleware/authorizationRoleAdmin');

router.use(authentication);
router.post('/categories', authorizationRoleAdmin, CategoriesController.createCategories);
router.get('/categories', authorizationRoleAdmin, CategoriesController.getCategories);
router.patch('/categories/:categoryId', authorizationRoleAdmin, CategoriesController.editCategories)
router.delete('/categories/:categoryId', authorizationRoleAdmin, CategoriesController.deleteCategories)

module.exports = router;