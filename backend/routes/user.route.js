import express from 'express';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // use env in prod

userRouter.post('/auth', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password" });
    }

    try {
        const existingUser = await User.findOne({ name: username });

        if (existingUser) {
            if (existingUser.password !== password) {
                return res.status(401).json({ message: "Incorrect password or User with same name already exist" });
            }

            const token = jwt.sign({ id: existingUser._id, name: existingUser.name }, JWT_SECRET, {
                expiresIn: '7d',
            });

            return res.status(200).json({ message: "Logged in successfully", token });
        } else {
            const newUser = new User({ name: username, password: password });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id, name: newUser.name }, JWT_SECRET, {
                expiresIn: '7d',
            });

            return res.status(201).json({ message: "User registered and logged in", token });
        }

    } catch (err) {
        console.error('Auth error:', err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export { userRouter};
