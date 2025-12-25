const User = require('../models/userModel');

const getAllUsers = async () => {
    try {
        return await User.find({});
    } catch (error) {
        throw new Error('Error fetching all users');
    }
};

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

const decrementRemainingActions = async (username) => {
    try {
        const user = await User.findOneAndUpdate(
            { username },
            { $inc: { remainingActions: -1 } },
            { new: true }
        );
        return user;
    } catch (error) {
        throw new Error('Error decrementing remaining actions');
    }
};

const checkAndResetActions = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (!user) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastReset = new Date(user.lastResetDate);
        lastReset.setHours(0, 0, 0, 0);

        if (lastReset < today) {
        // Reset actions for the new day
        user.remainingActions = user.numOfActions;
        user.lastResetDate = today;
        await user.save();
        }
        return user;
    } catch (error) {
        throw new Error('Error checking and resetting actions');
    }
};

module.exports = { 
    getAllUsers,
    getUserByUsername, 
    createUser,
    decrementRemainingActions,
    checkAndResetActions
};