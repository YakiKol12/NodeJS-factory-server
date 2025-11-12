const Shift = require('../models/shiftModel');

const getAllShifts = async () => {
    try {
        return await Shift.find().populate('employees').lean();    
    } catch (error) {
        throw new Error('Error getting all shifts: ' + error.message);
    }
};

const getShiftById = async (id) => {
    try {
        return await Shift.findById(id).populate('employees').lean();
    } catch (error) {
        throw new Error('Error getting shift by ID: ' + error.message);
    }
};

const createShift = async (shiftData) => {
    try {
        const shift = new Shift(shiftData);
        return await shift.save();
    } catch (error) {
        throw new Error('Error creating shift: ' + error.message);
    }
};

const updateShift = async (id, shiftData) => {
    try {
        return await Shift.findByIdAndUpdate(id, shiftData, { new: true }).populate('employees').lean();
    } catch (error) {
        throw new Error('Error updating shift: ' + error.message);
    }
};

module.exports = {
    getAllShifts,
    getShiftById,
    createShift,
    updateShift
};

