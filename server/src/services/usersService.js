const userDBRepo = require('../repositories/userDbRepo');

const getUserByUsername = async (username) => {
    return await userDBRepo.getUserByUsername(username);
}

const createUser = async (userData) => {
    const { fullName, username } = userData;
    return await userDBRepo.createUser(fullName, username);
}

module.exports = {
    getUserByUsername,
    createUser
};