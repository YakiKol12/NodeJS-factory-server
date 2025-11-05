const jwt = require('jsonwebtoken');
const usersRepo = require('../repos/usersRepo');

async function login(username, email) {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not configured');

    const user = await usersRepo.findUserByNameAndEmail(username, email);
    if (!user) return null;

    const token = jwt.sign(
        { id: user.id }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return { token };
}

module.exports = { login };