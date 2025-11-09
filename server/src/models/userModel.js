const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fullName: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    numOfActions: { type: Number, default: 10 },
    lastActionDate: { type: Date, default: null },
}, 
{ 
    versionKey: false 
}
);

module.exports = mongoose.model('user', schema);
