const express = require('express');
const usersService = require('../services/usersService');

const router = express.Router();

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await usersService.getUserByUsername(username);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await usersService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;