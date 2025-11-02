const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startWorkYear: { type: Number, required: true },
    departmentID: { type: mongoose.Schema.Types.ObjectId, ref: 'department' },
}, 
{ 
    versionKey: false 
}
);

module.exports = mongoose.model('employee', schema);
