const { ObjectId } = require('mongodb');
const mongo = require('./mongoDbService');

const collection = () => mongo.connection.collection('products');

async function getAll() {
    return await collection().find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function getOne(id) {
    return await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function create(product) {
	product.isDeleted = false;
	return await collection().insertOne(product);
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