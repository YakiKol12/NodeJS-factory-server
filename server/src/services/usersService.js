const userDBRepo = require('../repositories/userDbRepo');

const getAllUsers = async () => {
    return await userDBRepo.getAllUsers();
}

const getUserByUsername = async (username) => {
    return await userDBRepo.getUserByUsername(username);
}

const createUser = async (userData) => {
    const { fullName, username } = userData;
    return await userDBRepo.createUser(fullName, username);
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    createUser
};