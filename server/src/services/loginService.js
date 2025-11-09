const jwt = require('jsonwebtoken');
const usersApiRepo = require('../repositories/userApiRepo');
const userDBRepo = require('../repositories/userDbRepo');

async function login(username, email) {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured');

    const user = await usersApiRepo.findUserByNameAndEmail(username, email);
    if (!user) return null;

    const dbUser = await userDBRepo.getUserByUsername(username);

    const token = jwt.sign(
        { id: user.id, dbUser }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return { token };
}

module.exports = { login };