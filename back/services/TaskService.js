import Task from '../models/Task.js';
import user from "../models/User.js";

const errorOrigin = 'From service:'

export const createTask = async ({ title, userId }) => {
    const task = new Task({ title, userId });
    await task.save();
    return task;
};

export const getAllTasks = async () => {
    return Task.find();
};

export const getTaskById = async (id) => {
    return Task.findById(id);
};

export const getUserTasks = async (userId) => {
    return Task.find({ userId });
};

export const updateTask = async (id, { title, status }) => {
    const task = await Task.findById(id);
    if (!task) throw new Error(`${errorOrigin} Task not found`);

    if (title !== undefined) task.title = title;
    if (status !== undefined) task.status = status;

    await task.save();
    return task;
};

export const deleteTask = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new Error(`${errorOrigin} Task not found`);
    return task;
};