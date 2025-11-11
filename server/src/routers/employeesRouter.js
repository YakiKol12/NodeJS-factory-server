const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const employeesService = require('../services/employeesService');

const router = express.Router();

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const employees = await employeesService.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const employee = await employeesService.getEmployeeById(req.params.id);
        if(employee == null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/name/:firstName/:lastName', authMiddleware.verifyToken, async (req, res) => {
    try {
        const employee = await employeesService.getEmployeeByName(req.params.firstName, req.params.lastName);
        if(employee == null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/department/:departmentID', authMiddleware.verifyToken, async (req, res) => {
    try {
        const employees = await employeesService.getEmployeesByDepartment(req.params.departmentID);
        if(employees == null || employees.length === 0) {
            return res.status(404).json({ message: 'No employees found for this department' });
        }
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const newEmployee = await employeesService.createEmployee(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const updatedEmployee = await employeesService.updateEmployee(req.params.id, req.body);
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/department', authMiddleware.verifyToken, async (req, res) => {
    try {
        const updatedEmployee = await employeesService.updateEmployeeDepartment(req.params.id, req.body.departmentID);
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        await employeesService.deleteEmployee(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;