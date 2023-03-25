const mongoose = require('mongoose');
const Product = require('../models/productModel');

/* Hämta alla produkter */
exports.getAllProducts = (req, res, next) => {
	Product.find()
		.select('name price _id productImage description stock')
		.exec()
		.then((docs) => {
			if (docs.length > 0) {
				/* console.log(docs); */
				const queryResult = {
					count: docs.length,
					products: docs.map((doc) => {
						return {
							name: doc.name,
							price: doc.price,
							productImage: doc.productImage,
							_id: doc._id,
							description: doc.description,
							stock: doc.stock,
							request: {
								type: 'GET',
								url: 'http://localhost:3000/api/products' + doc._id
							}
						};
					})
				};
				res.status(200).json(queryResult);
			} else {
				res
					.status(404)
					.json({ message: 'No Product Available in the Collection' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

/* Skapa en produkt */
exports.createProduct = (req, res, next) => {
	console.log(req.file);
	const newProduct = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path
	});
	newProduct
		.save()
		.then((result) => {
			console.log(result);
			res.status(201).json({
				message: 'Product Created Successfully',
				productCreated: {
					name: result.name,
					price: result.price,
					productImage: result.productImage,
					_id: result._id,
					description: result.description,
					stock: result.stock,
					request: {
						type: 'GET',
						url: 'http://localhost:3000/api/products/add' + result._id
					}
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

/* Hämta en specifik produkt */
exports.getProduct = (req, res, next) => {
	const id = req.params.productID;
	Product.findById(id)
		.select('name price _id productImage description stock')
		.exec()
		.then((doc) => {
			if (!doc) {
				res.status(404).json({
					message: 'No valid entry found for the product ID'
				});
			}
			console.log(`From database`, doc);
			res.status(200).json({
				product: doc,
				request: {
					type: 'GET',
					description: 'GET_ALL_THE_PRODUCTS',
					url: 'http://localhost:3000/api/products/'
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.updateProduct = (req, res, next) => {
	const id = req.params.productID;
	const updateOperations = {};
	for (const operations of req.body) {
		updateOperations[operations.propName] = operations.value;
	}
	Product.update({ _id: id }, { $set: updateOperations })
		.exec()
		.then((results) => {
			console.log(results);
			res.status(200).json({
				message: 'Product Updated Successfully',
				request: {
					type: 'GET',
					url: 'http://localhost:3000/api/products/' + id
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

/* Ta bort en produkt */
exports.deleteProduct = (req, res, next) => {
	const id = req.params.productID;
	Product.remove({ _id: id })
		.exec()
		.then((result) => {
			console.log(result);
			res.status(200).json({
				message: 'Deleted Successfully',
				request: {
					type: 'POST',
					description: 'POST_A_NEW_PRODUCT',
					url: 'http://localhost:3000/api/products',
					body: { name: 'String', price: 'Number' }
				}
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};