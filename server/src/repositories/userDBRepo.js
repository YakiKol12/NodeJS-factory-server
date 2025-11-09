const User = require('../models/userModel');

const getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username });
    } catch (error) {
        throw new Error('Error fetching user by username');
    }
};

const createUser = async (fullName, username) => {
    try {
        const newUser = new User({ fullName, username });
        return await newUser.save();
    } catch (error) {
        throw new Error('Error creating user');
    }
};

module.exports = { 
    getUserByUsername, 
    createUser 
};