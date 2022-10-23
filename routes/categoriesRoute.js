const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/Categories');
const authentication = require('../middleware/authentication');
const authorizationRole = require('../middleware/authorizationRole');

router.use(authentication);
router.post('/categories', authorizationRole, CategoriesController.createCategories);
router.get('/categories', CategoriesController.getCategories);
router.patch('/categories/:categoryId', authorizationRole, CategoriesController.editCategories)
router.delete('/categories/:categoryId', authorizationRole, CategoriesController.deleteCategories)

module.exports = router;