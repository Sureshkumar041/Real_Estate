import { Request, Response } from "express";
import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import { comparePassword, hashPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

const userRepo = AppDataSource.getRepository(User);

class AuthService {

    async register(data: {
        name: string;
        email: string;
        password: string;
    }) {
        const { name, email, password } = data;

        const existingUser = await userRepo.findOne({
            where: { email }
        });

        if (existingUser) {
            throw {
                statusCode: 400,
                message: "Email already exists"
            };
        }

        const hashedPassword = await hashPassword(password);

        const user = userRepo.create({
            name,
            email,
            password: hashedPassword,
        });

        await userRepo.save(user);

        const token = generateToken(user.userId);

        return {
            token,
        };
    }

    async login(data: {
        email: string;
        password: string;
    }) {
        const { email, password } = data;

        const user = await userRepo.findOne({
            where: { email },
            select: {
                id: true,
                userId: true,
                name: true,
                email: true,
                password: true,
            },
        });

        if (!user) {
            throw {
                statusCode: 401,
                message: "Invalid email or password",
            };
        }

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw {
                statusCode: 401,
                message: "Invalid email or password",
            };
        }

        const token = generateToken(user.userId);

        return {
            token,
        };

    }

}

export default new AuthService();