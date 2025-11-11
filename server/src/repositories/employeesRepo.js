const employee = require('../models/employeeModel');

const getAllEmployees = async () => {
    return await employee.find();
};

const getEmployeeById = async (id) => {
    return await employee.findById(id);
};

const createEmployee = async (employeeData) => {
    const newEmployee = new employee(employeeData);
    return await newEmployee.save();
};

const updateEmployee = async (id, employeeData) => {
    return await employee.findByIdAndUpdate(id, employeeData, { new: true });
};

const deleteEmployee = async (id) => {
    return await employee.findByIdAndDelete(id);
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};