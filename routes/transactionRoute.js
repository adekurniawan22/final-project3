const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/Transaction');
const authentication = require('../middleware/authentication');
const authorizationRole = require('../middleware/authorizationRole');

router.use(authentication);
router.post('/transactions', TransactionController.createTransaction)

module.exports = router;