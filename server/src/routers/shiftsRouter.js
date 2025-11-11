const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const shiftsService = require('../services/shiftsService');

const router = express.Router();

router.get('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const shifts = await shiftsService.getAllShifts();
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const shift = await shiftsService.getShiftById(req.params.id);
        res.json(shift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

///////////////////// Might delete later /////////////////////
router.get('/employee/:employeeId', authMiddleware.verifyToken, async (req, res) => {
    try {
        const shifts = await shiftsService.getShiftsByEmployeeId(req.params.employeeId);
        res.json(shifts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authMiddleware.verifyToken, async (req, res) => {
    try {
        const newShift = await shiftsService.createShift(req.body);
        res.status(201).json(newShift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', authMiddleware.verifyToken, async (req, res) => {
    try {
        const updatedShift = await shiftsService.updateShift(req.params.id, req.body);
        res.status(200).json(updatedShift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/hours', authMiddleware.verifyToken, async (req, res) => {
    try {
        const { startHour, endHour } = req.body;
        const updatedShift = await shiftsService.changeShiftHours(req.params.id, startHour, endHour);
        res.status(200).json(updatedShift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch('/:id/employees', authMiddleware.verifyToken, async (req, res) => {
    try {
        const { employeeIds } = req.body;
        const updatedShift = await shiftsService.addEmployeeToShift(req.params.id, employeeIds);
        res.status(200).json(updatedShift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id/employees/:employeeId', authMiddleware.verifyToken, async (req, res) => {
    try {
        const updatedShift = await shiftsService.removeEmployeeFromShift(req.params.id, req.params.employeeId);
        res.status(200).json(updatedShift);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;