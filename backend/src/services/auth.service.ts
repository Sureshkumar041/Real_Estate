import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

const userRepo = AppDataSource.getRepository(User);


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userRepo.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const user = userRepo.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepo.save(user);

        const token = generateToken(user.userId);

        return res.json({
            statusCode: 200,
            status: "success",
            message: "Registered successfully",
            data: {
                token
            }
        });
    } catch (error: any) {
        console.log("Error in Register API: ", error);
        return res.status(500).send({ statusCode: 500, status: "error", message: error.message });
    }
}

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

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        console.log("Error in Register API: ", error);
        return res.status(500).send({ statusCode: 500, status: "error", message: error.message });
    }
}