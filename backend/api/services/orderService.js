require('dotenv').config();

async function getAll(req) {
    return await req.app.locals.db.collection('orders').find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function create(req, order) {
	order.isDeleted = false;
	return await req.app.locals.db.collection('orders').insertOne(order);
}

module.exports = {
    getAll,
    create
}