const express = require('express');
const loginService = require('../services/loginService');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Entry point for login: http://localhost:3000/login
router.post('/', async (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ message: 'Username and email are required' });
    }

    try {
        const token = await loginService.login(username, email);
        if (!token) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;