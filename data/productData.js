const pool = require('../database');

async function getAllProducts() {
    const [rows] = await pool.execute(
        `SELECT id, 
            name, 
            CAST(price AS DOUBLE) AS price,
            imageUrl,
            description
         FROM products
        `
    )
    return rows;
}

async function getProductById(productId) {
    const [rows] = await pool.execute(`SELECT * FROM products WHERE id = ?`, [productId]);
    return rows[0];
}

module.exports = {
    getAllProducts, getProductById
}