import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";
const { authService } = require("../services/")

const userRepo = AppDataSource.getRepository(User);

// REGISTER
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // res.json({ message: "User registered successfully" });
        return await authService.register(req, res);

        const existingUser = await userRepo.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const user = userRepo.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepo.save(user);

        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user.userId);

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};