const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/Transaction');
const authentication = require('../middleware/authentication');
const authorizationRoleAdmin = require('../middleware/authorizationRoleAdmin');
const authorizationTransaction = require('../middleware/authorizationTransaction');

router.use(authentication);
router.post('/transactions', TransactionController.createTransaction);
router.get('/transactions/user', TransactionController.getTransactionUser);
router.get('/transactions/admin', authorizationRoleAdmin, TransactionController.getTransactionAll);
router.get('/transactions/:transactionId', authorizationTransaction, TransactionController.getTransactionById);

module.exports = router;