const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

//const collection = () => MongoClient.connection.collection('users'); 

async function getAll(req) {
    return await req.app.locals.db.collection('users').find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function getOne(req) {
    return await req.app.locals.db.collection('users').findOne({ '_id': new ObjectId(req.body.id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function getOneUserForOrder(req) {
    return await req.app.locals.db.collection('users').findOne({ '_id': new ObjectId(req.body.user), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function create(req, user) {
	//const existingUser = await getUserByEmail(user.email);
	//if (existingUser == null) {
		user.isDeleted = false;
		return await req.app.locals.db.collection('users').insertOne(user);
	//}
	return null;
}

 async function getUserByEmail(req) {           
    return await req.app.locals.db.collection('users').findOne({ 'email': req.body.email, 'isDeleted': false });
} 

module.exports = {
    getAll,
    getOne,
    getOneUserForOrder,
    create,
    getUserByEmail         
}