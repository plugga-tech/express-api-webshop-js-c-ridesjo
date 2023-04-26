const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const collection = () => MongoClient.connection.collection('products'); 

async function getAll(req) {
    return await req.app.locals.db.collection('products').find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function getOne(req) {
    return await req.app.locals.db.collection('products').findOne({ '_id': new ObjectId(req.body.id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function create(req, product) {
	product.isDeleted = false;
	return await req.app.locals.db.collection('products').insertOne(product);
}

async function changeQuantity(productId, quantity) {
	return await collection().updateOne({ '_id': new ObjectId(productId) }, { $inc: { lager: -quantity } });
}

module.exports = {
    getAll,
    getOne,
    create,
	changeQuantity
}