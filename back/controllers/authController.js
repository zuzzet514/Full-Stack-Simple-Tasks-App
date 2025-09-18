import * as authService from '../services/authService.js';

const errorOrigin = "From authController:";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.register(username, password);
        res.status(201).json({ message: "User registered", user: result.user });
    } catch (err) {
        res.status(400).json({ error: `${errorOrigin} ${err.message}` });
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const result = await authService.login({ username, password });
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: `${errorOrigin} ${err.message}` });
    }
};
