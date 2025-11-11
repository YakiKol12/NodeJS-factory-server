const shiftRepo = require('../repositories/shiftRepo');

const getAllShifts = async () => {
    return await shiftRepo.getAllShifts();
};

const getShiftById = async (id) => {
    return await shiftRepo.getShiftById(id);
};

const getShiftsByEmployeeId = async (employeeId) => {
    const shifts = await shiftRepo.getAllShifts();
    return shifts.filter(shift => 
        shift.employees.some(emp => emp.toString() === employeeId)
    );
};

const createShift = async (shiftData) => {
    const shifts = await shiftRepo.getAllShifts();
    const duplicateShift = shifts.find(shift => 
        shift.date === shiftData.date &&
        shift.startTime === shiftData.startTime &&
        shift.endTime === shiftData.endTime
    );
    if (duplicateShift) {
        throw new Error('Duplicate shift found');
    }
    return await shiftRepo.createShift(shiftData);
};

const updateShift = async (id, shiftData) => {
    const shifts = await shiftRepo.getAllShifts();
    const duplicateShift = shifts.find(shift => 
        shift.id !== id &&
        shift.date === shiftData.date &&
        shift.startTime === shiftData.startTime &&
        shift.endTime === shiftData.endTime
    );
    if (duplicateShift) {
        throw new Error('Duplicate shift found');
    }
    return await shiftRepo.updateShift(id, shiftData);
};

const changeShiftHours = async (id, startHour, endHour) => {
    const shiftData = { startHour, endHour };
    return await updateShift(id, shiftData);
};

const addEmployeesToShift = async (shiftId, employeeIds) => {
    const shift = await getShiftById(shiftId);
    if (!shift) {
        throw new Error('Shift not found');
    };

    for (const employeeId of employeeIds) {
        // check if employee is already in shift
        if (shift.employees.some(empId => empId.toString() === employeeId)) {
            throw new Error(`Employee ${employeeId} is already assigned to this shift`);
        };
    }

    // check if employees has shift at the same day
    for (const employeeId of employeeIds) {
        const employeeShifts = await getShiftsByEmployeeId(employeeId);
        for (const empShift of employeeShifts) {
            if (empShift.date === shift.date) {
                throw new Error(`Employee ${employeeId} already has a shift on ${shift.date}`);
            }
        }
    }

    shift.employees.push(...employeeIds);
    return await updateShift(shiftId, shift);
};

const removeEmployeeFromShift = async (shiftId, employeeId) => {
    const shift = await getShiftById(shiftId);
    if (!shift) {
        throw new Error('Shift not found');
    };
    shift.employees = shift.employees.filter(empId => empId.toString() !== employeeId);
    return await updateShift(shiftId, shift);
};


module.exports = {
    getAllShifts,
    getShiftById,
    getShiftsByEmployeeId,
    createShift,
    updateShift,
    changeShiftHours,
    addEmployeeToShift,
    removeEmployeeFromShift
};