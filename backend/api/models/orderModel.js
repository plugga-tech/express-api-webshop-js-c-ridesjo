const { ObjectId } = require('mongodb');

function changeToOrderResponse(order) {
	order.id = order._id;
	delete order._id;
}

function changeToOrdersResponse(orders) {
    for(let order of orders) {
		changeToOrderResponse(order);
    }
}

function mapToDbOrder(orderRequest) {
	let newOrder = {
		user: new ObjectId(orderRequest.user),
		products: orderRequest.products.map(mapToDbOrderProduct)
	};

	return newOrder;
}

function mapToDbOrderProduct(orderProductRequest) {
	return {
		productId: new ObjectId(orderProductRequest.productId),
		quantity: orderProductRequest.quantity
	}
}

module.exports = {
	changeToOrderResponse,
	changeToOrdersResponse,
	mapToDbOrder
};