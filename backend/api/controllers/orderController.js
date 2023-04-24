const orderService = require("../services/orderService");
const userService = require("../services/userService");
const productService = require("../services/productService");
//const authorisationService = require("../services/authorisationService");
//const { mapToDbOrder, convertToOrdersResponse } = require("../models/orderModel");

async function getAll(req, res, next) {
	try {
/* 		if (!authorisationService.isValid(req.params.token)) {
			res.status(401);
			res.json({ message: "Invalid token" });
			return;
		} */

		let orders = await orderService.getAll();
		convertToOrdersResponse(orders);
		res.json(orders);
	} catch (err) {
		console.error(`Error while getting orders`, err.message);
		next(err);
	}
}

async function create(req, res, next) {
	try {
		let user = await userService.getOne(req.body.user);
		if (user == null) {
			res.status(400);
			res.json({ message: "User not found" });
			return;
		}

		for (const reqProduct of req.body.products) {
			let product = await productService.getOne(reqProduct.productId);
			if (product == null) {
				res.status(400);
				res.json({ message: `Product: ${reqProduct.productId} not found` });
				return;
			}
		}

		let newOrder = mapToDbOrder(req.body);

		for (const product of newOrder.products) {
			let test = await productService.changeOnHand(product.productId, product.quantity);
		}

		let result = await orderService.create(newOrder);
		res.status(201);
		res.json({ message: "Success", id: result.insertedId });

	} catch (err) {
		console.error(`Error while creating order`, err.message);
		next(err);
	}
}

/* async function getByUser(req, res, next) {					//Behövs denna?
	try {
		if (!authorisationService.isValid(req.body.token)) {
			res.status(401);
			res.json({ message: "invalid token" });
			return;
		}

		let orders = await orderService.getByUser(req.body.user);
		convertToOrdersResponse(orders);
		res.json(orders);
	} catch (err) {
		console.error(`Error while getting orders`, err.message);
		next(err);
	}
} */

module.exports = {
	getAll,
	create
	//getByUser					// Behövs??
};


/* const Order = require('../models/orderModel');
const Product = require('../models/productModel');


exports.getAllOrders = (req, res) => {
	Order.find()
		.select('quantity _id')
		.populate('product', 'name')
		.exec()
		.then((documets) => {
			if (!documets.length > 0) {
				res
					.status(404)
					.json({ message: 'No Order Available in the Collection' });
			} else {
				const queryResult = {
					count: documets.length,
					orders: documets.map((doc) => {
						return {
							quantity: doc.quantity,							
							_id: doc._id,
							request: {
								type: 'GET',
								url: 'http://localhost:3000/api/orders/all/' + doc._id
							}
						};
					})
				};
				return res.status(200).json(queryResult);
			}
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
};


exports.createOrder = (req, res) => {
	Product.findById(req.body.productId)
		.then((product) => {
			if (!product) {
				return res.status(404).json({ message: 'Product Not Found' });
			}
			const newOrder = new Order({
				_id: mongoose.Types.ObjectId(),
				quantity: req.body.quantity,				
			});
			
			return newOrder.save().then((result) => {		// Sparar ordern
				console.log(result);
				res.status(201).json({
					message: 'Order Stored Successfully',
					orderCreated: {
						_id: result._id,						
						quantity: result.quantity
					},
					request: {
						type: 'GET',
						url: 'http://localhost:3000/api/orders/' + result._id
					}
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.getOrder = (req, res) => {
	const orderId = req.params.orderID;
	Order.findById(orderId)
		.select('_id quantity')
		.populate('product', '_id name price')
		.exec()
		.then((doc) => {
			if (!doc) {
				res.status(404).json({
					message: 'Order not Found'
				});
			}
			res.status(200).json({
				order: doc,
				request: {
					type: 'GET',
					description: 'VIEW_ALL_ORDERS',
					url: 'http://localhost:3000/api/orders/all'
				}
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
};

exports.deleteOrder = (req, res, next) => {
	const orderId = req.params.orderID;
	Order.remove({ _id: orderId })
		.exec()
		.then((result) => {
			res.status(200).json({
				message: 'Order deleted',
				request: {
					type: 'POST',
					description: 'POST A NEW PRODUCT',
					url: 'http://localhost:3000/api/orders',
					body: { productId: 'ID', quantity: 'Number' }
				}
			});
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
}; */