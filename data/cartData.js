const pool = require('../database');

async function getCart(userId) {
    const sql = `
        SELECT cart_items.*,
               products.name,
               CAST(products.price AS DOUBLE) AS price,
               products.imageUrl,
               products.description
        FROM cart_items
            JOIN products ON cart_items.product_id = products.id
        WHERE cart_items.user_id = ?
    `
    const [rows] = await pool.execute(sql, [userId]);
    return rows;
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
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.execute(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);

        for (let item of cartItems) {
            await connection.execute(`INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`,[
                userId, item.product_id, item.quantity
            ])
        }

        await connection.commit();

    } catch (e) {
        await connection.rollback();
    } finally{
        await connection.release();
    }
}

module.exports = {
    getCart, updateCart
}