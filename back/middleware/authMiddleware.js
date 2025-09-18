import { verifyToken } from '../utils/jwtUtils.js';

const errorOrigin = "From authMiddleware:";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.status(401).json({ error: `${errorOrigin} Access token required` });

    const token = authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: `${errorOrigin} Malformed authorization header` });

    try {
        const decoded = verifyToken(token);
        req.user = decoded; // attach user info from token
        next();
    } catch (error) {
        return res.status(403).json({ error: `${errorOrigin} Invalid or expired token` });
    }
};

export default authMiddleware;