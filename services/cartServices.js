const cartData = require('../data/cartData');

async function getCart(userId) {
    return await cartData.getCart(userId);
}

/**
 * 
 * @param {*} userId 
 * @param {[{
 *  product_id:int,
 *  quantity:int
 * }]} cartItems 
 */
async function updateCart(userId, cartItems) {
    return await cartData.updateCart(userId, cartItems);
}

module.exports = {
    getCart, updateCart
}