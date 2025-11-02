const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    fullName: { type: String, required: true},
    numOfActions: { type: Number, default: 0 },
}, 
{ 
    versionKey: false 
}
);

module.exports = mongoose.model('user', schema);
