const pool = require('../database');
const bcrypt = require('bcrypt');
 

async function getUserByEmail(email) {
    if (!email) {
        throw new Error("Invalid email address")
    }

    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
}

async function getUserById(id) {
    if (!id) {
        throw new Error("Invalid ID")
    }

    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
}
/**

 * @param {{
 *  email:String,
 *  name:String,
 * password:String,
 * salutation:String
 * country:String
 * marketingPreferences: Integer[]
 * }} params 
 */
async function createUser({name, email, password, salutation, country, marketingPreferences}) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        const hashedPassword = await bcrypt.hash(password, 10);
        // insert into the users table
        const [results] = await connection.execute(
            `INSERT INTO users (name, email, password, salutation, country) 
                VALUES (?, ?, ?, ?, ?)`, [
                    name, email, hashedPassword, salutation, country || ""
                ]
        );

        // create the id of newly created user
        const newUserId = results.insertId;

        // associate the market preferences with the new user id (aka. insert into the join table)
        for (let marketingPreferenceID of marketingPreferences) {
            await connection.execute("INSERT INTO user_marketing_preferences (user_id, preference_id) VALUES (?,?)",
                [ newUserId, marketingPreferenceID ]
            )
        }

        await connection.commit();
        return newUserId;
    } catch (e) {
        console.error(e);
        await connection.rollback();
    } finally {
        await connection.release();
    }
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
}