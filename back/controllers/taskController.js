import * as taskService from '../services/taskService.js';

const errorOrigin = "From controller";

//

export const createTask = async (req, res) => {
    try {
        const { title, status } = req.body;
        const userId = req.user.id;

        const task = await taskService.createTask({ title, userId });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: `${errorOrigin} ${err.message}` });
    }
};

export const getUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await taskService.getUserTasks(userId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: `${errorOrigin} ${err.message}` });
    }
};

export const getTaskByIdController = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ error: `${errorOrigin} Task not found` });

        // make sure the logged-in user owns this task
        if (task.userId.toString() !== req.user.id)
            return res.status(403).json({ error: `${errorOrigin} Forbidden` });

        res.json(task);
    } catch (err) {
        res.status(400).json({ error: `${errorOrigin} ${err.message}` });
    }
};


export const updateTaskController = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ error: `${errorOrigin} Task not found` });

        if (task.userId.toString() !== req.user.id)
            return res.status(403).json({ error: `${errorOrigin} Forbidden` });

        const updatedTask = await taskService.updateTask(req.params.id, req.body);
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: `${errorOrigin} ${err.message}` });
    }
};

export const deleteTaskController = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);
        if (!task) return res.status(404).json({ error: `${errorOrigin} Task not found` });

        if (task.userId.toString() !== req.user.id)
            return res.status(403).json({ error: `${errorOrigin} Forbidden` });

        await taskService.deleteTask(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(400).json({ error: `${errorOrigin} ${err.message}` });
    }
};