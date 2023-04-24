const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', userController.getAll);
router.post('/', userController.getOne);
router.post('/add', userController.create);
router.post('/login', userController.login);
router.delete('/:id', userController.remove);

module.exports = router;

