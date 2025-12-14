const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fullName: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    numOfActions: { type: Number, default: 10 },
    remainingActions: { type: Number, default: 10 },
    lastResetDate: { type: Date, default: Date.now },
}, 
{ 
    versionKey: false 
}
);

module.exports = mongoose.model('user', schema);
