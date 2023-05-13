const { ObjectId } = require('mongodb');
require('dotenv').config();

async function getAll(req) {
    return await req.app.locals.db.collection('products').find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function getOne(req) {
    console.log(req.params.id);
    return await req.app.locals.db.collection('products').findOne({ '_id': new ObjectId(req.params.id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function getOneProductForOrder(req, productId) {
    console.log(req.params.id);
    return await req.app.locals.db.collection('products').findOne({ '_id': new ObjectId(productId), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function create(req, product) {
	product.isDeleted = false;
	return await req.app.locals.db.collection('products').insertOne(product);
}

async function changeQuantity(req, product) {
	return await req.app.locals.db.collection('products').updateOne({ '_id': new ObjectId(product.id) }, { $inc: { lager: -product.quantity } });
}

async function reduceQuantity(productId, quantity, req) {
    try {
      const productCollection = req.app.locals.db.collection('products');
  
      await productCollection.updateOne(
        { _id: new ObjectId(productId) },
        { $inc: { lager: -quantity } }
      );
  
      console.log(`Stock reduced for product ${productId}. Reduced quantity: ${quantity}`);
    } catch (err) {
      console.error('Error reducing stock:', err);
    }
  }

module.exports = {
    getAll,
    getOne,
    getOneProductForOrder,
    create,
	changeQuantity, 
    reduceQuantity
}