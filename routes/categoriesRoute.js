const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/Categories');
const authentication = require('../middleware/authentication');
const authorizationUser = require('../middleware/authorizationUser');

router.use(authentication);
router.post('/categories', CategoriesController.createCategories);

module.exports = router;