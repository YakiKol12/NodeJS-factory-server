const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const departmentsService = require('../services/departmentsService');

const router = express.Router();

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const departments = await departmentsService.getAllDepartments();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const department = await departmentsService.getDepartmentById(req.params.id);
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/name/:name', authMiddleware.verifyToken, async (req, res) => {
    try {
        const department = await departmentsService.getDepartmentByName(req.params.name);
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const newDepartment = await departmentsService.createDepartment(req.body);
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const updatedDepartment = await departmentsService.updateDepartment(req.params.id, req.body);
        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/manager', authMiddleware.verifyToken, async (req, res) => {
    try {
        const updatedDepartment = await departmentsService.updateDepartmentsManager(req.body.managerId, req.params.id);
        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        await departmentsService.deleteDepartment(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/name/:name', authMiddleware.verifyToken, async (req, res) => {
    try {
        await departmentsService.deleteDepartmentByName(req.params.name);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;