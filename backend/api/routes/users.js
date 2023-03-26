const express = require('express');
const router = express.Router();

const userController = require('./../controllers/userController');

/* router.get('/', userController.getUsers);           //  Lägga till
router.post('/:userId', userController.getUsers);    */
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.delete('/:userId', userController.deleteUser);

module.exports = router;

