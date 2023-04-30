const orderService = require("../services/orderService");
const userService = require("../services/userService");
const productService = require("../services/productService");
const { mapToDbOrder, changeToOrdersResponse } = require("../models/orderModel");

/* Hämta alla ordrar */
async function getAll(req, res, next) {
	try {

		let orders = await orderService.getAll(req);
		changeToOrdersResponse(orders);
		res.json(orders);
	} catch (err) {
		console.error(`Error while getting orders`, err.message);
		next(err);
	}
}

/* Skapa order */
async function create(req, res, next) {

	try {
		let user = await userService.getOneUserForOrder(req);
		if (user == null) {
			res.status(400);
			res.json({ message: "User not found" });
			return;
		}
	
		for (const reqProduct of req.body.products) {
			let product = await productService.getOneProductForOrder(req, reqProduct.productId);
			if (product == null) {
				res.status(400);
				res.json({ message: `Product: ${reqProduct.productId} not found` });
				return;
			}
		}
		console.log(req.body);
		let newOrder = mapToDbOrder(req.body);

		for (const product of newOrder.products) {
			await productService.changeQuantity(req, product);
		}

		let result = await orderService.create(req, newOrder);
		res.status(201);
		res.json({ message: "Success", id: result.insertedId });

	} catch (err) {
		console.error(`Error while creating order`, err.message);
		next(err);
	}
}

module.exports = {
	getAll,
	create
};