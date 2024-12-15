const express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

// Add Task
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ userId: req.user.id, title, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Tasks
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Task
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
