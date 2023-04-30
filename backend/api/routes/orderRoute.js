const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/all', orderController.getAll);      

router.post('/add', orderController.create);

module.exports = router;
 
