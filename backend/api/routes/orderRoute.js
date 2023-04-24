const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/all/:token', orderController.getAll);      // Behövs token?

router.post('/add', orderController.create);
  
//router.post('/user', orderController.getByUser);            // behövs?

module.exports = router;
 
