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

const getAllDepartmentsData = async () => {
    const departments = await departmentsService.getAllDepartments();
    const employees = await employeesService.getAllEmployees();    

    const departmentsWithEmployees = await Promise.all(departments.map(async dept => {
        const deptEmployees = employees.filter(emp => emp.departmentID && emp.departmentID.toString() === dept._id.toString())
            .filter(emp => emp._id.toString() !== dept.manager.toString())
            .map(emp => ({fullName: `${emp.firstName} ${emp.lastName}`}));
            
        const manager = employees.find(emp => emp._id.toString() === dept.manager.toString());     

        return {
            deptName: dept.name,
            manager: manager ? `${manager.firstName} ${manager.lastName}` : null,
            employees: deptEmployees
        };
    }));

    console.log(departmentsWithEmployees);
    
    return departmentsWithEmployees;
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
    getAllDepartmentsData,
    getAllEmployeesByDepartment
};