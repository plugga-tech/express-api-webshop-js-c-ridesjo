const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    _id: ObjectId,
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Order', orderSchema);