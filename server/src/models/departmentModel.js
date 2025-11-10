const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'employee' },
}, 
{ 
    versionKey: false 
}
);

module.exports = mongoose.model('department', schema);
