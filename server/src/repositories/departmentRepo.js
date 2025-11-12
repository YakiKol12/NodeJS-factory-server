const Department = require('../models/departmentModel');

const getAllDepartments = async () => {
    try {
        return await Department.find().lean();
    } catch (error) {
        throw new Error('Error getting all departments: ' + error.message);
    }
};

const getDepartmentById = async (id) => {
    try {
        return await Department.findById(id).lean();
    } catch (error) {
        throw new Error('Error getting department by ID: ' + error.message);
    }
};

const createDepartment = async (departmentData) => {
    try {
        const department = new Department(departmentData);
        return await department.save();
    } catch (error) {
        throw new Error('Error creating department: ' + error.message);
    }
};

const updateDepartment = async (id, departmentData) => {
    try {
        return await Department.findByIdAndUpdate(id, departmentData, { new: true });
    } catch (error) {
        throw new Error('Error updating department: ' + error.message);
    }
};

const deleteDepartment = async (id) => {
    try {
        return await Department.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting department: ' + error.message);
    }
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
};