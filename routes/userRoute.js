const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');
const authentication = require('../middleware/authentication');
const authorizationUser = require('../middleware/authorizationUser');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use(authentication);
router.put('/:id', authorizationUser, UserController.editUser);
router.delete('/:id', authorizationUser, UserController.deleteUser);

module.exports = router;