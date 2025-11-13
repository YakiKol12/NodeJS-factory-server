const employeesRepo = require('../repositories/employeeRepo');
const shiftsService = require('./shiftsService');

const getAllEmployees = async () => {
    return await employeesRepo.getAllEmployees();
};

const getEmployeeById = async (id) => {
    return await employeesRepo.getEmployeeById(id);
};

const getEmployeeByName = async (firstName, lastName) => {
    const allEmployees = await employeesRepo.getAllEmployees();
    return allEmployees.find(emp => emp.firstName === firstName && emp.lastName === lastName);
};

const getEmployeesByDepartment = async (departmentID) => {
    const allEmployees = await employeesRepo.getAllEmployees();
    return allEmployees.filter(emp => emp.departmentID && emp.departmentID.toString() === departmentID);
};

const createEmployee = async (employeeData) => {
    const existingEmployee = await getEmployeeByName(employeeData.firstName, employeeData.lastName);
    if (existingEmployee) {
        return existingEmployee;
    }
    return await employeesRepo.createEmployee(employeeData);
};

const updateEmployee = async (id, employeeData) => {
    return await employeesRepo.updateEmployee(id, employeeData);
};

const updateEmployeeDepartment = async (id, departmentID) => {
    return await employeesRepo.updateEmployee(id, { departmentID });
}

const deleteEmployee = async (id) => {
    await shiftsService.removeEmployeeFromAllShifts(id);
    return await employeesRepo.deleteEmployee(id);
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByName,
    getEmployeesByDepartment,
    createEmployee,
    updateEmployee,
    updateEmployeeDepartment,
    deleteEmployee
};