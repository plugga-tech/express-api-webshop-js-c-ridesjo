function changeToProdResponse(product) {
	product.id = product._id;
	delete product._id;
}

function changeToProductsResponse(products) {
    for(let product of products) {
		changeToProdResponse(product);
    }
}

module.exports = {
	changeToProdResponse,
	changeToProductsResponse
};