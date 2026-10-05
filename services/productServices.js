const productData  = require('../data/productData')

async function getAllProducts() {
 return await productData.getAllProducts();
}

async function getProductById(productId) {
    return await productData.getProductById(productId);
}


module.exports = {
    getAllProducts, getProductById
}