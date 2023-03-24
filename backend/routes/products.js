const express = require('express');
const router = express.Router();
const multer = require('multer');
const authCheck = require('../middleware/authCheck');
const productController = require('./../controllers/productController');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	}
});

/* Hämta alla produkter */
router.get('/', productController.getAllProducts);
router.post(
	'/',
	authCheck,
	upload.single('productImage'),
	productController.createProduct
);
router.get('/:productID', productController.getProduct);
router.patch('/:productID', authCheck, productController.updateProduct);
router.delete('/:productID', authCheck, productController.deleteProduct);

module.exports = router;

/* Hämta en specifik produkt */


/* Skapa produkt */

