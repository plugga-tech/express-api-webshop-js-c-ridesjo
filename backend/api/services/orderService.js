const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

//const collection = () => MongoClient.connection.collection('orders'); 

async function getAll(req) {
    return await req.app.locals.db.collection('orders').find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function create(req, order) {
	order.isDeleted = false;
	return await req.app.locals.db.collection('orders').insertOne(order);
}

/*  async function getByUser(userId) {                 
    return await req.app.locals.db.collection('users').find({ 'user': new ObjectId(req, userId), 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
} */
 
module.exports = {
    getAll,
    create
	//getByUser
}