const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAll);

router.get('/:id', productController.getOne);
  
router.post('/add', productController.create);

module.exports = router;