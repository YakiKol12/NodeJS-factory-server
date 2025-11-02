const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
        .connect('mongodb://localhost:27017/factoryDB') 
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = connectDB;
