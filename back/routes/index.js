import express from 'express';
import * as authController from '../controllers/authController.js';
import * as taskController from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/* ----------- AUTH ROUTES ----------- */

// Register a new user
router.post('/auth/register', authController.register);

// Login
router.post('/auth/login', authController.login);

/* ----------- TASK ROUTES ----------- */

// Apply auth middleware to all task routes
router.use('/tasks', authMiddleware);

// Create a task
router.post('/tasks', taskController.createTask);

// Get all tasks for logged-in user
router.get('/tasks', taskController.getUserTasks);

// Get a task by ID
router.get('/tasks/:id', taskController.getTaskByIdController);

// Update a task by ID
router.put('/tasks/:id', taskController.updateTaskController);

// Delete a task by ID
router.delete('/tasks/:id', taskController.deleteTaskController);

export default router;
