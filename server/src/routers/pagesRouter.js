const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const pagesService = require('../services/pagesService');

const router = express.Router();

router.get('/employees', authMiddleware.verifyToken, async (req, res) => {
    try {
        const employeesData = await pagesService.getAllEmployeesData();
        res.json(employeesData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/employees/:departmentID', authMiddleware.verifyToken, async (req, res) => {
    try {
        const departmentID = req.params.departmentID;
        const employeesData = await pagesService.getAllEmployeesByDepartment(departmentID);
        res.json(employeesData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/departments', authMiddleware.verifyToken, async (req, res) => {
    try {
        const departmentsData = await pagesService.getAllDepartmentsData();
        res.json(departmentsData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;