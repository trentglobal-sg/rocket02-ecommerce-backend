const userData = require('../data/userData');
const bcrypt = require('bcrypt');


async function login(email, plainPassword) {

    // check if a user with that email exists
    const user = await userData.getUserByEmail(email);

    if (user) {
        // check if the user's hashed password
        // matches the plain password
        const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    } else {
        // keep timing in both branches the same
        await bcrypt.compare(plainPassword, user.password);
        return null;
    }



}

/**

 * @param {{
 *  email:String,
 *  name:String,
 * password:String,
 * salutation:String
 * country:String
 * marketingPreferences: Integer[]
 * }} user 
 */
async function createUser(user) {
    return await userData.createUser(user);
}

module.exports = {
  createUser, login
}