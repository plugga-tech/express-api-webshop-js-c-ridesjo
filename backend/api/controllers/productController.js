const productService = require("../services/productService");
const { changeToProdResponse, changeToProductsResponse } = require("../models/productModel");
const { ObjectId } = require("mongodb");

/* Hämta alla produkter */
async function getAll(req, res, next) {
	try {
		let products = await productService.getAll(req);
		changeToProductsResponse(products);
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
			changeToProdResponse(product);
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