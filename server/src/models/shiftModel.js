const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    date: { type: Date, required: true },
    startHour: { type: Number, required: true },
    endHour: { type: Number, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }],
}, 
{ 
    versionKey: false 
}
);

module.exports = mongoose.model('shift', schema);
