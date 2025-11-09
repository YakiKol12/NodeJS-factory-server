const employeesRepo = require('../repositories/employeesRepository');

const getAllEmployees = async () => {
    return await employeesRepo.findAll();
}

const getEmployeeById = async (id) => {
    return await employeesRepo.findById(id);
}

const createEmployee = async (employeeData) => {
    return await employeesRepo.create(employeeData);
}

const updateEmployee = async (id, employeeData) => {
    return await employeesRepo.update(id, employeeData);
}

const deleteEmployee = async (id) => {
    return await employeesRepo.delete(id);
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};