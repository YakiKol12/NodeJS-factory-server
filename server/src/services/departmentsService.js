const departmentsRepo = require('../repositories/departmentRepo');

const getAllDepartments = async () => {
    return await departmentsRepo.getAllDepartments();
};

const getDepartmentById = async (id) => {
    return await departmentsRepo.getDepartmentById(id);
};

const getDepartmentByName = async (name) => {
    const allDepartments = await departmentsRepo.getAllDepartments();
    return allDepartments.find(dept => dept.name === name);
};

const createDepartment = async (departmentData) => {
    return await departmentsRepo.createDepartment(departmentData);
};

const updateDepartment = async (id, departmentData) => {
    return await departmentsRepo.updateDepartment(id, departmentData);
};

const updateDepartmentsManager = async (managerId, departmentId) => {
    const department = await departmentsRepo.getDepartmentById(departmentId);
    if (department) {
        department.managerId = managerId;
        return await departmentsRepo.updateDepartment(departmentId, department);
    }
    return null;
};

const deleteDepartment = async (id) => {
    return await departmentsRepo.deleteDepartment(id);
};

const deleteDepartmentByName = async (name) => {
    const allDepartments = await departmentsRepo.getAllDepartments();
    const department = allDepartments.find(dept => dept.name === name);
    if (department) {
        return await departmentsRepo.deleteDepartment(department._id);
    }
    return null;
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    getDepartmentByName,
    createDepartment,
    updateDepartment,
    updateDepartmentsManager,
    deleteDepartment,
    deleteDepartmentByName
};