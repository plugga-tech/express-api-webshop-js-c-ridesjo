const { ObjectId } = require('mongodb');
const mongo = require('./mongoDbService');

const collection = () => mongo.connection.collection('users');

async function getAll() {
    return await collection().find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function getOne(id) {
    return await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function create(user) {
	const existingUser = await getUserByEmail(user.email);
	if (existingUser == null) {
		user.isDeleted = false;
		return await collection().insertOne(user);
	}
	return null;
}

async function getUserByEmail(email) {           
    return await collection().findOne({ 'email': email, 'isDeleted': false });
}

module.exports = {
    getAll,
    getOne,
    create,
    getUserByEmail         
}