const employeesService = require('../services/employeesService');
const departmentsService = require('../services/departmentsService');
const shiftsService = require('../services/shiftsService');

const getAllEmployeesData = async () => {
    const employees = await employeesService.getAllEmployees();

    const employeesWithDetails = await Promise.all(employees.map(async (emp) => {
        const department = emp.departmentID ? await departmentsService.getDepartmentById(emp.departmentID) : null;
        const shifts = await shiftsService.getShiftsByEmployeeId(emp._id.toString());

        const shiftsList = (shifts || []).map(shift => ({
            date: shift.date.toISOString().split('T')[0],
            startHour: shift.startHour,
            endHour: shift.endHour
        }));

        return {
            // ...emp,
            fullName: `${emp.firstName} ${emp.lastName}`,
            department: department ? department.name : null,
            shifts: shiftsList
        };
    }));

    return employeesWithDetails;
};

const getAllEmployeesByDepartment = async (departmentId) => {
    const allEmployees = await getAllEmployeesData();
    const department = await departmentsService.getDepartmentById(departmentId);    
    if (!department) {
        throw new Error(`Department with ID "${departmentId}" not found.`);
    }
    return allEmployees.filter(emp => emp.department && emp.department === department.name);
};

module.exports = {
    getAllEmployeesData,
    getAllEmployeesByDepartment
};