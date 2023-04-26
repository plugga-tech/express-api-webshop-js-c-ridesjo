const productService = require("../services/productService");
//const categoryService = require("../services/categoryService");
const authService = require("../services/authService");
const { convertToProductResponse, convertToProductsResponse } = require("../mappers/productMapper");
const { ObjectId } = require("mongodb");

/* Hämta alla produkter */
async function getAll(req, res, next) {
	try {
		let products = await productService.getAll(req);
		convertToProductsResponse(products);
		res.json(products);
	} catch (err) {
		console.error(`Error while getting products`, err.message);
		next(err);
	}
}

/* Hämta en produkt */
async function getOne(req, res, next) {
	try {
		let product = await productService.getOne(req);
		if (product != null) {
			convertToProductResponse(product);
			res.json(product);
		} else {
			res.status(404);
			res.json({ message: "Product not found" });
		}
	} catch (err) {
		console.error(`Error while getting product`, err.message);
		next(err);
	}
}

/* Lägg till produkt */
async function create(req, res, next) {
	try {
		if (!authService.isValid(req.body.token)) {
			res.status(401);
			res.json({ message: "invalid token" });
			return;
		}
		let newProduct = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			lager: req.body.lager,
		};

		let result = await productService.create(req, newProduct);
		res.status(201);
		res.json({ message: "Success", id: result.insertedId });

	} catch (err) {
		console.error(`Error while creating product`, err.message);
		next(err);
	}
}

module.exports = {
	getAll,
	getOne,
	create
};