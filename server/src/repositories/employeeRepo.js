const employee = require('../models/employeeModel');

const getAllEmployees = async () => {
    try {
        return await employee.find();
    } catch (error) {
        throw new Error('Error getting all employees: ' + error.message);
    }
};

const getEmployeeById = async (id) => {
    try {
        return await employee.findById(id);
    } catch (error) {
        throw new Error('Error getting employee by ID: ' + error.message);
    }
};

const createEmployee = async (employeeData) => {
    try {
        const newEmployee = new employee(employeeData);
        return await newEmployee.save();
    } catch (error) {
        throw new Error('Error creating employee: ' + error.message);
    }
};

const updateEmployee = async (id, employeeData) => {
    try {
        return await employee.findByIdAndUpdate(id, employeeData, { new: true });
    } catch (error) {
        throw new Error('Error updating employee: ' + error.message);
    }
};

const deleteEmployee = async (id) => {
    try {
        return await employee.findByIdAndDelete(id);
    } catch (error) {
        throw new Error('Error deleting employee: ' + error.message);
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};