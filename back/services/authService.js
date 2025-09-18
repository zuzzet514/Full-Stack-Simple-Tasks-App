import bcrypt from 'bcrypt';
import User from "../models/User.js";
import {generateToken} from "../utils/jwtUtils.js";


const errorOrigin = "From service:";

// register a new user
export async function register(username, password) {
    const existing = await User.findOne({ username });

    if (existing) throw new Error(`${errorOrigin} User already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword });
    await user.save();

    return { user }
}

export const login = async ({ username, password }) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error(`${errorOrigin} User not found`);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error(`${errorOrigin} Incorrect password`);

    // payload for token
    const payload = { id: user._id, username: user.username };

    const token = generateToken(payload);

    return {
        message: "Login successful",
        user: { id: user._id, username: user.username },
        token
    };
};

