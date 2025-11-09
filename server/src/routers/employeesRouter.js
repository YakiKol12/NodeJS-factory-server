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
        res.json(employee);
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

router.delete('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        await employeesService.deleteEmployee(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;